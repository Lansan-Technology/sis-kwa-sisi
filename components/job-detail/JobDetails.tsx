"use client";
import { getJob } from "@/server";
import React, { useEffect, useState } from "react";
import { JobDescription } from ".";
import { Button, Input } from "@mui/material";
import { useRouter } from "next/navigation";
import { JobStatus, JobType } from "@prisma/client";

interface JobApplication {
	id: string;
	title: string;
	description: string;
	salary_compensation: string | null;
	location: string | null;
	organization: string | null;
	role: string | null;
	status: JobStatus;
	job_type: JobType | null;
	vacancies: number | null;
}

export function JobDetails({ params }: { params: { id: string } }) {
	const [job, setJob] = useState<JobApplication | null>(null);
	const { id } = params;
	const router = useRouter();
	useEffect(() => {
		const fetchJob = async () => {
			const job = await getJob(id);
			setJob(job);
		};
		fetchJob();
	}, [id]);

	if (!job) return null;

	return (
		<div className='overflow-y-auto overflow-x-hidden justify-center items-center max-h-full w-full'>
			<div className='relative p-4 max-h-full max-w-4xl mx-auto'>
				<div className='relative bg-white rounded-lg shadow w-full'>
					<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t w-full'>
						<h3 className='text-xl font-semibold text-gray-900'>
							Job Decription
						</h3>
					</div>
					<div className='p-4 md:p-5 space-y-4'>
						<p className='text-base leading-relaxed text-gray-600'>
							Company/Organiation: <span>---</span>
						</p>
						<p className='text-base leading-relaxed text-gray-600'>
							Job Title: <span>{job.title}</span>
						</p>
						<p className='text-base leading-relaxed text-gray-600'>
							Job Salary:{" "}
							<span>{job.salary_compensation ?? "Not Provied"}</span>
						</p>
						<p className='text-base leading-relaxed text-gray-600'>
							Job Location: <span>{job.organization ?? "No Organization"}</span>
						</p>

						<p className='text-base leading-relaxed text-gray-600'>
							Job Type: <span>{job.job_type}</span>
						</p>
						<p>
							<JobDescription desc={job.description} />
						</p>
					</div>
					<div className='flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b'>
						<input type='string' />
						<Button
							onClick={() => router.push(`${id}/job-application`)}
							type='button'
							variant='contained'
							className='text-white bg-primary font-medium rounded-lg  px-5 py-2.5 text-center'>
							Apply Now
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
