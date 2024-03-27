import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    mobile: "",
    date: "",
  });
  const popupRef = useRef(null);

  const handleOpenForm = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.email.contains("@"))
    if(formData.mobile.length!==10){
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    if(new Date(formData.date)>=new Date()){
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    }
    console.log("Form submitted with data:", formData);
    setFormData({ uname: "", email: "", mobile: "", date: "" });
  };

  return (
    <div className="app">
      <h1>User Details Modal</h1>
      <button onClick={handleOpenForm}>Open Form</button>
      {isOpen && (
        <div className="modal">
          <div ref={popupRef} className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="uname">
                <p>
                  <b>Username:</b>
                </p>
              </label>
              <input
                type="text"
                name="uname"
                id="username"
                value={formData.uname}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">
                <p>
                  <b>Email Address:</b>
                </p>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="mobile">
                <p>
                  <b>Phone Number:</b>
                </p>
              </label>
              <input
                type="text"
                name="mobile"
                id="phone"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                required
              />

              <label htmlFor="date">
                <p>
                  <b>Date of Birth:</b>
                </p>
              </label>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                name="date"
                id="dob"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <div>
                <button type="submit"className="submit-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
