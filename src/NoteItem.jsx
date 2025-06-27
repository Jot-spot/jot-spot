import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';


function NoteItem({note,onUpdate,onDelete,token}) {
    const [isEditing,setIsEditing]=useState(false);
    const[title,setTitle]=useState(note.title);
    const[content,setContent]=useState(note.content);
    const[tags,setTags]=useState(note.tags || '');

    function handleUpdate(){
        fetch(`http://localhost:5000/notes/${note.id}`, {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`,
            },
            body: JSON.stringify({title,content,tags})
        })
        .then(res => res.json())
        .then(updatedNote => {
            onUpdate(updatedNote);
        setIsEditing(false)
    });
    }

    function handleDelete(){
        fetch(`http://localhost:5000/notes/${note.id}`, {
            method: 'DELETE',
            headers:{Authorization:`Bearer ${token}`}
        })
        .then(()=>onDelete(note.id));
    }


  return (
    <div>
        {isEditing ? (
        <>
            <input value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea value={content} onChange={e => setContent(e.target.value)}/>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder='Tags' />
            <button onClick={handleUpdate}> Save </button>
        </>
        ) : (
            <>
            <h3>{note.title}</h3>
            <ReactMarkdown>{note.content}</ReactMarkdown>
            <p><strong>Tags:</strong> {note.tags}</p>
             <button onClick={()=> setIsEditing(true)}>Edit</button>
            </>
        )}
        <button onClick={handleDelete}>Delete </button>

    </div>
  )
}

export default NoteItem