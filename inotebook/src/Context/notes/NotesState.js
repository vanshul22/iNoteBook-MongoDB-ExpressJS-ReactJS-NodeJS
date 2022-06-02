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
    const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NzNkYjNmYzNiMzIwYThmMjI2MTg5In0sImlhdCI6MTY1NDA3ODk0N30.s22XZ9djk_5fzRP1YcF8jxcRjHGlTwMIxpkJ4Q__VAQ' } });
    let json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;
    // API call from fetch API
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NzNkYjNmYzNiMzIwYThmMjI2MTg5In0sImlhdCI6MTY1NDA3ODk0N30.s22XZ9djk_5fzRP1YcF8jxcRjHGlTwMIxpkJ4Q__VAQ' }, body: JSON.stringify({ title, description, tag }) });
    let note = await response.json();
    // Setting note here
    setNotes(notes.concat(note));
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    // API call from fetch API
    const response = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NzNkYjNmYzNiMzIwYThmMjI2MTg5In0sImlhdCI6MTY1NDA3ODk0N30.s22XZ9djk_5fzRP1YcF8jxcRjHGlTwMIxpkJ4Q__VAQ' }, body: JSON.stringify({ title, description, tag }) });
    // eslint-disable-next-line
    const responseData = await response.json;
    // Creating new note and then updating. Because useState will not work from old variable here.
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic for frontend.
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      };
    };
    setNotes(newNotes);
  };

  // Delete a note
  const deleteNote = async (id) => {
    //  API call
    const url = `${host}/api/notes/deletenote/${id}`;
    // API call from fetch API
    const response = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NzNkYjNmYzNiMzIwYThmMjI2MTg5In0sImlhdCI6MTY1NDA3ODk0N30.s22XZ9djk_5fzRP1YcF8jxcRjHGlTwMIxpkJ4Q__VAQ' } });
    // eslint-disable-next-line
    const json = response.json;
    // Deleting the notes here and then setit from setNotes.
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, setNotes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;