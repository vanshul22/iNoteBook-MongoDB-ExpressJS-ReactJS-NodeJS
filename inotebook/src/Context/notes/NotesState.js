import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  const notesInitial = [
    {
      "_id": "6293dde91df4ee29c56bfd045",
      "user": "6293db6d2472acd8c9425130",
      "title": "Vanshul title 1",
      "description": "Wake up early morning.1",
      "tag": "General",
      "date": "2022-05-29T20:56:09.768Z",
      "__v": 0
    },
    {
      "_id": "6293dde91df4er29c56bfd045",
      "user": "6293db6d2472acd8c9425130",
      "title": "Vanshul title 2",
      "description": "Wake up early morning.2",
      "tag": "General 2",
      "date": "2022-05-29T20:56:09.768Z",
      "__v": 0
    },
    {
      "_id": "6293dde91dfu4e29c56bfd045",
      "user": "6293db6d2472acd8c9425130",
      "title": "Vanshul title 1",
      "description": "Wake up early morning.1",
      "tag": "General",
      "date": "2022-05-29T20:56:09.768Z",
      "__v": 0
    },
    {
      "_id": "6293dde91df4e29c5w6bfd045",
      "user": "6293db6d2472acd8c9425130",
      "title": "Vanshul title 2",
      "description": "Wake up early morning.2",
      "tag": "General 2",
      "date": "2022-05-29T20:56:09.768Z",
      "__v": 0
    },
    {
      "_id": "6293dde9d1df4e29c56bfd045",
      "user": "6293db6d2472acd8c9425130",
      "title": "Vanshul title 1",
      "description": "Wake up early morning.1",
      "tag": "General",
      "date": "2022-05-29T20:56:09.768Z",
      "__v": 0
    },
    {
      "_id": "6293dde91df4e29c56bhfd045",
      "user": "6293db6d2472acd8c9425130",
      "title": "Vanshul title 2",
      "description": "Wake up early morning.2",
      "tag": "General 2",
      "date": "2022-05-29T20:56:09.768Z",
      "__v": 0
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = (title, description, tag) => {
    // TODO API call.
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
  const editNote = (id, title, description,tag) => { };
  // Delete a note
  const deleteNote = (id) => {
    // TODO API call
    // Deleting the notes here and then setit from setNotes.
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };


  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;