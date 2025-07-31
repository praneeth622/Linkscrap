'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  MoreHorizontal, 
  Eye,
  ExternalLink,
  MapPin,
  Building2,
  DollarSign,
  Plus,
  ChevronDown,
  Briefcase,
  RefreshCw,
  AlertCircle,
  Loader2,
  X
} from 'lucide-react';
import { useJobs } from '@/lib/hooks/useLinkedInData';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showDiscoverModal, setShowDiscoverModal] = useState(false);
  const [collectUrls, setCollectUrls] = useState('');
  const [discoverKeywords, setDiscoverKeywords] = useState('');

  // Use the LinkedIn data hook
  const {
    loading,
    error,
    jobs,
    pagination,
    clearError,
    collectJobListings,
    discoverJobsByKeyword,
    getAllJobs,
    searchJobs
  } = useJobs();

  // Load jobs on component mount
  useEffect(() => {
    getAllJobs(1, 20);
  }, [getAllJobs]);

  // Mock jobs for UI display
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      type: 'Full-time',
      salary: '$150,000 - $200,000',
      description: 'Join our team to build innovative products.',
      remote: true,
      posted: '2 days ago',
      requirements: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      description: 'Lead product strategy and development.',
      remote: false,
      posted: '1 day ago',
      requirements: ['Product Strategy', 'Analytics']
    }
  ];

  // Get jobs to display (API data or mock)
  const displayJobs = Array.isArray(jobs) ? jobs : mockJobs;

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchJobs(searchQuery);
    } else {
      await getAllJobs(1, 20);
    }
  };

  const handleCollectJobs = async () => {
    if (!collectUrls.trim()) return;
    
    try {
      const urls = collectUrls.split('\n').filter(url => url.trim());
      await collectJobListings(urls);
      setCollectUrls('');
      setShowCollectModal(false);
    } catch (err) {
      console.error('Error collecting jobs:', err);
    }
  };

  const handleDiscoverJobs = async () => {
    if (!discoverKeywords.trim()) return;
    
    try {
      const keywords = discoverKeywords.split(',').map(k => k.trim());
      await discoverJobsByKeyword(keywords);
      setDiscoverKeywords('');
      setShowDiscoverModal(false);
    } catch (err) {
      console.error('Error discovering jobs:', err);
    }
  };

  // Filter jobs
  const filteredJobs = displayJobs.filter((job: any) => {
    if (searchQuery) {
      return job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
             job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
             job.location?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    if (filterType === 'all') return true;
    if (filterType === 'remote') return job.remote;
    if (filterType === 'full-time') return job.type === 'Full-time';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
          <p className="text-gray-600 mt-1">Discover and analyze job opportunities</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => getAllJobs(1, 20)}
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
          <button 
            onClick={() => setShowCollectModal(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Jobs
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-800 flex-1">{error}</p>
          <button onClick={clearError} className="text-red-500 hover:text-red-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs, companies, or locations..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
          >
            <option value="all">All Jobs</option>
            <option value="remote">Remote</option>
            <option value="full-time">Full-time</option>
          </select>
          <button onClick={handleSearch} className="btn-primary">
            Search
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-purple mb-2">{displayJobs.length}</div>
          <div className="text-sm text-gray-600">Total Jobs</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-blue mb-2">{pagination.total || 0}</div>
          <div className="text-sm text-gray-600">API Total</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-teal mb-2">
            {displayJobs.filter((job: any) => job?.remote).length}
          </div>
          <div className="text-sm text-gray-600">Remote Jobs</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-success mb-2">
            {displayJobs.filter((job: any) => job?.posted?.includes('day')).length}
          </div>
          <div className="text-sm text-gray-600">This Week</div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading && displayJobs.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-purple" />
            <span className="ml-2 text-gray-600">Loading jobs...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No jobs found</p>
            <button onClick={() => setShowCollectModal(true)} className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Job
            </button>
          </div>
        ) : (
          filteredJobs.map((job: any, index: number) => (
            <div key={job?.id || index} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{job?.title}</h3>
                  {job?.remote && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span>{job?.company}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{job?.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{job?.type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>{job?.salary}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-3">{job?.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job?.requirements?.length > 0 ? (
                  job.requirements.map((req: string, reqIndex: number) => (
                    <span key={reqIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {req}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No requirements listed</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Posted {job?.posted}</span>
                <button className="btn-primary">Apply Now</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Collect Jobs Modal */}
      {showCollectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Collect Jobs by URLs</h2>
              <button onClick={() => setShowCollectModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Job URLs (one per line)
                </label>
                <textarea
                  value={collectUrls}
                  onChange={(e) => setCollectUrls(e.target.value)}
                  placeholder="https://www.linkedin.com/jobs/view/12345"
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowCollectModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button onClick={handleCollectJobs} disabled={!collectUrls.trim() || loading} className="btn-primary flex-1">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Briefcase className="w-4 h-4 mr-2" />}
                  Collect Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discover Jobs Modal */}
      {showDiscoverModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Discover Jobs</h2>
              <button onClick={() => setShowDiscoverModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma-separated)
                </label>
                <textarea
                  value={discoverKeywords}
                  onChange={(e) => setDiscoverKeywords(e.target.value)}
                  placeholder="software engineer, product manager, data scientist"
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowDiscoverModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button onClick={handleDiscoverJobs} disabled={!discoverKeywords.trim() || loading} className="btn-primary flex-1">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
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
