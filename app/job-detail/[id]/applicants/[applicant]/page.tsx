import Link from "next/link";

export default function Page () {
  
  return (
    <>
      <ApplicantDetails />
    </>
  );
};


function ApplicantDetails() {
  return (
    <div className="">
      <Link href="#">
        <h5 className="mb-2 text-2xl font-bold">
          Job Title
        </h5>
      </Link>
      <p className="mb-3 font-normal text-gray-700">
        Job decription
      </p>
      <Link
        href="#"
        className="text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        Show More
      </Link>
    </div>
  );
}


