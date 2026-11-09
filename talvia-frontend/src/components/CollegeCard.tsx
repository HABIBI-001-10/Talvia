import { GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { College } from '../types';

interface CollegeCardProps {
  college: College;
  onEnquire?: (college: College) => void;
}

export default function CollegeCard({ college, onEnquire }: CollegeCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
      {/* Logo / Banner */}
      <div className="relative h-40 bg-gradient-to-br from-[#172554] to-[#2563EB] flex items-center justify-center overflow-hidden">
        {college.banner_image ? (
          <img src={college.banner_image} alt={college.name} className="w-full h-full object-cover opacity-30" />
        ) : null}
        {college.logo ? (
          <img src={college.logo} alt={`${college.name} logo`} className="relative z-10 h-20 w-20 object-contain rounded-xl bg-white p-2 shadow-lg" />
        ) : (
          <div className="relative z-10 w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap size={36} className="text-[#2563EB]" />
          </div>
        )}
        {college.is_featured && (
          <span className="absolute top-3 right-3 bg-[#FF6633] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#172554] text-lg leading-snug mb-1 group-hover:text-[#2563EB] transition-colors line-clamp-2">
          {college.name}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
          <MapPin size={13} className="text-[#FF6633]" />
          <span>{college.city ? `${college.city}, ` : ''}{college.district_display}</span>
        </div>

        {college.affiliated_university && (
          <p className="text-xs text-slate-400 mb-3 line-clamp-1">
            Affiliated: {college.affiliated_university}
          </p>
        )}

        {college.short_description && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">{college.short_description}</p>
        )}

        {/* Courses badges */}
        {college.course_names && college.course_names.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {college.course_names.slice(0, 3).map(c => (
              <span key={c} className="bg-blue-50 text-[#2563EB] text-xs px-2 py-0.5 rounded-full font-medium">
                {c}
              </span>
            ))}
            {(college.course_count ?? 0) > 3 && (
              <span className="bg-gray-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                +{(college.course_count ?? 0) - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/colleges/${college.slug}`}
            className="flex-1 text-center text-sm font-semibold text-[#2563EB] border-2 border-[#2563EB] rounded-lg py-2 hover:bg-blue-50 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => onEnquire?.(college)}
            className="flex-1 text-center text-sm font-semibold bg-[#FF6633] hover:bg-orange-600 text-white rounded-lg py-2 transition-colors"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}

