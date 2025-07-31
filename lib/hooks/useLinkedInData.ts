import { useState, useCallback } from 'react';
import { peopleProfileService, jobService, companyService, postService } from '../services';

// Custom hook for People Profile operations
export function usePeopleProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20 });

  const clearError = useCallback(() => setError(null), []);

  const collectPeopleProfiles = useCallback(async (urls: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await peopleProfileService.collectProfiles(urls);
      if (result.success && 'snapshotId' in result) {
        const completedData = await peopleProfileService.pollForCompletion(result.snapshotId);
        if (completedData.success && 'data' in completedData) {
          setProfiles(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to collect people profiles');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const discoverPeopleProfiles = useCallback(async (searchParams: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await peopleProfileService.discoverProfiles(searchParams);
      if (result.success && 'snapshotId' in result) {
        const completedData = await peopleProfileService.pollForCompletion(result.snapshotId, 'discover');
        if (completedData.success && 'data' in completedData) {
          setProfiles(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to discover people profiles');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllProfiles = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const result = await peopleProfileService.getAllProfiles(page, limit);
      if (result.success && 'data' in result) {
        const profilesData = result.data?.total || result.data || [];
        setProfiles(profilesData);
        const total = result.pagination?.total || profilesData.length || 0;
        setPagination({ total, page, limit });
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to get people profiles');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProfiles = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await peopleProfileService.searchProfiles(query);
      if (result.success && 'data' in result) {
        setProfiles(result.data || []);
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to search people profiles');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    profiles,
    pagination,
    clearError,
    collectPeopleProfiles,
    discoverPeopleProfiles,
    getAllProfiles,
    searchProfiles
  };
}

// Custom hook for Jobs operations
export function useJobs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20 });

  const clearError = useCallback(() => setError(null), []);

  const collectJobListings = useCallback(async (urls: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await jobService.collectJobListings(urls);
      if (result.success && 'snapshotId' in result) {
        const completedData = await jobService.pollForCompletion(result.snapshotId, 'collect');
        if (completedData.success && 'data' in completedData) {
          setJobs(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to collect job listings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const discoverJobsByKeyword = useCallback(async (searchParams: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await jobService.discoverJobsByKeyword(searchParams);
      if (result.success && 'snapshotId' in result) {
        const completedData = await jobService.pollForCompletion(result.snapshotId, 'discover-keyword');
        if (completedData.success && 'data' in completedData) {
          setJobs(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to discover jobs by keyword');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const discoverJobsByUrl = useCallback(async (urls: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await jobService.discoverJobsByUrl(urls);
      if (result.success && 'snapshotId' in result) {
        const completedData = await jobService.pollForCompletion(result.snapshotId, 'discover-url');
        if (completedData.success && 'data' in completedData) {
          setJobs(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to discover jobs by URL');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllJobs = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const result = await jobService.getAllJobs(page, limit);
      if (result.success && 'data' in result) {
        setJobs(result.data?.total || []);
        setPagination({ total: result.data?.total?.length || 0, page, limit });
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to get jobs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchJobs = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await jobService.searchJobs(query);
      if (result.success && 'data' in result) {
        setJobs(result.data || []);
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to search jobs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    jobs,
    pagination,
    clearError,
    collectJobListings,
    discoverJobsByKeyword,
    discoverJobsByUrl,
    getAllJobs,
    searchJobs
  };
}

// Custom hook for Companies operations
export function useCompanies() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20 });

  const clearError = useCallback(() => setError(null), []);

  const collectCompanyData = useCallback(async (urls: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await companyService.collectCompanyInfo(urls);
      if (result.success && 'snapshotId' in result) {
        const completedData = await companyService.pollForCompletion(result.snapshotId);
        if (completedData.success && 'data' in completedData) {
          setCompanies(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to collect company data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const discoverCompanies = useCallback(async (searchParams: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await companyService.discoverCompanies(searchParams);
      if (result.success && 'data' in result) {
        setCompanies(prev => [...prev, ...(result.data || [])]);
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to discover companies');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllCompanies = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const result = await companyService.getAllCompanies(page, limit);
      if (result.success && 'data' in result) {
        setCompanies(result.data || []);
        setPagination({ total: result.data?.length || 0, page, limit });
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to get companies');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCompanies = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await companyService.searchCompanies(query);
      if (result.success && 'data' in result) {
        setCompanies(result.data || []);
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to search companies');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    companies,
    pagination,
    clearError,
    collectCompanyData,
    discoverCompanies,
    getAllCompanies,
    searchCompanies
  };
}

// Custom hook for Posts operations
export function usePosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20 });

  const clearError = useCallback(() => setError(null), []);

  const collectPosts = useCallback(async (urls: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postService.collectPosts(urls);
      if (result.success && 'snapshotId' in result) {
        const completedData = await postService.pollForCompletion(result.snapshotId, 'collect');
        if (completedData.success && 'data' in completedData) {
          setPosts(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to collect posts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const discoverPostsByKeyword = useCallback(async (searchParams: any[]) => {
    setLoading(true);
    setError(null);
    try {
      // Since discoverPostsByKeyword doesn't exist, use discoverPostsByUrl as fallback
      const result = await postService.discoverPostsByUrl(searchParams);
      if (result?.success && 'data' in result) {
        const postsArray = Array.isArray(result.data) ? result.data : [];
        setPosts(prev => [...prev, ...postsArray]);
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to discover posts by keyword');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const discoverPostsByCompany = useCallback(async (companyParams: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postService.discoverPostsByCompany(companyParams);
      if (result.success && 'snapshotId' in result) {
        const completedData = await postService.pollForCompletion(result.snapshotId, 'discover-company');
        if (completedData.success && 'data' in completedData) {
          setPosts(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to discover posts by company');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const discoverPostsByProfile = useCallback(async (profileParams: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postService.discoverPostsByProfile(profileParams);
      if (result.success && 'snapshotId' in result) {
        const completedData = await postService.pollForCompletion(result.snapshotId, 'discover-profile');
        if (completedData.success && 'data' in completedData) {
          setPosts(prev => [...prev, ...(completedData.data || [])]);
        }
        return completedData;
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to discover posts by profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllPosts = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postService.getAllPosts?.(page, limit);
      if (result?.success && 'data' in result) {
        const postsData = result.data?.total || [];
        setPosts(postsData);
        setPagination({ total: postsData.length || 0, page, limit });
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to get posts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPosts = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postService.searchPosts?.(query);
      if (result?.success && 'data' in result) {
        setPosts(result.data || []);
      }
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to search posts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    posts,
    pagination,
    clearError,
    collectPosts,
    discoverPostsByKeyword,
    discoverPostsByCompany,
    discoverPostsByProfile,
    getAllPosts,
    searchPosts
  };
}
