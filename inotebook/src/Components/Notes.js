import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../Context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, []);

  // We are refering below of jsx modal by using useRef.
  const refOpenModal = useRef(null);
  const refCloseModal = useRef(null);

  // Create function to open modal.
  const updateNote = (currentNote) => {
    refOpenModal.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  // Create state to update the values.
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  // Onchange changing the value from this function
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Submitting note here
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refCloseModal.current.click();
  };

  return (
    <><>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refOpenModal}
      >

      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body"><form className='my-4'>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Note Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name='etitle'
                  placeholder="Add title here..."
                  value={note.etitle}
                  onChange={onChange}
                  minLength={5} required
                /></div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="edescription"
                  name='edescription'
                  rows={4}
                  placeholder={"Add description here..."}
                  value={note.edescription}
                  onChange={onChange}
                  minLength={5} required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Add a Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name='etag'
                  placeholder="Add tag here..."
                  value={note.etag}
                  onChange={onChange}
                /></div>
            </form></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refCloseModal}
              >
                Cancel
              </button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

      <AddNote />
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to Display"}</div>
        {notes.map((note) => <NoteItem key={note._id} note={note} updateNote={updateNote} />)}
      </div>
    </>
  );
};

export default Notes;
