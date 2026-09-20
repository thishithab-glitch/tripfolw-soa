import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { packages, getAllDestinations } from '@/data/packages';
import PackageCard from '@/components/PackageCard';

export default function Packages() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [destination, setDestination] = useState('');
  const [maxBudget, setMaxBudget] = useState<number | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  const allDestinations = useMemo(() => getAllDestinations(), []);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch =
        !search ||
        pkg.name.toLowerCase().includes(search.toLowerCase()) ||
        pkg.destinations.some((d) => d.name.toLowerCase().includes(search.toLowerCase())) ||
        pkg.region.toLowerCase().includes(search.toLowerCase());

      const matchesDestination =
        !destination || pkg.destinations.some((d) => d.name === destination);

      const matchesBudget = !maxBudget || pkg.price <= maxBudget;

      return matchesSearch && matchesDestination && matchesBudget;
    });
  }, [search, destination, maxBudget]);

  const clearFilters = () => {
    setSearch('');
    setDestination('');
    setMaxBudget('');
  };

  const hasFilters = search || destination || maxBudget;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-slate-800">
          Travel Packages
        </h1>
        <p className="text-slate-500 mt-2">
          Browse our curated multi-destination tours across India
        </p>
      </div>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-teal-500 transition-colors">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by package name or destination..."
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
            />
          </div>

          {/* Destination filter */}
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 outline-none focus:border-teal-500 transition-colors cursor-pointer"
          >
            <option value="">All Destinations</option>
            {allDestinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Budget filter */}
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-teal-500 transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-slate-400" />
            <input
              type="number"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value ? Number(e.target.value) : '')}
              placeholder="Max budget ₹"
              className="w-32 text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
            />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors btn-press"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> package
          {filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Package grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-700">No packages found</h3>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-5 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors btn-press"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
