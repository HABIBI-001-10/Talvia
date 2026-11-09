import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, BookOpen } from 'lucide-react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnquire?: (course: Course) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  arts: 'bg-purple-100 text-purple-700',
  commerce: 'bg-green-100 text-green-700',
  science: 'bg-blue-100 text-blue-700',
  management: 'bg-amber-100 text-amber-700',
  computer_applications: 'bg-cyan-100 text-cyan-700',
  engineering: 'bg-red-100 text-red-700',
  healthcare: 'bg-pink-100 text-pink-700',
  education: 'bg-teal-100 text-teal-700',
  law: 'bg-indigo-100 text-indigo-700',
  professional: 'bg-orange-100 text-orange-700',
};

export default function CourseCard({ course, onEnquire }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#2563EB] transition-colors">
          <BookOpen size={22} className="text-[#2563EB] group-hover:text-white transition-colors" />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[course.category] || 'bg-gray-100 text-gray-700'}`}>
          {course.category_display}
        </span>
      </div>

      <h3 className="font-bold text-[#172554] text-lg leading-snug mb-2 group-hover:text-[#2563EB] transition-colors">
        {course.name}
      </h3>

      <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">{course.short_description}</p>

      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
        {course.duration && (
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-[#FF6633]" /> {course.duration}
          </span>
        )}
        {course.degree_type_display && (
          <span className="flex items-center gap-1">
            <BookOpen size={12} className="text-[#FF6633]" /> {course.degree_type_display}
          </span>
        )}
        {course.college_count !== undefined && (
          <span className="flex items-center gap-1">
            <Users size={12} className="text-[#FF6633]" /> {course.college_count} colleges
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          to={`/courses/${course.slug}`}
          className="flex-1 flex items-center justify-center gap-1 text-sm font-semibold text-[#2563EB] border-2 border-[#2563EB] rounded-lg py-2 hover:bg-blue-50 transition-colors"
        >
          Details <ArrowRight size={14} />
        </Link>
        <button
          onClick={() => onEnquire?.(course)}
          className="flex-1 text-sm font-semibold bg-[#FF6633] hover:bg-orange-600 text-white rounded-lg py-2 transition-colors"
        >
          Enquire
        </button>
      </div>
    </div>
  );
}

