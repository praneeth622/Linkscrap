import apiClient, { handleApiError, validateLinkedInUrls } from '../api-client.js';
import { API_CONFIG } from '../config.js';

// Post Collection Service
export class PostService {
  
  // ===== COLLECT POSTS BY URLs =====
  
  // Collect LinkedIn posts by URLs
  async collectPosts(postUrls) {
    try {
      // Validate input
      const errors = validateLinkedInUrls(postUrls);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }

      // Filter for post URLs only
      const validPostUrls = postUrls.filter(url => 
        url.includes('linkedin.com/posts/') || url.includes('linkedin.com/pulse/')
      );

      if (validPostUrls.length === 0) {
        throw new Error('No valid LinkedIn post URLs found');
      }

      const response = await apiClient.post(API_CONFIG.endpoints.postCollect, {
        urls: validPostUrls
      });
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        postUrls: response.post_urls,
        instructions: response.instructions
      };
    } catch (error) {
      return handleApiError(error, 'Post Collection');
    }
  }

  // Get all collected posts
  async getAllCollectedPosts(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postCollect, {
        page,
        limit
      });
      
      return {
        success: true,
        data: response.data || response,
        pagination: response.pagination
      };
    } catch (error) {
      return handleApiError(error, 'Get All Collected Posts');
    }
  }

  // Get collected post by ID
  async getCollectedPostById(id) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postCollectById(id));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Collected Post by ID');
    }
  }

  // Get collected post by LinkedIn post ID
  async getCollectedPostByPostId(postId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postCollectByPostId(postId));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Collected Post by Post ID');
    }
  }

  // Get collected posts by account type
  async getCollectedPostsByAccountType(accountType) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postCollectByAccountType(accountType));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Collected Posts by Account Type');
    }
  }

  // Check collection snapshot status
  async checkCollectionSnapshotStatus(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postCollectSnapshotStatus(snapshotId));
      
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
      const response = await apiClient.get(API_CONFIG.endpoints.postCollectSnapshotData(snapshotId));
      
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

  // ===== DISCOVER POSTS BY COMPANY URL =====
  
  // Discover posts by company URLs
  async discoverPostsByCompany(companyUrls) {
    try {
      // Validate input
      const errors = validateLinkedInUrls(companyUrls);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }

      // Filter for company URLs only
      const validCompanyUrls = companyUrls.filter(url => 
        url.includes('linkedin.com/company/')
      );

      if (validCompanyUrls.length === 0) {
        throw new Error('No valid LinkedIn company URLs found');
      }

      const response = await apiClient.post(API_CONFIG.endpoints.postDiscoverCompany, {
        urls: validCompanyUrls
      });
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        companyUrls: response.company_urls,
        instructions: response.instructions
      };
    } catch (error) {
      return handleApiError(error, 'Post Discovery by Company');
    }
  }

  // Get all discovered posts by company
  async getAllDiscoveredPostsByCompany(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverCompany, {
        page,
        limit
      });
      
      return {
        success: true,
        data: response.data || response,
        pagination: response.pagination
      };
    } catch (error) {
      return handleApiError(error, 'Get All Discovered Posts by Company');
    }
  }

  // Get discovered post by company ID
  async getDiscoveredPostByCompanyId(id) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverCompanyById(id));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Post by Company ID');
    }
  }

  // Get discovered post by company post ID
  async getDiscoveredPostByCompanyPostId(postId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverCompanyByPostId(postId));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Post by Company Post ID');
    }
  }

  // Get discovered posts by company name
  async getDiscoveredPostsByCompanyName(companyName) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverCompanyByCompanyName(companyName));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Posts by Company Name');
    }
  }

  // Get discovered posts by company account type
  async getDiscoveredPostsByCompanyAccountType(accountType) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverCompanyByAccountType(accountType));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Posts by Company Account Type');
    }
  }

  // Check company discovery snapshot status
  async checkCompanyDiscoverySnapshotStatus(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverCompanySnapshotStatus(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        datasetId: response.dataset_id,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Check Company Discovery Snapshot Status');
    }
  }

  // Get company discovery snapshot data
  async getCompanyDiscoverySnapshotData(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverCompanySnapshotData(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        data: response.data || [],
        savedCount: response.saved_count,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Get Company Discovery Snapshot Data');
    }
  }

  // ===== DISCOVER POSTS BY PROFILE URL =====
  
  // Discover posts by profile URLs
  async discoverPostsByProfile(profileUrls) {
    try {
      // Validate profile data
      if (!Array.isArray(profileUrls) || profileUrls.length === 0) {
        throw new Error('Profile URLs must be a non-empty array');
      }

      // Validate each profile object
      profileUrls.forEach((profile, index) => {
        if (!profile.url || typeof profile.url !== 'string') {
          throw new Error(`Profile at index ${index} must have a valid URL`);
        }
        if (!profile.url.includes('linkedin.com/in/')) {
          throw new Error(`Profile at index ${index} must be a valid LinkedIn profile URL`);
        }
      });

      const response = await apiClient.post(API_CONFIG.endpoints.postDiscoverProfile, {
        profiles: profileUrls
      });
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        profileUrls: response.profile_urls,
        instructions: response.instructions
      };
    } catch (error) {
      return handleApiError(error, 'Post Discovery by Profile');
    }
  }

  // Get all discovered posts by profile
  async getAllDiscoveredPostsByProfile(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverProfile, {
        page,
        limit
      });
      
      return {
        success: true,
        data: response.data || response,
        pagination: response.pagination
      };
    } catch (error) {
      return handleApiError(error, 'Get All Discovered Posts by Profile');
    }
  }

  // Get discovered post by profile ID
  async getDiscoveredPostByProfileId(id) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverProfileById(id));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Post by Profile ID');
    }
  }

  // Get discovered post by profile post ID
  async getDiscoveredPostByProfilePostId(postId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverProfileByPostId(postId));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Post by Profile Post ID');
    }
  }

  // Get discovered posts by profile URL
  async getDiscoveredPostsByProfileUrl(url) {
    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverProfileByUrl(encodedUrl));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Posts by Profile URL');
    }
  }

  // Get discovered posts by profile account type
  async getDiscoveredPostsByProfileAccountType(accountType) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverProfileByAccountType(accountType));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Posts by Profile Account Type');
    }
  }

  // Check profile discovery snapshot status
  async checkProfileDiscoverySnapshotStatus(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverProfileSnapshotStatus(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        datasetId: response.dataset_id,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Check Profile Discovery Snapshot Status');
    }
  }

  // Get profile discovery snapshot data
  async getProfileDiscoverySnapshotData(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverProfileSnapshotData(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        data: response.data || [],
        savedCount: response.saved_count,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Get Profile Discovery Snapshot Data');
    }
  }

  // ===== DISCOVER POSTS BY URL =====
  
  // Discover posts by URLs
  async discoverPostsByUrl(discoveryUrls) {
    try {
      // Validate discovery URLs
      if (!Array.isArray(discoveryUrls) || discoveryUrls.length === 0) {
        throw new Error('Discovery URLs must be a non-empty array');
      }

      // Validate each URL object
      discoveryUrls.forEach((urlObj, index) => {
        if (!urlObj.url || typeof urlObj.url !== 'string') {
          throw new Error(`URL object at index ${index} must have a valid URL`);
        }
        if (!urlObj.url.includes('linkedin.com')) {
          throw new Error(`URL at index ${index} must be a LinkedIn URL`);
        }
      });

      const response = await apiClient.post(API_CONFIG.endpoints.postDiscoverUrl, {
        urls: discoveryUrls
      });
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        urlsCount: response.urls_count,
        instructions: response.instructions
      };
    } catch (error) {
      return handleApiError(error, 'Post Discovery by URL');
    }
  }

  // Get all discovered posts by URL
  async getAllDiscoveredPostsByUrl(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverUrl, {
        page,
        limit
      });
      
      return {
        success: true,
        data: response.data || response,
        pagination: response.pagination
      };
    } catch (error) {
      return handleApiError(error, 'Get All Discovered Posts by URL');
    }
  }

  // Get discovered post by URL ID
  async getDiscoveredPostByUrlId(id) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverUrlById(id));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Post by URL ID');
    }
  }

  // Get discovered post by URL post ID
  async getDiscoveredPostByUrlPostId(linkedinPostId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverUrlByPostId(linkedinPostId));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Post by URL Post ID');
    }
  }

  // Get discovered posts by input URL
  async getDiscoveredPostsByInputUrl(url) {
    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverUrlByInputUrl(encodedUrl));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Posts by Input URL');
    }
  }

  // Get discovered posts by URL account type
  async getDiscoveredPostsByUrlAccountType(accountType) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverUrlByAccountType(accountType));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return handleApiError(error, 'Get Discovered Posts by URL Account Type');
    }
  }

  // Check URL discovery snapshot status
  async checkUrlDiscoverySnapshotStatus(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverUrlSnapshotStatus(snapshotId));
      
      return {
        success: true,
        snapshotId: response.snapshot_id,
        status: response.status,
        progress: response.progress,
        message: response.message
      };
    } catch (error) {
      return handleApiError(error, 'Check URL Discovery Snapshot Status');
    }
  }

  // Get URL discovery snapshot data
  async getUrlDiscoverySnapshotData(snapshotId) {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.postDiscoverUrlSnapshotData(snapshotId));
      
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
  
  // Get all posts (collected + discovered)
  async getAllPosts(page = 1, limit = 10) {
    try {
      const [collected, discoveredCompany, discoveredProfile, discoveredUrl] = await Promise.allSettled([
        this.getAllCollectedPosts(page, limit),
        this.getAllDiscoveredPostsByCompany(page, limit),
        this.getAllDiscoveredPostsByProfile(page, limit),
        this.getAllDiscoveredPostsByUrl(page, limit)
      ]);

      const collectedData = collected.status === 'fulfilled' ? (collected.value.data || []) : [];
      const discoveredCompanyData = discoveredCompany.status === 'fulfilled' ? (discoveredCompany.value.data || []) : [];
      const discoveredProfileData = discoveredProfile.status === 'fulfilled' ? (discoveredProfile.value.data || []) : [];
      const discoveredUrlData = discoveredUrl.status === 'fulfilled' ? (discoveredUrl.value.data || []) : [];

      return {
        success: true,
        data: {
          collected: collectedData,
          discoveredByCompany: discoveredCompanyData,
          discoveredByProfile: discoveredProfileData,
          discoveredByUrl: discoveredUrlData,
          total: [...collectedData, ...discoveredCompanyData, ...discoveredProfileData, ...discoveredUrlData]
        },
        pagination: {
          page,
          limit,
          total: collectedData.length + discoveredCompanyData.length + discoveredProfileData.length + discoveredUrlData.length
        }
      };
    } catch (error) {
      return handleApiError(error, 'Get All Posts');
    }
  }

  // Search posts across all sources
  async searchPosts(searchQuery, page = 1, limit = 10) {
    try {
      const allPosts = await this.getAllPosts(page, limit);
      
      if (!allPosts.success) {
        return allPosts;
      }

      const query = searchQuery.toLowerCase();
      const filteredPosts = allPosts.data.total.filter(post => {
        const title = (post.title || '').toLowerCase();
        const text = (post.post_text || '').toLowerCase();
        const author = (post.author?.user_id || '').toLowerCase();
        const hashtags = (post.hashtags || []).join(' ').toLowerCase();
        
        return title.includes(query) || 
               text.includes(query) || 
               author.includes(query) || 
               hashtags.includes(query);
      });

      return {
        success: true,
        data: filteredPosts,
        pagination: {
          page,
          limit,
          total: filteredPosts.length
        }
      };
    } catch (error) {
      return handleApiError(error, 'Search Posts');
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
        
        if (operationType === 'discover-company') {
          statusResult = await this.checkCompanyDiscoverySnapshotStatus(snapshotId);
        } else if (operationType === 'discover-profile') {
          statusResult = await this.checkProfileDiscoverySnapshotStatus(snapshotId);
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
          
          if (operationType === 'discover-company') {
            dataResult = await this.getCompanyDiscoverySnapshotData(snapshotId);
          } else if (operationType === 'discover-profile') {
            dataResult = await this.getProfileDiscoverySnapshotData(snapshotId);
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
const postService = new PostService();

// Export default service instance
export default postService;
