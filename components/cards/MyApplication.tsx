import { job_application } from "@prisma/client";
import Link from "next/link";

const dummyJobApplications = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    company: "Acme Corporation",
    description:
      "We are seeking a skilled software engineer to join our team...",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    jobTitle: "Data Scientist",
    company: "Tech Solutions Ltd.",
    description: "Looking for a data scientist to analyze complex data sets...",
    type: "Contract",
    salary: "$100,000 - $130,000",
    location: "New York City, NY",
  },
  {
    id: 3,
    jobTitle: "UX/UI Designer",
    company: "Creative Designs Inc.",
    description: "Create user-friendly and visually appealing designs...",
    type: "Full-time",
    salary: "$85,000 - $115,000",
    location: "Los Angeles, CA",
  },
];

export function MyApplications({
  applications,
}: {
  applications: job_application[];
}) {
  //if(!applications.length) return null

  return (
    
    <div className="flex justify-center items-center h-screen sm:mx-auto ">
      <div className="max-w-screen-md grid gap-6">
        <h1 className="text-3xl font-bold mb-4">Job Applications</h1>
        {dummyJobApplications.map((application) => (
          <div
            key={application.id}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold">{application.jobTitle}</h2>
            <p className="text-sm text-gray-600 mb-4">{application.company}</p>
            <p className="text-sm text-gray-700 mb-4">{application.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-900 px-2 py-1 rounded">
                {application.type}
              </span>
              <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded">
                {application.salary}
              </span>
              <span className="bg-gray-100 text-gray-900 px-2 py-1 rounded">
                {application.location}
              </span>
            </div>
            <Link href={""} passHref>
              <p className="text-blue-500 mt-2">View Details</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
