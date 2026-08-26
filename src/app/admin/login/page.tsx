'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push('/admin');
      router.refresh(); // refresh layout server components
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to login. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-[#2a2a2a] p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-[#f5f5f0] mb-2">BAYRAKTAR</h1>
          <p className="text-xs tracking-[0.3em] text-neutral-500">CREATIVE CMS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-950/30 border border-red-900 text-red-500 text-sm rounded-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              placeholder="admin@bayraktarcreative.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f5f5f0] text-[#0a0a0a] font-bold uppercase tracking-widest py-3 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
