import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '../lib/supabaseClient';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if a session exists
      const { data: { session } } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="text-blue-500 animate-spin" size={40} />
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!authenticated) {
    return <Navigate to="/Login" replace />;
  }

  // If logged in, show the Dashboard (children)
  return children;
};

export default ProtectedRoute;
