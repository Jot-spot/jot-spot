import { useState, useEffect } from 'react'

import './App.css'
import NoteForm from "./NoteForm"
import NoteList from "./NoteList"
import AuthForm from "./AuthForm"
function App() {


  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/notes', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setNotes(data));
    }
  }, [token]);

  function handleAddNote(newNote) {
    setNotes([newNote, ...notes]);
  }

  function handleUpdateNote(updatedNote) {
    const updated = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
    setNotes(updated);
  }


  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
    setNotes([]);
  }


  function handleDeleteNote(id) {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
  }


  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase()) ||
    (note.tags && note.tags.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className='App'>
      <h1 className='app-title'>My Notes</h1>
      {
        !token ? (
          <div className="auth-container">
          <AuthForm setToken={setToken} />
           </div>

        ) : (
          <div className="notes-section">
          <div className="notes-header">
            <button className="logout-button" onClick={handleLogout}>LogOut</button>
            <input 
             className="search-input"
            type="text" 
            name="" 
            id="" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder='Search by title,content'
            />
            </div>
            <NoteForm onAddNote={handleAddNote} token={token} />

            <NoteList 
            token={token}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
            notes={filteredNotes}/>
          </div>
        )
      }

    </div>
  )
}

export default App
