import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plane, Mail, Lock, User as UserIcon, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/bookings');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result =
      mode === 'login' ? await signIn(email, password) : await signUp(email, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (mode === 'register') {
      // After sign-up, Supabase auto-signs in (email confirmation is off)
      navigate('/bookings');
    } else {
      navigate('/bookings');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-teal-50/30 to-amber-50/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center mx-auto shadow-lg">
            <Plane className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-slate-800 mt-4">
            Trip<span className="text-teal-600">Flow</span>
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 animate-fade-in-up">
          {/* Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'login'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'register'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="font-display font-bold text-xl text-slate-800 mb-1">
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            {mode === 'login'
              ? 'Sign in to manage your bookings'
              : 'Join TripFlow to start booking trips'}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Name
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-teal-500 focus-within:bg-white transition-colors">
                  <UserIcon className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Email
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-teal-500 focus-within:bg-white transition-colors">
                <Mail className="w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Password
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-teal-500 focus-within:bg-white transition-colors">
                <Lock className="w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 text-white font-semibold text-sm shadow-md hover:bg-teal-700 transition-colors btn-press disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Please wait...
                </>
              ) : mode === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            By continuing, you agree to TripFlow's Terms & Privacy Policy.
          </p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          <Link to="/" className="text-teal-600 hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
