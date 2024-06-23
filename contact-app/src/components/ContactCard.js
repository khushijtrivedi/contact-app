import React from "react";
import user from "../assets/user.png";
import {Link} from "react-router-dom";

const ContactCard=(props)=>{
    const { id,name,email} = props.contact;
    return(
                <div className="item">
                    <img src={user} className="ui avatar image" alt="user"></img>
                    <div className="content">
                        <Link 
                        to={`/contact/${id}`} state={{ contact: props.contact }}>
                    
                        <div className="header">{name}</div>
                        <div>{email}</div>
                        </Link>
                    </div>
                    
                    <i 
                    className="trash alternate outline icon" 
                    style={{color:"red", marginLeft:"10px"}} 
                    onClick={()=> props.clickHandler(id) }></i>
                    
                    <Link
                    to={{pathname: `/edit/${id}`, state:{contact: props.contact}}}
                    >
                    <i className="edit alternate outline icon" style={{color:"blue"}}>
                        </i>
                    </Link>
                     
                </div>
    );
};

export default ContactCard;