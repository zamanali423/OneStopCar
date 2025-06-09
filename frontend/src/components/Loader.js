import React from "react";
import loader from "../assets/loader/loader.gif";

const Loader = () => {
  return (
    <>
      <div
        className="se-pre-con"
        style={{
          position: "fixed",
          left: "0px",
          top: "0px",
          width: "100%",
          height: "100%",
          zIndex: 9999,
          background: `url(${loader}) center no-repeat #fff`,
        }}
      ></div>

      
    </>
  );
};

export default Loader;
