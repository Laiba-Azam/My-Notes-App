
import './App.css';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './COMPONENT/Navbar';

import NoteState from './context/NoteState';
import AddNotes from './COMPONENT/AddNotes';
import NotesAbout from './COMPONENT/NotesAbout';
import Log from './COMPONENT/Log';
import Sign from './COMPONENT/Sign';
import Alert from './COMPONENT/Alert';
function App() {
  const[alert,setalert]=useState(null);
  const setAlert=(type,message)=>{
    setalert({
      message:message,
      type:type
      
    })
    setTimeout(() => {
      setalert(null)
      
    }, 3000);
  }

  return (
    <>
  
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert dismiss={alert}/>
          <Routes>
            <Route exact path="/" element={<AddNotes setAlert={setAlert} />} />
            <Route exact path="/About" element={<NotesAbout setAlert={setAlert} />} />
            <Route exact path="/login" element={<Log setAlert={setAlert}/>} />
            <Route exact path="/signup" element={<Sign setAlert={setAlert}/>} />
            
          </Routes>
      </BrowserRouter>
    </NoteState>
    </>

  );
}

export default App;
