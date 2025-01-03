import React from 'react';

function JobItem({ job }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatId = (id) => {
    return `${id.slice(0, 8)}...`;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            ID: {formatId(job.id)}
          </span>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              job.status
            )}`}
          >
            {job.status}
          </span>
        </div>
        
        {job.status === 'resolved' && job.result && (
          <div className="relative aspect-video">
            <img
              src={job.result}
              alt="Job result"
              className="w-full h-full object-cover rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Failed+to+load+image';
              }}
            />
          </div>
        )}

        {job.status === 'pending' && (
          <div className="bg-gray-50 rounded p-4 flex items-center justify-center">
            <span className="text-sm text-gray-500">Processing...</span>
          </div>
        )}

        {job.status === 'failed' && (
          <div className="bg-red-50 rounded p-4">
            <span className="text-sm text-red-600">Job failed to process</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobItem;