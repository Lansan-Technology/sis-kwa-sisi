"use server";

import { PrismaClient } from "@prisma/client";
import { Employer, Job, JobApplication, JobSeeker } from "./interfaces/interfaces";

const prisma = new PrismaClient();

export async function createEmployer(data: Employer) {
	const createdEmployer = await prisma.employer.create({data})
	return createdEmployer;
}

export async function createJobsSeeker(data: JobSeeker) {
	const jobsSeeker = await prisma.job_seeker.create({data: {
		names: data.names,  
        email: data.email,
		location:  data.location, 
		phone_number:  data.phone_number,
		qualification: data.qualification,
		course: data.course,
		experience: data.experience,
		cv: data.cv,
		gender: data.gender,
		photo: data.photo,
		certification: data.certification

	}});
	return jobsSeeker;

}

export async function getAllJobs() {
	return await prisma.job.findMany();
}

export async function getJob(id: string) {
	return await prisma.job.findUnique({
		where: {
				id: id,
		},
	});
}

export async function getJobSeeker(id: string) {
	return await prisma.job_seeker.findUnique({
		where: {
			id: id
		}
	}
	)
} 

export async function createJobPosting(data: Job) {
	return await prisma.job.create({
		data: {
			title: data.title,
			description: data.description,
			salary_compensation: data.salary_compensation,
			location: data.location,
			organization: data.organization,
			role: data.role,
			status: data.status,
			job_type: data.job_type,
			vacancies: data.vacancies	
		},
	});
}

export async function createJobApplication(job_seekerid: string, id: string, data: JobApplication) {
	const job = await getJob(id);
	if(!job) throw  new Error("No such job");

	const job_seeker = await getJobSeeker(id);
	if(!job_seeker) throw  new Error("Invalid Job Seeker ID");
	return await prisma.job_application.create({
		data: {
			job_seekerid: job_seeker.id,
			jobId: job.id,
			cover_letter: data.cover_letter,
			cv:  data.cv,
			date: data.date
		},
	});
}
