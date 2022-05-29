import React, { useContext } from 'react';
import contextValue from "../Context/notes/noteContext"

const Home = () => {
    const context = useContext(contextValue)
    const { notes, setNotes } = context
    return (
        <div className='container my-4'>
            <h2>Add a Note :</h2>
            <form className='my-4'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                    /></div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        defaultValue={""} placeholder={"Add note here..."}
                    />
                </div>
                <button type='submit' className='btn btn-dark'>Add Note</button>
            </form>
            <h2 className='my-3'>Your Notes</h2>
        </div>
    );
};

export default Home;
