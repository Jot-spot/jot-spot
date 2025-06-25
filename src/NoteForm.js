import React, { useState } from 'react';

function NoteForm({ onAddNote, token }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

function handleSubmit(e) {
    e.preventDefault();
    fetch('/notes', {
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
    <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated" />
        <button type="submit">Add Note</button>
    </form>
);
}

export default NoteForm;
