import './App.css';
import './index.css';
import {Navbar} from './components'
import {Home, Item, Envisager} from './pages'
import { Routes, Route,  } from "react-router-dom";
import SecurityController from "./pages/login/SecurityController";
import React, {useEffect, useState} from "react";
import RegisterController from "./pages/register/RegisterController";
import Space from "./pages/space/Space";
import AdminBoardController from "./pages/adminBoard/AdminBoardController";
import AppController from "./AppController";

export default function App(props) {

  return (
    <>
      <Navbar user={props.user}  setUser={props.setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/envisager"
                   element={<Envisager user={props.user} setUser={props.setUser}
                                       tasks={props.stepTasks}
                                       setTasks={props.setStepTasks}
                                       stepTasksRender = {()=>props.stepTasksRender()}
                                       stepTasksDisplay = {props.stepTasksDisplay}/> } />
            <Route path="/space/:id" element={<Space />} />
            <Route path="/login" element={<SecurityController user={props.user} setUser={props.setUser} addStepTasks={props.addStepTask}/>} />
            <Route path="/register" element={ <RegisterController user={props.user} setUser={props.setUser}/>} />
            <Route path="/register/validation"  user={props.user} setUser={props.setUser}/>} />
            <Route path="/adminboard" element={<AdminBoardController user={props.user}
                                                                     setUser={props.setUser}
                                                                     addStepTask={(newStepTask)=>props.addStepTask(newStepTask)}
                                                                     stepTasks={props.stepTasks}
                                                                     setStepTasks={props.setStepTasks}
                                                                     setStepTasksArray = {props.setStepTasksArray}
                                                                     tasklist = {props.tasklist}
                                                                     stepTasksDisplay = {props.stepTasksDisplay}
                                                                                                />} />
          </Routes>
    </>
  );
}

