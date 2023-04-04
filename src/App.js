import './App.css';
import './index.css';
import {Navbar,Footer} from './components'
import {Home, Item, Envisager, AdminBoard} from './pages'
import { Routes, Route,  } from "react-router-dom";
import SecurityController from "./pages/login/SecurityController";
import React, {useState} from "react";
import RegisterController from "./pages/register/RegisterController";
import Space from "./pages/space/Space";
import AdminBoardController from "./pages/adminBoard/AdminBoardController";

function App() {

    const [user, setUser] = useState(null);
    const [stepTasks, setStepTasks] = useState([]);


  return (
    <div>
      <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/envisager"
                   element={<Envisager user={user} setUser={setUser} tasks={stepTasks} setTasks={setStepTasks} /> } />
            <Route path="/space/:id" element={<Space />} />
            <Route path="/login" element={<SecurityController user={user} setUser={setUser} />} />
            <Route path="/register" element={ <RegisterController user={user} setUser={setUser}/>} />
            <Route path="/register/validation"  user={user} setUser={setUser}/>} />
            <Route path="/adminboard" element={<AdminBoardController user={user} setUser={setUser} stepTasks={stepTasks} setStepTasks={setStepTasks}/>} />
          </Routes>


    </div>
  );
}

export default App;
