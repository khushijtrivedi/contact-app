import React from "react";
import user from "../assets/user.png";
import {Link} from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";


const ContactDetail=(props)=>{

    const location = useLocation();
    const {contact} = location.state || {};
    const {id} = useParams();

    if(!contact){
        return <div>CONTACT NOT FOUND</div>;
    }
    return(
            <>
              <br></br>
              <br></br>
              <br></br>
              <br></br>             
              <div className="container text-center">
                
                <div className="row">
                    <div className="col">
                        <img src={user} className="w-10" alt="50% width image" width="400px" height="300px"></img>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col">{contact.name}</div>
                    <div className="col">{contact.email}</div>
                </div>
              </div>  
              </> 
    );
};

export default ContactDetail;