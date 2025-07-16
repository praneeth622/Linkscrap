'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Eye,
  ExternalLink,
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Plus,
  ChevronDown,
  Briefcase
} from 'lucide-react';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$150,000 - $200,000',
      posted: '2 days ago',
      description: 'Join our team to build scalable systems that impact billions of users worldwide.',
      requirements: ['5+ years experience', 'JavaScript/TypeScript', 'React/Node.js'],
      remote: true,
      extractedAt: '1 hour ago'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      posted: '1 day ago',
      description: 'Lead product strategy and development for our cloud platform services.',
      requirements: ['3+ years PM experience', 'Technical background', 'Agile methodology'],
      remote: true,
      extractedAt: '3 hours ago'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Adobe',
      location: 'San Jose, CA',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      posted: '3 days ago',
      description: 'Create intuitive and beautiful user experiences for creative professionals.',
      requirements: ['4+ years UX experience', 'Figma/Sketch', 'User research'],
      remote: false,
      extractedAt: '1 day ago'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      salary: '$130,000 - $170,000',
      posted: '4 days ago',
      description: 'Analyze user behavior and content performance to drive business decisions.',
      requirements: ['PhD in related field', 'Python/R', 'Machine Learning'],
      remote: true,
      extractedAt: '2 days ago'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Amazon',
      location: 'Portland, OR',
      type: 'Full-time',
      salary: '$110,000 - $150,000',
      posted: '5 days ago',
      description: 'Build and maintain infrastructure for high-scale distributed systems.',
      requirements: ['AWS/Docker', 'Kubernetes', 'CI/CD pipelines'],
      remote: true,
      extractedAt: '3 days ago'
    },
    {
      id: 6,
      title: 'Marketing Manager',
      company: 'Spotify',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      posted: '1 week ago',
      description: 'Drive marketing campaigns for our music streaming platform.',
      requirements: ['Digital marketing', 'Analytics tools', 'Creative strategy'],
      remote: false,
      extractedAt: '4 days ago'
    }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-sf-pro text-gray-900">Jobs</h1>
          <p className="text-gray-600 mt-1">Discover and analyze job opportunities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Job
          </button>
        </div>
      </div>

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
                placeholder="Search jobs by title, company, or location..."
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
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
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
          <div className="text-2xl font-bold text-primary-purple mb-2">1,456</div>
          <div className="text-sm text-gray-600">Total Jobs</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-blue mb-2">89</div>
          <div className="text-sm text-gray-600">New This Week</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-teal mb-2">67%</div>
          <div className="text-sm text-gray-600">Remote Available</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-success mb-2">$125K</div>
          <div className="text-sm text-gray-600">Avg. Salary</div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  {job.remote && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Posted {job.posted}</span>
              </div>
              <div className="text-xs text-gray-500">
                Extracted {job.extractedAt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}