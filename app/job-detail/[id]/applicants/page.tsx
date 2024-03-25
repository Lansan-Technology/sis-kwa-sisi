import Link from 'next/link'
import { job, job_application, job_seeker } from '@prisma/client'
import React from 'react'
import { getJobApplicants } from '@/server'

interface Applicaation extends job_application {
  jobSeeker: job_seeker
  work: job
}

export default async function Page({params}: {params: {id: string}}) {
  const applicants = await getJobApplicants(params.id, {job_seeker: true, job: true})
  return (

    <div>
      <div className="flex flex-col justify-center gap-2 p-4 items-center">
        <div className="text-gray-900 font-bold text-xl mb-2">Job Applicants</div>
        <div className="flex w-full justify-center p-2 gap-4 flex-wrap items-center">
          {applicants.map((applicant, i) => (
            <div
              key={i}
              className="flex flex-col justify-between border rounded-md p-4"
            >
              <div className="mb-2">
                <p>
                  <b>Applicants Name: </b>
                  <span className="text-gray-700 text-base">{applicant.job_seeker.names}</span>
                </p>
                <p>
                  <b>Applicaants E-mail: </b>
                  <span className="text-gray-700 text-base">
                    {applicant.job_seeker.email}
                  </span>
                </p>
                <p>
                  <b>Applicants Phone Number: </b>
                  <span className="text-gray-700 text-base">
                    {applicant.job_seeker.phone_number}
                  </span>
                </p>
                <p>
                  <b>Job Applied To: </b>
                  <span className="text-gray-700 text-base">
                    {applicant.job.title}
                  </span>
                </p>
                <p>
                  <b>Job Location: </b>
                  <span className="text-gray-700 text-base">{applicant.job.location}</span>
                </p>
                <p>
                  <b>Job Organisation Name: </b>
                  <span className="text-gray-700 text-base">
                    {applicant.job.organization}
                  </span>
                </p>
                <div className="flex justify-end p-4">
                  <Link className="text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2" href={`/job-details/${applicant.job.id}/applicants/${applicant.job_seeker.id}`}>
                    View Applicants Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
