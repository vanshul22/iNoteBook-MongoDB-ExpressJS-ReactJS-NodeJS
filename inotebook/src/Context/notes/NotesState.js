import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    // API call from fetch API
    const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NjZhMzFhOTUwMGNhOTRlZTEyYzQxIn0sImlhdCI6MTY1NDAyNDgwNH0.Oxcd7aEwuTqA_KIzl_nvyWB13WylfmV5OhJCEv41wEU' } });
    let json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;
    // API call from fetch API
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NjZhMzFhOTUwMGNhOTRlZTEyYzQxIn0sImlhdCI6MTY1NDAyNDgwNH0.Oxcd7aEwuTqA_KIzl_nvyWB13WylfmV5OhJCEv41wEU' }, body: JSON.stringify(title, description, tag) });
    let note = {
      "_id": "6293dde91dfl4e29c56bhfd045",
      "user": "6293db6pd2472acd8c9425130",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-05-29T20:56:09.768Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    // API call from fetch API
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NjZhMzFhOTUwMGNhOTRlZTEyYzQxIn0sImlhdCI6MTY1NDAyNDgwNH0.Oxcd7aEwuTqA_KIzl_nvyWB13WylfmV5OhJCEv41wEU' }, body: JSON.stringify(title, description, tag) });
    const json = response.json;

    // Logic for frontend.
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      };
    };
  };
  // Delete a note
  const deleteNote = (id) => {
    // TODO API call
    // Deleting the notes here and then setit from setNotes.
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };


  return (
    <noteContext.Provider value={{ notes, setNotes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;