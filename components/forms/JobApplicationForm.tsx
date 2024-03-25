"use client";
import React, { useEffect, useState } from "react";
import {
	Formik,
	Form,
	Field,
	ErrorMessage,
	FieldProps,
	useFormikContext,
	useField,
} from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import { createJobApplication, getJob } from "@/server";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { POST } from "@/app/api/upload/route";

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
					console.log(values);
					// handleSubmit(values);
					// setSubmitting(false);
				}}>
				{({ isSubmitting, setFieldValue, setFieldError }) => (
					<Form
						encType='multipart/form-data'
						className='max-w-screen-lg mt-8 mb-2 w-80 sm:w-96  '>
						<div className='flex flex-col gap-6 mb-1'>
							<div className='w-full px-3 mb-6 md:mb-0'>
								<label
									htmlFor='name'
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start'>
									Your Name
								</label>
								<Field
									type='text'
									name='name'
									placeholder='john doe'
									className='appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
								/>
								<ErrorMessage
									name='email'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<div className='w-full px-3 mb-6 md:mb-0'>
								<label
									htmlFor='email'
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start'>
									Your Email
								</label>
								<Field
									type='email'
									name='email'
									placeholder='name@mail.com'
									className='appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
								/>
								<ErrorMessage
									name='email'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<div className='w-full px-3 mb-6 md:mb-0'>
								<label
									htmlFor='resume'
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start'>
									Your Resume
								</label>
								<input
									id='file'
									name='resume'
									type='file'
									accept='.pdf,.doc,.docx,.txt'
									onChange={async event => {
										const files = event.currentTarget.files;
										if (!files || !files) {
											setFieldError("resume", "No file was selected");
										}
										const url: {
											message: string;
											status: number;
											url: string;
										} = await handleCVUpload(files![0]);
										setFieldValue("resume", url.url);
									}}
								/>

								{/* <Field
									type='file'
									name='resume'
									placeholder='resume'
									className='appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
								/> */}
								<ErrorMessage
									name='resume'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
								<UploadedCV />
							</div>

							<div className='w-full px-3 mb-6 md:mb-0'>
								<label
									htmlFor='cover_letter'
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start'>
									Your Cover Letter
								</label>
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

						<button
							disabled={isSubmitting}
							className='text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'>
							{isSubmitting ? "Submitting..." : "Submit"}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

async function handleCVUpload(values: File) {
	const formData = new FormData();
	formData.append("file", values);
	try {
		const res = await fetch("/api/upload/", {
			method: "POST",
			body: formData,
		});

		if (!res.ok) {
			toast.error("Failed to upload the file");
			return;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		toast.error("Failed for some reason. Check your console.log");
		console.error(error);
	}
}

function UploadedCV() {
	const [field] = useField("resume");
	if (field.value !== "") {
		return (
			<p className='text-green-500 p-2'>
				Successfully Uploaded your CV &#x2705;
			</p>
		);
	}
}
