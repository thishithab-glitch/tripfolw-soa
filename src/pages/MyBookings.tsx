import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  Trash2,
  Package as PackageIcon,
  Loader2,
  AlertCircle,
  Plane,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/types/booking';

export default function MyBookings() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchBookings() {
      if (!user) return;
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setBookings((data as Booking[]) || []);
      }
      setLoading(false);
    }

    fetchBookings();
  }, [user]);

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'CANCELLED' })
      .eq('id', id);

    setCancellingId(null);

    if (error) {
      setError(error.message);
      return;
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b)),
    );
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
          <Plane className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="font-display font-bold text-xl text-slate-800">
          Sign in to view your bookings
        </h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          Login to see and manage your travel reservations.
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-slate-800">My Bookings</h1>
        <p className="text-slate-500 mt-2">
          View and manage your travel reservations
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <PackageIcon className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-700">No bookings yet</h3>
          <p className="text-sm text-slate-500 mt-1">
            Start exploring our travel packages and book your first trip!
          </p>
          <Link
            to="/packages"
            className="mt-5 inline-block px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors btn-press"
          >
            Browse Packages
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, i) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-5">
                {/* Booking ID + Package */}
                <div className="md:col-span-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Booking ID</p>
                  <p className="font-mono text-sm text-slate-700 mt-0.5">
                    #{booking.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="font-display font-semibold text-slate-800 mt-3">
                    {booking.package_name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Booked on{' '}
                    {new Date(booking.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Date + Travelers */}
                <div className="md:col-span-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Travel Date
                  </div>
                  <p className="text-sm text-slate-700">
                    {new Date(booking.travel_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 mt-3">
                    <Users className="w-3.5 h-3.5" />
                    Travelers
                  </div>
                  <p className="text-sm text-slate-700">{booking.num_travelers}</p>
                </div>

                {/* Amount + Status */}
                <div className="md:col-span-1">
                  <p className="text-xs text-slate-400 mb-1">Total Amount</p>
                  <p className="font-display font-extrabold text-lg text-teal-700">
                    ₹{Number(booking.total_price).toLocaleString('en-IN')}
                  </p>
                  <div className="mt-3">
                    <p className="text-xs text-slate-400 mb-1">Status</p>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'CONFIRMED'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          booking.status === 'CONFIRMED' ? 'bg-teal-500' : 'bg-red-500'
                        }`}
                      />
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="md:col-span-1 flex md:flex-col items-center md:items-end justify-between gap-2">
                  <Link
                    to="/packages"
                    className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    View similar packages
                  </Link>
                  {booking.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors btn-press disabled:opacity-60"
                    >
                      {cancellingId === booking.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
