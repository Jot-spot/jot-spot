import { useState } from 'react'
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
      fetch('/notes', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setNotes(data));
    }
  }, [token]);
  return (
    <div>

    </div>
  )
}

export default App
