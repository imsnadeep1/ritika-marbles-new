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
  ShoppingBag,
  ExternalLink,
  X
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
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
      } else {
        localStorage.setItem('adminToken', session.access_token);
        localStorage.setItem('adminEmail', session.user?.email || '');
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
      navigate('/admin/login');
      } else {
        localStorage.setItem('adminToken', session.access_token);
        localStorage.setItem('adminEmail', session.user?.email || '');
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
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', helper: 'Business overview' },
    { icon: Package, label: 'Products', path: '/admin/products', helper: 'Catalog, media and price' },
    { icon: ImagePlus, label: 'Bestseller', path: '/admin/bestseller', helper: 'Homepage hero product' },
    { icon: FolderOpen, label: 'Featured Edits', path: '/admin/collections', helper: 'Homepage editorial cards' },
    { icon: Sparkles, label: 'God Statues', path: '/admin/god-statues', helper: 'Landing page content' },
    { icon: Users, label: 'Client Diary', path: '/admin/client-diary', helper: 'Testimonials page copy' },
    { icon: BookOpen, label: 'Blog', path: '/admin/blog', helper: 'Buying guide posts' },
    { icon: FolderOpen, label: 'Menu & Collection Cards', path: '/admin/categories', helper: 'Navbar and homepage categories' },
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
    <div className="min-h-screen bg-[#F4F7F4] flex overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[min(85vw,280px)] bg-[#10221E]
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 sm:p-6 border-b border-white/10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src="/logo.svg"
                  alt="Ritika Marbles Logo"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white p-1 shrink-0"
                />
                <div className="min-w-0">
                  <h1 className="text-white font-semibold text-sm sm:text-base truncate">Ritika Marbles</h1>
                  <p className="text-[#D4A853] text-xs">Commerce admin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 sm:mt-5 rounded-2xl bg-white/10 p-3 sm:p-4 text-xs sm:text-sm text-white/80 hidden sm:block">
              <div className="flex items-center gap-2 text-[#F8D98E] font-semibold mb-1">
                <ShoppingBag className="w-4 h-4" />
                Store operations
              </div>
              Manage products, media, requests, reviews and storefront content.
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#D4A853] text-[#10221E] shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="min-w-0">
                  <span className="block font-medium text-sm sm:text-base truncate">{item.label}</span>
                  <span className={`hidden sm:block text-xs truncate ${isActive(item.path) ? 'text-[#10221E]/70' : 'text-white/40'}`}>
                    {item.helper}
                  </span>
                </span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t border-white/10 space-y-1">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm sm:text-base"
            >
              <Home className="w-5 h-5 shrink-0" />
              View Website
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg
              text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm sm:text-base"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm min-h-16 sm:min-h-20 flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 lg:px-8 border-b border-[#DDE8E2] sticky top-0 z-30">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-[#1F3D36]" />
            </Button>

            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-semibold text-[#1F3D36] truncate">
                {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 truncate hidden sm:block">
                Manage catalog, customer activity and storefront updates.
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[#DDE8E2] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#1F3D36] hover:bg-[#F4F7F4]"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:hidden" />
            <span className="hidden sm:inline">View store</span>
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
