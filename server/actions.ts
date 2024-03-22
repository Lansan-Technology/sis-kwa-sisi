"use server";
import { prisma } from ".";
import {
	Employer,
	Job,
	JobApplication,
	JobSeeker,
} from "./interfaces/interfaces";


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

export async function createPartialJobSeeker(email: string) {
	const jobsSeeker = await prisma.job_seeker.create({
		data: {
			email: email,
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

export async function getAppliedJobs(email: string) {
	const applicants = await prisma.job_application.findMany({
		where: {
			job_seeker: {
				email: email,
			},
		},
		orderBy: {
			date: "desc",
		},
	});

	const persons = await prisma.job_seeker.findMany({
		where: {
			email: email,
		},
	});
	if (!persons.at(0)) throw new Error("No Person found with this email");
	const person = persons.at(0);
	const appliedJobs = await prisma.job.findMany({
		where: {
			job_application: {
				some: {
					job_seekerid: person?.id,
				},
			},
		},
	});
	return appliedJobs;
}

export async function getJobSeeker(email: string) {
	return await prisma.job_seeker.findUnique({
		where: {
			email: email,
		},
	});
}

// export async function

export async function createJobPosting(data: Job) {
	console.log(data.organization_email);
	let new_employer;
	const employer = await prisma.employer.findMany({
		where: {
			email: data.organization_email,
		},
	});
	const found = employer.at(0);

	if (!found) {
		new_employer = await prisma.employer.create({
			data: {
				email: data.organization_email,
				name: data.organization,
			},
		});
	}
	if (!new_employer) throw new Error("Employer not Found");

	return await prisma.job.create({
		data: {
			title: data.title,
			description: data.description,
			salary_compensation: data.salary_compensation,
			location: data.location,
			organization: data.organization,
			job_type: data.job_type,
			vacancies: data.vacancies,
			employerId: found ? found.id : new_employer.id,
		},
	});
}

export async function createJobApplication(id: string, data: JobApplication) {
	const job = await getJob(id);
	if (!job) throw new Error("No such job");

	let job_seeker = await getJobSeeker(data.email);
	if (!job_seeker) {
		job_seeker = await createPartialJobSeeker(data.email);
	}

	return await prisma.job_application.create({
		data: {
			job_seekerid: job_seeker.id,
			jobId: job.id,
			cover_letter: data.cover_letter,
			cv: data.resume,
		},
	});
}

export async function findMyApplications(email: string) {
	return prisma.job_application.findMany({
		where: {
			job_seeker: {
				email,
			},
		},
	});
}

export async function findMyJobs(email: string) {
	return prisma.job.findMany({
		where: {
			employer: {email}
		},
	});
}

export async function findJobsByTitleOrAll(title?: string, take?: number) {
	if (!title) return prisma.job.findMany({ take, orderBy: {} });

	return prisma.job.findMany({
		where: {
			title,
		},
	});
}
