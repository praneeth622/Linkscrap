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
  Mail,
  Phone,
  Plus,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  Loader2,
  X
} from 'lucide-react';
import { usePeopleProfiles } from '@/lib/hooks/useLinkedInData';

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showDiscoverModal, setShowDiscoverModal] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [collectUrls, setCollectUrls] = useState('');
  const [discoverParams, setDiscoverParams] = useState([{ first_name: '', last_name: '' }]);

  // Use the LinkedIn data hook
  const {
    loading,
    error,
    profiles,
    pagination,
    clearError,
    collectPeopleProfiles,
    discoverPeopleProfiles,
    getAllProfiles,
    searchProfiles
  } = usePeopleProfiles();

  // Load profiles on component mount
  useEffect(() => {
    getAllProfiles(1, 20);
  }, [getAllProfiles]);

  // Mock data for fallback - replace with actual API calls
  const mockPeople = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      connections: '500+',
      industry: 'Technology',
      email: 'sarah.chen@example.com',
      phone: '+1 (555) 123-4567',
      extractedAt: '2 hours ago'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      connections: '500+',
      industry: 'Technology',
      email: 'michael.r@example.com',
      phone: '+1 (555) 234-5678',
      extractedAt: '5 hours ago'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      title: 'Marketing Director',
      company: 'Adobe',
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      connections: '500+',
      industry: 'Creative',
      email: 'emily.j@example.com',
      phone: '+1 (555) 345-6789',
      extractedAt: '1 day ago'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      connections: '500+',
      industry: 'Entertainment',
      email: 'david.kim@example.com',
      phone: '+1 (555) 456-7890',
      extractedAt: '2 days ago'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      title: 'UX Designer',
      company: 'Spotify',
      location: 'Austin, TX',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      connections: '500+',
      industry: 'Music',
      email: 'lisa.t@example.com',
      phone: '+1 (555) 567-8901',
      extractedAt: '3 days ago'
    },
    {
      id: 6,
      name: 'James Wilson',
      title: 'DevOps Engineer',
      company: 'Amazon',
      location: 'Portland, OR',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      connections: '500+',
      industry: 'E-commerce',
      email: 'james.w@example.com',
      phone: '+1 (555) 678-9012',
      extractedAt: '4 days ago'
    }
  ];

  // Use profiles from API or fallback to mock data
  // Display people from API or fallback to mock data for development
  const apiProfiles = Array.isArray(profiles) ? profiles : 
                     ((profiles as any)?.data?.total ? (profiles as any).data.total : 
                     ((profiles as any)?.data ? (profiles as any).data : []));
  
  const displayPeople = apiProfiles.length > 0 ? apiProfiles : mockPeople;

  // Map API data to expected structure for display
  const mappedPeople = displayPeople.map((person: any) => ({
    id: person.id || person.linkedin_num_id,
    name: person.name || 'Unknown',
    title: person.position || person.subtitle || 'No title available',
    company: person.company || person.company_name || 'No company',
    location: person.city || person.location || 'No location',
    avatar: person.avatar || person.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name || 'Unknown')}&background=6366f1&color=fff`,
    connections: person.connections || person.follower_count || '0',
    industry: person.industry || 'Technology',
    email: person.email || 'No email available',
    phone: person.phone || 'No phone available',
    extractedAt: person.timestamp ? new Date(person.timestamp).toLocaleDateString() : 'Recently',
    url: person.url
  }));

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchProfiles(searchQuery);
    } else {
      await getAllProfiles(1, 20);
    }
  };

  const handleCollectProfiles = async () => {
    if (!collectUrls.trim()) return;

    const urls = collectUrls.split('\n').filter(url => url.trim());
    try {
      await collectPeopleProfiles(urls);
      setCollectUrls('');
      setShowCollectModal(false);
    } catch (err) {
      console.error('Failed to collect profiles:', err);
    }
  };

  const handleDiscoverProfiles = async () => {
    const validParams = discoverParams.filter(param =>
      param.first_name.trim() && param.last_name.trim()
    );

    if (validParams.length === 0) return;

    try {
      await discoverPeopleProfiles(validParams);
      setDiscoverParams([{ first_name: '', last_name: '' }]);
      setShowDiscoverModal(false);
    } catch (err) {
      console.error('Failed to discover profiles:', err);
    }
  };

  const addDiscoverParam = () => {
    setDiscoverParams([...discoverParams, { first_name: '', last_name: '' }]);
  };

  const removeDiscoverParam = (index: number) => {
    setDiscoverParams(discoverParams.filter((_, i) => i !== index));
  };

  const updateDiscoverParam = (index: number, field: 'first_name' | 'last_name', value: string) => {
    const updated = [...discoverParams];
    updated[index][field] = value;
    setDiscoverParams(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-sf-pro text-gray-900">People</h1>
          <p className="text-gray-600 mt-1">Manage and analyze LinkedIn profiles</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => getAllProfiles(1, 20)}
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
              Add People
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {showAddDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setShowCollectModal(true);
                    setShowAddDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg"
                >
                  Collect by URLs
                </button>
                <button
                  onClick={() => {
                    setShowDiscoverModal(true);
                    setShowAddDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg"
                >
                  Discover by Names
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search people by name, company, or title..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
              >
                <option value="all">All Industries</option>
                <option value="technology">Technology</option>
                <option value="creative">Creative</option>
                <option value="entertainment">Entertainment</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={handleSearch}
              className="btn-primary px-6"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-purple mb-2">
            {mappedPeople.length}
          </div>
          <div className="text-sm text-gray-600">Total Profiles</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-blue mb-2">
            {pagination.total || 0}
          </div>
          <div className="text-sm text-gray-600">API Total</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-teal mb-2">
            {mappedPeople.filter((p: any) => p.industry === 'Technology').length}
          </div>
          <div className="text-sm text-gray-600">Tech Professionals</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-success mb-2">
            {new Set(mappedPeople.map((p: any) => p.company)).size}
          </div>
          <div className="text-sm text-gray-600">Companies</div>
        </div>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && mappedPeople.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-purple" />
            <span className="ml-2 text-gray-600">Loading profiles...</span>
          </div>
        ) : mappedPeople.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 mb-4">No profiles found</div>
            <button
              onClick={() => setShowCollectModal(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Profile
            </button>
          </div>
        ) : (
          mappedPeople.map((person: any) => (
          <div key={person.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={person.avatar} 
                  alt={person.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.title}</p>
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
                <Building2 className="w-4 h-4" />
                <span>{person.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{person.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{person.email}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Extracted {person.extractedAt}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Collect Profiles Modal */}
      {showCollectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Collect Profiles by URLs</h3>
              <button
                onClick={() => setShowCollectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile URLs (one per line)
                </label>
                <textarea
                  value={collectUrls}
                  onChange={(e) => setCollectUrls(e.target.value)}
                  placeholder="https://linkedin.com/in/username1&#10;https://linkedin.com/in/username2"
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCollectModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCollectProfiles}
                  disabled={!collectUrls.trim() || loading}
                  className="flex-1 btn-primary"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Collect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discover Profiles Modal */}
      {showDiscoverModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Discover Profiles by Names</h3>
              <button
                onClick={() => setShowDiscoverModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {discoverParams.map((param, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={param.first_name}
                    onChange={(e) => updateDiscoverParam(index, 'first_name', e.target.value)}
                    placeholder="First Name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    value={param.last_name}
                    onChange={(e) => updateDiscoverParam(index, 'last_name', e.target.value)}
                    placeholder="Last Name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
                  />
                  {discoverParams.length > 1 && (
                    <button
                      onClick={() => removeDiscoverParam(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addDiscoverParam}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-purple hover:text-primary-purple transition-colors"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDiscoverModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDiscoverProfiles}
                  disabled={!discoverParams.some(p => p.first_name.trim() && p.last_name.trim()) || loading}
                  className="flex-1 btn-primary"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Discover
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}