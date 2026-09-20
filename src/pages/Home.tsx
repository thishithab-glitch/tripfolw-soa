import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, ShieldCheck, Globe2, Calendar } from 'lucide-react';
import { packages } from '@/data/packages';
import PackageCard from '@/components/PackageCard';
import SectionTitle from '@/components/SectionTitle';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/packages?search=${encodeURIComponent(query)}`);
  };

  const featured = packages.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[600px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/16577812/pexels-photo-16577812.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
          alt="Travel landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <p className="text-teal-300 font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-in-up">
            Multi-Destination Travel Packages
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-3xl animate-fade-in-up delay-100">
            Explore More.
            <br />
            <span className="text-amber-400">Travel Smarter.</span>
          </h1>
          <p className="text-white/80 text-lg mt-5 max-w-xl leading-relaxed animate-fade-in-up delay-200">
            Discover curated multi-destination travel packages across India.
            Book your perfect trip in minutes.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="mt-8 w-full max-w-xl bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2 animate-fade-in-up delay-300"
          >
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations — Goa, Kerala, Jaipur..."
                className="w-full py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md transition-colors btn-press"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </form>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 animate-fade-in-up delay-400">
            {[
              { value: '4+', label: 'Destinations' },
              { value: '500+', label: 'Happy Travelers' },
              { value: '4.7', label: 'Avg Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-extrabold text-2xl text-white">{stat.value}</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Globe2,
              title: 'Multi-Destination Packages',
              desc: 'Cover multiple cities in one seamless itinerary — no planning hassle.',
            },
            {
              icon: Calendar,
              title: 'Flexible Date Selection',
              desc: 'Choose from multiple available dates and traveler counts to fit your schedule.',
            },
            {
              icon: ShieldCheck,
              title: 'Easy Booking Management',
              desc: 'View, track and cancel your bookings anytime from one dashboard.',
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle
          eyebrow="Popular Picks"
          title="Featured Travel Packages"
          subtitle="Hand-picked multi-destination tours loved by our travelers"
        >
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate('/packages')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-teal-600 text-teal-700 font-semibold text-sm hover:bg-teal-600 hover:text-white transition-all btn-press"
            >
              View All Packages
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl overflow-hidden h-72">
          <img
            src="https://images.pexels.com/photos/15215323/pexels-photo-15215323.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Mountains"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-700/60" />
          <div className="relative h-full flex flex-col justify-center items-start p-10 sm:p-16">
            <h2 className="font-display font-extrabold text-3xl text-white max-w-md">
              Ready for your next adventure?
            </h2>
            <p className="text-white/80 mt-3 max-w-md text-sm">
              Browse all our travel packages and book your dream trip today.
            </p>
            <button
              onClick={() => navigate('/packages')}
              className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-lg transition-colors btn-press"
            >
              Explore Packages
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
