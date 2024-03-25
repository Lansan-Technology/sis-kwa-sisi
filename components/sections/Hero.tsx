'use client'
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'


interface HeroSectionProps{
  setSearchTitle:Dispatch<SetStateAction<string>>;
}

export function HeroSection({setSearchTitle}:HeroSectionProps) {
  const [searchInput, setSearchInput]= useState<string>('');

  function handleSubmit(event:FormEvent) {
    event.preventDefault();
    setSearchTitle(searchInput);
    
  }

    return (
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-ful hover:bg-gray-20 rounded-full"
            role="alert"
          >
            <span className="text-sm font-medium  bg-primary-600 rounded-full px-4 py-1.5 mr-3 border border-primary">
              Get access to job around you!
            </span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6x">
            We invest in the your potential
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
            Unlock Your Potential: Discover Your Dream Job with Sisi kwa Sisi! 🚀
            #CareerGoals #JobSearchMadeEasy
          </p>
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-50"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Find jobs..."
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                required
              />
              <button
              onClick={handleSubmit}
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }