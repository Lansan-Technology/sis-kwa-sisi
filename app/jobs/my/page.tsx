'use client'
import { findMyJobs } from "@/server";
import { job } from "@prisma/client";
import React, { useState } from "react";

export default function Page() {
  const [myJobs, setMyJobs] = useState<job[]>([]);
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const findJobs = async () => {
    if (!userEmail) return;

    try {
      const applications = await findMyJobs(userEmail);
      setMyJobs(applications);
    } catch (e) {
      console.log("hello world");
    }
  };

  return (
    <div className="mt-4">
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
            onClick={findJobs}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Find
          </button>
        </div>
      </div>
      <MyJobs applications={myJobs} />
    </div>
  );
}

function MyJobs({ applications }: { applications: job[] }) {
  if (!applications.length) return null;

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-600">List of Jobs</h3>
      <div>
        {applications.map((job, i) => (
          <div key={i}>
            <h1>{job.title}</h1>
            <p><b>Company Name:</b> {job.organization}</p>
            <p><b>Location:</b> {job.location}</p>
            <p><b>Job type:</b> {job.job_type}</p>
            <p><b>Job Status:</b> {job.status}</p>
            <p><b>Job Salary Comppenation: </b> {job.salary_compensation}</p>
          </div>
        )
        )}
      </div>
    </>
  )
}
