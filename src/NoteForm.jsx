import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';




function NoteForm({ onAddNote, token }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({ title, content, tags })
    })

    .then(res => res.json())
    .then(newNote => {
      onAddNote(newNote);
      setTitle('');
      setContent('');
      setTags('');
    });
}

return (
    <form className="note-form" onSubmit={handleSubmit}>
        <input  className="note-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea className="note-textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <input className="note-input"  value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags comma separated)"/>
        <button className="note-button" type="submit"><FontAwesomeIcon icon={faCirclePlus} /> Add Note</button>
    </form>
);
}

export default NoteForm;
