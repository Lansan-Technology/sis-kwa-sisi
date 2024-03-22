"use client";
import { findMyApplications, getAppliedJobs } from "@/server";
import { job, job_application } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MyApplications } from "@/components";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

interface JobApplication extends job_application {
  job:job

}

export default function Page() {
  const [myApplications, setMyApplication] = useState<JobApplication[]>([]);
  
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const router = useRouter();
  const findApplications = async () => {
    if (!userEmail) return;

    try {
      
      const foundApplications = await findMyApplications(userEmail);
      
      
      setMyApplication(foundApplications);
    } catch (e) {
      toast.error(`No Jobs Applied using ${userEmail}`);
      router.push("/jobs");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-50"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={userEmail}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-900 focus:border-primary "
            placeholder="Enter Email..."
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            required
          />
          <button
            onClick={findApplications}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Find
          </button>
        </div>
      </div>
      <JobApplications
        applications={myApplications}
        
      />
    </>
  );
}

function JobApplications({
  applications,
  
}: {
  applications: JobApplication[];
  
}) {
  if (!applications.length ) (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold mb-4">Enter email/or Apply for job First</h2>
        <Link
          href="/jobs"
          className="border border-primary px-4 py-2 rounded transition duration-300"
        >
          Find Jobs
        </Link>
      </div>
    );

  return <MyApplications applications={applications} />;
}
