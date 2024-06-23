import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import api from "../api/contacts";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const[searchTerm,setsearchTerm] = useState("");
  const[searchResults,setSearchResults] = useState([]);
  // Retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(contacts.map(contact => {
      return contact.id === id ? { ...response.data } : contact;
    }));
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContactList));
  };

  const getContactById = (id) => {
    return contacts.find(contact => contact.id === id);
  };

  const searchHandler=(searchTerm)=>{
    console.log(searchTerm);
    setsearchTerm(searchTerm);
    if(searchTerm!== ""){
      const newContactList = contacts.filter((contact)=>{
        console.log(Object.values(contact));
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    }
    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={
              <AddContact addContactHandler={addContactHandler} />
            }
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts:searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/contact/:id"
            element={
              <ContactDetail />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditContact updateContactHandler={updateContactHandler} getContactById={getContactById} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
