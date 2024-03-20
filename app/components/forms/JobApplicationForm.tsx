"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";

interface FormValues {
  name: string;
  email: string;

  resume: null;
}

export function JobApplicationForm() {
  const handleSubmit = () => {
    console.log("job application submitted sucessfully");
  };

  const initialValues = {
    name: "",
    email: "",
    resume: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    name : Yup.string().required("Name is required"),
    resume: Yup.mixed().required("Resume is required"),
  });

  return (
    <div className="relative flex justify-center items-center flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
      <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        Apply for Job.title
      </h4>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, { setSubmitting }) => {
          console.log(values);
          handleSubmit();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form
            encType="multipart/form-data"
            className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96  "
          >
            <div className="flex flex-col gap-6 mb-1">
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Your Name
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <Field
                  type="text"
                  name="name"
                  placeholder="john doe"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Your Email
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <Field
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Your Resume
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <Field
                  type="file"
                  name="resume"
                  placeholder="resume"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <ErrorMessage
                  name="resume"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
