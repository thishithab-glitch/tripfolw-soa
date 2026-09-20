import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Calendar, Users, Mail, Phone, User, Loader2 } from 'lucide-react';
import { getPackageById } from '@/data/packages';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Booking() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const pkg = id ? getPackageById(id) : undefined;

  const initialDate = searchParams.get('date') || '';
  const initialTravelers = Number(searchParams.get('travelers') || 1);

  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState(initialDate);
  const [numTravelers, setNumTravelers] = useState(initialTravelers);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user?.email && !email) setEmail(user.email);
  }, [user, email]);

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

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="font-display font-bold text-xl text-slate-800">Please sign in to book</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          You need an account to make a reservation. Login or create an account to continue.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-colors btn-press"
        >
          Login / Register
        </Link>
      </div>
    );
  }

  const totalPrice = pkg.price * numTravelers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !travelDate) {
      setError('Please fill in all fields and select a travel date.');
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from('bookings').insert({
      package_id: pkg.id,
      package_name: pkg.name,
      traveler_name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      travel_date: travelDate,
      num_travelers: numTravelers,
      total_price: totalPrice,
      status: 'CONFIRMED',
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate('/bookings'), 2000);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-teal-600" />
        </div>
        <h1 className="font-display font-bold text-2xl text-slate-800">Booking Confirmed!</h1>
        <p className="text-slate-500 mt-2">
          Your reservation for <strong>{pkg.name}</strong> has been made. Redirecting to your
          bookings...
        </p>
        <Loader2 className="w-5 h-5 text-teal-500 animate-spin mx-auto mt-4" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to={`/packages/${pkg.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {pkg.name}
      </Link>

      <h1 className="font-display font-extrabold text-3xl text-slate-800 mb-2">
        Confirm Your Booking
      </h1>
      <p className="text-slate-500 mb-8">Fill in traveler details to complete your reservation</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
            <h2 className="font-display font-bold text-lg text-slate-800">Traveler Information</h2>

            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                <User className="w-4 h-4 text-teal-600" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white transition-colors"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                <Mail className="w-4 h-4 text-teal-600" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white transition-colors"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                <Phone className="w-4 h-4 text-teal-600" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white transition-colors"
                required
              />
            </div>

            {/* Date + Travelers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  Travel Date
                </label>
                <select
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 outline-none focus:border-teal-500 focus:bg-white transition-colors cursor-pointer"
                  required
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

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  Travelers
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setNumTravelers((t) => Math.max(1, t - 1))}
                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors btn-press"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-display font-bold text-lg text-slate-800 py-2">
                    {numTravelers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNumTravelers((t) => Math.min(pkg.maxTravelers, t + 1))}
                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors btn-press"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 text-white font-semibold text-sm shadow-md hover:bg-teal-700 transition-colors btn-press disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirming...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
            <h2 className="font-display font-bold text-lg text-slate-800 mb-4">Booking Summary</h2>

            <div className="rounded-xl overflow-hidden mb-4 h-36">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
            </div>

            <h3 className="font-display font-semibold text-slate-800 text-sm">{pkg.name}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {pkg.destinations.map((d) => d.name).join(' + ')}
            </p>

            <div className="space-y-2 mt-4 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Duration</span>
                <span className="text-slate-700">
                  {pkg.durationDays}D / {pkg.durationNights}N
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Price / person</span>
                <span className="text-slate-700">₹{pkg.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Travelers</span>
                <span className="text-slate-700">{numTravelers}</span>
              </div>
              {travelDate && (
                <div className="flex justify-between text-slate-500">
                  <span>Date</span>
                  <span className="text-slate-700">
                    {new Date(travelDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Total</span>
                <span className="font-display font-extrabold text-2xl text-teal-700">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
