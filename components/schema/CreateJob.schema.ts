import * as Yup from "yup";

export const CreateJobSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Job title should be more than 2 characters!")
    .max(50, "Job title should not exceed 50 characters!")
    .required("Required"),
  organization: Yup.string()
    .min(2, "Organization name should be more than 2 characters!")
    .max(50, "Organization name should not exceed 50 characters!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Short Job description!")
    .required("Required"),
  vacancies: Yup.number().required("Number of Vacant Position Required"),
  role: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  organization_email: Yup.string().email("Invalid email").required("Required"),
});
