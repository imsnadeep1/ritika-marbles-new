import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen,
  FolderOpen, 
  Package, 
  MessageSquare,
  Star,
  Sparkles,
  Users,
  ImagePlus,
  LogOut,
  Home,
  Menu,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hasSupabaseEnv, supabase } from '@/lib/supabaseClient';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      if (!hasSupabaseEnv || !supabase) {
        const token = localStorage.getItem('adminToken');
        const authMode = localStorage.getItem('adminAuthMode');

        if (token && authMode === 'local') {
          setCheckingSession(false);
          return;
        }

        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminAuthMode');
        navigate('/admin/login');
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminAuthMode');
        navigate('/admin/login');
      } else {
        localStorage.setItem('adminToken', session.access_token);
        localStorage.setItem('adminEmail', session.user?.email || '');
        localStorage.setItem('adminAuthMode', 'supabase');
        setCheckingSession(false);
      }
    }

    checkSession();
  }, [navigate]);

  useEffect(() => {
    if (!supabase) return undefined;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminAuthMode');
      navigate('/admin/login');
      } else {
        localStorage.setItem('adminToken', session.access_token);
        localStorage.setItem('adminEmail', session.user?.email || '');
        localStorage.setItem('adminAuthMode', 'supabase');
    }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminAuthMode');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', helper: 'Business overview' },
    { icon: Package, label: 'Products', path: '/admin/products', helper: 'Catalog, media and price' },
    { icon: ImagePlus, label: 'Bestseller', path: '/admin/bestseller', helper: 'Homepage hero product' },
    { icon: FolderOpen, label: 'Collections', path: '/admin/collections', helper: 'Storefront collection cards' },
    { icon: Sparkles, label: 'God Statues', path: '/admin/god-statues', helper: 'Landing page content' },
    { icon: Users, label: 'Client Diary', path: '/admin/client-diary', helper: 'Testimonials page copy' },
    { icon: BookOpen, label: 'Blog', path: '/admin/blog', helper: 'Buying guide posts' },
    { icon: FolderOpen, label: 'Categories', path: '/admin/categories', helper: 'Product categories' },
    { icon: MessageSquare, label: 'Customer Requests', path: '/admin/feedback', helper: 'Feedback and inquiries' },
    { icon: Star, label: 'Reviews', path: '/admin/reviews', helper: 'Client diaries' },
    { icon: Users, label: 'Clients', path: '/admin/clients', helper: 'Logos and testimonials' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#F4F7F4] flex items-center justify-center">
        <div className="rounded-3xl bg-white px-6 py-5 text-[#1F3D36] shadow-sm border border-[#DDE8E2]">
          Checking admin session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#10221E]
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Ritika Marbles Logo"
                className="w-11 h-11 rounded-2xl bg-white p-1"
              />
              <div>
                <h1 className="text-white font-semibold">Ritika Marbles</h1>
                <p className="text-[#D4A853] text-xs">Commerce admin</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm text-white/80">
              <div className="flex items-center gap-2 text-[#F8D98E] font-semibold mb-1">
                <ShoppingBag className="w-4 h-4" />
                Store operations
              </div>
              Manage products, media, requests, reviews and storefront content.
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#D4A853] text-[#10221E] shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>
                  <span className="block font-medium">{item.label}</span>
                  <span className={`block text-xs ${isActive(item.path) ? 'text-[#10221E]/70' : 'text-white/40'}`}>
                    {item.helper}
                  </span>
                </span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              View Website
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm min-h-20 flex items-center justify-between gap-4 px-4 lg:px-8 border-b border-[#DDE8E2]">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-[#1F3D36]" />
          </Button>

          <div>
            <h2 className="text-xl font-semibold text-[#1F3D36]">
              {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
            </h2>
            <p className="text-sm text-slate-500">
              Manage catalog, customer activity and storefront updates.
            </p>
          </div>

          <Link to="/" className="hidden sm:inline-flex rounded-full border border-[#DDE8E2] px-4 py-2 text-sm font-semibold text-[#1F3D36] hover:bg-[#F4F7F4]">
            View store
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
