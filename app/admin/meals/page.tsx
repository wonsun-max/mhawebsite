'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Save, Calendar as CalendarIcon, FileText, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Meal {
  date: string;
  lunch: string;
}

export default function AdminMealsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [meals, setMeals] = useState<Record<string, Meal>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Edit state
  const [editLunch, setEditLunch] = useState('');

  // Bulk Edit Mode
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState('');

  useEffect(() => {
    fetchMeals();
  }, [currentDate]);

  useEffect(() => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const meal = meals[dateKey];
    setEditLunch(meal?.lunch || '');
  }, [selectedDate, meals]);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
      const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
      const res = await fetch(`/api/meals?start=${start}&end=${end}`, { cache: 'no-store' });
      const data = await res.json();

      if (data.success) {
        const mealMap: Record<string, Meal> = {};
        data.data.forEach((m: any) => {
          mealMap[format(new Date(m.date), 'yyyy-MM-dd')] = m;
        });
        setMeals(mealMap);
      }
    } catch (error) {
      console.error('Failed to fetch meals', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDay = async () => {
    setSaving(true);
    try {
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      const payload = {
        meals: [{
          date: dateKey,
          lunch: editLunch
        }]
      };

      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMeals(prev => ({
          ...prev,
          [dateKey]: { date: dateKey, lunch: editLunch }
        }));
        alert('저장되었습니다.');
      }
    } catch (error) {
      alert('저장 실패');
    } finally {
      setSaving(false);
    }
  };

  const handleBulkParse = async () => {
    if (!bulkText.trim()) {
      alert('텍스트를 입력해주세요.');
      return;
    }

    setSaving(true);
    try {
      const lines = bulkText.split('\n');
      const parsedMeals: Meal[] = [];

      // Helper to format date
      const parseDate = (str: string): string | null => {
        // Try YYYY-MM-DD
        const ymd = str.match(/(\d{4})[-./](\d{1,2})[-./](\d{1,2})/);
        if (ymd) return `${ymd[1]}-${ymd[2].padStart(2, '0')}-${ymd[3].padStart(2, '0')}`;

        // Try MM-DD or MM/DD (assume current year)
        const md = str.match(/(\d{1,2})[-./](\d{1,2})/);
        if (md) {
          const year = new Date().getFullYear();
          return `${year}-${md[1].padStart(2, '0')}-${md[2].padStart(2, '0')}`;
        }
        return null;
      };

      // For multi-line format tracking
      let currentDateStr: string | null = null;
      let currentLunch: string[] = [];

      for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Check for single-line format: "2025-11-25 김치국, 밥, 라면"
        const singleLineMatch = line.match(/^(\d{4}[-./]\d{1,2}[-./]\d{1,2}|\d{1,2}[-./]\d{1,2})\s+(.+)$/);
        if (singleLineMatch) {
          const date = parseDate(singleLineMatch[1]);
          const menu = singleLineMatch[2].trim();
          if (date && menu) {
            // Save any pending multi-line entry first
            if (currentDateStr && currentLunch.length > 0) {
              parsedMeals.push({
                date: currentDateStr,
                lunch: currentLunch.join('\n').trim()
              });
              currentDateStr = null;
              currentLunch = [];
            }

            // Add single-line entry
            parsedMeals.push({
              date: date,
              lunch: menu
            });
            continue;
          }
        }

        // Check if line is just a date (multi-line format start)
        const date = parseDate(line);
        if (date) {
          // Save previous meal if exists
          if (currentDateStr && currentLunch.length > 0) {
            parsedMeals.push({
              date: currentDateStr,
              lunch: currentLunch.join('\n').trim()
            });
          }
          // Start new day
          currentDateStr = date;
          currentLunch = [];
          continue;
        }

        // Remove "점심:" prefix if present
        if (line.includes('점심') || line.toLowerCase().includes('lunch')) {
          line = line.replace(/점심|lunch|:/gi, '').trim();
          if (!line) continue;
        }

        // Add content to current date (multi-line format)
        if (currentDateStr) {
          currentLunch.push(line);
        }
      }

      // Save last multi-line entry if exists
      if (currentDateStr && currentLunch.length > 0) {
        parsedMeals.push({
          date: currentDateStr,
          lunch: currentLunch.join('\n').trim()
        });
      }

      if (parsedMeals.length === 0) {
        alert('날짜를 찾을 수 없습니다.\n\n지원 형식:\n1. 한 줄: "2025-11-25 김치국, 밥, 라면"\n2. 여러 줄:\n   "2025-11-25\n   김치국\n   밥\n   라면"');
        setSaving(false);
        return;
      }

      // Debug: Log parsed meals
      console.log('파싱된 식단:', parsedMeals);

      // Create safe preview
      const firstMeal = parsedMeals[0];
      const preview = firstMeal.lunch.length > 30
        ? firstMeal.lunch.substring(0, 30) + '...'
        : firstMeal.lunch;

      const confirmMsg = `${parsedMeals.length}일치 식단을 찾았습니다.\n저장하시겠습니까?\n\n예시: ${firstMeal.date}\n${preview}`;

      console.log('Confirm 메시지:', confirmMsg);

      if (!confirm(confirmMsg)) {
        setSaving(false);
        return;
      }

      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meals: parsedMeals })
      });

      if (res.ok) {
        alert('성공적으로 저장되었습니다.');
        setIsBulkMode(false);
        setBulkText('');
        fetchMeals(); // Refresh calendar
      } else {
        alert('저장 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('처리 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  // Fill empty days for grid alignment
  const startDay = getDay(startOfMonth(currentDate));
  const emptyDays = Array(startDay).fill(null);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">급식 식단 관리</h1>
          <p className="text-gray-400 mt-2">월별 급식 메뉴를 관리합니다.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsBulkMode(!isBulkMode)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors text-white"
          >
            <FileText className="w-4 h-4" />
            {isBulkMode ? '달력 보기' : '텍스트 일괄 입력'}
          </button>
        </div>
      </div>

      {isBulkMode ? (
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">텍스트로 일괄 입력</h2>
          <p className="text-sm text-gray-400 mb-4">
            날짜와 메뉴를 텍스트로 입력하여 한 번에 등록할 수 있습니다. 두 가지 형식을 지원합니다.
          </p>
          <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <p className="text-xs font-semibold text-gray-300 mb-2">📝 지원 형식:</p>
            <div className="space-y-2 text-xs text-gray-400">
              <div>
                <span className="font-medium text-blue-400">1. 한 줄 형식 (간편)</span>
                <pre className="mt-1 p-2 bg-gray-800 rounded border border-gray-700 font-mono text-gray-300">2025-11-25 김치국, 밥, 계란말이{'\n'}2025-11-26 된장찌개, 밥, 불고기</pre>
              </div>
              <div>
                <span className="font-medium text-blue-400">2. 여러 줄 형식</span>
                <pre className="mt-1 p-2 bg-gray-800 rounded border border-gray-700 font-mono text-gray-300">2025-11-25{'\n'}점심: 김치국{'\n'}밥{'\n'}계란말이{'\n'}{'\n'}2025-11-26{'\n'}된장찌개, 밥, 불고기</pre>
              </div>
            </div>
          </div>
          <textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            className="w-full h-96 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="2025-11-25 김치국, 밥, 계란말이&#13;&#10;2025-11-26 된장찌개, 밥, 불고기&#13;&#10;&#13;&#10;또는&#13;&#10;&#13;&#10;2025-11-25&#13;&#10;김치국&#13;&#10;밥&#13;&#10;계란말이"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleBulkParse}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
            >
              {saving ? '저장 중...' : '분석 및 저장'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                {format(currentDate, 'yyyy년 M월')}
              </h2>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm font-medium hover:bg-gray-700 rounded-md transition-colors text-gray-300"
                >
                  오늘
                </button>
                <button
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                <div key={day} className={`text-center text-sm font-medium py-2 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'}`}>
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-700 rounded-lg overflow-hidden border border-gray-700">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="bg-gray-900 min-h-[100px]" />
              ))}
              {days.map((day: Date) => {
                const dateKey = format(day, 'yyyy-MM-dd');
                const meal = meals[dateKey];
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={dateKey}
                    onClick={() => setSelectedDate(day)}
                    className={`bg-gray-800 min-h-[100px] p-2 cursor-pointer transition-colors hover:bg-gray-700 
                      ${isSelected ? 'ring-2 ring-inset ring-blue-500 z-10' : ''}
                    `}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`
                        text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
                        ${isToday ? 'bg-blue-600 text-white' : 'text-gray-300'}
                        ${getDay(day) === 0 ? 'text-red-400' : getDay(day) === 6 ? 'text-blue-400' : ''}
                      `}>
                        {format(day, 'd')}
                      </span>
                      {meal && <div className="w-2 h-2 rounded-full bg-green-500" />}
                    </div>
                    {meal?.lunch && (
                      <p className="text-xs text-gray-300 line-clamp-3 leading-tight">
                        {meal.lunch}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Editor Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-white mb-1">
                {format(selectedDate, 'M월 d일 (E)', { locale: ko })} 식단
              </h3>
              <p className="text-sm text-gray-400 mb-6">해당 날짜의 급식 메뉴를 입력하세요.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">점심 메뉴</label>
                  <textarea
                    value={editLunch}
                    onChange={(e) => setEditLunch(e.target.value)}
                    className="w-full h-48 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
                    placeholder="메뉴를 입력하세요..."
                  />
                </div>

                <button
                  onClick={handleSaveDay}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
