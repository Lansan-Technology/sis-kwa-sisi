import React from "react";
import { JobListingCard } from "@/components";
import Link from "next/link";

export default async function page() {
  return (
    <>
      <section className="py-8 px-4 mx-auto max-w-5xl text-center flex gap-2 items-center flex-wrap justify-between border-b">
        <h2>Jobs</h2>
        <div className="">
          <Link
            href={"/create-job"}
            className="text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            New Job
          </Link>
        </div>
      </section>
      <section className="flex gap-2 items-center flex-wrap justify-center">
        <JobListingCard />
      </section>
    </>
  );
}
