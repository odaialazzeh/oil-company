import React from "react";
import NavBar from "../components/Navbar/NavBar";
import oliveImg from "../images/olive-img.svg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="hero" id="hero">
        <div>
          <NavBar />
        </div>

        <div
          className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6"
          data-aos="zoom-in"
        >
          <div
            id="hero"
            className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left"
          >
            <div
              className={
                i18n.language === "ar" ? "arabic-font" : "english-font"
              }
            >
              <div className=" flex flex-col justify-center mt-9">
                <h1 className="mb-5 md:text-5xl text-3xl font-bold text-green-800">
                  {t("welcome")}
                </h1>
                <div className="text-xl font-semibold tracking-tight mb-5 text-gray-500">
                  {t("description")}
                </div>
                <div className="mb-4 space-x-0 md:space-x-2 md:mb-8"></div>
              </div>
            </div>
            <div
              className="flex lg:justify-end w-full lg:w-1/2 image-container"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <img
                alt="card img"
                className="rounded-t float-right duration-1000 w-full"
                src={oliveImg}
                style={{ width: "400px", height: "400px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
