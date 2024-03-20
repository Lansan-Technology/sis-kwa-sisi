"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createJobPosting } from "@/server";

export function NewJobForm() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Job</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          compensation_max: "",
          compensation_min: "",
          location: "",
          organization: "",
          role: "",
          status: "",
          job_type: "",
          vacancies: "",
        }}
        validate={(values) => {
          const errors = {};
          // Add validation logic here if needed
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // Handle form submission here
          await createJobPosting({
            title: values.title,
            description: values.description,
            salary_compensation: `${values.compensation_min} - ${values.compensation_max}`,
          });
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 p-4 border rounded-lg">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                htmlFor="title"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
              >
                Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600"
              />
            </div>
            <JobType />
            <Compensation />
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                htmlFor="description"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
              >
                Description
              </label>
              <Field name="description">
                {({ field }: FieldProps) => {
                  return (
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange(field.name)}
                      theme="snow"
                      className="quill-editor"
                      modules={{ toolbar: true }}
                      placeholder="Write job description here..."
                    />
                  );
                }}
              </Field>
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600"
              />
            </div>
            {/* Add other fields as needed */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function JobType() {
  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
        htmlFor="type"
      >
        Job Type
      </label>
      <div className="flex items-center space-x-4">
        <label>
          <Field
            type="radio"
            name="job_type"
            value="CONTRACT"
            className="mr-2"
          />
          Contract
        </label>
        <label>
          <Field
            type="radio"
            name="job_type"
            value="FULLTIME"
            className="mr-2"
          />
          Full-time
        </label>
        <label>
          <Field
            type="radio"
            name="job_type"
            value="PARTTIME"
            className="mr-2"
          />
          Part-time
        </label>
      </div>
      <ErrorMessage name="job_type" component="div" className="text-red-600" />
    </div>
  );
}

function Compensation() {
  return (
    <div className="flex w-full px-3 mb-6 mt-4 md:mb-0">
      <div className="w-1/2 mr-4">
        <label
          htmlFor="compensation_min"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
        >
          Compensation (Min)
        </label>
        <Field
          type="number"
          name="compensation_min"
          id="compensation_min"
          className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
        <ErrorMessage
          name="compensation_min"
          component="div"
          className="text-red-600"
        />
      </div>
      <div className="w-1/2">
        <label
          htmlFor="compensation_max"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
        >
          Compensation (Max)
        </label>
        <Field
          type="number"
          name="compensation_max"
          id="compensation_max"
          className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
        <ErrorMessage
          name="compensation_max"
          component="div"
          className="text-red-600"
        />
      </div>
    </div>
  );
}
