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
      <div className="ui main">
        <br>
        </br>
        <br></br><br></br>
        <h2>ADD CONTACT</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>NAME</label>
            <input
              type="text"
              id="nameInput"
              placeholder="FirstName LastName"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>EMAIL</label>
            <input
              type="email"
              id="emailInput"
              placeholder="name@output.com"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
            <button type="submit" className="ui button blue">
              ADD
            </button>
        </form>
      </div>
    );
  }
}

export default AddContact;
