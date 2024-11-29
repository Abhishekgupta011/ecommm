import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [id]: value,
      };
    });
  };
  // const namInputHandler = (event) => {
  //   setFormData({ ...formData, name: event.target.value });
  // };
  // const emailIdInputHandler = (event) => {
  //   setFormData({ ...formData, email: event.target.value });
  // };
  // const phoneInputHandler = (event) => {
  //   setFormData({ ...formData, phone: event.target.value });
  // };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    console.log("Form submitted");
    try {
      const response = await fetch(
        "https://optimizedcode-cbd45-default-rtdb.firebaseio.com/contact.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Message sent successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setFormData({ name: "", email: "", phone: "" });
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="contact-us">
      <h2>Contact Us</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        className="name"
        aria-label="name"
        onChange={onChangeHandler}
        value={formData.name}
      />
      <label htmlFor="emailid">Email Id:</label>
      <input
        type="email"
        id="email"
        className="email"
        aria-label="email"
        value={formData.email}
        onChange={onChangeHandler}
      />
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        className="phone"
        aria-label="phone"
        onChange={onChangeHandler}
        value={formData.phone}
      />
      <button type="submit" disabled={isSubmitted}>{ isSubmitted ? "Sending..." : "Submit" }</button>
    </form>
  );
};
export default ContactUs;
