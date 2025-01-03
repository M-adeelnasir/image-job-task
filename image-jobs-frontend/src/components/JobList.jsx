import React from 'react';
import JobItem from './JobItem';
import LoadingSpinner from './LoadingSpinner';

function JobList({ jobs, loading }) {
  if (loading && jobs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new job.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
      {loading && (
        <div className="fixed bottom-4 right-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default JobList;