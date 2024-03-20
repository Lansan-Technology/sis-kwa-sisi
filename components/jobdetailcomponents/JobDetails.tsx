import React from 'react'

export function JobDetails() {
  return (
<div className="overflow-y-auto overflow-x-hidden fixed justify-center items-center max-h-full w-full">
    <div className="relative p-4 max-h-full max-w-4xl mx-auto">
        <div className="relative bg-white rounded-lg shadow w-full">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t w-full">
                <h3 className="text-xl font-semibold text-gray-900">
                    Job Decription
                </h3>
                <button type="button" className="text-gray-600 bg-transparent hover:bg-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg className="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-600">
                  Job Title: <span>---</span>
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  Job Decription: <span>---</span>
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  Job Salary: <span>---</span>
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  Job Location: <span>---</span>
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  Company/Organiation: <span>---</span>
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  Job Role: <span>---</span>
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  Job Vacancies: <span>---</span>
                </p>
            </div>
            <div className="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button type="button" className="text-white bg-primary font-medium rounded-lg  px-5 py-2.5 text-center">Apply Now</button>
            </div>
        </div>
    </div>
</div>
  )
}


