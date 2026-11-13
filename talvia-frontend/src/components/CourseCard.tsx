import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnquire?: (course: Course) => void;
}

export default function CourseCard({ course, onEnquire }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
      className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#C59B4E]/60 transition-all duration-300 group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 bg-[#FBF7EE] rounded-xl flex items-center justify-center group-hover:bg-[#181E2A] transition-colors duration-300 border border-[#E8D7B8]">
          <BookOpen size={20} className="text-[#C59B4E] group-hover:text-[#E8D09E] transition-colors duration-300" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FBF7EE] text-[#9A732C] border border-[#E8D7B8]">
          {course.category_display}
        </span>
      </div>

      <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-[#B48A3D] transition-colors">
        {course.name}
      </h3>

      <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">{course.short_description}</p>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-5 pt-2 border-t border-slate-100">
        {course.duration && (
          <span className="flex items-center gap-1 font-medium">
            <Clock size={13} className="text-[#C59B4E]" /> {course.duration}
          </span>
        )}
        {course.degree_type_display && (
          <span className="flex items-center gap-1 font-medium">
            <BookOpen size={13} className="text-[#C59B4E]" /> {course.degree_type_display}
          </span>
        )}
        {course.college_count !== undefined && (
          <span className="flex items-center gap-1 font-medium">
            <Users size={13} className="text-[#C59B4E]" /> {course.college_count} Colleges
          </span>
        )}
      </div>

      <div className="flex gap-2.5 mt-auto">
        <Link
          to={`/courses/${course.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-800 border border-slate-300 rounded-xl py-2.5 hover:bg-slate-50 hover:border-[#181E2A] transition-colors"
        >
          Details <ArrowRight size={14} className="text-[#C59B4E]" />
        </Link>
        <button
          onClick={() => onEnquire?.(course)}
          className="flex-1 text-sm font-semibold bg-[#181E2A] hover:bg-[#252E3E] text-white rounded-xl py-2.5 transition-colors shadow-sm"
        >
          Enquire
        </button>
      </div>
    </motion.div>
  );
}
