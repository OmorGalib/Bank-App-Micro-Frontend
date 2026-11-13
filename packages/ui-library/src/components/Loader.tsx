import React from 'react';
export const Loader: React.FC = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    <span className="text-sm text-gray-500">Verifying...</span>
  </div>
);