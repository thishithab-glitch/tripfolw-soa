import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import type { TravelPackage } from '@/data/packages';

interface PackageCardProps {
  pkg: TravelPackage;
  index?: number;
}

export default function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const destinationNames = pkg.destinations.map((d) => d.name).join(' + ');

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md card-lift animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <Link to={`/packages/${pkg.id}`} className="block relative overflow-hidden h-56">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm">
          {pkg.region}
        </div>
        <div className="absolute top-3 right-3 bg-amber-500 rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 text-white fill-white" />
          <span className="text-xs font-bold text-white">{pkg.rating}</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link to={`/packages/${pkg.id}`}>
          <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-teal-700 transition-colors leading-snug">
            {pkg.name}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-teal-500" />
          {destinationNames}
        </p>

        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {pkg.durationDays}D / {pkg.durationNights}N
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Max {pkg.maxTravelers}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {pkg.reviews} reviews
          </span>
        </div>

        <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400">Starting from</p>
            <p className="font-display font-extrabold text-xl text-slate-800">
              ₹{pkg.price.toLocaleString('en-IN')}
            </p>
          </div>
          <Link
            to={`/packages/${pkg.id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white transition-all btn-press"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
