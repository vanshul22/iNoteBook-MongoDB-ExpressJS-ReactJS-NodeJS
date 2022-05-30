import React, { useContext, useState } from 'react';
import noteContext from "../Context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  // Taken values by destructuring context.
  const { addNote } = context;

  // Create state to update the values.
  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  // Onchange changing the value from this function
  const onChange = (e) => {
    // Using Spread operator (...) The value inside note object it will remain same but those properties we are writing add or over write those properties.
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Submitting note here
  const handleClick = (e) => {
    // Preventing page to reload after submitting note.
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  return (
    <div>
      <h2> Add a Note </h2>
      <form className='my-4'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Note Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            placeholder="Add title here..."
            onChange={onChange}
          /></div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name='description'
            rows={2}
            defaultValue={""} placeholder={"Add description here..."}
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-dark' onClick={handleClick}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;