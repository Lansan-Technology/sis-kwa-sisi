"use server";

import { PrismaClient } from "@prisma/client";
import {
	Employer,
	Job,
	JobApplication,
	JobSeeker,
} from "./interfaces/interfaces";

const prisma = new PrismaClient();

export async function createEmployer(data: Employer) {
	const createdEmployer = await prisma.employer.create({ data });
	return createdEmployer;
}

export async function createJobsSeeker(data: JobSeeker) {
	const jobsSeeker = await prisma.job_seeker.create({
		data: {
			names: data.names,
			email: data.email,
			location: data.location,
			phone_number: data.phone_number,
			qualification: data.qualification,
			course: data.course,
			experience: data.experience,
			cv: data.cv,
			gender: data.gender,
			photo: data.photo,
			certification: data.certification,
		},
	});
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

export async function getJobSeeker(email: string) {
	return await prisma.job_seeker.findUnique({
		where: {
			email: email,
		},
	});
}

export async function createJobPosting(data: Job) {
	return await prisma.job.create({
		data: {
			title: data.title,
			description: data.description,
		},
	});
}

export async function createJobApplication(id: string, data: JobApplication) {
	const job = await getJob(id);
	if (!job) throw new Error("No such job");

	const job_seeker = await getJobSeeker(data.email);
	if (!job_seeker) throw new Error("Invalid Job Seeker ID");
	return await prisma.job_application.create({
		data: {
			job_seekerid: job_seeker.id,
			jobId: job.id,
			cover_letter: data.cover_letter,
			cv: data.resume,
		},
	});
}
