import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';


function NoteItem({note,onUpdate,onDelete,token}) {
    const [isEditing,setIsEditing]=useState(false);
    const[title,setTitle]=useState(note.title);
    const[content,setContent]=useState(note.content);
    const[tags,setTags]=useState(note.tags || '');

    
  return (
    <div>NoteItem</div>
  )
}

export default NoteItem