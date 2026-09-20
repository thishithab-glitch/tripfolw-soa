import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  Users,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Mountain,
  Building2,
  Palmtree,
} from 'lucide-react';
import { getPackageById } from '@/data/packages';
import RatingStars from '@/components/RatingStars';

export default function PackageDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pkg = id ? getPackageById(id) : undefined;
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  if (!pkg) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display font-bold text-2xl text-slate-800">Package not found</h1>
        <Link to="/packages" className="text-teal-600 hover:underline mt-4 inline-block">
          Back to all packages
        </Link>
      </div>
    );
  }

  const totalPrice = pkg.price * travelers;

  const handleBookNow = () => {
    const params = new URLSearchParams({
      date: selectedDate,
      travelers: String(travelers),
    });
    navigate(`/booking/${pkg.id}?${params.toString()}`);
  };

  const RegionIcon = pkg.region.includes('North')
    ? Building2
    : pkg.region.includes('South')
      ? Palmtree
      : Mountain;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link
        to="/packages"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Packages
      </Link>

      {/* Hero image */}
      <div className="relative rounded-3xl overflow-hidden h-80 sm:h-96 mb-8 animate-fade-in">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {pkg.region}
            </span>
            <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              {pkg.rating}
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
            {pkg.name}
          </h1>
          <p className="text-white/80 mt-1">{pkg.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: 'Duration', value: `${pkg.durationDays}D / ${pkg.durationNights}N` },
              { icon: MapPin, label: 'Destinations', value: String(pkg.destinations.length) },
              { icon: Users, label: 'Max Travelers', value: String(pkg.maxTravelers) },
              { icon: Star, label: 'Reviews', value: String(pkg.reviews) },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <item.icon className="w-5 h-5 text-teal-600 mb-2" />
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="font-semibold text-slate-800 text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="font-display font-bold text-xl text-slate-800 mb-3">
              About this package
            </h2>
            <p className="text-slate-600 leading-relaxed">{pkg.description}</p>
            <div className="flex items-center gap-1 mt-4">
              <RatingStars rating={pkg.rating} />
              <span className="text-sm text-slate-500 ml-2">
                {pkg.rating} ({pkg.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Destinations */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="font-display font-bold text-xl text-slate-800 mb-4">
              Destinations Covered
            </h2>
            <div className="space-y-4">
              {pkg.destinations.map((dest, i) => (
                <div key={dest.name} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <RegionIcon className="w-5 h-5 text-teal-600" />
                    </div>
                    {i < pkg.destinations.length - 1 && (
                      <div className="w-0.5 h-full bg-teal-100 my-1 flex-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <h3 className="font-display font-semibold text-lg text-slate-800">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {dest.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {dest.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="font-display font-bold text-xl text-slate-800 mb-4">
              Day-wise Itinerary
            </h2>
            <div className="space-y-3">
              {pkg.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-teal-50/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">Day</span>
                    <span className="font-bold text-lg leading-none">{day.day}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{day.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {day.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="font-display font-bold text-xl text-slate-800 mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-3">
              {pkg.gallery.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden h-40 group/img">
                  <img
                    src={img}
                    alt={`${pkg.name} ${i + 1}`}
                    className="w-full h-full object-cover img-zoom"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: booking sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
            <div className="mb-4">
              <p className="text-xs text-slate-400">Starting from</p>
              <div className="flex items-baseline gap-2">
                <p className="font-display font-extrabold text-3xl text-slate-800">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-slate-400">/ person</p>
              </div>
            </div>

            {/* Date selection */}
            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                Select Travel Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 outline-none focus:border-teal-500 transition-colors cursor-pointer"
              >
                <option value="">Choose a date...</option>
                {pkg.availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Travelers */}
            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                <Users className="w-4 h-4 text-teal-600" />
                Number of Travelers
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors btn-press"
                >
                  -
                </button>
                <span className="flex-1 text-center font-display font-bold text-lg text-slate-800">
                  {travelers}
                </span>
                <button
                  onClick={() => setTravelers((t) => Math.min(pkg.maxTravelers, t + 1))}
                  className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors btn-press"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Max {pkg.maxTravelers} travelers</p>
            </div>

            {/* Total */}
            <div className="border-t border-slate-100 pt-4 mb-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>
                  ₹{pkg.price.toLocaleString('en-IN')} x {travelers}
                </span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-slate-700">Total</span>
                <span className="font-display font-extrabold text-xl text-teal-700">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              disabled={!selectedDate}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-teal-600 text-white font-semibold text-sm shadow-md hover:bg-teal-700 transition-colors btn-press disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedDate ? 'Book Now' : 'Select a date first'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 space-y-2">
              {['Free cancellation up to 7 days before', 'No payment required now', 'Instant confirmation'].map(
                (item) => (
                  <p key={item} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    {item}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
