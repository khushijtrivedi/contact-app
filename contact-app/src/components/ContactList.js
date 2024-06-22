import React from "react";
import ContactCard from "./ContactCard";
import "./ContactList.css";
import { Link } from "react-router-dom";

const ContactList=(props)=>{
    const deleteContactHandler = (id)=>{
        props.getContactId(id);
    };
   
    const renderContactList = props.contacts.map((contact)=>{
        return(
               <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler}></ContactCard>
        );
    })

    return(
        <div className="container-md position-relative">
            <h2 className="text-center">Contact List</h2>
            <div className="top-right-button">
                <Link to="/add">
                <button className="btn btn-warning">ADD CONTACT</button>
                </Link>
                
            </div>
            <br></br>
            <br></br>
            <div className="row mt-3">
                <div className="col">{renderContactList}</div>
            </div>
        </div>
    );

};

export default ContactList;