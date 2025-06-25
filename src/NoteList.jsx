import React from "react";
import NoteItem from './NoteItem';

function NoteList ({notes,onUpdateNote,onDeleteNote,token}) {
    return (
        <div>
            {notes.map(note=>(
                <NoteItem key={note.id} note={note} token={token} onUpdate={onUpdateNote} onDelete={onDeleteNote} />
                ))}

        </div>
    );
}

export default NoteList
