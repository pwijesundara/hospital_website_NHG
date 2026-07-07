import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { registerUser } from '../../Services/authService';

export default function Register({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    dob: '',
    mobile: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { firstName, lastName, nic, dob, mobile, address, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !nic || !dob || !mobile || !address || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Continue with Google');
  };

  return (
    /* Removed the outer full-page div wrapper. 
      The main card is now the root component. Added 'max-h-full' and 'overflow-hidden' 
      to make sure this component fits comfortably inside whatever modal or grid container you place it in.
    */
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 w-full max-w-lg h-full max-h-[90vh] flex flex-col overflow-hidden">
      
      {/* Header Section (Kept static so users always know where they are) */}
      <div className="flex justify-center mb-4 flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#16243e] flex items-center justify-center">
          <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <h1 className="text-center font-serif text-2xl text-[#16243e] mb-1 flex-shrink-0">
        Create an account
      </h1>
      <p className="text-center text-sm text-slate-500 mb-4 flex-shrink-0">
        Join the NHG Patient Portal to manage your care
      </p>

      {/* Tabs */}
      <div className="flex bg-slate-100 rounded-lg p-1 mb-4 flex-shrink-0">
        <button
          type="button"
          className="flex-1 text-center text-sm font-semibold text-[#16243e] bg-white py-2 rounded-md shadow-sm"
        >
          Create account
        </button>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="flex-1 text-center text-sm font-medium text-slate-500 py-2 rounded-md hover:text-slate-700 transition-colors"
        >
          Sign in
        </button>
      </div>

      {/* Scrollable Form Body (All scrolling is fully restricted inside here) */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">FIRST NAME</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Kamal"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">LAST NAME</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Perera"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
                disabled={loading}
              />
            </div>
          </div>

          {/* NIC & DOB row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nic" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">NIC NUMBER</label>
              <input
                type="text"
                id="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="200012345678"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">DATE OF BIRTH</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
                disabled={loading}
              />
            </div>
          </div>

          {/* Mobile & Email row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="mobile" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">MOBILE NUMBER</label>
              <input
                type="tel"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="0771234567"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="kamal@example.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
                disabled={loading}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">ADDRESS</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Galle"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
              disabled={loading}
            />
          </div>

          {/* Passwords row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">PASSWORD</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold tracking-wide text-[#16243e] mb-1.5">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e]"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#1f6b50] text-white text-sm font-semibold rounded-lg hover:bg-[#1a5c44] transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register securely'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Google sign up */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full py-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Sign up with Google
        </button>

        {/* Security notice */}
        <div className="p-4 bg-[#f6f1e7] rounded-lg">
          <p className="text-sm font-semibold text-[#16243e] mb-1">Privacy & Security</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your data is protected under medical privacy laws. By registering, you agree to 
            the NHG Portal terms of service and identity verification guidelines.
          </p>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-slate-500 pt-2">
          Already registered?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#1f6b50] font-medium hover:underline inline-flex items-center gap-1"
          >
            Sign in to your account <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </p>
      </div>

    </div>
  );
}