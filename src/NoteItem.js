import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';


function NoteItem({note,onUpdate,onDelete,token}) {
    const [isEditing,setIsEditing]=useState(false);
    const[title,setTitle]=useState(note.title);
    const[content,setContent]=useState(note.content);
    const[tags,setTags]=useState(note.tags || '');

    function handleUpdate(){
        fetch(`/notes/${note.id}`,{
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


  return (
    <div>NoteItem</div>
  )
}

export default NoteItem