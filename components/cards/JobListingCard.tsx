import { job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function JobListingCard({jobs}: {jobs: job[]}) {
  if (!jobs.length)
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold mb-4">No jobs to display</h2>
        <Link href="/create-job" className="border border-primary px-4 py-2 rounded transition duration-300">
            Create Job
        </Link>
      </div>
    );

  return (
    <div className="m-5">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="group mx-2 mt-2 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto"
        >
          <Link
            href="#"
            className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
          >
            <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
              <Image
                width={100}
                height={100}
                src="/Job.svg"
                alt=""
                className="h-full w-full object-cover text-gray-700"
              />
            </div>
          </Link>
          <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
            <h3 className="text-sm text-gray-600">{job.title}</h3>
            <Link
              href={`/job-detail/${job.id}`}
              className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
            >
              {job.title}
            </Link>
            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
              <div className="">
                Type:
                <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                  {job.job_type}
                </span>
              </div>
              <div className="">
                Salary:
                <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                  {job.salary_compensation}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


