import { GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { College } from '../types';

interface CollegeCardProps {
  college: College;
  onEnquire?: (college: College) => void;
}

export default function CollegeCard({ college, onEnquire }: CollegeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#C59B4E]/60 transition-all duration-300 group flex flex-col h-full"
    >
      {/* Top Media / Banner */}
      <div className="relative h-44 bg-[#141824] flex items-center justify-center overflow-hidden border-b border-slate-100">
        {college.banner_image ? (
          <img src={college.banner_image} alt={college.name} className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#141824] to-[#1E2535] opacity-90" />
        )}

        {/* Logo */}
        {college.logo ? (
          <img
            src={college.logo}
            alt={`${college.name} logo`}
            className="relative z-10 h-20 w-20 object-contain rounded-2xl bg-white p-2.5 shadow-md border border-slate-200"
          />
        ) : (
          <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md border border-slate-200">
            <GraduationCap size={36} className="text-[#181E2A]" />
          </div>
        )}

        {college.is_featured && (
          <span className="absolute top-3 right-3 bg-[#FBF7EE] text-[#9A732C] border border-[#E8D7B8] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Featured College
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-[#B48A3D] transition-colors line-clamp-2">
          {college.name}
        </h3>

        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
          <MapPin size={14} className="text-[#C59B4E] flex-shrink-0" />
          <span>{college.city ? `${college.city}, ` : ''}{college.district_display}</span>
        </div>

        {college.affiliated_university && (
          <p className="text-xs text-slate-400 mb-3 line-clamp-1 font-medium">
            Affiliated: {college.affiliated_university}
          </p>
        )}

        {college.short_description && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">{college.short_description}</p>
        )}

        {/* Courses badges */}
        {college.course_names && college.course_names.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {college.course_names.slice(0, 3).map(c => (
              <span key={c} className="bg-slate-50 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium border border-slate-200/80">
                {c}
              </span>
            ))}
            {(college.course_count ?? 0) > 3 && (
              <span className="bg-slate-50 text-slate-400 text-xs px-2 py-1 rounded-lg border border-slate-200/60">
                +{(college.course_count ?? 0) - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2.5 mt-auto pt-2 border-t border-slate-100">
          <Link
            to={`/colleges/${college.slug}`}
            className="flex-1 text-center text-sm font-semibold text-slate-800 border border-slate-300 rounded-xl py-2.5 hover:bg-slate-50 hover:border-[#181E2A] transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => onEnquire?.(college)}
            className="flex-1 text-center text-sm font-semibold bg-[#181E2A] hover:bg-[#252E3E] text-white rounded-xl py-2.5 transition-colors shadow-sm"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
