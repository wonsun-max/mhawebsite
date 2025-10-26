export type StaffMember = {
  name: string
  role: string
  image: string
  email?: string
  description?: string
}

export type StaffGroup = {
  id: string
  title: string
  members: StaffMember[]
}

export const staffGroups: StaffGroup[] = [
  {
    id: 'principal',
    title: '학교장',
    members: [
      { name: '곽인환', role: '교장', image: '' },
    ],
  },
  {
    id: 'chaplain',
    title: '교목실',
    members: [
      { name: '박종근', role: '전도사', image: '' },
      { name: '이은세', role: '교사', image: '' },
    ],
  },
  {
    id: 'elementary',
    title: '초등',
    members: [
      { name: '임종현', role: '교감', image: '' },
      { name: '김동선', role: '교사', image: '' },
      { name: '방지현', role: '교사', image: '' },
      { name: '신수연', role: '교사', image: '' },
      { name: '양보라', role: '교사', image: '' },
      { name: 'Donalyn', role: '교사', image: '' },
      { name: 'Chloe Espina', role: '교사', image: '' },
    ],
  },
  {
    id: 'secondary',
    title: '중등',
    members: [
      { name: '곽은주', role: '교감', image: '' },
      { name: '이정구', role: '교무부장', image: '' },
      { name: '손인주', role: '연구부장', image: '' },
      { name: '김홍완', role: '학생부장', image: '' },
      { name: '김기연', role: '영어부장', image: '' },
      { name: '김면수', role: '교사', image: '' },
      { name: '김성식', role: '교사', image: '' },
      { name: '김영찬', role: '교사', image: '' },
      { name: '김종현', role: '교사', image: '' },
      { name: '박종불', role: '교사', image: '' },
      { name: '박승국', role: '교사', image: '' },
      { name: '신승훈', role: '교사', image: '' },
      { name: '이미경', role: '교사', image: '' },
      { name: '이정생', role: '교사', image: '' },
      { name: '정보미', role: '교사', image: '' },
      { name: '정은숙', role: '교사', image: '' },
      { name: '정하은', role: '교사', image: '' },
      { name: '조혜경', role: '교사', image: '' },
      { name: '홍래화', role: '교사', image: '' },
      { name: 'Majorie', role: '교사', image: '' },
      { name: 'Sierra', role: '교사', image: '' },
      { name: 'Arranie', role: '교사', image: '' },
      { name: 'Anabiel', role: '교사', image: '' },
      { name: 'Marlon', role: '교사', image: '' },
      { name: 'JACKIE', role: '교사', image: '' },
    ],
  },
  {
    id: 'administration',
    title: '행정실',
    members: [
      { name: '김인권', role: '실장', image: '' },
      { name: '김경욱', role: '교사', image: '' },
      { name: '최낙훈', role: '교사', image: '' },
      { name: '김은경', role: '교사', image: '' },
      { name: '양순영', role: '교사', image: '' },
      { name: '윤인순', role: '교사', image: '' },
      { name: '이지인', role: '교사', image: '' },
      { name: '한해영', role: '교사', image: '' },
      { name: '한미향', role: '교사', image: '' },
      { name: 'Jerald', role: '교사', image: '' },
      { name: 'John Paulo', role: '교사', image: '' },
    ],
  },
  {
    id: 'library',
    title: '도서관',
    members: [
      { name: '송한근', role: '관장', image: '' },
    ],
  },
  {
    id: 'dormitory',
    title: '생활관',
    members: [
      { name: '김도완', role: '교사', image: '' },
      { name: '이선미', role: '교사', image: '' },
      { name: '신요한', role: '교사', image: '' },
      { name: '박소연', role: '교사', image: '' },
    ],
  },
  {
    id: 'health',
    title: '보건실',
    members: [
      { name: '안숙아', role: '실장', image: '' },
      { name: '임인숙', role: '교사', image: '' },
    ],
  },
];

export const recruitment = {
  eligibility: {
    title: '지원자격',
    items: [
      '교사로서 선교사 자녀 교육에 부르심이 있는 분',
      '교회나 기관(선교단체)의 선교사 파송을 받을 수 있는 분',
      '미혼 및 기혼자는 부부가 함께 선교지에서 생활할 수 있는 분',
    ],
  },
  recruitmentNumbers: {
    title: '교사 선교사 모집인원',
    elementary: '초등교사 : 0명',
    secondary: '중·고등 교사 : 과목별 0명',
    administration: '행정실 : 행정, 회계, 시설 및 차량 관리 각 1명',
    chaplain: '교목실 : 교목실 사역 1명',
    note: '※ 매년 모집 부서와 인원은 위와 다를 수 있습니다. 모집에 대한 자세한 내용은 행정실로 문의 바랍니다.',
  },
  selectionProcess: {
    title: '선발절차',
    steps: [
      '1차-서류접수',
      '2차-면접 (직접 면접이 어려울 경우 전화 인터뷰 가능)',
      '3차-면접 후 임용 전까지 본교에서 진행하는 소정의 Orientation Course',
    ],
    resultAnnouncement: '결과 발표 : 개별 통보',
  },
  applicationMethod: {
    title: '지원방법',
    description: '본교 홈페이지에서 “교사 선교사 지원서 및 관련서식”을 다운받아 작성하고 관련 증빙 서류를 스캔하여 지원서와 함께 이메일로 접수. (원본 추후 제출)',
  },
  contact: {
    title: '기타 문의 사항은 아래 연락처를 이용하여 주시기 바랍니다.',
    email: 'E-mail: hankukac@hanmail.net',
    phone: '문의 전화 : 070-8638-3355',
    kakao: '카카오톡 ID : hankukac',
  },
  applicationDownload: {
    title: '지원서 다운로드',
    href: '/files/teacher-application.docx', // Placeholder
  },
};