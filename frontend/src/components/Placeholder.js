import React from "react";
import loader from "../assets/loader/Preloader_2.gif";

const Placeholder = () => {
  return (
    <div
      className="flex items-center justify-center w-full h-64 bg-transparent"
      style={{
        minHeight: "200px",
      }}
    >
      <img src={loader} alt="Loading..." className="w-16 h-16 object-contain bg-transparent" />
    </div>
  );
};

export default Placeholder;
