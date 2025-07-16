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
  Users,
  Globe,
  Building2,
  Plus,
  ChevronDown,
  TrendingUp
} from 'lucide-react';

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const companies = [
    {
      id: 1,
      name: 'Google',
      industry: 'Technology',
      location: 'Mountain View, CA',
      logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=400',
      employees: '100,000+',
      website: 'google.com',
      description: 'Multinational technology company specializing in Internet-related services and products.',
      foundedYear: '1998',
      extractedAt: '1 hour ago'
    },
    {
      id: 2,
      name: 'Microsoft',
      industry: 'Technology',
      location: 'Redmond, WA',
      logo: 'https://images.pexels.com/photos/159866/books-book-pages-read-159866.jpeg?auto=compress&cs=tinysrgb&w=400',
      employees: '181,000+',
      website: 'microsoft.com',
      description: 'American multinational technology corporation producing software, consumer electronics, and personal computers.',
      foundedYear: '1975',
      extractedAt: '3 hours ago'
    },
    {
      id: 3,
      name: 'Adobe',
      industry: 'Software',
      location: 'San Jose, CA',
      logo: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      employees: '26,000+',
      website: 'adobe.com',
      description: 'American multinational computer software company focusing on creative and digital marketing solutions.',
      foundedYear: '1982',
      extractedAt: '1 day ago'
    },
    {
      id: 4,
      name: 'Netflix',
      industry: 'Entertainment',
      location: 'Los Gatos, CA',
      logo: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      employees: '11,000+',
      website: 'netflix.com',
      description: 'American streaming entertainment service with over 200 million subscribers worldwide.',
      foundedYear: '1997',
      extractedAt: '2 days ago'
    },
    {
      id: 5,
      name: 'Spotify',
      industry: 'Music',
      location: 'Stockholm, Sweden',
      logo: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg?auto=compress&cs=tinysrgb&w=400',
      employees: '6,600+',
      website: 'spotify.com',
      description: 'Swedish audio streaming and media services provider with millions of songs and podcasts.',
      foundedYear: '2006',
      extractedAt: '3 days ago'
    },
    {
      id: 6,
      name: 'Amazon',
      industry: 'E-commerce',
      location: 'Seattle, WA',
      logo: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
      employees: '1,600,000+',
      website: 'amazon.com',
      description: 'American multinational technology and e-commerce company focusing on online retail and cloud computing.',
      foundedYear: '1994',
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
          <h1 className="text-3xl font-bold font-sf-pro text-gray-900">Companies</h1>
          <p className="text-gray-600 mt-1">Discover and analyze company data</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Company
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
                placeholder="Search companies by name, industry, or location..."
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
                <option value="software">Software</option>
                <option value="entertainment">Entertainment</option>
                <option value="e-commerce">E-commerce</option>
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
          <div className="text-2xl font-bold text-primary-purple mb-2">847</div>
          <div className="text-sm text-gray-600">Total Companies</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-blue mb-2">23</div>
          <div className="text-sm text-gray-600">New This Week</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-teal mb-2">12</div>
          <div className="text-sm text-gray-600">Industries</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-success mb-2">456K</div>
          <div className="text-sm text-gray-600">Total Employees</div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-12 h-12 rounded-lg object-cover"
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
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{company.employees} employees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>{company.website}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {company.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Founded {company.foundedYear}
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