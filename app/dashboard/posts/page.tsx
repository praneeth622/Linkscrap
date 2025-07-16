'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Eye,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Calendar,
  Plus,
  ChevronDown,
  TrendingUp
} from 'lucide-react';

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const posts = [
    {
      id: 1,
      author: 'Sarah Chen',
      company: 'Google',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Excited to share that our team has launched a new AI-powered feature that will revolutionize how developers interact with code. This breakthrough represents months of research and development.',
      likes: 1247,
      comments: 89,
      shares: 156,
      postedAt: '2 hours ago',
      extractedAt: '1 hour ago',
      type: 'post',
      engagement: 'high'
    },
    {
      id: 2,
      author: 'Michael Rodriguez',
      company: 'Microsoft',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Just published a comprehensive guide on building scalable microservices architecture. Key takeaways include proper service boundaries, API versioning, and monitoring strategies.',
      likes: 892,
      comments: 67,
      shares: 234,
      postedAt: '1 day ago',
      extractedAt: '3 hours ago',
      type: 'article',
      engagement: 'high'
    },
    {
      id: 3,
      author: 'Emily Johnson',
      company: 'Adobe',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The future of design lies in understanding user psychology and creating experiences that feel intuitive and delightful. Here are 5 principles every designer should know.',
      likes: 634,
      comments: 45,
      shares: 89,
      postedAt: '2 days ago',
      extractedAt: '1 day ago',
      type: 'post',
      engagement: 'medium'
    },
    {
      id: 4,
      author: 'David Kim',
      company: 'Netflix',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Data science is evolving rapidly. Machine learning models are becoming more sophisticated, but the real challenge lies in making them interpretable and actionable for business decisions.',
      likes: 421,
      comments: 32,
      shares: 67,
      postedAt: '3 days ago',
      extractedAt: '2 days ago',
      type: 'article',
      engagement: 'medium'
    },
    {
      id: 5,
      author: 'Lisa Thompson',
      company: 'Spotify',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'User research is the backbone of great product design. Without understanding your users deeply, you are just guessing. Here is how we conduct effective user interviews.',
      likes: 789,
      comments: 56,
      shares: 123,
      postedAt: '4 days ago',
      extractedAt: '3 days ago',
      type: 'post',
      engagement: 'high'
    },
    {
      id: 6,
      author: 'James Wilson',
      company: 'Amazon',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'DevOps culture is about breaking down silos between development and operations teams. Automation, monitoring, and continuous improvement are key to success.',
      likes: 567,
      comments: 41,
      shares: 78,
      postedAt: '5 days ago',
      extractedAt: '4 days ago',
      type: 'post',
      engagement: 'medium'
    }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getEngagementBg = (engagement: string) => {
    switch (engagement) {
      case 'high': return 'bg-green-100';
      case 'medium': return 'bg-yellow-100';
      case 'low': return 'bg-gray-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-sf-pro text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">Analyze LinkedIn posts and content performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Post
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
                placeholder="Search posts by content, author, or company..."
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
                <option value="post">Posts</option>
                <option value="article">Articles</option>
                <option value="video">Videos</option>
                <option value="high">High Engagement</option>
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
          <div className="text-2xl font-bold text-primary-purple mb-2">2,847</div>
          <div className="text-sm text-gray-600">Total Posts</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-primary-blue mb-2">156</div>
          <div className="text-sm text-gray-600">New This Week</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-teal mb-2">3.4K</div>
          <div className="text-sm text-gray-600">Avg. Engagement</div>
        </div>
        <div className="metric-card">
          <div className="text-2xl font-bold text-success mb-2">89%</div>
          <div className="text-sm text-gray-600">High Quality</div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <img 
                src={post.avatar} 
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.author}</h3>
                    <p className="text-sm text-gray-600">{post.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getEngagementBg(post.engagement)} ${getEngagementColor(post.engagement)}`}>
                      {post.engagement} engagement
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {post.type}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </div>
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
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {post.postedAt}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Extracted {post.extractedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}