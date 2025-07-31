import apiClient, { handleApiError, validateLinkedInUrls, validateJobSearchParams } from '../api-client.js';
import { API_CONFIG } from '../config.js';

// Job Listing Collection Service
export class JobService {
  
  // ===== COLLECT JOB LISTINGS BY URLs =====
  
  // Collect LinkedIn job listings by URLs
  async collectJobListings(jobUrls) {
    try {
      // Validate input
      const errors = validateLinkedInUrls(jobUrls);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }

      // Filter for job URLs only
      const validJobUrls = jobUrls.filter(url => 
        url.includes('linkedin.com/jobs/view/')
      );

      if (validJobUrls.length === 0) {
        throw new Error('No valid LinkedIn job URLs found');
      }

      const response = await apiClient.post(API_CONFIG.endpoints.jobListingCollect, {
        urls: validJobUrls
      });
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        instructions: response.instructions
      };
    } catch (error) {
      return handleApiError(error, 'Job Listing Collection');
    }
  }

  // Get all collected job listings
  async getAllCollectedJobs(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingCollect, {
        page,
        limit
      });
      
      return {
        success: true,
        data: response.data || response,
        pagination: response.pagination
      };
    } catch (error) {
      return handleApiError(error, 'Get All Collected Jobs');
    }
  }

  // Get job listing by ID
  async getJobById(id) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingCollectById(id));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Job by ID');
    }
  }

  // Get job listing by posting ID
  async getJobByPostingId(postingId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingCollectByPostingId(postingId));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Job by Posting ID');
    }
  }

  // Check collection snapshot status
  async checkCollectionSnapshotStatus(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingCollectSnapshotStatus(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        datasetId: response.dataset_id,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Check Collection Snapshot Status');
    }
  }

  // Get collection snapshot data
  async getCollectionSnapshotData(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingCollectSnapshotData(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        data: response.data || [],
        savedCount: response.saved_count,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Get Collection Snapshot Data');
    }
  }

  // ===== DISCOVER JOB LISTINGS BY KEYWORD =====
  
  // Discover job listings by keyword search
  async discoverJobsByKeyword(searchParams) {
    try {
      // Validate search parameters
      const errors = validateJobSearchParams(searchParams);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }

      const response = await apiClient.post(API_CONFIG.endpoints.jobListingDiscoverKeyword, {
        searches: searchParams
      });
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        searchQueries: response.search_queries,
        instructions: response.instructions
      };
    } catch (error) {
      return handleApiError(error, 'Job Discovery by Keyword');
    }
  }

  // Get all discovered jobs by keyword
  async getAllDiscoveredJobsByKeyword(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverKeyword, {
        page,
        limit
      });
      
      return {
        success: true,
        data: response.data || response,
        pagination: response.pagination
      };
    } catch (error) {
      return handleApiError(error, 'Get All Discovered Jobs by Keyword');
    }
  }

  // Get discovered job by ID
  async getDiscoveredJobByKeywordId(id) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverKeywordById(id));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Job by Keyword ID');
    }
  }

  // Get discovered job by posting ID
  async getDiscoveredJobByKeywordPostingId(postingId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverKeywordByPostingId(postingId));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Job by Keyword Posting ID');
    }
  }

  // Get discovered jobs by keyword
  async getDiscoveredJobsByKeyword(keyword) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverKeywordByKeyword(keyword));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Jobs by Keyword');
    }
  }

  // Check keyword discovery snapshot status
  async checkKeywordDiscoverySnapshotStatus(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverKeywordSnapshotStatus(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        datasetId: response.dataset_id,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Check Keyword Discovery Snapshot Status');
    }
  }

  // Get keyword discovery snapshot data
  async getKeywordDiscoverySnapshotData(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverKeywordSnapshotData(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        data: response.data || [],
        savedCount: response.saved_count,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Get Keyword Discovery Snapshot Data');
    }
  }

  // ===== DISCOVER JOB LISTINGS BY URL =====
  
  // Discover job listings by URL
  async discoverJobsByUrl(jobPageUrls) {
    try {
      // Validate input
      const errors = validateLinkedInUrls(jobPageUrls);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }

      // Filter for job-related URLs
      const validJobPageUrls = jobPageUrls.filter(url => 
        url.includes('linkedin.com/jobs')
      );

      if (validJobPageUrls.length === 0) {
        throw new Error('No valid LinkedIn job page URLs found');
      }

      const response = await apiClient.post(API_CONFIG.endpoints.jobListingDiscoverUrl, {
        urls: validJobPageUrls
      });
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        discoveryUrls: response.discovery_urls,
        instructions: response.instructions
      };
    } catch (error) {
      return handleApiError(error, 'Job Discovery by URL');
    }
  }

  // Get all discovered jobs by URL
  async getAllDiscoveredJobsByUrl(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverUrl, {
        page,
        limit
      });
      
      return {
        success: true,
        data: response.data || response,
        pagination: response.pagination
      };
    } catch (error) {
      return handleApiError(error, 'Get All Discovered Jobs by URL');
    }
  }

  // Get discovered job by URL ID
  async getDiscoveredJobByUrlId(id) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverUrlById(id));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Job by URL ID');
    }
  }

  // Get discovered job by URL posting ID
  async getDiscoveredJobByUrlPostingId(postingId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverUrlByPostingId(postingId));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Job by URL Posting ID');
    }
  }

  // Get discovered jobs by URL type
  async getDiscoveredJobsByUrlType(urlType) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverUrlByUrlType(urlType));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Jobs by URL Type');
    }
  }

  // Check URL discovery snapshot status
  async checkUrlDiscoverySnapshotStatus(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverUrlSnapshotStatus(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        datasetId: response.dataset_id,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Check URL Discovery Snapshot Status');
    }
  }

  // Get URL discovery snapshot data
  async getUrlDiscoverySnapshotData(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.jobListingDiscoverUrlSnapshotData(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        data: response.data || [],
        savedCount: response.saved_count,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Get URL Discovery Snapshot Data');
    }
  }

  // ===== COMBINED OPERATIONS =====
  
  // Get all jobs (collected + discovered)
  async getAllJobs(page = 1, limit = 10) {
    try {
      const [collected, discoveredKeyword, discoveredUrl] = await Promise.allSettled([
        this.getAllCollectedJobs(page, limit),
        this.getAllDiscoveredJobsByKeyword(page, limit),
        this.getAllDiscoveredJobsByUrl(page, limit)
      ]);

      const collectedData = collected.status === 'fulfilled' ? (collected.value.data || []) : [];
      const discoveredKeywordData = discoveredKeyword.status === 'fulfilled' ? (discoveredKeyword.value.data || []) : [];
      const discoveredUrlData = discoveredUrl.status === 'fulfilled' ? (discoveredUrl.value.data || []) : [];

      return {
        success: true,
        data: {
          collected: collectedData,
          discoveredByKeyword: discoveredKeywordData,
          discoveredByUrl: discoveredUrlData,
          total: [...collectedData, ...discoveredKeywordData, ...discoveredUrlData]
        },
        pagination: {
          page,
          limit,
          total: collectedData.length + discoveredKeywordData.length + discoveredUrlData.length
        }
      };
    } catch (error) {
      return handleApiError(error, 'Get All Jobs');
    }
  }

  // Search jobs across all sources
  async searchJobs(searchQuery, page = 1, limit = 10) {
    try {
      const allJobs = await this.getAllJobs(page, limit);
      
      if (!allJobs.success) {
        return allJobs;
      }

      const query = searchQuery.toLowerCase();
      const filteredJobs = allJobs.data.total.filter(job => {
        const title = (job.job_title || '').toLowerCase();
        const company = (job.company_name || '').toLowerCase();
        const location = (job.job_location || '').toLowerCase();
        const employmentType = (job.job_employment_type || '').toLowerCase();
        const keyword = (job.search_keyword || '').toLowerCase();
        
        return title.includes(query) || 
               company.includes(query) || 
               location.includes(query) || 
               employmentType.includes(query) ||
               keyword.includes(query);
      });

      return {
        success: true,
        data: filteredJobs,
        pagination: {
          page,
          limit,
          total: filteredJobs.length
        }
      };
    } catch (error) {
      return handleApiError(error, 'Search Jobs');
    }
  }

  // ===== POLLING FOR ASYNC OPERATIONS =====
  
  // Generic polling function for snapshots
  async pollForCompletion(snapshotId, operationType = 'collect', maxAttempts = 30, interval = 10000) {
    let attempts = 0;
    
    const poll = async () => {
      attempts++;
      
      try {
        let statusResult;
        
        if (operationType === 'discover-keyword') {
          statusResult = await this.checkKeywordDiscoverySnapshotStatus(snapshotId);
        } else if (operationType === 'discover-url') {
          statusResult = await this.checkUrlDiscoverySnapshotStatus(snapshotId);
        } else {
          statusResult = await this.checkCollectionSnapshotStatus(snapshotId);
        }
        
        if (!statusResult.success) {
          throw new Error(statusResult.error);
        }
        
        const { status } = statusResult;
        
        // Check if completed
        if (status === 'completed' || status === 'ready') {
          let dataResult;
          
          if (operationType === 'discover-keyword') {
            dataResult = await this.getKeywordDiscoverySnapshotData(snapshotId);
          } else if (operationType === 'discover-url') {
            dataResult = await this.getUrlDiscoverySnapshotData(snapshotId);
          } else {
            dataResult = await this.getCollectionSnapshotData(snapshotId);
          }
          
          return dataResult;
        }
        
        // Check if failed
        if (status === 'failed' || status === 'error') {
          throw new Error(`Operation failed with status: ${status}`);
        }
        
        // Check if max attempts reached
        if (attempts >= maxAttempts) {
          throw new Error(`Operation timed out after ${maxAttempts} attempts`);
        }
        
        // Wait and try again
        await new Promise(resolve => setTimeout(resolve, interval));
        return poll();
        
      } catch (error) {
        throw error;
      }
    };
    
    return poll();
  }
}

// Create singleton instance
const jobService = new JobService();

// Export default service instance
export default jobService;
