import React from "react";
import Hero from "./_components/Hero";
import FeatureProperties from "./_components/FeatureProperties";
import Services from "./_components/Services";

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <Hero />

      {/* Feature properties section */}
      <FeatureProperties />

      {/* How RentNest works section */}
      <Services />
    </>
  );
}