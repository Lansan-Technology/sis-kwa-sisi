"use client";
import { HeroSection, Jobs } from "@/components";
import { useState } from "react";

export default function Home() {
  const [searchTitle, setSearchTitle] = useState<string>("");

  return (
    <>
      <HeroSection setSearchTitle={setSearchTitle} />
      <Jobs searchTitle={searchTitle} />
    </>
  );
}
