'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  ExternalLink,
  MapPin,
  Building2,
  Users,
  Globe,
  Plus,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  Loader2,
  X
} from 'lucide-react';
import { useCompanies } from '@/lib/hooks/useLinkedInData';

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [collectUrls, setCollectUrls] = useState('');

  // Use the LinkedIn data hook
  const {
    loading,
    error,
    companies,
    pagination,
    clearError,
    collectCompanyData,
    getAllCompanies,
    searchCompanies
  } = useCompanies();

  // Load companies on component mount
  useEffect(() => {
    getAllCompanies(1, 20);
  }, [getAllCompanies]);

  // Mock data for fallback - replace with actual API calls
  const mockCompanies = [
    {
      id: 1,
      name: 'Google',
      website: 'https://google.com',
      logo: 'https://logo.clearbit.com/google.com',
      industry: 'Technology',
      employees: '100,000+',
      headquarters: 'Mountain View, CA',
      founded: '1998',
      followers: '25M',
      about: 'Organizing the world\'s information and making it universally accessible and useful.',
      extractedAt: '2 hours ago'
    },
    {
      id: 2,
      name: 'Microsoft',
      website: 'https://microsoft.com',
      logo: 'https://logo.clearbit.com/microsoft.com',
      industry: 'Technology',
      employees: '200,000+',
      headquarters: 'Redmond, WA',
      founded: '1975',
      followers: '18M',
      about: 'Empowering every person and organization on the planet to achieve more.',
      extractedAt: '5 hours ago'
    },
    {
      id: 3,
      name: 'Apple',
      website: 'https://apple.com',
      logo: 'https://logo.clearbit.com/apple.com',
      industry: 'Technology',
      employees: '150,000+',
      headquarters: 'Cupertino, CA',
      founded: '1976',
      followers: '22M',
      about: 'To make the best products on earth, and to leave the world better than we found it.',
      extractedAt: '1 day ago'
    },
    {
      id: 4,
      name: 'Netflix',
      website: 'https://netflix.com',
      logo: 'https://logo.clearbit.com/netflix.com',
      industry: 'Entertainment',
      employees: '12,000+',
      headquarters: 'Los Gatos, CA',
      founded: '1997',
      followers: '15M',
      about: 'Entertainment company that revolutionized how the world is entertained.',
      extractedAt: '2 days ago'
    },
    {
      id: 5,
      name: 'Amazon',
      website: 'https://amazon.com',
      logo: 'https://logo.clearbit.com/amazon.com',
      industry: 'E-commerce',
      employees: '1,500,000+',
      headquarters: 'Seattle, WA',
      founded: '1994',
      followers: '30M',
      about: 'Earth\'s Most Customer-Centric Company.',
      extractedAt: '3 days ago'
    },
    {
      id: 6,
      name: 'Spotify',
      website: 'https://spotify.com',
      logo: 'https://logo.clearbit.com/spotify.com',
      industry: 'Music',
      employees: '9,000+',
      headquarters: 'Stockholm, Sweden',
      founded: '2006',
      followers: '8M',
      about: 'Unlocking the potential of human creativity by giving a million creative artists the opportunity to live off their art.',
      extractedAt: '4 days ago'
    }
  ];

  // Display companies from API or fallback to mock data for development
  const apiCompanies = Array.isArray(companies) ? companies : 
                      ((companies as any)?.data?.total ? (companies as any).data.total : 
                      ((companies as any)?.data ? (companies as any).data : []));
  
  const displayCompanies = apiCompanies.length > 0 ? apiCompanies : mockCompanies;

  // Map API data to expected structure for display
  const mappedCompanies = displayCompanies.map((company: any) => ({
    id: company.id || company.company_id,
    name: company.name || 'Unknown Company',
    website: company.website || '#',
    logo: company.logo || `https://logo.clearbit.com/${(company.website || '').replace(/https?:\/\//, '')}`,
    industry: company.industries?.join(', ') || company.industry || 'Technology',
    employees: company.employees || company.size || 'Unknown',
    headquarters: company.headquarters || company.location || 'Unknown',
    founded: company.founded || 'Unknown',
    followers: company.followers?.toString() || '0',
    about: company.about || company.description || 'No description available',
    extractedAt: company.timestamp ? new Date(company.timestamp).toLocaleDateString() : 'Recently',
    url: company.url
  }));

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchCompanies(searchQuery);
    } else {
      await getAllCompanies(1, 20);
    }
  };

  const handleCollectCompanies = async () => {
    if (!collectUrls.trim()) return;

    const urls = collectUrls.split('\n').filter(url => url.trim());
    try {
      await collectCompanyData(urls);
      setCollectUrls('');
      setShowCollectModal(false);
    } catch (err) {
      console.error('Failed to collect companies:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-sf-pro text-gray-900">Companies</h1>
          <p className="text-gray-600 mt-1">Manage and analyze LinkedIn company information</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => getAllCompanies(1, 20)}
            disabled={loading}
            className="btn-secondary"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </button>
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowAddDropdown(!showAddDropdown)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Companies
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {showAddDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setShowCollectModal(true);
                    setShowAddDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                >
                  Collect by URLs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={clearError}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="btn-primary"
            >
              Search
            </button>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
            >
              <option value="all">All Industries</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-purple mb-2">
            {mappedCompanies.length}
          </div>
          <div className="text-sm text-gray-600">Total Companies</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-blue mb-2">
            {pagination.total || 0}
          </div>
          <div className="text-sm text-gray-600">API Total</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-teal mb-2">
            {mappedCompanies.filter((c: any) => c.industry.includes('Technology')).length}
          </div>
          <div className="text-sm text-gray-600">Tech Companies</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-success mb-2">
            {new Set(mappedCompanies.map((c: any) => c.headquarters.split(',')[1]?.trim() || 'Unknown')).size - 1}
          </div>
          <div className="text-sm text-gray-600">Countries</div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && mappedCompanies.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-purple" />
            <span className="ml-2 text-gray-600">Loading companies...</span>
          </div>
        ) : mappedCompanies.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 mb-4">No companies found</div>
            <button
              onClick={() => setShowCollectModal(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Company
            </button>
          </div>
        ) : (
          mappedCompanies.map((company: any) => (
          <div key={company.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=6366f1&color=fff`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-600">{company.industry}</p>
                </div>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{company.headquarters}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{company.employees} employees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>{company.followers} followers</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{company.about}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Founded {company.founded}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button 
                  onClick={() => window.open(company.website, '_blank')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Collect Companies Modal */}
      {showCollectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Collect Companies by URLs</h2>
              <button
                onClick={() => setShowCollectModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Company URLs (one per line)
                </label>
                <textarea
                  value={collectUrls}
                  onChange={(e) => setCollectUrls(e.target.value)}
                  placeholder="https://www.linkedin.com/company/microsoft&#10;https://www.linkedin.com/company/google"
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCollectModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCollectCompanies}
                  disabled={!collectUrls.trim() || loading}
                  className="btn-primary flex-1"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Building2 className="w-4 h-4 mr-2" />
                  )}
                  Collect Companies
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
