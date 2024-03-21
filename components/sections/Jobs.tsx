import { findJobsByTitleOrAll } from "@/server";
import React from "react";
import { JobListingCard } from "..";

export async function Jobs({ searchTitle }: { searchTitle?: string }) {
  const jobs = await findJobsByTitleOrAll(searchTitle, 4);

  return (
    <section className="flex gap-2 items-center flex-wrap justify-center">
      <JobListingCard jobs={jobs} />
    </section>
  );
}
