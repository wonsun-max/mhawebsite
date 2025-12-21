'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, FileText, Loader2, Plus, Edit, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarEvent {
    id: string;
    title: string;
    description?: string | null;
    date: string;
    endDate?: string | null;
    category: string;
    semesterId?: string | null;
    semester?: { name: string };
}

interface Semester {
    id: string;
    name: string;
}

const categories = [
    { value: 'event', label: '행사', color: 'bg-blue-500' },
    { value: 'holiday', label: '휴일', color: 'bg-red-500' },
    { value: 'exam', label: '시험', color: 'bg-orange-500' },
    { value: 'meeting', label: '회의', color: 'bg-purple-500' },
];

export default function AdminCalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<Record<string, CalendarEvent[]>>({});
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Toast notification state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'event',
        semester: '',
        endDate: '',
    });

    // Bulk Edit Mode
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [bulkText, setBulkText] = useState('');

    // Show toast helper
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        fetchSemesters();
        fetchEvents();
    }, [currentDate]);

    const fetchSemesters = async () => {
        try {
            const res = await fetch('/api/semesters');
            const data = await res.json();
            if (data.success) {
                setSemesters(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch semesters', error);
        }
    };

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
            const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
            const res = await fetch(`/api/calendar?start=${start}&end=${end}`, { cache: 'no-store' });
            const data = await res.json();

            if (data.success) {
                const eventMap: Record<string, CalendarEvent[]> = {};

                data.data.forEach((event: any) => {
                    const startDate = new Date(event.date);
                    const endDate = event.endDate ? new Date(event.endDate) : startDate;

                    // Generate all dates between start and end
                    const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });

                    // Add event to each date in the range
                    datesInRange.forEach(date => {
                        const dateKey = format(date, 'yyyy-MM-dd');
                        if (!eventMap[dateKey]) {
                            eventMap[dateKey] = [];
                        }
                        // Avoid duplicates
                        if (!eventMap[dateKey].find(e => e.id === event.id)) {
                            eventMap[dateKey].push(event);
                        }
                    });
                });

                setEvents(eventMap);
            }
        } catch (error) {
            console.error('Failed to fetch events', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveEvent = async () => {
        if (!formData.title.trim()) {
            showToast('제목을 입력해주세요.', 'error');
            return;
        }

        setSaving(true);
        try {
            const dateKey = format(selectedDate, 'yyyy-MM-dd');

            if (editingEvent) {
                // Update existing event
                const res = await fetch(`/api/calendar/${editingEvent.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description || null,
                        date: dateKey,
                        endDate: formData.endDate || null,
                        category: formData.category,
                        semester: formData.semester || null,
                    }),
                });

                if (res.ok) {
                    closeModal();
                    showToast('✅ 일정이 수정되었습니다!');
                    await fetchEvents();
                } else {
                    showToast('수정 실패', 'error');
                }
            } else {
                // Create new event
                const payload = {
                    events: [{
                        title: formData.title,
                        description: formData.description || null,
                        date: dateKey,
                        endDate: formData.endDate || null,
                        category: formData.category,
                        semester: formData.semester || null,
                        isAllDay: true,
                        order: 0,
                    }]
                };

                const res = await fetch('/api/calendar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (res.ok) {
                    closeModal();
                    showToast('✅ 일정이 추가되었습니다!');
                    await fetchEvents();
                } else {
                    showToast('추가 실패', 'error');
                }
            }
        } catch (error) {
            showToast('저장 실패', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (!confirm('정말로 삭제하시겠습니까?')) return;

        try {
            const res = await fetch(`/api/calendar/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('🗑️ 일정이 삭제되었습니다!');
                await fetchEvents();
            } else {
                showToast('삭제 실패', 'error');
            }
        } catch (error) {
            showToast('삭제 실패', 'error');
        }
    };

    const openAddModal = () => {
        setEditingEvent(null);
        setFormData({
            title: '',
            description: '',
            category: 'event',
            semester: '',
            endDate: '',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (event: CalendarEvent) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description || '',
            category: event.category,
            semester: event.semesterId || '',
            endDate: event.endDate ? event.endDate.split('T')[0] : '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        setFormData({
            title: '',
            description: '',
            category: 'event',
            semester: '',
            endDate: '',
        });
    };

    const handleBulkParse = async () => {
        if (!bulkText.trim()) {
            alert('텍스트를 입력해주세요.');
            return;
        }

        setSaving(true);
        try {
            const lines = bulkText.split('\n');
            const parsedEvents: any[] = [];

            for (let line of lines) {
                line = line.trim();
                if (!line) continue;

                // Parse: "2025-03-01 개학식 | 설명"
                const match = line.match(/^(\d{4}-\d{2}-\d{2})\s+(.+?)(?:\s*\|\s*(.+))?$/);
                if (match) {
                    const [, date, title, description] = match;
                    parsedEvents.push({
                        date,
                        title: title.trim(),
                        description: description?.trim() || null,
                        category: 'event',
                        isAllDay: true,
                        order: 0,
                    });
                }
            }

            if (parsedEvents.length === 0) {
                alert('날짜를 찾을 수 없습니다.\\n\\n형식: "2025-03-01 개학식 | 설명"');
                setSaving(false);
                return;
            }

            const confirmMsg = `${parsedEvents.length}개 일정을 찾았습니다.\\n저장하시겠습니까?`;

            if (!confirm(confirmMsg)) {
                setSaving(false);
                return;
            }

            const res = await fetch('/api/calendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ events: parsedEvents })
            });

            if (res.ok) {
                alert('성공적으로 저장되었습니다.');
                setIsBulkMode(false);
                setBulkText('');
                fetchEvents();
            }
        } catch (error) {
            alert('처리 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    const days = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const startDay = getDay(startOfMonth(currentDate));
    const emptyDays = Array(startDay).fill(null);

    const selectedDateKey = format(selectedDate, 'yyyy-MM-dd');
    const selectedEvents = events[selectedDateKey] || [];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">학사일정 관리</h1>
                    <p className="text-gray-400 mt-2">월별 학교 일정을 관리합니다.</p>
                </div>
                <button
                    onClick={() => setIsBulkMode(!isBulkMode)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors text-white"
                >
                    <FileText className="w-4 h-4" />
                    {isBulkMode ? '달력 보기' : '텍스트 일괄 입력'}
                </button>
            </div>

            {isBulkMode ? (
                <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">텍스트로 일괄 입력</h2>
                    <p className="text-sm text-gray-400 mb-4">
                        날짜와 일정을 텍스트로 입력하여 한 번에 등록할 수 있습니다.
                    </p>
                    <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-xs font-semibold text-gray-300 mb-2">📝 지원 형식:</p>
                        <pre className="text-xs text-gray-400 font-mono">2025-03-01 개학식 | 1학기 시작
                            2025-03-15 신입생 오리엔테이션
                            2025-04-05 학부모 면담 | 1-2학년</pre>
                    </div>
                    <textarea
                        value={bulkText}
                        onChange={(e) => setBulkText(e.target.value)}
                        className="w-full h-96 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        placeholder="2025-03-01 개학식 | 1학기 시작&#13;&#10;2025-03-15 신입생 오리엔테이션&#13;&#10;..."
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
                                {format(currentDate, 'yyyy년 M월', { locale: ko })}
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

                        <div className="relative">
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-px bg-gray-700 rounded-lg overflow-hidden border border-gray-700">
                                {emptyDays.map((_, i) => (
                                    <div key={`empty-${i}`} className="bg-gray-900 min-h-[100px]" />
                                ))}
                                {days.map((day: Date) => {
                                    const dateKey = format(day, 'yyyy-MM-dd');
                                    const isSelected = isSameDay(day, selectedDate);
                                    const isToday = isSameDay(day, new Date());

                                    return (
                                        <div
                                            key={dateKey}
                                            onClick={() => setSelectedDate(day)}
                                            className={`bg-gray-800 min-h-[100px] p-2 cursor-pointer transition-colors hover:bg-gray-700 relative ${isSelected ? 'ring-2 ring-inset ring-blue-500 z-10' : ''}`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-300'} ${getDay(day) === 0 ? 'text-red-400' : getDay(day) === 6 ? 'text-blue-400' : ''}`}>
                                                    {format(day, 'd')}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Event Bars Overlay */}
                            <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ marginTop: '40px' }}>
                                {(() => {
                                    // Get all unique events for this month
                                    const allEvents = Object.values(events).flat();
                                    const uniqueEvents = Array.from(new Map(allEvents.map(e => [e.id, e])).values());

                                    // Sort by start date
                                    const sortedEvents = uniqueEvents.sort((a, b) =>
                                        new Date(a.date).getTime() - new Date(b.date).getTime()
                                    );

                                    return sortedEvents.map((event, eventIdx) => {
                                        const eventStart = new Date(event.date);
                                        const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;

                                        // Calculate position in calendar grid
                                        const monthStart = startOfMonth(currentDate);
                                        const startDay = getDay(monthStart);

                                        // Find which row this event starts on
                                        const daysSinceMonthStart = Math.floor((eventStart.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24));
                                        const totalDaysFromStart = startDay + daysSinceMonthStart;
                                        const row = Math.floor(totalDaysFromStart / 7);
                                        const col = totalDaysFromStart % 7;

                                        // Calculate span (how many days)
                                        const span = Math.floor((eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

                                        // Calculate how many days fit in current row
                                        const daysInFirstRow = Math.min(span, 7 - col);

                                        const cat = categories.find(c => c.value === event.category);

                                        return (
                                            <div key={event.id}>
                                                {/* First row segment */}
                                                <div
                                                    className={`absolute ${cat?.color || 'bg-gray-600'} text-white text-xs px-2 py-1 rounded pointer-events-auto cursor-pointer hover:opacity-90 transition-opacity`}
                                                    style={{
                                                        top: `${row * 100 + eventIdx * 24}px`,
                                                        left: `${(col / 7) * 100}%`,
                                                        width: `${(daysInFirstRow / 7) * 100}%`,
                                                        height: '20px',
                                                        zIndex: 20,
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedDate(eventStart);
                                                    }}
                                                >
                                                    <div className="truncate font-medium">{event.title}</div>
                                                </div>

                                                {/* Additional rows if event spans multiple weeks */}
                                                {span > daysInFirstRow && (() => {
                                                    const remainingDays = span - daysInFirstRow;
                                                    const additionalRows = Math.ceil(remainingDays / 7);

                                                    return Array.from({ length: additionalRows }).map((_, i) => {
                                                        const rowDays = Math.min(remainingDays - (i * 7), 7);
                                                        return (
                                                            <div
                                                                key={`${event.id}-row-${i + 1}`}
                                                                className={`absolute ${cat?.color || 'bg-gray-600'} text-white text-xs px-2 py-1 rounded pointer-events-auto cursor-pointer hover:opacity-90 transition-opacity`}
                                                                style={{
                                                                    top: `${(row + i + 1) * 100 + eventIdx * 24}px`,
                                                                    left: '0%',
                                                                    width: `${(rowDays / 7) * 100}%`,
                                                                    height: '20px',
                                                                    zIndex: 20,
                                                                }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedDate(eventStart);
                                                                }}
                                                            >
                                                                <div className="truncate font-medium">{event.title}</div>
                                                            </div>
                                                        );
                                                    });
                                                })()}
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* Event List Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-white mb-1">
                                {format(selectedDate, 'M월 d일 (E)', { locale: ko })} 일정
                            </h3>
                            <p className="text-sm text-gray-400 mb-6">해당 날짜의 일정을 관리하세요.</p>

                            <button
                                onClick={openAddModal}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mb-6"
                            >
                                <Plus className="w-4 h-4" />
                                새 일정 추가
                            </button>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {selectedEvents.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">일정이 없습니다</p>
                                    </div>
                                ) : (
                                    selectedEvents.map((event) => {
                                        const cat = categories.find(c => c.value === event.category);
                                        return (
                                            <div key={event.id} className="bg-gray-700 rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-3 h-3 rounded-full ${cat?.color || 'bg-gray-500'}`} />
                                                        <span className="text-xs text-gray-400">{cat?.label}</span>
                                                    </div>
                                                    {event.semesterId && (
                                                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                                                            {event.semester?.name || event.semesterId}
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="font-semibold text-white mb-1">{event.title}</h4>
                                                {event.endDate && (
                                                    <p className="text-xs text-gray-400 mb-1">
                                                        📅 ~{format(new Date(event.endDate), 'M월 d일', { locale: ko })}
                                                    </p>
                                                )}
                                                {event.description && (
                                                    <p className="text-sm text-gray-400 mb-3">{event.description}</p>
                                                )}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(event)}
                                                        className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-500 transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <Edit className="w-3 h-3" />
                                                        수정
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteEvent(event.id)}
                                                        className="flex-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-500 transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        삭제
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gray-800 rounded-2xl w-full max-w-lg border border-gray-700 shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">
                                    {editingEvent ? '일정 수정' : '새 일정 추가'}
                                </h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-300 mb-1 block">제목 *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="예: 중간고사"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-300 mb-1 block">설명</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                        rows={3}
                                        placeholder="일정에 대한 상세 설명..."
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-300 mb-1 block">
                                        종료 날짜 <span className="text-gray-500 text-xs">(선택 - 여러 날 일정)</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-300 mb-1 block">카테고리</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-300 mb-1 block">학기</label>
                                        <select
                                            value={formData.semester}
                                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        >
                                            <option value="">선택 안 함</option>
                                            {semesters.map((sem) => (
                                                <option key={sem.id} value={sem.id}>
                                                    {sem.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-medium transition-colors"
                                    >
                                        취소
                                    </button>
                                    <button
                                        onClick={handleSaveEvent}
                                        disabled={saving}
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-all disabled:bg-blue-400 flex items-center justify-center gap-2"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                저장 중...
                                            </>
                                        ) : (
                                            editingEvent ? '수정 완료' : '추가하기'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
