import React from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import Notes from "./components/Notes"

function App() {
  const isLoggedIn = () => !!localStorage.getItem("token")
  return (
    <>
    <Router>
      <Routes>
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </Router>
    </>
  )
}

export default App
