import { HeroSection, JobListingCard } from "@/components";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="flex gap-2 items-center flex-wrap justify-center">
        <JobListingCard />
      </section>
    </>
  );
}
