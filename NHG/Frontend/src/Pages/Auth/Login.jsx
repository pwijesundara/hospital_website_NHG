import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { loginUser } from '../../Services/authService';

export default function Login() {
  const [identifier, setIdentifier] = useState(''); // NIC number or email
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!identifier || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(identifier, password);

      // Store token and user from backend
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Hook up to your Google OAuth flow
    console.log('Continue with Google');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#16243e] flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center font-serif text-2xl text-[#16243e] mb-1">
          Welcome back
        </h1>
        <p className="text-center text-sm text-slate-500 mb-6">
          Sign in to your NHG Patient Portal account
        </p>

        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
          <Link
            to="/register"
            className="flex-1 text-center text-sm font-medium text-slate-500 py-2 rounded-md hover:text-slate-700 transition-colors"
          >
            Create account
          </Link>
          <button
            type="button"
            className="flex-1 text-center text-sm font-semibold text-[#16243e] bg-white py-2 rounded-md shadow-sm"
          >
            Sign in
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Identifier */}
          <div>
            <label
              htmlFor="identifier"
              className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5"
            >
              EMAIL
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5"
            >
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
              disabled={loading}
            />
          </div>

          {/* Remember me / Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-[#16243e] focus:ring-[#16243e]/30"
              />
              Remember me on this device
            </label>
            <Link to="/forgot-password" className="text-[#16243e] hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#1f6b50] text-white text-sm font-semibold rounded-lg hover:bg-[#1a5c44] transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in securely'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Google sign in */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Continue with Google
        </button>

        {/* Security notice */}
        <div className="mt-6 p-4 bg-[#f6f1e7] rounded-lg">
          <p className="text-sm font-semibold text-[#16243e] mb-1">Security notice</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            This is a secure government portal. Sessions expire after 30 minutes of
            inactivity. Never share your login credentials.
          </p>
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          New patient?{' '}
          <Link
            to="/register"
            className="text-[#1f6b50] font-medium hover:underline inline-flex items-center gap-1"
          >
            Create a free account <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
