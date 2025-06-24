import { useState } from 'react'
import './App.css'
import NoteForm from "./NoteForm"
import NoteList from "./NoteList"
import AuthForm from "./AuthForm"
function App() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [search, setSearch] = useState('');

  return (
    <div>

    </div>
  )
}

export default App
