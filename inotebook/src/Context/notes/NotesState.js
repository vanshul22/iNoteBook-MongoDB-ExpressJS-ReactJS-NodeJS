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

    return (
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;