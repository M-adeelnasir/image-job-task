const API_BASE_URL = 'http://localhost:3000';

const apiService = {
  async createJob() {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to create job');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  async getJobs() {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  async getJobById(jobId) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch job');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  }
};

export default apiService;