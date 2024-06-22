import React from "react";
import { Navigate, useLocation } from "react-router-dom";

class EditContact extends React.Component {
  constructor(props){
    super(props)
    const location = useLocation();
    const{id,name,email} = props.location.state.contact;
    this.state = {
      id,
      name,
      email,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All the fields are mandatory");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "", redirect: true }); // Set redirect to true
    console.log(this.state);
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" replace={true} />;
    }
    return (
      <div className="container text-center">
        <h2>ADD CONTACT</h2>
        <form className="row g-3" onSubmit={this.update}>
          <div className="mb-3">
            <label className="form-label">NAME</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="FirstName LastName"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">EMAIL</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@output.com"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              ADD
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditContact;


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const EditContact = ({ updateContactHandler }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const contact = location.state?.contact || { id: "", name: "", email: "" };

//   const [id, setId] = useState(contact.id);
//   const [name, setName] = useState(contact.name);
//   const [email, setEmail] = useState(contact.email);
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     setId(contact.id);
//     setName(contact.name);
//     setEmail(contact.email);
//   }, [contact]);

//   const update = (e) => {
//     e.preventDefault();
//     try {
//       if (name === "" || email === "") {
//         alert("All the fields are mandatory");
//         return;
//       }
//       updateContactHandler({ id, name, email });
//       setRedirect(true);
//     } catch (error) {
//       console.error("Error updating contact:", error);
//     }
//   };

//   const handleNameChange = (e) => {
//     console.log("Name changed:", e.target.value);
//     setName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     console.log("Email changed:", e.target.value);
//     setEmail(e.target.value);
//   };

//   console.log("Render - Name:", name);
//   console.log("Render - Email:", email);

//   if (redirect) {
//     return navigate("/", { replace: true });
//   }

//   return (
//     <div className="container text-center">
//       <h2>Edit Contact</h2>
//       <form className="row g-3" onSubmit={update}>
//         <div className="mb-3">
//           <label className="form-label">NAME</label>
//           <input
//             type="text"
//             className="form-control"
//             id="nameInput"
//             placeholder="FirstName LastName"
//             value={name}
//             onChange={handleNameChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">EMAIL</label>
//           <input
//             type="email"
//             className="form-control"
//             id="emailInput"
//             placeholder="name@output.com"
//             value={email}
//             onChange={handleEmailChange}
//           />
//         </div>
//         <div className="mb-3">
//           <button type="submit" className="btn btn-primary">
//             UPDATE
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditContact;
