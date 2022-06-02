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
    let responseData = await response.json()

    // Inserting data to their respective field.
    let note = {
      "_id": responseData._id,
      "user": responseData.user,
      "title": responseData.title,
      "description": responseData.description,
      "tag": responseData.tag,
      "date": responseData.data,
      "__v": responseData.__v
    };
    setNotes(notes.concat(note));
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    // API call from fetch API
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NzNkYjNmYzNiMzIwYThmMjI2MTg5In0sImlhdCI6MTY1NDA3ODk0N30.s22XZ9djk_5fzRP1YcF8jxcRjHGlTwMIxpkJ4Q__VAQ' }, body: JSON.stringify(title, description, tag) });
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
  const deleteNote = async (id) => {
    //  API call
    const url = `${host}/api/notes/deletenote/${id}`;
    // API call from fetch API
    const response = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NzNkYjNmYzNiMzIwYThmMjI2MTg5In0sImlhdCI6MTY1NDA3ODk0N30.s22XZ9djk_5fzRP1YcF8jxcRjHGlTwMIxpkJ4Q__VAQ' } });
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