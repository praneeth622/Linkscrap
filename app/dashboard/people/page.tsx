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
  Mail,
  Phone,
  Plus,
  ChevronDown
} from 'lucide-react';

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');

  const people = [
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

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
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
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add People
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
          <div className="text-2xl font-bold text-primary-purple mb-2">1,247</div>
          <div className="text-sm text-gray-600">Total Profiles</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-blue mb-2">89</div>
          <div className="text-sm text-gray-600">New This Week</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-teal mb-2">456</div>
          <div className="text-sm text-gray-600">Tech Professionals</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-success mb-2">23</div>
          <div className="text-sm text-gray-600">Companies</div>
        </div>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person) => (
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
        ))}
      </div>
    </div>
  );
}