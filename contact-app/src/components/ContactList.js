import React,{useRef} from "react";
import ContactCard from "./ContactCard";
import "./ContactList.css";
import { Link } from "react-router-dom";

const ContactList=(props)=>{
    const inputEl = useRef("");

    const deleteContactHandler = (id)=>{
        props.getContactId(id);
    };
   
    const renderContactList = props.contacts.map((contact)=>{
        return(
               <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler}></ContactCard>
        );
    })

    const getSearchTerm=()=>{
        console.log(inputEl.current.value);
        props.searchKeyword(inputEl.current.value);
    };
    return(
        <div className="main">
            <br></br><br/><br/>
            <h2>Contact List
                <Link to="/add">
                <button className="ui button blue right" style={{marginLeft:"800px"}}>ADD CONTACT</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search Conatcts" className="prompt" value={props.term} onChange={getSearchTerm}></input>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">{renderContactList.length>0 ? renderContactList:"No contact found"}</div>
        </div>
        
    );

};

export default ContactList;