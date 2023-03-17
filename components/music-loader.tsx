import { motion } from "framer-motion";
import React from "react";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

export default function MusicLoader() {
  const [direction, setDirection] = React.useState("right");
  return (
    <div className="flex flex-col items-center">
      <div className="w-96">
        <figure>
          <motion.div
            initial={direction === "right" ? { x: -100 } : { x: 100 }}
            animate={{ x: 0 }}
            exit={direction === "right" ? { x: 100 } : { x: -100 }}
            transition={transition}
          >
            <div className="mt-1 bg-gray-200 w-96 h-96 animate-pulse rounded-md"></div>
          </motion.div>
        </figure>

        <h1 className="text-2xl font-medium text-gray-900 mt-4">
          <div className="mt-1 bg-gray-200 w-36 h-8 animate-pulse rounded-md"></div>
        </h1>
        <div className="text-sm text-gray-500 mt-1">
          <div className="mt-1 bg-gray-200 w-96 h-4 animate-pulse rounded-md"></div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center text-center space-x-4">
            <div>
              <div className="mt-1 bg-gray-200 w-12 h-4 animate-pulse rounded-md"></div>
            </div>

            <div className="mt-1 bg-gray-200 w-96 h-4 animate-pulse rounded-md"></div>

            <div>
              <div className="mt-1 bg-gray-200 w-12 h-4 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-96 mt-4">
        <div className=" bg-gray-200 w-14 h-10 animate-pulse rounded-md"></div>

        <div className=" bg-gray-200 w-14 h-10 animate-pulse rounded-md"></div>

        <div className=" bg-gray-200 w-14 h-10 animate-pulse rounded-md"></div>
      </div>

      <div className="flex w-full mt-4">
        <div className=" bg-gray-200 w-96 h-10 animate-pulse rounded-md"></div>
      </div>

      <div className="flex w-full mt-4">
        <div className=" bg-gray-200 w-96 h-10 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
}
