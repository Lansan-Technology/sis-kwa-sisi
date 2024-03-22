"use client";

import React, { useEffect, useState } from "react";
import {
	Formik,
	Form,
	Field,
	ErrorMessage,
	FieldProps,
	useField,
} from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import ReactQuill from "react-quill";
import { createJobApplication, getJob } from "@/server";
import { useParams, useRouter } from "next/navigation";
import { JobApplicationSchema } from "../schema/JobApplication.schema";
import { JobApplication } from "@/server/interfaces/interfaces";
import { toast } from "react-toastify";

interface FormValues {
	name: string;
	email: string;
	cover_letter: string;
	resume: string;
}

const validationSchema = Yup.object({
	email: Yup.string().email("Invalid email address").required("Required"),
	name: Yup.string().required("Name is required"),
	resume: Yup.mixed().required("Resume is required"),
});

const initialValues = {
	name: "",
	email: "",
	resume: "",
	cover_letter: "",
};

export function JobApplicationForm() {
	const params = useParams<{ id: string; job_application: string }>();
	const router = useRouter();
	const handleSubmit = async (values: FormValues) => {
		await createJobApplication(params.id, values);
		toast.success(`Successfully applied for the ${params.job_application}.`);
		setTimeout(() => {
			router.push("/jobs");
		}, 3500);
	};

	return (
		<div className='relative flex justify-center items-center flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border'>
			<h4 className='block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
				{`Apply for the ${params.job_application.replace("%20", " ")} Role`}
			</h4>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values: FormValues, { setSubmitting }) => {
					handleSubmit(values);
					setSubmitting(false);
				}}>
				{({ isSubmitting, values, errors, touched }) => (
					<Form
						encType='multipart/form-data'
						className='max-w-screen-lg mt-8 mb-2 w-80 sm:w-96  '>
						<div className='flex flex-col gap-6 mb-1'>
							<h6 className='block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900'>
								Your Name
							</h6>
							<div className='relative h-11 w-full min-w-[300px]'>
								<Field
									type='text'
									name='name'
									placeholder='john doe'
									className='peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
								/>
								<ErrorMessage
									name='email'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>
							<h6 className='block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900'>
								Your Email
							</h6>
							<div className='relative h-11 w-full min-w-[300px]'>
								<Field
									type='email'
									name='email'
									placeholder='name@mail.com'
									className='peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
								/>
								<ErrorMessage
									name='email'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>
							<h6 className='block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900'>
								Your Resume
							</h6>
							<div className='relative h-11 w-full min-w-[300px]'>
								<Field
									type='file'
									name='resume'
									placeholder='resume'
									className='peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
								/>
								<ErrorMessage
									name='resume'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>
							<h6 className='block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900'>
								Your Cover Letter
							</h6>
							<div className='relative h-full w-full min-w-[300px]'>
								<Field name='cover_letter'>
									{({ field }: FieldProps) => (
										<ReactQuill
											value={field.value}
											onChange={field.onChange(field.name)}
										/>
									)}
								</Field>
								<ErrorMessage
									name='cover_letter'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>
						</div>

						<Button
							variant='outlined'
							color='primary'
							type='submit'
							disabled={isSubmitting}
							className='mt-6 w-full'>
							{isSubmitting ? "Submitting..." : "Submit"}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
