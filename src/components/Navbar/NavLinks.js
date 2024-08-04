import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

const NavLinks = ({ onClick }) => {
  const { t, i18n } = useTranslation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  // Function to apply text direction based on language
  const applyTextDirection = (lng) => {
    if (lng === "ar") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    applyTextDirection(lng);
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    if (onClick) onClick(); // Ensure the navigation bar closes
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav
        className={`${
          i18n.language === "ar" ? "arabic-font" : "english-font"
        } ${isSmallScreen ? "flex flex-col space-y-6" : ""}`}
      >
        <HashLink
          className="px-4 font-extrabold text-green-900 hover:text-green-700"
          smooth
          to="/#hero"
          onClick={onClick}
        >
          {t("home")}
        </HashLink>
        <HashLink
          className="px-4 font-extrabold text-green-900 hover:text-green-700"
          smooth
          to="/#about"
          onClick={onClick}
        >
          {t("about")}
        </HashLink>
        <HashLink
          className="px-4 font-extrabold text-green-900 hover:text-green-700"
          smooth
          to="/#portfolio"
          onClick={onClick}
        >
          {t("products-nav")}
        </HashLink>
        <HashLink
          className="px-4 font-extrabold text-green-900 hover:text-green-700"
          to="/Contact"
          onClick={onClick}
        >
          {t("contact")}
        </HashLink>
        {i18n.language !== "en" && (
          <button
            onClick={() => handleLanguageChange("en")}
            className="english-font text-green-900 text-lg font-bold"
          >
            {t("english")}
          </button>
        )}
        {i18n.language !== "ar" && (
          <button
            onClick={() => handleLanguageChange("ar")}
            className="arabic-font text-green-900 text-xl font-bold"
          >
            {t("arabic")}
          </button>
        )}
      </nav>
    </>
  );
};

export default NavLinks;
