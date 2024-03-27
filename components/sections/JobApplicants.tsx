"use client";

import { job, job_application, job_seeker } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ApplicantModel from "../models/Model";

interface Application extends job_application {
  job_seeker: job_seeker;
  job: job;
}

export function JobApplicants({ applicants }: { applicants: Application[] }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      {applicants.map((applicant, i) => (
        <div
          key={i}
          className="flex flex-col justify-between border rounded-md p-4"
        >
          {open && (
            <ApplicantModel
              applicationId={{
                id: applicant.id,
              }}
              seekerid={{
                id: applicant.job_seekerid,
              }}
            />
          )}
          <div className="mb-2">
            <p>
              <b>Applicants Name: </b>
              <span className="text-gray-700 text-base">
                {applicant.job_seeker.names}
              </span>
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
              <span className="text-gray-700 text-base">
                {applicant.job.location}
              </span>
            </p>
            <p>
              <b>Job Organisation Name: </b>
              <span className="text-gray-700 text-base">
                {applicant.job.organization}
              </span>
            </p>
            <div className="flex justify-end p-4">
              <button
                className="text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => {
                  setOpen(true);
                }}
              >
                View Applicants Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
