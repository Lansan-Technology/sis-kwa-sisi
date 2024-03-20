import { JobDetails } from '@/components/job-detail/JobDetails'
import React from 'react'

function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <JobDetails params={params} />
    </>
  )
}

export default JobDetailPage