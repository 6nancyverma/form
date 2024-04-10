import React, { useState } from "react";
import { validateForm } from "../../validators/formValidator";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = () => {
    axios
      .post("http://localhost:3000/submit-form", formData)
      .then((response) => {
        console.log(response.data);
        setFormMessage("Form submitted successfully.");
        setFormStatus("success");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setFormMessage("Error submitting form. Please try again.");
        setFormStatus("error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      submitForm();
      displayFormData();
      resetForm();
    } else {
      setFormErrors(errors);
      setFormMessage("Please fill out all required fields.");
      setFormStatus("error");
    }
  };

  const displayFormData = () => {
    console.log(formData);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "" });
    setFormErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-8 py-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Form Submission
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.name && (
              <div className="text-red-500">{formErrors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.email && (
              <div className="text-red-500">{formErrors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.phone && (
              <div className="text-red-500">{formErrors.phone}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
        {formMessage && (
          <div
            className={`text-${formStatus === "success" ? "green" : "red"}-500`}
          >
            {formMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
