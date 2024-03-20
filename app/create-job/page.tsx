import { NewJobForm } from '@/components'
import React from 'react'

export default async function CreateJob() {
  return (
    <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12'>
      <NewJobForm/>
    </div>
  )
}
