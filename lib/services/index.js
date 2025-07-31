// Main service exports for LinkedIn Backend API Integration
import peopleProfileService, { PeopleProfileService } from './people-profile-service.js';
import peopleSearchService, { PeopleSearchService } from './people-search-service.js';
import companyService, { CompanyService } from './company-service.js';
import jobService, { JobService } from './job-service.js';
import postService, { PostService } from './post-service.js';
import apiClient, { handleApiError, validateLinkedInUrls, validateJobSearchParams } from '../api-client.js';
import { API_CONFIG } from '../config.js';

// Export individual services
export {
  peopleProfileService,
  peopleSearchService,
  companyService,
  jobService,
  postService,
  apiClient
};

// Export service classes for custom instantiation
export {
  PeopleProfileService,
  PeopleSearchService,
  CompanyService,
  JobService,
  PostService
};

// Export utilities
export {
  handleApiError,
  validateLinkedInUrls,
  validateJobSearchParams,
  API_CONFIG
};

// Main LinkedIn Data Collector Class
export class LinkedInDataCollector {
  constructor() {
    this.peopleProfile = peopleProfileService;
    this.peopleSearch = peopleSearchService;
    this.company = companyService;
    this.job = jobService;
    this.post = postService;
    this.apiClient = apiClient;
    this.activeOperations = new Map();
  }

  // Health check for all services
  async checkHealth() {
    try {
      return await apiClient.checkHealth();
    } catch (error) {
      return handleApiError(error, 'Health Check');
    }
  }

  // Start a complete LinkedIn data collection workflow
  async startDataCollection(config) {
    const results = {
      profiles: null,
      discoveredProfiles: null,
      searchedPeople: null,
      companies: null,
      jobs: null,
      discoveredJobs: null,
      posts: null,
      discoveredPosts: null
    };
    
    try {
      // 1. Collect profiles if URLs provided
      if (config.profileUrls && config.profileUrls.length > 0) {
        console.log('Starting profile collection...');
        const profileResult = await this.peopleProfile.collectProfiles(config.profileUrls);
        if (profileResult.success) {
          results.profiles = await this.peopleProfile.pollForCompletion(profileResult.snapshotId, 'collect');
        }
      }

      // 2. Discover profiles if search params provided
      if (config.profileSearchParams && config.profileSearchParams.length > 0) {
        console.log('Starting profile discovery...');
        const discoveryResult = await this.peopleProfile.discoverProfiles(config.profileSearchParams);
        if (discoveryResult.success) {
          results.discoveredProfiles = await this.peopleProfile.pollForCompletion(discoveryResult.snapshotId, 'discover');
        }
      }

      // 3. Search people if criteria provided
      if (config.peopleSearchCriteria && config.peopleSearchCriteria.length > 0) {
        console.log('Starting people search...');
        const searchResult = await this.peopleSearch.searchAndCollectPeople(config.peopleSearchCriteria);
        if (searchResult.success) {
          results.searchedPeople = await this.peopleSearch.pollForCompletion(searchResult.snapshotId);
        }
      }

      // 4. Collect company info if URLs provided
      if (config.companyUrls && config.companyUrls.length > 0) {
        console.log('Starting company collection...');
        const companyResult = await this.company.collectCompanyInfo(config.companyUrls);
        if (companyResult.success) {
          results.companies = await this.company.pollForCompletion(companyResult.snapshotId);
        }
      }

      // 5. Collect jobs if URLs provided
      if (config.jobUrls && config.jobUrls.length > 0) {
        console.log('Starting job collection...');
        const jobResult = await this.job.collectJobListings(config.jobUrls);
        if (jobResult.success) {
          results.jobs = await this.job.pollForCompletion(jobResult.snapshotId, 'collect');
        }
      }

      // 6. Discover jobs if search params provided
      if (config.jobSearchParams && config.jobSearchParams.length > 0) {
        console.log('Starting job discovery...');
        const jobDiscoveryResult = await this.job.discoverJobsByKeyword(config.jobSearchParams);
        if (jobDiscoveryResult.success) {
          results.discoveredJobs = await this.job.pollForCompletion(jobDiscoveryResult.snapshotId, 'discover-keyword');
        }
      }

      // 7. Collect posts if URLs provided
      if (config.postUrls && config.postUrls.length > 0) {
        console.log('Starting post collection...');
        const postResult = await this.post.collectPosts(config.postUrls);
        if (postResult.success) {
          results.posts = await this.post.pollForCompletion(postResult.snapshotId, 'collect');
        }
      }

      // 8. Discover posts by company if URLs provided
      if (config.postDiscoveryCompanyUrls && config.postDiscoveryCompanyUrls.length > 0) {
        console.log('Starting post discovery by company...');
        const postDiscoveryResult = await this.post.discoverPostsByCompany(config.postDiscoveryCompanyUrls);
        if (postDiscoveryResult.success) {
          results.discoveredPosts = await this.post.pollForCompletion(postDiscoveryResult.snapshotId, 'discover-company');
        }
      }

      return {
        success: true,
        data: results,
        summary: this.generateSummary(results)
      };
      
    } catch (error) {
      return handleApiError(error, 'Data Collection Workflow');
    }
  }

  // Generate summary of collected data
  generateSummary(results) {
    const summary = {
      totalProfiles: 0,
      totalCompanies: 0,
      totalJobs: 0,
      totalPosts: 0,
      operations: []
    };

    if (results.profiles?.results) {
      summary.totalProfiles += results.profiles.results.length;
      summary.operations.push('Profile Collection');
    }

    if (results.discoveredProfiles?.results) {
      summary.totalProfiles += results.discoveredProfiles.results.length;
      summary.operations.push('Profile Discovery');
    }

    if (results.searchedPeople?.results) {
      summary.totalProfiles += results.searchedPeople.results.length;
      summary.operations.push('People Search');
    }

    if (results.companies?.results) {
      summary.totalCompanies += results.companies.results.length;
      summary.operations.push('Company Collection');
    }

    if (results.jobs?.results) {
      summary.totalJobs += results.jobs.results.length;
      summary.operations.push('Job Collection');
    }

    if (results.discoveredJobs?.results) {
      summary.totalJobs += results.discoveredJobs.results.length;
      summary.operations.push('Job Discovery');
    }

    if (results.posts?.results) {
      summary.totalPosts += results.posts.results.length;
      summary.operations.push('Post Collection');
    }

    if (results.discoveredPosts?.results) {
      summary.totalPosts += results.discoveredPosts.results.length;
      summary.operations.push('Post Discovery');
    }

    return summary;
  }

  // Get all data with pagination
  async getAllData(page = 1, limit = 10) {
    try {
      const [profiles, companies, jobs, posts] = await Promise.all([
        this.peopleProfile.getAllCollectedProfiles(page, limit),
        this.company.getAllCollectedCompanies(page, limit),
        this.job.getAllCollectedJobs(page, limit),
        this.post.getAllCollectedPosts(page, limit)
      ]);

      return {
        success: true,
        data: {
          profiles,
          companies,
          jobs,
          posts
        }
      };
    } catch (error) {
      return handleApiError(error, 'Get All Data');
    }
  }

  // Search across all data types
  async searchAll(query, filters = {}) {
    try {
      const searchPromises = [];

      // Search profiles
      if (!filters.excludeProfiles) {
        searchPromises.push(
          this.peopleProfile.searchProfiles({ 
            name: query, 
            page: filters.page || 1, 
            limit: filters.limit || 10 
          })
        );
      }

      // Search companies
      if (!filters.excludeCompanies) {
        searchPromises.push(
          this.company.searchCompanies({ 
            name: query, 
            page: filters.page || 1, 
            limit: filters.limit || 10 
          })
        );
      }

      // Search jobs
      if (!filters.excludeJobs) {
        searchPromises.push(
          this.job.searchJobs({ 
            keyword: query, 
            page: filters.page || 1, 
            limit: filters.limit || 10 
          })
        );
      }

      // Search posts
      if (!filters.excludePosts) {
        searchPromises.push(
          this.post.searchPosts({ 
            keyword: query, 
            page: filters.page || 1, 
            limit: filters.limit || 10 
          })
        );
      }

      const results = await Promise.allSettled(searchPromises);
      
      return {
        success: true,
        data: {
          profiles: results[0]?.status === 'fulfilled' ? results[0].value : null,
          companies: results[1]?.status === 'fulfilled' ? results[1].value : null,
          jobs: results[2]?.status === 'fulfilled' ? results[2].value : null,
          posts: results[3]?.status === 'fulfilled' ? results[3].value : null
        }
      };
    } catch (error) {
      return handleApiError(error, 'Search All');
    }
  }
}

// Create singleton instance
const linkedInDataCollector = new LinkedInDataCollector();

// Export default collector instance
export default linkedInDataCollector;
