import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { CRMProvider } from './context/CRMContext';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import KanbanBoard from './components/Kanban/KanbanBoard';
import Courses from './pages/Courses';
import Counselors from './pages/Counselors';
import Analytics from './pages/Analytics';
import WhatsAppIntegration from './components/WhatsApp/WhatsAppIntegration';
import Settings from './pages/Settings';
import SalesReport from './pages/SalesReport';
import './i18n';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <LoginForm onLogin={handleLogin} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <CRMProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout onLogout={handleLogout} />}>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="kanban" element={<KanbanBoard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="whatsapp" element={<WhatsAppIntegration />} />
            <Route path="counselors" element={<Counselors />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="followups" element={<div className="p-6"><h1 className="text-2xl font-bold">Follow-ups - Coming Soon</h1></div>} />
            <Route path="settings" element={<Settings />} />
            <Route path="sales-report" element={<SalesReport />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </CRMProvider>
  );
}

export default App;