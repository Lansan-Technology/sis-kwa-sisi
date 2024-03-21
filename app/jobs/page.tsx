import React from "react";
import { JobListingCard } from "@/components";
import { getAllJobs } from "@/server";


export default async function page() {
  const jobs = await getAllJobs()


  return (
    <>
      <section className="flex gap-2 items-center flex-wrap justify-center">
        <JobListingCard jobs={jobs} />
      </section>
    </>
  );
}
