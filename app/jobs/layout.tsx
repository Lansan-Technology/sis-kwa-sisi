import Link from "next/link";
import React from "react";

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="py-8 px-4 mx-auto max-w-5xl text-center flex gap-2 items-center flex-wrap justify-between border-b">
        <h2>All Jobs</h2>
        <div className="flex gap-2">
          <Link
            href={"/jobs/my"}
            className="border border-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            My Jobs
          </Link>
          <Link
            href={"/create-job"}
            className="text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            New Job
          </Link>
        </div>
      </section>
      {children}
    </>
  );
}
