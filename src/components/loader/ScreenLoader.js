import React from "react";
import Lottie from "lottie-react";
import animationData from "./animation_lnailmmc.json";

function ScreenLoader({ text }) {
  return (
    <div
      className="position-fixed d-flex justify-content-center align-items-center"
      style={{
        zIndex: 999999999999,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.8)",
        position: "relative",
      }}
    >
      <div
        style={{ color: "black" }}
        className="d-flex flex-column align-items-center"
      >
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{
            width: "160px",
            height: "160px",
            ...(window.innerWidth <= 500 && {
              width: "100px",
              height: "100px",
            }),
          }}
        />
        <h2
          style={{ position: "absolute", bottom: "30%", color: "black", }}
          className="text-white mt-5"
        >
          {text}
        </h2>
      </div>
    </div>
  );
}

export default ScreenLoader;
