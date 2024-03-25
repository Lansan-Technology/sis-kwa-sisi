"use client";
import { findMyJobs } from "@/server";
import { job } from "@prisma/client";
import React, { useState } from "react";
import Link from "next/link";

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
  if (!applications.length)
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold mb-4">
          Enter email/or Create a Job.
        </h2>
        <Link
          href="/create-job"
          className="border border-primary px-4 py-2 rounded transition duration-300"
        >
          Create
        </Link>
      </div>
    );

  return (
    <>
      <div className="flex flex-col justify-center gap-2 p-4 items-center">
        <div className="text-gray-900 font-bold text-xl mb-2">List of Jobs</div>
        <div className="flex w-full justify-center p-2 gap-4 flex-wrap items-center">
          {applications.map((job, i) => (
            <div
              key={i}
              className="flex flex-col justify-between border rounded-md p-4"
            >
              <div className="mb-2">
                <p>
                  <b>Job Title: </b>
                  <span className="text-gray-700 text-base">{job.title}</span>
                </p>
                <p>
                  <b>Company Name: </b>
                  <span className="text-gray-700 text-base">
                    {job.organization}
                  </span>
                </p>
                <p>
                  <b>Location: </b>
                  <span className="text-gray-700 text-base">
                    {job.location}
                  </span>
                </p>
                <p>
                  <b>Job type: </b>
                  <span className="text-gray-700 text-base">
                    {job.job_type}
                  </span>
                </p>
                <p>
                  <b>Job Status: </b>
                  <span className="text-gray-700 text-base">{job.status}</span>
                </p>
                <p>
                  <b>Job Salary Comppenation: </b>
                  <span className="text-gray-700 text-base">
                    {job.salary_compensation}
                  </span>
                </p>
                <div className="flex justify-end p-4">
                  <Link className="text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2" href={`/job-detail/${job.id}/applicants`}>
                    View Applicants
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
