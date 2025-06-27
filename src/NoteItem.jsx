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
    <div className="note-item">
        {isEditing ? (
        <>
            <input  className="note-input" value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea className="note-textarea" value={content} onChange={e => setContent(e.target.value)}/>
            <input  className="note-input" value={tags} onChange={e => setTags(e.target.value)} placeholder='Tags' />
            <button className="note-button" onClick={handleUpdate}> Save </button>
        </>
        ) : (
            <>
            <h3 className="note-title" >{note.title}</h3>
            <ReactMarkdown className="note-content" >{note.content}</ReactMarkdown>
            <p className="note-tags" ><strong>Tags:</strong> {note.tags}</p>
             <button className="note-button" onClick={()=> setIsEditing(true)}>Edit</button>
            </>
        )}
        <button className="note-button delete-button" onClick={handleDelete}>Delete </button>

    </div>
  )
}

export default NoteItem