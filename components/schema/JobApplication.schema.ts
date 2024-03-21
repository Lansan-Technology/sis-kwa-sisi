import * as Yup from "yup";

export const JobApplicationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    name : Yup.string().required("Name is required"),
    resume: Yup.mixed().required("Resume is required"),
});
