import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/api-response";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { BoardCategory } from "@prisma/client";
import { format, addDays, startOfDay, endOfDay } from "date-fns";
import { ko } from "date-fns/locale";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 1. Static Context (Detailed School Info)
const STATIC_CONTEXT = `
[학교 기본 정보]
- 학교명: 마닐라한국아카데미 (Manila Korean Academy, MHA)
- 위치: 필리핀 마닐라
- 교육과정: 초등(1-6학년), 중등(7-9학년), 고등(10-12학년)
- 특징: 선교사 자녀(MK)를 위한 기독교 대안학교, 한국 교육과정 기반 + 영어 심화 교육
- 급식: 점심 식사 제공 (기숙사생은 아침/저녁도 제공)

[주요 연락처 및 운영시간]
- 행정실: 070-1234-5678 (평일 08:00 - 16:00)
- 이메일: info@mha.ac.kr
- 주소: 123 Manila St, Manila, Philippines

[입학 안내]
- 대상: 부모 중 1인 이상이 선교사, 목회자, 또는 기독교인 가정의 자녀
- 절차: 서류전형 -> 입학시험(국어, 영어, 수학) -> 면접 -> 합격자 발표
- 모집시기: 수시 모집 (결원 발생 시) 및 정기 모집 (매 학기 초)

[기숙사 (생활관)]
- 대상: 7학년 이상 재학생 중 원거리 거주자 또는 부모님의 사역지로 인해 통학이 어려운 학생
- 시설: 남녀 구분 생활관, 학습실, 휴게실 구비
- 규칙: 기상 06:30, 취침 22:30, 스마트폰 사용 제한 (학습 목적 외 반납)

[교육 철학]
- 비전: 하나님을 경외하고 이웃을 사랑하는 글로벌 크리스천 리더 양성
- 미션: 영성 교육, 실력 교육, 인성 교육의 조화
`;

// 2. Dynamic Data Fetching Functions
async function getDynamicContext() {
  const today = new Date();
  const nextWeek = addDays(today, 7);

  // Fetch recent announcements (Top 3)
  const announcements = await prisma.boardPost.findMany({
    where: { category: BoardCategory.ANNOUNCEMENT },
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    take: 3,
    select: { title: true, createdAt: true }
  });

  // Fetch upcoming calendar events (Next 7 days)
  const events = await prisma.calendarEvent.findMany({
    where: {
      date: {
        gte: startOfDay(today),
        lte: endOfDay(nextWeek)
      }
    },
    orderBy: { date: 'asc' },
    select: { title: true, date: true, category: true }
  });

  // Fetch meal plan (Today and Tomorrow)
  const meals = await prisma.mealPlan.findMany({
    where: {
      date: {
        gte: startOfDay(today),
        lte: endOfDay(addDays(today, 1))
      }
    },
    orderBy: { date: 'asc' },
    select: { date: true, lunch: true }
  });

  // Format data into string
  let dynamicText = "\n[최신 학교 소식 및 일정]\n";

  // Announcements
  dynamicText += "1. 최신 공지사항:\n";
  if (announcements.length > 0) {
    announcements.forEach(a => {
      dynamicText += `   - ${a.title} (${format(a.createdAt, 'MM/dd')})\n`;
    });
  } else {
    dynamicText += "   - 최근 공지사항이 없습니다.\n";
  }

  // Events
  dynamicText += "\n2. 다가오는 학사일정 (일주일 내):\n";
  if (events.length > 0) {
    events.forEach(e => {
      dynamicText += `   - ${format(e.date, 'MM/dd(eee)', { locale: ko })}: ${e.title} (${e.category === 'holiday' ? '휴일' : '행사'})\n`;
    });
  } else {
    dynamicText += "   - 예정된 일정이 없습니다.\n";
  }

  // Meals
  dynamicText += "\n3. 급식 정보 (오늘/내일 점심):\n";
  if (meals.length > 0) {
    meals.forEach(m => {
      dynamicText += `   - ${format(m.date, 'MM/dd(eee)', { locale: ko })}: ${m.lunch || '정보 없음'}\n`;
    });
  } else {
    dynamicText += "   - 등록된 급식 정보가 없습니다.\n";
  }

  return dynamicText;
}

// POST /api/chatbot - Chat with school bot
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message) {
      return ApiResponse.error("Message is required");
    }

    // Fetch dynamic context
    const dynamicContext = await getDynamicContext();

    // Combine Static + Dynamic Context
    const systemPrompt = `
You are a helpful and friendly AI assistant for Manila Korean Academy (MHA).
Use the following information to answer user questions accurately.

${STATIC_CONTEXT}

${dynamicContext}

[답변 가이드라인]
1. 한국어로 친절하고 정중하게 답변하세요 (해요체 사용).
2. 학교의 공식적인 정보(위의 Context)에 기반해서만 답변하세요.
3. 급식, 일정, 공지사항 질문에는 '최신 학교 소식 및 일정' 섹션의 데이터를 우선적으로 확인하세요.
4. 정보가 없는 경우, "죄송하지만 해당 정보는 현재 확인할 수 없습니다. 행정실(070-1234-5678)로 문의 부탁드립니다."라고 안내하세요.
5. 답변은 3~4문장 내외로 간결하게 작성하세요.
`;

    // Build messages array
    const messages: any[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...history.slice(-4), // Keep last 4 turns for context window efficiency
      {
        role: "user",
        content: message,
      },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 400,
      temperature: 0.5, // Lower temperature for more factual answers
    });

    const reply = completion.choices[0]?.message?.content || "죄송합니다. 응답을 생성할 수 없습니다.";

    return ApiResponse.success({
      reply,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);

    if (error?.status === 401) {
      return ApiResponse.error("OpenAI API 키가 유효하지 않습니다.");
    }

    return ApiResponse.serverError("챗봇 응답 생성 중 오류가 발생했습니다.");
  }
}
