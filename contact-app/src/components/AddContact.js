import React from "react";
import { Navigate } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    redirect: false,
  };

  add = (e) => {
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
        <form className="row g-3" onSubmit={this.add}>
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

export default AddContact;
