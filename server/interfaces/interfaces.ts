export enum JobStatus {
	VACANT,
	FILLED,
}

export enum Jobtype {
	CONTRACT = "CONTRACT",
	FULLTIME = "FULL-TIME",
	PARTTIME = "PART-TIME",
}
export enum Qualification {
	MASTERS,
	DEGREE,
	CERTICATE,
	DIPLOMA,
}

export enum Gender {
	MALE,
	FEMALE,
	OTHER,
}

export interface Job {
	title: string;
	description: string;
	salary_expectations: number;
	location: string;
	organization: string;
	role: string;
	status: JobStatus;
	job_type: Jobtype;
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
	phone_number: String;
	email: String;
	qualification: Qualification;
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
