import { ApplicantsCard } from '@/components'
import React from 'react'

export default function Page({params}:{params:{id:string}}) {
  return (
   <ApplicantsCard jobId={params.id} />
  )
}
