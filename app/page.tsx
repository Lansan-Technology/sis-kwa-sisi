import { HeroSection, JobListingCard } from "@/components";
import { getResumeCompiletion } from "@/utils";

export  default async function Home() {

  const x = await getResumeCompiletion()

  console.log(x)

  return (
    <>
      <HeroSection />
      <section className="flex gap-2 items-center flex-wrap justify-center">
        <JobListingCard />
      </section>
    </>
  );
}
