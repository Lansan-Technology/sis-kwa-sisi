"use client";
import { findMyApplications, getAppliedJobs } from "@/server";
import { job, job_application } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MyApplications } from "@/components";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
	const [myApplications, setMyApplication] = useState<job[] | []>([]);
	const [appliedJobs, setAppliedJos] = useState<job_application[] | []>([]);
	const [userEmail, setUserEmail] = useState<string | undefined>();
	const router = useRouter();
	const findApplications = async () => {
		if (!userEmail) return;

		try {
			const applications = await getAppliedJobs(userEmail);
			const foundApplications = await findMyApplications(userEmail);
			if (
				!applications.at(0) ||
				applications.length < 0 ||
				!foundApplications.at(0)
			) {
				toast.error(`No Jobs Applied using ${userEmail}`);
				setTimeout(() => {
					router.push("/jobs");
				});
			}
			setAppliedJos(foundApplications);
			setMyApplication(() => applications);
		} catch (e) {
			toast.error(`No Jobs Applied using ${userEmail}`);
			router.push("/jobs");
		}
	};

	return (
		<>
			<div className='max-w-md mx-auto'>
				<label
					htmlFor='default-search'
					className='mb-2 text-sm font-medium text-gray-900 sr-only'>
					Search
				</label>
				<div className='relative'>
					<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
						<svg
							className='w-4 h-4 text-gray-50'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 20 20'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
							/>
						</svg>
					</div>
					<input
						value={userEmail}
						type='search'
						id='default-search'
						className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-900 focus:border-primary '
						placeholder='Enter Email...'
						onChange={e => {
							setUserEmail(e.target.value);
						}}
						required
					/>
					<button
						onClick={findApplications}
						type='submit'
						className='text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2'>
						Find
					</button>
				</div>
			</div>
			<JobApplications
				applications={myApplications}
				jobs_applied={appliedJobs}
			/>
		</>
	);
}

function JobApplications({
	applications,
	jobs_applied,
}: {
	applications: job[];
	jobs_applied: job_application[];
}) {
	if (!applications.length || !jobs_applied.at(0))
		return <p>Search/ apply for some Jobs first</p>;
	console.log(applications);
	console.log("applicationsSent", jobs_applied);
	return <MyApplications applications={jobs_applied}/>
}
