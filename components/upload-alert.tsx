import { Info } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function UploadAlert() {
  return (
    <div className="border-b border-gray-200 dark:border-[#333] bg-gray-100 dark:bg-neutral-900 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 " aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm ">
            Want to upload your own songs? Check out the upload page!
          </p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <Link href="/upload" className="whitespace-nowrap font-medium ">
              Upload your songs here!
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
