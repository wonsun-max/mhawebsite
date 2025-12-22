'use client';

import { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isSameDay, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Utensils, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import ContentPageLayout from '@/components/ContentPageLayout';
import { newsSubNav } from '@/lib/subNavConfig';

interface Meal {
  date: string;
  lunch: string;
}

export default function MealPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meals, setMeals] = useState<Record<string, Meal>>({});
  const [todayMeal, setTodayMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeals();
  }, [currentDate]);

  useEffect(() => {
    fetchTodayMeal();
  }, []);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const start = format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd'); // Monday start
      const end = format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');

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

  const fetchTodayMeal = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const res = await fetch(`/api/meals?start=${today}&end=${today}`, { cache: 'no-store' });
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        setTodayMeal({
          date: today,
          lunch: data.data[0].lunch
        });
      }
    } catch (error) {
      console.error('Failed to fetch today\'s meal', error);
    }
  };

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentDate, { weekStartsOn: 1 }), // Monday
    end: endOfWeek(currentDate, { weekStartsOn: 1 }),   // Sunday
  }).slice(0, 5); // Show Mon-Fri only for school

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <ContentPageLayout
      title="급식안내"
      subtitle="학생들의 건강하고 맛있는 점심 식단입니다."
      subNav={newsSubNav}
    >
      <div className="max-w-5xl mx-auto">
        {/* Today's Highlight (Only show if it's a weekday and there's a meal) */}
        {todayMeal && isToday(new Date()) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Utensils className="w-64 h-64" />
            </div>

            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  오늘의 점심
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {format(new Date(), 'M월 d일 EEEE', { locale: ko })}
                </h2>
                <p className="text-blue-100 mb-6">맛있는 점심 식사가 준비되어 있습니다.</p>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-medium">
                    {todayMeal.lunch}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/3 aspect-square bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                {/* Placeholder for food image or icon */}
                <Utensils className="w-24 h-24 text-white/80" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Weekly Navigation */}
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'M월 d일')} - {format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'M월 d일')}
            </h3>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              오늘로 가기
            </button>
          </div>

          <button
            onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Weekly Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {weekDays.map((day: Date, index: number) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const meal = meals[dateKey];
            const isTodayItem = isSameDay(day, new Date());

            return (
              <motion.div
                key={dateKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative overflow-hidden rounded-2xl border p-6 min-h-[280px] flex flex-col
                  ${isTodayItem
                    ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500 ring-offset-2'
                    : 'bg-white border-gray-200 hover:shadow-lg transition-shadow'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`
                    text-lg font-bold
                    ${isTodayItem ? 'text-blue-700' : 'text-gray-700'}
                  `}>
                    {format(day, 'E', { locale: ko })}요일
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(day, 'M/d')}
                  </span>
                </div>

                <div className="flex-1">
                  {loading ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  ) : meal ? (
                    <>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                          <Utensils className="w-3 h-3" /> Lunch
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                          {meal.lunch}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                      <Utensils className="w-8 h-8 mb-2 opacity-20" />
                      <p>식단 정보가 없습니다</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ContentPageLayout>
  );
}
