import { motion } from "framer-motion";
import React from "react";

export default function LeaderboardLoader() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center overflow-hidden rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-[#111] px-4 py-5 shadow sm:p-6">
            {/* Image */}
            {/* <img
          className="w-16 h-16 mr-4 rounded-md"
          src={nft.coverImage}
          alt="Image description"
        /> */}
            <div className="bg-gray-200 dark:bg-[#333] w-20 h-20 animate-pulse rounded-md" />

            {/* Content */}
            <div className="ml-1">
              <dt className="truncate text-sm font-medium text-gray-500">
                <div className="mt-1 bg-gray-200 dark:bg-[#333] w-36 h-8 animate-pulse rounded-md" />
              </dt>
              <dd className="mt-1 flex text-3xl font-semibold tracking-tight text-gray-900">
                <div className="bg-gray-200 dark:bg-[#333] w-24 h-8 animate-pulse rounded-md" />
              </dd>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
