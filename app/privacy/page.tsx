'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import { Shield, Lock, FileText } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <ContentPageLayout
            title="개인정보처리방침"
            subtitle="마닐라한국아카데미의 개인정보 보호 정책을 안내해 드립니다."
            heroImageUrl="/images/campus1.jpg"
            heroImageAlt="Privacy Policy"
        >
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-gray-800">
                <div className="flex items-center gap-3 mb-8 border-b pb-6 border-gray-200">
                    <Shield className="w-10 h-10 text-blue-600" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">개인정보처리방침</h1>
                        <p className="text-gray-500 text-sm mt-1">시행일자: 2024년 1월 1일</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제1조 (총칙)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            마닐라한국아카데미는 귀하의 개인정보보호를 매우 중요시하며, 「정보통신망이용촉진등에 관한법」상의 개인정보보호 규정 및 정보통신부가 제정한 「개인정보보호지침」을 준수하고 있습니다. 마닐라한국아카데미는 개인정보보호방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제2조 (개인정보수집에 대한 동의)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            마닐라한국아카데미는 귀하께서 홈페이지의 서비스 이용 또는 e-business 사이트의 이용약관의 내용에 대해 「동의한다」버튼 또는 「동의하지 않는다」버튼을 클릭할 수 있는 절차를 마련하여, 「동의한다」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 간주합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제3조 (개인정보의 수집목적 및 이용목적)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm mb-2">
                            마닐라한국아카데미는 다음과 같은 목적을 위하여 개인정보를 수집하고 있습니다.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2">
                            <li>서비스 제공을 위한 계약의 성립 (본인식별 및 본인의사 확인 등)</li>
                            <li>서비스의 이행 (본인확인, 학사관리, 알림 발송 등)</li>
                            <li>기타 새로운 서비스, 신상품이나 이벤트 정보 안내</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed text-sm mt-2">
                            단, 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 수집하지 않습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제4조 (개인정보의 열람/정정)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            귀하는 언제든지 등록되어 있는 귀하의 개인정보를 열람하거나 정정하실 수 있습니다. 개인정보 열람 및 정정을 하고자 할 경우에는 로그인 후 <strong>[마이페이지]</strong>를 클릭하여 직접 열람 또는 정정하거나, 개인정보관리책임자에게 (서면, 전화, E-mail)로 연락하시면 즉시 조치하겠습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제5조 (개인정보의 보유기간 및 이용기간)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            마닐라한국아카데미 홈페이지는 수집된 개인정보의 보유기간은 회원가입 하신 후 해지(탈퇴신청 등)시까지 입니다. 또한 해지시 마닐라한국아카데미 홈페이지는 회원님의 개인정보를 재생이 불가능한 방법으로 즉시 파기하며 (개인정보가 제3자에게 제공된 경우에는 제3자에게도 파기하도록 지시합니다.) 다만 다음 각호의 경우에는 각 호에 명시한 기간동안 개인정보를 보유합니다.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2 mt-2">
                            <li>상법 등 법령의 규정에 의하여 보존할 필요성이 있는 경우</li>
                            <li>보유기간을 미리 공지하고 그 보유기간이 경과하지 않은 경우</li>
                            <li>개별적으로 회원의 동의를 받은 경우</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제6조 (목적외 사용 및 제3자에 대한 제공)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            마닐라한국아카데미 홈페이지는 귀하의 개인정보를 「개인정보의 수집목적 및 이용목적」에서 고지한 범위내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업/기관에 제공하지 않습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제7조 (개인정보의 위탁처리)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            마닐라한국아카데미 홈페이지는 현재 회원의 개인정보를 자체적으로 처리하고 있습니다. 그러나 향상된 서비스의 제공을 위해서 귀하의 개인정보를 외부에 위탁하여 처리할 수 있습니다. 위탁 처리 시에는 미리 그 사실을 귀하에게 고지하겠습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제8조 (쿠키에 의한 개인정보 수집)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            마닐라한국아카데미는 귀하의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)' 등을 운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다. 마닐라한국아카데미는 다음과 같은 목적을 위해 쿠키를 사용합니다.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2 mt-2">
                            <li>회원과 비회원의 접속 빈도나 방문 시간 등을 분석</li>
                            <li>이용자의 취향과 관심분야를 파악 및 자취 추적</li>
                            <li>각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed text-sm mt-2">
                            귀하는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 귀하는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            제9조 (개인정보관리책임자 및 의견수렴/불만처리)
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            귀하의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 마닐라한국아카데미 홈페이지는 개인정보관리담당자를 두어 귀하의 개인정보를 관리하고 있으며 개인정보보호와 관련하여 귀하가 의견과 불만을 제기할 수 있는 창구를 개설하고 있습니다. 귀하의 개인정보와 관련한 문의사항 및 불만 사항이 있으시면 아래의 개인정보관리담당자에게 연락주시면 즉시 조치하여 처리결과를 통보하겠습니다.
                        </p>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="font-bold text-gray-800 mb-2">[개인정보관리책임자]</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>성명: 관리자</li>
                                <li>소속: 마닐라한국아카데미 행정실</li>
                                <li>이메일: admin@mha.ac.kr</li>
                                <li>전화번호: 02-123-4567</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </ContentPageLayout>
    );
}
