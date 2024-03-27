import React, { useEffect, useState } from "react";
import { getJobApplicant } from "@/server";
import { job, job_application, job_seeker } from "@prisma/client";
import ReactQuill from "react-quill";

export default function ApplicantModel({
  applicationId,
  seekerid,
}: {
  applicationId: { id: string };
  seekerid: { id: string };
}) {
  const { applicant } = useApplicant({ applicationId, seekerid });
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="justify-center gap-2 p-4 items-center">
                <div className="justify-center gap-2 p-4 items-center">
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    Applicant Detail
                  </div>
                  <div className="flex flex-col justify-between border rounded-md p-4">
                    <p>
                      <b>Applicants Name: </b>
                      <span className="text-gray-700 text-base">
                        {applicant?.job_seeker.names}
                      </span>
                    </p>
                    <p>
                      <b>Applicaants E-mail: </b>
                      <span className="text-gray-700 text-base">
                        {applicant?.job_seeker.email}
                      </span>
                    </p>
                    <p>
                      <b>Applicants Phone Number: </b>
                      <span className="text-gray-700 text-base">
                        {applicant?.job_seeker.phone_number}
                      </span>
                    </p>
                    <p>
                      <b>Job Applied To: </b>
                      <span className="text-gray-700 text-base">
                        {applicant?.job.title}
                      </span>
                    </p>
                    <p>
                      <b>Applicant Location: </b>
                      <span className="text-gray-700 text-base">
                        {applicant?.job_seeker.location}
                      </span>
                    </p>
                    <p>
                      <b>Job Organisation Name: </b>
                      <span className="text-gray-700 text-base">
                        {applicant?.job.organization}
                      </span>
                    </p>
                    <p>
              <b>Applicant Cover Letter: </b>
              <ReactQuill
              value={applicant?.cover_letter}
              theme='snow'
              />
            </p>
                    <p className="mt-4">
                      <a
                        className="text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
                        href={applicant?.job_seeker.cv ?? "#"}
                      >
                        Download cv
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IApplicant extends job_application {
  job: job;
  job_seeker: job_seeker;
}

function useApplicant({
  applicationId,
  seekerid,
}: {
  applicationId: { id: string };
  seekerid: { id: string };
}) {
  const [applicant, setApplicaant] = useState<IApplicant | null>(null);
  useEffect(() => {
    getJobApplicant(applicationId.id, seekerid.id).then((data) => {
      setApplicaant(data);
    });
  }, [applicationId.id, seekerid.id]);
  return { applicant };
}
