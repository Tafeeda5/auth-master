import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router';
import { LogOut, User, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="text-blue-500 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans p-6 md:p-12">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Top Navigation / Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-900/20">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="text-xl font-bold tracking-tight">AuthMaster</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all text-sm font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter">
              Hello, <span className="text-blue-500">{user?.user_metadata?.first_name || 'Friend'}!</span>
            </h1>
            <p className="text-slate-400 text-lg">You are successfully logged into your account.</p>
          </div>

          {/* Simple Test Card */}
          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User size={20} className="text-blue-400" />
              Testing Environment
            </h2>
            <p className="text-slate-400 leading-relaxed">
              This is a simple dashboard built to test Supabase Authentication. 
              If you can see your name above, it means the <strong>metadata</strong> was 
              saved correctly during signup, and the <strong>session</strong> is being 
              tracked by the Supabase client.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Email</p>
                <p className="font-medium">{user?.email}</p>
             </div>
             <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Last Login</p>
                <p className="font-medium">{new Date(user?.last_sign_in_at).toLocaleDateString()}</p>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;