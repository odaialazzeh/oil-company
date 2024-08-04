import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Portfolio from "../components/Portfolio";
import { useDocTitle } from "../components/CustomHook";

const Home = () => {
  useDocTitle("OliveOile-Palestine");
  return (
    <>
      <Hero />
      <Intro />
      <Portfolio />
      <Footer />
    </>
  );
};

export default Home;
