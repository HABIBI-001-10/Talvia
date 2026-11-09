import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { collegeService } from '../services';
import type { College, District } from '../types';
import CollegeCard from '../components/CollegeCard';
import EnquiryModal from '../components/EnquiryModal';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui';

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
      <div className="bg-gradient-to-r from-[#172554] to-[#2563EB] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-2">Our Network</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Partner Colleges</h1>
          <p className="text-blue-200 max-w-xl">Explore 25+ partner colleges across all 14 districts of Kerala. Find the institution that's right for you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setParam('search', e.target.value)}
              placeholder="Search colleges by name, city..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* District filter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Filter size={16} className="text-gray-400" />
            <select
              value={district}
              onChange={e => setParam('district', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Districts</option>
              {districts.map(d => (
                <option key={d.code} value={d.code}>
                  {d.name} ({d.count})
                </option>
              ))}
            </select>
          </div>

          {/* Clear filters */}
          {(search || district) && (
            <button
              onClick={() => setSearchParams({})}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 border border-gray-200 rounded-xl px-4 py-2.5 transition-colors"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-500 text-sm">
            {loading ? 'Searching...' : `${total} college${total !== 1 ? 's' : ''} found`}
            {district && districts.find(d => d.code === district) && (
              <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2.5 py-0.5 rounded-full">
                {districts.find(d => d.code === district)?.name}
              </span>
            )}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <LoadingSpinner text="Loading colleges..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : colleges.length === 0 ? (
          <EmptyState title="No colleges found" description="Try adjusting your search or filters." icon="🏫" />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map(college => (
                <CollegeCard key={college.id} college={college} onEnquire={handleEnquire} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setParam('page', String(page - 1))}
                  disabled={page === 1}
                  className="p-2.5 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setParam('page', String(i + 1))}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${
                      page === i + 1 ? 'bg-[#2563EB] text-white' : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setParam('page', String(page + 1))}
                  disabled={page === totalPages}
                  className="p-2.5 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedCollege(''); }}
        prefillCollege={selectedCollege}
        sourcePage="colleges-list"
      />
    </>
  );
}

