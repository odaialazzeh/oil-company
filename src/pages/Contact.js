import React, { useState, useRef } from "react";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer";
import { useDocTitle } from "../components/CustomHook";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const Contact = () => {
  useDocTitle("Contact us");
  const { t, i18n } = useTranslation();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState("");

  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.firstName) newErrors.firstName = "First name is required.";
    if (!formValues.lastName) newErrors.lastName = "Last name is required.";
    if (!formValues.email) newErrors.email = "Email is required.";
    if (!formValues.message) newErrors.message = "Message is required.";
    if (formValues.phone && !/^\+?\d{10,13}$/.test(formValues.phone)) {
      newErrors.phone = "Phone number must be 10 to 13 digits long.";
    }
    return newErrors;
  };

  const clearInput = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    emailjs
      .sendForm(
        "service_gsphlyv",
        "template_sc5v4xi",
        form.current,
        "UN7cRIJtuc3Y6CAmc"
      )
      .then((result) => {
        console.log(result.text);
        setSuccess("Message sent successfully");
        setStatus("success"); // Set status to success
        clearInput();
        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccess("");
          setStatus(""); // Clear status after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.log(error.text);
        setSuccess("Failed to send message");
        setStatus("error"); // Set status to error
        clearInput();
        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccess("");
          setStatus(""); // Clear status after 3 seconds
        }, 3000);
      });
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div
        id="contact"
        className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24"
      >
        <div
          className="container mx-auto my-8 px-4 lg:px-20"
          data-aos="zoom-in"
        >
          <form onSubmit={sendEmail} ref={form}>
            <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <div
                className={
                  i18n.language === "ar" ? "arabic-font" : "english-font"
                }
              >
                <div className="flex">
                  <h1 className="font-bold text-center lg:text-left text-green-800 uppercase text-4xl">
                    {t("sendUs")}
                  </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                  <div>
                    <input
                      name="firstName"
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder={t("firstname")}
                      value={formValues.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      name="lastName"
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder={t("lastname")}
                      value={formValues.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      name="email"
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder={t("email")}
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <input
                      name="phone"
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder={t("phone")}
                      value={formValues.phone}
                      onChange={handleChange}
                      pattern="[0-9\s\-\(\)]+"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div className="my-4">
                  <textarea
                    name="message"
                    placeholder={t("message")}
                    className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={formValues.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>
                <div className="my-2 w-1/2 lg:w-2/4">
                  <button
                    type="submit"
                    id="submitBtn"
                    className="uppercase text-sm font-bold tracking-wide bg-green-700 hover:bg-green-600 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                  >
                    {t("sendM")}
                  </button>
                  {success && (
                    <p
                      className={`mt-2 text-sm ${
                        status === "success" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {success}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-green-800 rounded-2xl">
            <div
              className={
                i18n.language === "ar" ? "arabic-font" : "english-font"
              }
            >
              <div className="flex flex-col text-white">
                <div className="flex my-4 w-2/3 lg:w-3/4">
                  <div className="flex flex-col">
                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl">{t("office-address")}</h2>
                    <p className="text-gray-200">{t("address-desc")}</p>
                  </div>
                </div>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <i className="fas fa-phone-alt pt-2 pr-2" />
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-2xl">{t("call-us")}</h2>
                    <p className="text-gray-200">{t("phone")}: 08055384406</p>
                    <p className="text-gray-200">
                      {t("whatsapp")}: 08055384406
                    </p>

                    <div className="mt-5">
                      <h2 className="text-2xl">{t("send-email")}</h2>
                      <p className="text-gray-200">info@mld.ng</p>
                    </div>
                  </div>
                </div>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full flex justify-center bg-white h-8 text-green-800  w-8  mx-1 text-center pt-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current font-black hover:animate-pulse"
                    >
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                    </svg>
                  </a>

                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full flex justify-center bg-white h-8 text-green-800  w-8  mx-1 text-center pt-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="-10 -2 70 70"
                      id="instagram"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <g fill="#1f4b3d" transform="translate(-500 -160)">
                          <path d="M524 160c-6.518 0-7.335.028-9.895.144-2.555.117-4.3.523-5.826 1.116-1.578.613-2.917 1.434-4.25 2.768-1.335 1.334-2.156 2.673-2.769 4.251-.593 1.527-1 3.271-1.116 5.826-.116 2.56-.144 3.377-.144 9.895s.028 7.335.144 9.895c.117 2.555.523 4.3 1.116 5.826.613 1.578 1.434 2.917 2.768 4.25 1.334 1.335 2.673 2.156 4.251 2.77 1.527.592 3.271.998 5.826 1.115 2.56.116 3.377.144 9.895.144s7.335-.028 9.895-.144c2.555-.117 4.3-.523 5.826-1.116 1.578-.613 2.917-1.434 4.25-2.768 1.335-1.334 2.156-2.673 2.77-4.251.592-1.527.998-3.271 1.115-5.826.116-2.56.144-3.377.144-9.895s-.028-7.335-.144-9.895c-.117-2.555-.523-4.3-1.116-5.826-.613-1.578-1.434-2.917-2.768-4.25-1.334-1.335-2.673-2.156-4.251-2.769-1.527-.593-3.271-1-5.826-1.116-2.56-.116-3.377-.144-9.895-.144zm0 4.324c6.408 0 7.167.025 9.698.14 2.34.107 3.61.498 4.457.827 1.12.435 1.92.955 2.76 1.795.839.84 1.359 1.64 1.794 2.76.33.845.72 2.116.827 4.456.115 2.53.14 3.29.14 9.698s-.025 7.167-.14 9.698c-.107 2.34-.498 3.61-.827 4.457-.435 1.12-.955 1.92-1.795 2.76-.84.839-1.64 1.359-2.76 1.794-.845.33-2.116.72-4.456.827-2.53.115-3.29.14-9.698.14-6.409 0-7.168-.025-9.698-.14-2.34-.107-3.61-.498-4.457-.827-1.12-.435-1.92-.955-2.76-1.795-.839-.84-1.359-1.64-1.794-2.76-.33-.845-.72-2.116-.827-4.456-.115-2.53-.14-3.29-.14-9.698s.025-7.167.14-9.698c.107-2.34.498-3.61.827-4.457.435-1.12.955-1.92 1.795-2.76.84-.839 1.64-1.359 2.76-1.794.845-.33 2.116-.72 4.456-.827 2.53-.115 3.29-.14 9.698-.14zm0 7.352c-6.807 0-12.324 5.517-12.324 12.324 0 6.807 5.517 12.324 12.324 12.324 6.807 0 12.324-5.517 12.324-12.324 0-6.807-5.517-12.324-12.324-12.324zM524 192a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm15.691-20.811a2.88 2.88 0 1 1-5.76 0 2.88 2.88 0 0 1 5.76 0z"></path>
                        </g>
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
