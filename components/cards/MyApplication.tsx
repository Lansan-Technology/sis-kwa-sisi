import { job, job_application } from "@prisma/client";
import Link from "next/link";

interface JobApplication extends job_application {
  job: job;
}

export function MyApplications({
  applications,
}: {
  applications: JobApplication[];
}) {
  if (!applications.length)
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold mb-4">Find Application/or Find Jobs</h2>
        <Link
          href="/jobs"
          className="border border-primary px-4 py-2 rounded transition duration-300"
        >
          Find Jobs
        </Link>
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen sm:mx-auto ">
      <div className="max-w-screen-md grid gap-6">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold">{application.job.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              {application.job.organization}
            </p>
            <p className="text-sm text-gray-700 mb-4">{}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-900 px-2 py-1 rounded">
                {application.job.job_type}
              </span>
              <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded">
                {application.job.salary_compensation}
              </span>
              <span className="bg-gray-100 text-gray-900 px-2 py-1 rounded">
                {application.job.location}
              </span>
            </div>
            <Link href={"/"} passHref>
              <p className="text-blue-500 mt-2">View Details</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
