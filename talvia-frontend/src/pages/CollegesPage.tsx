import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { collegeService } from '../services';
import type { College, District } from '../types';
import CollegeCard from '../components/CollegeCard';
import EnquiryModal from '../components/EnquiryModal';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/Animations';

export default function CollegesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [colleges, setColleges] = useState<College[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('');

  const search   = searchParams.get('search') || '';
  const district = searchParams.get('district') || '';
  const page     = parseInt(searchParams.get('page') || '1');

  const setParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    if (key !== 'page') p.delete('page');
    setSearchParams(p);
  };

  useEffect(() => {
    collegeService.districts().then(r => setDistricts(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    collegeService.list({ search, district, page })
      .then(r => { setColleges(r.data.results); setTotal(r.data.count); })
      .catch(() => setError('Failed to load colleges. Please try again.'))
      .finally(() => setLoading(false));
  }, [search, district, page]);

  const totalPages = Math.ceil(total / 12);

  const handleEnquire = (college: College) => {
    setSelectedCollege(college.name);
    setModalOpen(true);
  };

  return (
    <>
      {/* Page header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-[#E4C586] font-semibold text-xs uppercase tracking-[0.25em] mb-2">Academic Directory</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Colleges & Universities Across India</h1>
            <p className="text-slate-300 max-w-2xl text-base font-light">
              Explore premier universities and colleges across Karnataka, Kerala, Tamil Nadu, Maharashtra, Delhi NCR, and nationwide.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <ScrollReveal direction="up">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 mb-10 flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C59B4E]" />
              <input
                value={search}
                onChange={e => setParam('search', e.target.value)}
                placeholder="Search colleges by name, city, university..."
                className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] bg-slate-50/50"
              />
            </div>

            {/* Region / State filter */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Filter size={16} className="text-[#C59B4E]" />
              <select
                value={district}
                onChange={e => setParam('district', e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] bg-white text-slate-800"
              >
                <option value="">All States / Regions</option>
                {districts.map(d => (
                  <option key={d.code} value={d.code}>
                    {d.name} ({d.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Reset */}
            {(search || district) && (
              <button
                onClick={() => setSearchParams({})}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={15} /> Clear Filters
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Results summary */}
        {!loading && (
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-6 flex justify-between items-center">
            <span>Showing {colleges.length} of {total} Institutions</span>
            {district && <span className="bg-[#FBF7EE] text-[#9A732C] border border-[#E8D7B8] px-2.5 py-1 rounded-md font-semibold">Region: {district}</span>}
          </div>
        )}

        {/* College Grid */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => setParam('page', '1')} />
        ) : colleges.length === 0 ? (
          <EmptyState
            title="No Colleges Found"
            description="Try modifying your search criteria or clear the filters to explore all institutions."
            action={{ label: 'Clear Filters', onClick: () => setSearchParams({}) }}
          />
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map(college => (
              <StaggerItem key={college.id}>
                <CollegeCard college={college} onEnquire={handleEnquire} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              disabled={page <= 1}
              onClick={() => setParam('page', String(page - 1))}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-[#181E2A] disabled:opacity-30 disabled:hover:border-slate-200 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setParam('page', String(p))}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${
                  p === page
                    ? 'bg-[#181E2A] text-white'
                    : 'border border-slate-200 hover:border-[#181E2A] text-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page >= totalPages}
              onClick={() => setParam('page', String(page + 1))}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-[#181E2A] disabled:opacity-30 disabled:hover:border-slate-200 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedCollege(''); }}
        prefillCollege={selectedCollege}
        sourcePage="colleges_list"
      />
    </>
  );
}
