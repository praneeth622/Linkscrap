'use client';

import { useState } from 'react';
import { usePeopleProfiles, useCompanies, useJobs, usePosts } from '@/lib/hooks/useLinkedInData';
import { Loader2, CheckCircle, XCircle, Play } from 'lucide-react';

export default function LinkedInApiDemo() {
  const [activeTab, setActiveTab] = useState('profiles');
  const [testUrls, setTestUrls] = useState('');
  
  const { 
    loading: profilesLoading, 
    error: profilesError, 
    profiles, 
    collectPeopleProfiles 
  } = usePeopleProfiles();

  const { 
    loading: companiesLoading, 
    error: companiesError, 
    companies, 
    collectCompanyData 
  } = useCompanies();

  const { 
    loading: jobsLoading, 
    error: jobsError, 
    jobs, 
    collectJobListings 
  } = useJobs();

  const { 
    loading: postsLoading, 
    error: postsError, 
    posts, 
    collectPosts 
  } = usePosts();

  const handleTestUrls = async () => {
    if (!testUrls.trim()) return;
    
    try {
      const urls = testUrls.split('\n').filter((url: string) => url.trim());
      
      if (activeTab === 'profiles') {
        await collectPeopleProfiles(urls);
      } else if (activeTab === 'companies') {
        await collectCompanyData(urls);
      } else if (activeTab === 'jobs') {
        await collectJobListings(urls);
      } else if (activeTab === 'posts') {
        await collectPosts(urls);
      }
      
      setTestUrls('');
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  const getCurrentLoading = () => {
    switch (activeTab) {
      case 'profiles': return profilesLoading;
      case 'companies': return companiesLoading;
      case 'jobs': return jobsLoading;
      case 'posts': return postsLoading;
      default: return false;
    }
  };

  const getCurrentError = () => {
    switch (activeTab) {
      case 'profiles': return profilesError;
      case 'companies': return companiesError;
      case 'jobs': return jobsError;
      case 'posts': return postsError;
      default: return null;
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'profiles': return profiles;
      case 'companies': return companies;
      case 'jobs': return jobs;
      case 'posts': return posts;
      default: return [];
    }
  };

  const tabs = [
    { id: 'profiles', label: 'People Profiles', placeholder: 'https://linkedin.com/in/profile-url' },
    { id: 'companies', label: 'Companies', placeholder: 'https://linkedin.com/company/company-name' },
    { id: 'jobs', label: 'Jobs', placeholder: 'https://linkedin.com/jobs/view/job-id' },
    { id: 'posts', label: 'Posts', placeholder: 'https://linkedin.com/posts/post-url' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn API Demo</h1>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test URLs (one per line)
            </label>
            <textarea
              value={testUrls}
              onChange={(e) => setTestUrls(e.target.value)}
              placeholder={tabs.find(t => t.id === activeTab)?.placeholder}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleTestUrls}
            disabled={getCurrentLoading() || !testUrls.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getCurrentLoading() ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            Test {tabs.find(t => t.id === activeTab)?.label}
          </button>

          {getCurrentError() && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <XCircle className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-800">{getCurrentError()}</span>
              </div>
            </div>
          )}

          {getCurrentData().length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-green-800 font-medium">
                    Success! Collected {getCurrentData().length} {activeTab}
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <pre className="whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {JSON.stringify(getCurrentData().slice(0, 2), null, 2)}
                      {getCurrentData().length > 2 && '\n... and more'}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
