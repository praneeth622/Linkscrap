'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building2, 
  Briefcase, 
  FileText, 
  Search,
  Download,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  ArrowRight,
  Eye,
  ExternalLink,
  Activity,
  Clock,
  Zap,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  Bookmark,
  Share2
} from 'lucide-react';

export default function Dashboard() {
  const [searchType, setSearchType] = useState('url');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('people');
  const [timeRange, setTimeRange] = useState('weekly');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Searching for ${searchQuery} as ${searchType}`);
    }, 2000);
  };

  const metrics = [
    {
      title: 'Profiles Extracted',
      value: '12,450',
      change: '+15.8%',
      trend: 'up',
      icon: Users,
      color: 'text-primary-purple',
      bgColor: 'bg-purple-50',
      progress: 85
    },
    {
      title: 'Companies Found',
      value: '2,847',
      change: '+34.0%',
      trend: 'up',
      icon: Building2,
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
      progress: 92
    },
    {
      title: 'Jobs Analyzed',
      value: '8,965',
      change: '+24.2%',
      trend: 'up',
      icon: Briefcase,
      color: 'text-teal',
      bgColor: 'bg-teal-50',
      progress: 78
    },
    {
      title: 'Posts Collected',
      value: '15,230',
      change: '-2.1%',
      trend: 'down',
      icon: FileText,
      color: 'text-success',
      bgColor: 'bg-green-50',
      progress: 65
    }
  ];

  const recentActivity = [
    { 
      type: 'profile', 
      name: 'John Doe', 
      title: 'Software Engineer at Google', 
      time: '2 min ago',
      status: 'success',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    { 
      type: 'company', 
      name: 'Microsoft', 
      title: 'Technology Company', 
      time: '5 min ago',
      status: 'success',
      avatar: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    { 
      type: 'job', 
      name: 'Senior Developer', 
      title: 'Remote • Full-time', 
      time: '10 min ago',
      status: 'pending',
      avatar: null
    },
    { 
      type: 'post', 
      name: 'AI in Healthcare', 
      title: 'LinkedIn Article', 
      time: '15 min ago',
      status: 'success',
      avatar: null
    },
  ];

  const chartData = [
    { month: 'Oct', value: 2988, growth: 15.8 },
    { month: 'Nov', value: 1765, growth: -12.3 },
    { month: 'Dec', value: 4005, growth: 34.2 },
  ];

  const topPerformers = [
    { name: 'LinkedIn Profiles', count: '4,234', percentage: 45, color: 'bg-purple-500' },
    { name: 'Company Data', count: '2,847', percentage: 30, color: 'bg-blue-500' },
    { name: 'Job Listings', count: '1,456', percentage: 15, color: 'bg-teal-500' },
    { name: 'Post Analytics', count: '892', percentage: 10, color: 'bg-green-500' },
  ];

  const systemStatus = [
    { service: 'API Gateway', status: 'operational', uptime: '99.9%' },
    { service: 'Data Processing', status: 'operational', uptime: '99.8%' },
    { service: 'Search Engine', status: 'degraded', uptime: '97.2%' },
    { service: 'Export Service', status: 'operational', uptime: '99.9%' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-sf-pro text-gray-900">Dashboard</h1>
          <div className="text-gray-600 mt-1 flex items-center gap-2">
            Welcome back! Here's what's happening with your LinkedIn data.
            <span className="inline-flex items-center gap-1 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Live
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
            <Calendar className="w-4 h-4" />
            Oct 18 - Nov 18
          </div>
          <div className="relative">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Enhanced Search Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold font-sf-pro">Smart Search & Extract</h2>
          <div className="flex items-center gap-2">
            {isClient && currentTime && (
              <span className="text-sm text-gray-500">Last updated: {currentTime.toLocaleTimeString()}</span>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
            >
              <option value="url">URL</option>
              <option value="name">Name</option>
              <option value="keyword">Keyword</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Enter ${searchType === 'url' ? 'LinkedIn URL' : searchType === 'name' ? 'person or company name' : 'search keyword'}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
              </div>
            )}
          </div>
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search
              </>
            )}
          </button>
        </div>
        
        {/* Search Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">Quick searches:</span>
          {['Software Engineer', 'Google', 'Remote Jobs', 'AI Posts'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setSearchQuery(suggestion)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.title} className="metric-card group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${metric.bgColor} ${metric.color} group-hover:scale-110 transition-transform`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-error" />
                )}
                <span className={metric.trend === 'up' ? 'text-success' : 'text-error'}>
                  {metric.change}
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold font-sf-pro text-gray-900 mb-2">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 mb-3">{metric.title}</div>
            
            {/* Progress Bar */}
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${metric.progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{metric.progress}% of monthly goal</div>
          </div>
        ))}
      </div>

      {/* Enhanced Charts and Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Data Extraction Overview */}
        <div className="lg:col-span-2 chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold font-sf-pro">Data Extraction Overview</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <BarChart3 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <LineChart className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                15.8% ↗
              </span>
              <span className="text-gray-900 font-medium">+$143.50 increased value</span>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {chartData.map((item, index) => (
                <div key={item.month} className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-gray-200 rounded-t-lg mb-2 relative overflow-hidden" style={{ height: '180px' }}>
                    <div 
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary-purple to-light-purple transition-all duration-1000 ease-out group-hover:from-primary-blue group-hover:to-teal"
                      style={{ 
                        height: `${(item.value / 4500) * 100}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.value.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.month}</span>
                  <span className={`text-xs ${item.growth > 0 ? 'text-success' : 'text-error'}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-purple rounded-full" />
                <span>People</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-blue rounded-full" />
                <span>Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal rounded-full" />
                <span>Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span>Posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold font-sf-pro">Top Performers</h3>
            <button className="text-primary-purple text-sm font-medium hover:text-primary-blue transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topPerformers.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: `${item.percentage}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.percentage}% of total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Activity */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold font-sf-pro flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </h3>
            <button className="text-primary-purple text-sm font-medium hover:text-primary-blue transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, index) => (
              <div key={index} className="activity-item">
                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    <img 
                      src={item.avatar} 
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'profile' ? 'bg-purple-100 text-primary-purple' :
                      item.type === 'company' ? 'bg-blue-100 text-primary-blue' :
                      item.type === 'job' ? 'bg-teal-100 text-teal' :
                      'bg-green-100 text-success'
                    }`}>
                      {item.type === 'profile' && <Users className="w-5 h-5" />}
                      {item.type === 'company' && <Building2 className="w-5 h-5" />}
                      {item.type === 'job' && <Briefcase className="w-5 h-5" />}
                      {item.type === 'post' && <FileText className="w-5 h-5" />}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="flex items-center gap-2">
                        <span className={`status-indicator ${
                          item.status === 'success' ? 'status-active' :
                          item.status === 'pending' ? 'status-pending' : 'status-inactive'
                        }`}>
                          {item.status === 'success' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {item.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {item.status === 'error' && <XCircle className="w-3 h-3 mr-1" />}
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold font-sf-pro flex items-center gap-2">
              <Zap className="w-5 h-5" />
              System Status
            </h3>
            <button className="text-primary-purple text-sm font-medium hover:text-primary-blue transition-colors">
              Status Page
            </button>
          </div>
          <div className="space-y-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'operational' ? 'bg-green-500' :
                    service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{service.service}</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    service.status === 'operational' ? 'text-green-600' :
                    service.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {service.status}
                  </div>
                  <div className="text-xs text-gray-500">{service.uptime} uptime</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-700">Run Test</span>
              </button>
              <button className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
              <Users className="w-6 h-6 text-primary-purple" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-purple transition-colors transform group-hover:translate-x-1" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Extract People</h4>
          <p className="text-sm text-gray-600 mb-3">Find LinkedIn profiles and connections</p>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-500">Most popular</span>
          </div>
        </div>

        <div className="card p-6 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
              <Building2 className="w-6 h-6 text-primary-blue" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-blue transition-colors transform group-hover:translate-x-1" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Company Data</h4>
          <p className="text-sm text-gray-600 mb-3">Analyze companies and their employees</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-500">Growing fast</span>
          </div>
        </div>

        <div className="card p-6 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-teal-100 rounded-xl group-hover:bg-teal-200 transition-colors">
              <Briefcase className="w-6 h-6 text-teal" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal transition-colors transform group-hover:translate-x-1" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Job Search</h4>
          <p className="text-sm text-gray-600 mb-3">Find job opportunities and trends</p>
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-500">Save searches</span>
          </div>
        </div>

        <div className="card p-6 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
              <FileText className="w-6 h-6 text-success" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-success transition-colors transform group-hover:translate-x-1" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Post Analysis</h4>
          <p className="text-sm text-gray-600 mb-3">Examine content and engagement</p>
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-500">Share insights</span>
          </div>
        </div>
      </div>
    </div>
  );
}