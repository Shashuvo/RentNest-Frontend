import React from "react";
import Hero from "./_components/Hero";
import FeatureProperties from "./_components/FeatureProperties";
import Services from "./_components/Services";
import HowRentNestWorks from "./_components/HowRentNestWorks";
import ForLandlords from "./_components/ForLandlords";
import FindYourNextHome from "./_components/FindYourNextHome";


export default function Home() {
  return (
    <>
      {/* Hero section */}
      <Hero />

      {/* Feature properties section */}
      <FeatureProperties />

      {/* How RentNest works section */}
      <HowRentNestWorks />

      {/* Why Choose RentNest section */}
      <Services />

      {/* landlord CTA */}
      <ForLandlords />

      {/* tenant CTA */}
      <FindYourNextHome />
    </>
  );
}