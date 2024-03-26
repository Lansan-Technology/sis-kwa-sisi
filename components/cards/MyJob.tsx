import { job } from "@prisma/client";
import Link from "next/link";

 export function MyJobs({ applications }: { applications: job[] }) {
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