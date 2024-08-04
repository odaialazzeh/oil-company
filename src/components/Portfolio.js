import React from "react";
import { useTranslation } from "react-i18next";
import Oil250ml from "../images/oil-0.25.jpeg";
import shekel from "../images/shekel-currency.svg";

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="my-4 py-4" id="portfolio">
        <div
          className={i18n.language === "ar" ? "arabic-font" : "english-font"}
        >
          <h2 className="my-2 text-center text-3xl text-green-800 uppercase font-bold">
            {t("products")}
          </h2>
          <div className="flex justify-center">
            <div className="w-24 border-b-4 border-green-800 mb-8"></div>
          </div>

          <div className="px-4" data-aos="fade-down" data-aos-delay="600">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:scale-105 rounded-lg shadow-2xl p-3">
                <div className="m-2 text-justify text-sm">
                  <h4 className="font-semibold my-4 text-lg md:text-2xl text-center mb-4 h-12">
                    {t("oil-0.25")}
                  </h4>
                  <img alt="Oil 250ml" src={Oil250ml} />
                  <div className="flex justify-center my-4">
                    <div
                      to="/get-demo"
                      className="text-white bg-green-800 hover:bg-green-700 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl"
                    >
                      {t("price")}: 25
                      <img alt="Oil 250ml" src={shekel} className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
