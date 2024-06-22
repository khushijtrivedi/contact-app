import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch,Route ,Routes} from "react-router-dom";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import api from "../api/contacts";
import { v4 as uuidv4 } from 'uuid';
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  //retrieve contacts
  const retreiveContacts = async()=>{
    const response =await  api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async(contact) => {
   console.log(contact);
    
    const request = {
      id: uuidv4(),
      ...contact
    };

    const response = await api.post("/contacts",request);
    setContacts([...contacts,response.data]);
    
    // window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
    // console.log("Contacts after adding:", updatedContacts);
  };

  const updateContactHandler = async (contact) =>{
    const response = await api.put(`/contacts/${contact.id}`,contact);
    const {id} = response.data;
    setContacts(contacts.map(contact=>{
      return contact.id === id? {...response.data} : contact;
    }));
  };

  const removeContactHandler =async (id)=>{
    await api.delete(`/contacts/${id}`);
    
    const newContactList = contacts.filter((contact)=>{
      return contact.id !==id;
    });

    setContacts(newContactList);
     window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContactList));
  };

  useEffect(() => {
    // const retrievedContacts = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrievedContacts) {
    //   setContacts(retrievedContacts);
    //   console.log("Contacts retrieved from local storage:", retrievedContacts);
    // }
    const getAllContacts = async()=>{
      const allContacts = await retreiveContacts();
      if(allContacts){
        setContacts(allContacts);
      }
    }
    getAllContacts();
  }, []);

  

  return (
    <>
      <Router>
          <Header />
          <Routes>
            <Route 
            path="/add" 
            element={
              <AddContact addContactHandler={addContactHandler}/>
            }
           />
            <Route 
              path="/" 
              
              element={
                <ContactList
                contacts={contacts} 
                getContactId ={removeContactHandler}
                >
                  
                </ContactList>
              }
            />

            <Route
            path="/contact/:id" 
            element={
              <ContactDetail/>
            }
            />

            <Route 
            path="/edit" 
            element={
              <EditContact updateContactHandler={updateContactHandler}/>
            }
           />
          </Routes>
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId ={removeContactHandler} /> */}
      </Router>
      
    </>
  );
}

export default App;
