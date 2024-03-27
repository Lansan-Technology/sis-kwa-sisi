import { findJobApplicantsById } from "@/server/actions";
import Link from "next/link";


export async function ApplicantsCard({ jobId }: { jobId: string }) {
  const jobApplicants = await findJobApplicantsById(jobId);

  if (!jobApplicants.length)
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold mb-4"> No applicants yet!</h2>
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
      <div className="max-w-screen-md flex items-center justify-center flex-wrap gap-6">
       
        {jobApplicants.map((applicants) => (
          <div
            key={applicants.id}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold">
              {applicants.job_seeker.names}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {applicants.job_seeker.email}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              {applicants.job_seeker.location}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/applicant/${applicants.id}`}
                download
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              >
                View Profile
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
