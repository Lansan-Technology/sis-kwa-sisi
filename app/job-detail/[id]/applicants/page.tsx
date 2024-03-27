import Link from "next/link";
import { job, job_application, job_seeker } from "@prisma/client";
import React from "react";
import { getJobApplicants } from "@/server";
import { JobApplicants } from "@/components/sections/JobApplicants";

interface Applicaation extends job_application {
  jobSeeker: job_seeker;
  work: job;
}

export default async function Page({ params }: { params: { id: string } }) {
  const applicants = await getJobApplicants(params.id, {
    job_seeker: true,
    job: true,
  });

  
  return (
    <div className="flex flex-col justify-center gap-2 p-4 items-center">
      <div className="text-gray-900 font-bold text-xl mb-2">Job Applicants</div>
      <div className="flex w-full justify-center p-2 gap-4 flex-wrap items-center">
        <JobApplicants applicants = {applicants}/>
      </div>
    </div>
  );
}
