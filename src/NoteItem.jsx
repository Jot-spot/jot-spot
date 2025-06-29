import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import  {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import  {faTrash} from '@fortawesome/free-solid-svg-icons';






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
            <button className="note-button" onClick={handleUpdate}> <FontAwesomeIcon icon={faFileArrowDown} /> Save </button>
        </>
        ) : (
            <>
            <h3 className="note-title" >{note.title}</h3>
            <div className="note-content" >
            <ReactMarkdown  >{note.content}</ReactMarkdown>
              </div>
            <p className="note-tags" ><strong>Tags:</strong> {note.tags}</p>
            <p className="note-timestamp">
            <strong>Created:</strong> {new Date(note.created_at).toLocaleString()}
             </p>



             <div className="note-actions">
  <button className="note-button" onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
  <button className="note-button delete-button" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Delete</button>
</div>

            </>
        )}
        
    </div>
  )
}

export default NoteItem