import React, { useContext, useState } from 'react';
import noteContext from "../Context/notes/noteContext";

const AddNote = () => {

  const context = useContext(noteContext);
  // Taken values by destructuring context.
  const { addNote } = context;

  // Create state to update the values.
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

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
    setNote({ title: "", description: "", tag: "" })
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
            minLength={5} required
            value={note.title}
          /></div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name='description'
            rows={2}
            placeholder={"Add description here..."}
            onChange={onChange}
            minLength={5} required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Add a Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name='tag'
            placeholder="Add tag here..."
            onChange={onChange}
            value={note.tag}
          /></div>
        <button disabled={note.title.length < 5 || note.description.length < 5} type='submit' className='btn btn-dark' onClick={handleClick}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;