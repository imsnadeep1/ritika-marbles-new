import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail } from 'lucide-react';
import { hasSupabaseEnv, supabase } from '@/lib/supabaseClient';
import { getAdminAccessErrorMessage, signOutAdmin, verifyAdminAccess } from '@/lib/adminAuth';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(location.state?.error || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const email = credentials.email.trim();
    const password = credentials.password;

    try {
      if (!hasSupabaseEnv || !supabase) {
        setError('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then redeploy.');
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      const access = await verifyAdminAccess();
      if (!access.ok) {
        await signOutAdmin();
        setError(getAdminAccessErrorMessage(access.reason));
        return;
      }

      navigate('/admin/dashboard');
    } catch (loginError) {
      console.error('Admin login failed:', loginError);
      setError(loginError?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7F4] via-white to-[#F8F1E8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-[#DDE8E2]">
          <div className="text-center mb-8">
            <img src="/logo.svg" alt="Ritika Marbles Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#1F3D36]">Admin Panel</h1>
            <p className="text-[#D4A853] mt-1">Ritika Marbles & Handicrafts</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-[#1F3D36] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4A853]" />
                <Input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="Enter your email address"
                  className="pl-10 border-[#DDE8E2] focus:border-[#1F3D36]"
                  autoComplete="username"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#1F3D36] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4A853]" />
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  className="pl-10 border-[#DDE8E2] focus:border-[#1F3D36]"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1F3D36] hover:bg-[#152C27] text-white py-3 rounded-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-[#F8F1E8] rounded-2xl border border-[#E8D9C5]">
            <p className="text-sm text-[#1F3D36] text-center">
              <strong>Admin access:</strong><br />
              Only approved admin accounts in Supabase can sign in. Public signups should be disabled in Supabase Auth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
