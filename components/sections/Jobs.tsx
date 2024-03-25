'use client'

import { findJobsByTitleOrAll } from "@/server";
import React, { useEffect, useState } from "react";
import { JobListingCard } from "..";
import { job } from "@prisma/client";

export function Jobs({ searchTitle }: { searchTitle?: string }) {
  const {jobs} = useSearchJobs({searchTitle});

  return (
    <section className="flex gap-2 items-center flex-wrap justify-center">
      <JobListingCard jobs={jobs} />
    </section>
  );
}

function useSearchJobs({ searchTitle }: { searchTitle?: string }) {
  const [jobs, setJobs] = useState<job[]>([]);
  useEffect(() => {
    findJobsByTitleOrAll(searchTitle, 4).then(
      (data ) => setJobs(data)
    )
  }, [searchTitle]);
  return { jobs };
}
