import { Gender, Qualification, JobStatus, JobType } from "@prisma/client";


export interface Job {
	title: string;
	description: string;
	salary_compensation: number;
	location: string;
	organization: string;
	role: string;
	status: JobStatus;
	job_type: JobType;
	vacancies: number;
}

export interface JobApplication {
	cover_letter: string;
	date: string;
	cv: string;
}

export interface JobSeeker {
	names: string;
	id_number: number;
	location: string;
	phone_number: string;
	email: string;
	qualification: Qualification[];
	course: string[];
	experience: number;
	cv: string;
	photo: string;
	gender: Gender;
	certification: string[];
}

export interface Employer {
	names: string;
	company: string;
	location: string;
	description: string;
	phone: string;
	email: string;
}
