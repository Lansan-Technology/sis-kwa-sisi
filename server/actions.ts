"use server";

import { PrismaClient } from "@prisma/client";
import { Job, JobApplication } from "./interfaces/interfaces";

const prisma = new PrismaClient();

export async function createEmployer() {}

export async function createJobsSeeker() {}

export async function getAllJobs() {
	return await prisma.job.findMany();
}

export async function getJob(id: string) {
	return await prisma.job.findUnique({
		where: {
			data: {
				id: id,
			},
		},
	});
}

export async function createJobPosting(data: Job) {
	return await prisma.job.create({
		data: {},
	});
}

export async function createJobApplication(id: string, data: JobApplication) {
	const job = await getJob(id);

	return await prisma.job_application({
		data: {
			jobId: job.id,
		},
	});
}
