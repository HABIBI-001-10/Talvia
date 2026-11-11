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
      className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-400 transition-all duration-300 group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 bg-zinc-100 rounded-xl flex items-center justify-center group-hover:bg-black transition-colors duration-300 border border-zinc-200">
          <BookOpen size={20} className="text-black group-hover:text-white transition-colors duration-300" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
          {course.category_display}
        </span>
      </div>

      <h3 className="font-bold text-black text-lg leading-snug mb-2 group-hover:text-zinc-600 transition-colors">
        {course.name}
      </h3>

      <p className="text-sm text-zinc-600 line-clamp-2 mb-4 flex-1">{course.short_description}</p>

      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-5 pt-2 border-t border-zinc-100">
        {course.duration && (
          <span className="flex items-center gap-1 font-medium">
            <Clock size={13} className="text-black" /> {course.duration}
          </span>
        )}
        {course.degree_type_display && (
          <span className="flex items-center gap-1 font-medium">
            <BookOpen size={13} className="text-black" /> {course.degree_type_display}
          </span>
        )}
        {course.college_count !== undefined && (
          <span className="flex items-center gap-1 font-medium">
            <Users size={13} className="text-black" /> {course.college_count} Colleges
          </span>
        )}
      </div>

      <div className="flex gap-2.5 mt-auto">
        <Link
          to={`/courses/${course.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-black border border-zinc-300 rounded-xl py-2.5 hover:bg-zinc-50 hover:border-black transition-colors"
        >
          Details <ArrowRight size={14} />
        </Link>
        <button
          onClick={() => onEnquire?.(course)}
          className="flex-1 text-sm font-semibold bg-black hover:bg-zinc-800 text-white rounded-xl py-2.5 transition-colors shadow-sm"
        >
          Enquire
        </button>
      </div>
    </motion.div>
  );
}
