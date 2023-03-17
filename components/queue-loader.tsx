import React from "react";

export default function QueueLoader() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="relative mb-2 flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            <div className="bg-gray-200 w-10 h-10 animate-pulse rounded-md"></div>
          </div>
          <div className="min-w-0 flex-1">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <div className="text-sm font-medium text-gray-900">
                <div className="mt-1 bg-gray-200 w-3/3 h-4 animate-pulse rounded-md"></div>
              </div>
              <div className="truncate text-sm text-gray-500">
                <div className="mt-1 bg-gray-200 w-2/3 h-4 animate-pulse rounded-md"></div>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
