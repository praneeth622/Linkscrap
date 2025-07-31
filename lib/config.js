// API Configuration
// Change this URL based on your environment (localhost, staging, production)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// API Endpoints Configuration - Complete LinkedIn BrightData API Integration
export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    // Health Check
    health: '/health',
    
    // People Profile APIs - Collect by URLs
    peopleProfileCollect: '/linkedin/people-profile/collect',
    peopleProfileCollectById: (id) => `/linkedin/people-profile/collect/${id}`,
    peopleProfileCollectByLinkedInId: (linkedinId) => `/linkedin/people-profile/collect/linkedin-id/${linkedinId}`,
    peopleProfileCollectSnapshotStatus: (snapshotId) => `/linkedin/people-profile/collect/snapshot/${snapshotId}/status`,
    peopleProfileCollectSnapshotData: (snapshotId) => `/linkedin/people-profile/collect/snapshot/${snapshotId}/data`,
    
    // People Profile APIs - Discover by Name
    peopleProfileDiscover: '/linkedin/people-profile/discover',
    peopleProfileDiscoverById: (id) => `/linkedin/people-profile/discover/${id}`,
    peopleProfileDiscoverByLinkedInId: (linkedinId) => `/linkedin/people-profile/discover/linkedin-id/${linkedinId}`,
    peopleProfileDiscoverByName: (firstName, lastName) => `/linkedin/people-profile/discover/search/${firstName}/${lastName}`,
    peopleProfileDiscoverSnapshotStatus: (snapshotId) => `/linkedin/people-profile/discover/snapshot/${snapshotId}/status`,
    peopleProfileDiscoverSnapshotData: (snapshotId) => `/linkedin/people-profile/discover/snapshot/${snapshotId}/data`,
    
    // People Search API - Collect by Search Criteria
    peopleSearchCollect: '/linkedin/people-search-collect',
    peopleSearchCollectById: (id) => `/linkedin/people-search-collect/${id}`,
    peopleSearchCollectSearch: '/linkedin/people-search-collect/search',
    peopleSearchCollectByLocation: (location) => `/linkedin/people-search-collect/location/${location}`,
    peopleSearchCollectSnapshotStatus: (snapshotId) => `/linkedin/people-search-collect/snapshot/${snapshotId}/status`,
    peopleSearchCollectSnapshotData: (snapshotId) => `/linkedin/people-search-collect/snapshot/${snapshotId}/data`,
    
    // Company Information API
    companyInfoCollect: '/linkedin/company-info/collect',
    companyInfoCollectById: (id) => `/linkedin/company-info/collect/${id}`,
    companyInfoCollectByCompanyId: (companyId) => `/linkedin/company-info/collect/company/${companyId}`,
    companyInfoCollectByUrl: (encodedUrl) => `/linkedin/company-info/collect/url/${encodedUrl}`,
    
    // Job Listing APIs - Collect by URLs
    jobListingCollect: '/linkedin/job-listing/collect',
    jobListingCollectById: (id) => `/linkedin/job-listing/collect/${id}`,
    jobListingCollectByPostingId: (postingId) => `/linkedin/job-listing/collect/posting/${postingId}`,
    jobListingCollectSnapshotStatus: (snapshotId) => `/linkedin/job-listing/collect/snapshot/${snapshotId}/status`,
    jobListingCollectSnapshotData: (snapshotId) => `/linkedin/job-listing/collect/snapshot/${snapshotId}/data`,
    
    // Job Listing APIs - Discover by Keyword
    jobListingDiscoverKeyword: '/linkedin/job-listing/discover-keyword',
    jobListingDiscoverKeywordById: (id) => `/linkedin/job-listing/discover-keyword/${id}`,
    jobListingDiscoverKeywordByPostingId: (postingId) => `/linkedin/job-listing/discover-keyword/posting/${postingId}`,
    jobListingDiscoverKeywordByKeyword: (keyword) => `/linkedin/job-listing/discover-keyword/search/keyword/${keyword}`,
    jobListingDiscoverKeywordSnapshotStatus: (snapshotId) => `/linkedin/job-listing/discover-keyword/snapshot/${snapshotId}/status`,
    jobListingDiscoverKeywordSnapshotData: (snapshotId) => `/linkedin/job-listing/discover-keyword/snapshot/${snapshotId}/data`,
    
    // Job Listing APIs - Discover by URL
    jobListingDiscoverUrl: '/linkedin/job-listing/discover-url',
    jobListingDiscoverUrlById: (id) => `/linkedin/job-listing/discover-url/${id}`,
    jobListingDiscoverUrlByPostingId: (postingId) => `/linkedin/job-listing/discover-url/posting/${postingId}`,
    jobListingDiscoverUrlByUrlType: (urlType) => `/linkedin/job-listing/discover-url/url-type/${urlType}`,
    jobListingDiscoverUrlSnapshotStatus: (snapshotId) => `/linkedin/job-listing/discover-url/snapshot/${snapshotId}/status`,
    jobListingDiscoverUrlSnapshotData: (snapshotId) => `/linkedin/job-listing/discover-url/snapshot/${snapshotId}/data`,
    
    // Post Collection APIs - Collect by URLs
    postCollect: '/linkedin/post-collect',
    postCollectById: (id) => `/linkedin/post-collect/${id}`,
    postCollectByPostId: (postId) => `/linkedin/post-collect/post/${postId}`,
    postCollectByAccountType: (accountType) => `/linkedin/post-collect/account-type/${accountType}`,
    postCollectSnapshotStatus: (snapshotId) => `/linkedin/post-collect/snapshot/${snapshotId}/status`,
    postCollectSnapshotData: (snapshotId) => `/linkedin/post-collect/snapshot/${snapshotId}/data`,
    
    // Post Discovery APIs - Discover by Company URL
    postDiscoverCompany: '/linkedin/post-discover-company',
    postDiscoverCompanyById: (id) => `/linkedin/post-discover-company/${id}`,
    postDiscoverCompanyByPostId: (postId) => `/linkedin/post-discover-company/post/${postId}`,
    postDiscoverCompanyByCompanyName: (companyName) => `/linkedin/post-discover-company/company/${companyName}`,
    postDiscoverCompanyByAccountType: (accountType) => `/linkedin/post-discover-company/account-type/${accountType}`,
    postDiscoverCompanySnapshotStatus: (snapshotId) => `/linkedin/post-discover-company/snapshot/${snapshotId}/status`,
    postDiscoverCompanySnapshotData: (snapshotId) => `/linkedin/post-discover-company/snapshot/${snapshotId}/data`,
    
    // Post Discovery APIs - Discover by Profile URL
    postDiscoverProfile: '/linkedin/post-discover-profile',
    postDiscoverProfileById: (id) => `/linkedin/post-discover-profile/${id}`,
    postDiscoverProfileByPostId: (postId) => `/linkedin/post-discover-profile/post/${postId}`,
    postDiscoverProfileByUrl: (encodedUrl) => `/linkedin/post-discover-profile/profile/${encodedUrl}`,
    postDiscoverProfileByAccountType: (accountType) => `/linkedin/post-discover-profile/account-type/${accountType}`,
    postDiscoverProfileSnapshotStatus: (snapshotId) => `/linkedin/post-discover-profile/snapshot/${snapshotId}/status`,
    postDiscoverProfileSnapshotData: (snapshotId) => `/linkedin/post-discover-profile/snapshot/${snapshotId}/data`,
    
    // Post Discovery APIs - Discover by URL
    postDiscoverUrl: '/linkedin/post-discover-url',
    postDiscoverUrlById: (id) => `/linkedin/post-discover-url/${id}`,
    postDiscoverUrlByPostId: (linkedinPostId) => `/linkedin/post-discover-url/post/${linkedinPostId}`,
    postDiscoverUrlByInputUrl: (encodedUrl) => `/linkedin/post-discover-url/url/${encodedUrl}`,
    postDiscoverUrlByAccountType: (accountType) => `/linkedin/post-discover-url/account-type/${accountType}`,
    postDiscoverUrlSnapshotStatus: (snapshotId) => `/linkedin/post-discover-url/snapshot/${snapshotId}/status`,
    postDiscoverUrlSnapshotData: (snapshotId) => `/linkedin/post-discover-url/snapshot/${snapshotId}/data`
  }
};

// Environment-specific configurations
export const ENV_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    retryAttempts: 3
  },
  staging: {
    baseUrl: 'https://api-staging.linkscrap.com',
    timeout: 60000,
    retryAttempts: 5
  },
  production: {
    baseUrl: 'https://api.linkscrap.com',
    timeout: 60000,
    retryAttempts: 5
  }
};

// Get current environment configuration
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return ENV_CONFIG[env] || ENV_CONFIG.development;
};

// Export for easy access
export default API_CONFIG;
