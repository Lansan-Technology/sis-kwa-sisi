import React from 'react'

export function Header() {
    return (
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                Sisi Kwa Sisi
              </span>
            </a>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                  <a
                    href="/"
                    className="block py-2 pr-4 pl- rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/jobs"
                    className="block py-2 pr-4 pl- rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                    aria-current="page"
                  >
                    Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="/job-application/my"
                    className="block py-2 pr-4 pl- rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                    aria-current="page"
                  >
                    My Applications
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  