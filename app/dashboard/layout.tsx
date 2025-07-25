'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Database,
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  Settings,
  Bell,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Activity,
  HelpCircle,
  LogOut,
  Plus,
  Filter,
  RefreshCw,
  Shield,
  BarChart3,
  TrendingUp,
  Clock,
  Star,
  Bookmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SimpleThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/components/auth-provider';

// Sidebar navigation structure with proper grouping
const sidebarNavigation = [
  {
    group: 'OVERVIEW',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null, description: 'Main overview' },
    ]
  },
  {
    group: 'DATA EXTRACTION',
    items: [
      { name: 'People', href: '/dashboard/people', icon: Users, badge: '1.2K', description: 'LinkedIn profiles' },
      { name: 'Companies', href: '/dashboard/companies', icon: Building2, badge: '847', description: 'Company data' },
      { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase, badge: '456', description: 'Job listings' },
      { name: 'Posts', href: '/dashboard/posts', icon: FileText, badge: '2.8K', description: 'Content analysis' },
    ]
  },
  {
    group: 'ANALYTICS',
    items: [
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, badge: null, description: 'Data insights' },
      { name: 'Reports', href: '/dashboard/reports', icon: TrendingUp, badge: 'New', description: 'Custom reports' },
    ]
  },
  {
    group: 'MANAGEMENT',
    items: [
      { name: 'Settings', href: '/dashboard/settings', icon: Settings, badge: null, description: 'App preferences' },
    ]
  }
];

const quickActions = [
  { name: 'Extract Profile', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  { name: 'Find Companies', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  { name: 'Search Jobs', icon: Briefcase, color: 'text-teal-600', bg: 'bg-teal-100 dark:bg-teal-900/20' },
  { name: 'Analyze Posts', icon: FileText, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
];

const notifications = [
  { id: 1, type: 'success', message: '250 profiles extracted successfully', time: '2 min ago', icon: Users },
  { id: 2, type: 'info', message: 'New job listings available in Tech', time: '5 min ago', icon: Briefcase },
  { id: 3, type: 'warning', message: 'API rate limit approaching', time: '10 min ago', icon: Shield },
  { id: 4, type: 'success', message: 'Weekly report generated', time: '1 hour ago', icon: BarChart3 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Update time every second - only on client
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowNotifications(false);
        setShowProfile(false);
        setShowQuickActions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get user display name and initials - with fallbacks for when user is null
  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userInitials = userDisplayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  // Don't render dashboard if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-400">Redirecting...</span>
        </div>
      </div>
    );
  }

  // Filter sidebar items based on search
  const filteredNavigation = sidebarNavigation.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.name.toLowerCase().includes(sidebarSearchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(sidebarSearchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const sidebarWidth = isSidebarCollapsed ? 'w-16' : 'w-80';
  const mainMargin = isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 ${sidebarWidth} sidebar transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 flex-shrink-0">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Database className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold gradient-text">LinkSnap</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Pro</div>
              </div>
            </div>
          )}

          {isSidebarCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg mx-auto">
              <Database className="w-4 h-4 text-white" />
            </div>
          )}

          <div className="flex items-center gap-1">
            {/* Collapse Toggle for Desktop */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Close button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats - Only show when expanded */}
        {!isSidebarCollapsed && (
          <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-md text-center">
                <div className="text-sm font-bold text-purple-600 dark:text-purple-400">1.2K</div>
                <div className="text-xs text-purple-500 dark:text-purple-400">Extracts</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md text-center">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">89%</div>
                <div className="text-xs text-blue-500 dark:text-blue-400">Success</div>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Search - Only show when expanded */}
        {!isSidebarCollapsed && (
          <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={sidebarSearchQuery}
                onChange={(e) => setSidebarSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="p-3 space-y-1">
            {filteredNavigation.map((group) => (
              <div key={group.group} className="mb-4">
                {!isSidebarCollapsed && (
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
                    {group.group}
                  </div>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          group flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200
                          ${isActive
                            ? 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 shadow-sm'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400'
                          }
                          ${isSidebarCollapsed ? 'justify-center' : ''}
                        `}
                        onClick={() => setIsSidebarOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        title={isSidebarCollapsed ? item.name : undefined}
                      >
                        <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-purple-600 dark:text-purple-400' : ''}`} />
                        {!isSidebarCollapsed && (
                          <>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{item.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</div>
                            </div>
                            {item.badge && (
                              <span className={`
                                px-2 py-1 text-xs rounded-full flex-shrink-0 font-medium
                                ${item.badge === 'New'
                                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                }
                              `}>
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quick Actions - Only show when expanded */}
            {!isSidebarCollapsed && (
              <div className="mt-6">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
                  QUICK ACTIONS
                </div>
                <div className="grid grid-cols-2 gap-2 border border-gray-200">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="group p-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 hover:shadow-sm hover:scale-105"
                      title={action.name}
                      aria-label={action.name}
                    >
                      <div className={`w-6 h-6 mx-auto mb-1 rounded-md ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className={`w-3 h-3 ${action.color}`} />
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 truncate">
                        {action.name.split(' ')[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* User Profile in Sidebar */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className={`flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium">{userInitials}</span>
            </div>
            {!isSidebarCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{userDisplayName}</div>
                  <div className="text-xs opacity-80 truncate">Business Pro</div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" title="Online"></div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${mainMargin} transition-all duration-300`}>
        {/* Enhanced Top Bar */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Enhanced Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search profiles, companies, jobs..."
                  className="search-input w-80"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <Filter className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              {/* Quick Filter Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors">
                  <Star className="w-3 h-3 mr-1 inline" />
                  Recent
                </button>
                <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Bookmark className="w-3 h-3 mr-1 inline" />
                  Favorites
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Current Time */}
              {isClient && currentTime && (
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  {currentTime.toLocaleTimeString()}
                </div>
              )}
              
              {/* Quick Action Button */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Quick actions"
                >
                  <Plus className="w-5 h-5" />
                </button>
                {showQuickActions && (
                  <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in">
                    {quickActions.map((action, index) => (
                      <button 
                        key={index}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                      >
                        <action.icon className={`w-4 h-4 ${action.color}`} />
                        {action.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Refresh Button */}
              <button 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              
              {/* Theme Toggle */}
              <SimpleThemeToggle />
              
              {/* Enhanced Notifications */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="notification-badge">3</span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                              ${notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                                notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' : 
                                'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}
                            `}>
                              <notification.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Enhanced User Profile */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{userInitials}</span>
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{userDisplayName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Business Pro</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showProfile && (
                  <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{userDisplayName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                      <User className="w-4 h-4" />
                      Profile Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                      <Activity className="w-4 h-4" />
                      Activity Log
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                      <HelpCircle className="w-4 h-4" />
                      Help & Support
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                      <button 
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Breadcrumb Navigation */}
          <div className="px-6 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Dashboard</span>
              {pathname !== '/dashboard' && (
                <>
                  <span>/</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium capitalize">
                    {pathname.split('/').pop()}
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
        
        {/* Enhanced Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span>&copy; 2024 LinkSnap. All rights reserved.</span>
              <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">API Documentation</Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                Status Page
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}