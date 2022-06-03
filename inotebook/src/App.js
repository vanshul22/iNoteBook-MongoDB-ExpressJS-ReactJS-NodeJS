import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NotesState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  // Showing alert type with message. Till 5 second
  const showAlert = (message, type) => {
    setAlert({ msg: message, typ: type });
    setTimeout(() => { setAlert(null) }, 5000);
  };
  return (
    < >
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
