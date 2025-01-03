import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

const POLLING_INTERVAL = 5000;

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      const jobsData = await apiService.getJobs(); 
      setJobs(jobsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createJob = async () => {
    try {
      setLoading(true);
      const { jobId } = await apiService.createJob(); 
      await fetchJobs();
      return jobId;
    } catch (err) {
      setError('Failed to create job. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pollPendingJobs = () => {
      const hasPendingJobs = jobs.some(job => job.status === 'pending');
      if (hasPendingJobs) {
        fetchJobs();
      }
    };

    const intervalId = setInterval(pollPendingJobs, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [jobs, fetchJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    createJob,
    refreshJobs: fetchJobs
  };
};

export default useJobs;