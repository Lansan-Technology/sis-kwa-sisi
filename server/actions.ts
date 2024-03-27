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

export async function createPartialJobSeeker(email: string, name: string) {
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

export async function getJobSeeker(email: string) {
  return await prisma.job_seeker.findUnique({
    where: {
      email: email,
    },
  });
}

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
    job_seeker = await createPartialJobSeeker(data.email, data.name);
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
    include: {
      job: true,
    },
  });
}

export async function findMyJobs(email: string) {
  return prisma.job.findMany({
    where: {
      employer: { email },
    },
  });
}

export async function findJobsByTitleOrAll(title?: string, take?: number) {
  if (!title) return prisma.job.findMany({ take, orderBy: {} });

  return prisma.job.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
    take,
  });
}

export async function findJobApplicantsById(id: string) {
  const applicants = await prisma.job_application.findMany({
    where: {
      jobId: id,
    },
    include: {
      job_seeker: true,
    },
  });

  return applicants;
}

export async function getJobApplicants(
  jobId: string,
  options?: { [key: string]: boolean }
) {
  return prisma.job_application.findMany({
    where: {
      job: { id: jobId },
    },
    include: {
      job: true,
      job_seeker: true,
      ...options,
    },
  });
}

export async function getJobApplicant(
  applicationId: string,
  seekerid: string
) {
  return prisma.job_application.findUnique({
    where: {
      id: applicationId,
      job_seeker: { id: seekerid },
    },
    include: {
      job: true,
      job_seeker: true
    }
  });
}
