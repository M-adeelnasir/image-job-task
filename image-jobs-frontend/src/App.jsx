import React from 'react';
import JobList from './components/JobList';
import CreateJobButton from './components/CreateJobButton';
import { useJobs } from './hooks/useJobs';

function App() {
  const { jobs, loading, error, createJob } = useJobs();
console.log("======================",jobs, loading, error, createJob)
  const handleCreateJob = async () => {
    try {
      await createJob();
    } catch (err) {
      console.error('Failed to create job:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Job Processing System</h1>
            <CreateJobButton onCreate={handleCreateJob} disabled={loading} />
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <JobList jobs={jobs} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;