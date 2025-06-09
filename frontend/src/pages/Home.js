import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Divider from "../components/Divider";
import Featured_Products from "../components/Featured_Products";
import Sale_Section from "../components/Sale_Section";
import Banners from "../components/Banners";

const Home = () => {
  return (
    <div className="site__body">
      <HeroSection />
      <Features />
      <Divider />
      <Featured_Products />
      <Divider />
      <Sale_Section/>
      <Divider/>
      <Banners/>
      <Divider/>
    </div>
  );
};

export default Home;
