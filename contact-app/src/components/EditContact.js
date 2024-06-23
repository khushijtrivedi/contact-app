import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = ({ updateContactHandler, getContactById }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const contact = getContactById(id);
    if (contact) {
      setNameInput(contact.name);
      setEmailInput(contact.email);
    }
  }, [id, getContactById]);

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (nameInput === "" || emailInput === "") {
        alert("All the fields are mandatory");
        return;
      }
      updateContactHandler({ id, name: nameInput, email: emailInput });
      setRedirect(true);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  if (redirect) {
    navigate("/", { replace: true });
  }

  return (
    <div className="container text-center">
      <h2>Edit Contact</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">NAME</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="FirstName LastName"
            value={nameInput}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">EMAIL</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="name@output.com"
            value={emailInput}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
