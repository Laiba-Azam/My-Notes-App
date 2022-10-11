import NoteContext from "./NoteContext";
import React, { useState } from "react";

// making state here
// things the we must write while using context api
// 1 <default contact.provider that i have export
// 2 parameter props (definetly)
// 3 give provider value = function that has state
// 4 use prop. childern
// basically jo cheez mujhay prvide krni hai woh mai state note func mai likh rhi hon or usko value func use krkay pass krwa rhi hon kisi particular childern mai
// last app.js mai jai or tamam state variable ko note js k andr lelen for eg 
// Solution <>{props.children}</>

// You should enclose  {props.childern} in Fragments. or any other tags that do not return null in any case.
const NoteState = (props) => {
  const intNote = []
  const host = "http://localhost:5000"

  const [notes, setNotes] = useState(intNote)
  const fetchnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'TOKEN': localStorage.getItem('TOKEN')
      },
    });
    const jsonn = await response.json()
    setNotes(jsonn)



  }
  // add note 
  const addnote = async (note) => {
    // server side
    // Default options are marked with *
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'TOKEN': localStorage.getItem('TOKEN')
      },
      body: JSON.stringify(note) // body data type must match "Content-Type" header
    });
    const jsonn = await response.json()

    // client side
    console.log("added a note")
    setNotes(notes.concat(note))



  }
  // del note
  const delnote = async (id) => {
    // client side
    console.log("del ")
    // means jiski id is given id k equal nhi h unko rkho or baki ko filter out krdo
    const filternote = await notes.filter((note) => { return note._id !== id })
    setNotes(filternote);
    // server side
    const response = await fetch(`${host}/api/notes/deletenotes/${id} `, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'TOKEN': localStorage.getItem('TOKEN')
      },
    });
    const jsonn = await response.json()
    console.log("deleted from database")

  }
  // update note
  const updatenote = async (id, title, description, tag) => {

    // logic to api call and update
    const response = await fetch(`${host}/api/notes/updatenotes/${id} `, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'TOKEN': localStorage.getItem('TOKEN')
      },
      // A common use of JSON is to exchange data to/from a web server.

      // When sending data to a web server, the data has to be a string.

      // Convert a JavaScript object into a string with JSON.stringify().
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const jsonn = await response.json()
    console.log(jsonn);




    // logic to edit in client side
    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }



    }
    setNotes(newnotes);


  }

  return (
    <NoteContext.Provider value={{ notes, addnote, delnote, updatenote, fetchnote }}>
      <>{props.children}</>

    </NoteContext.Provider>
  )



}
export default NoteState;