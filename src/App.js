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

function App() {

    const [user, setUser] = useState(null);
    const [stepTasks, setStepTasks] = useState([]);
    const [stepTasksDisplay, setStepTasksDisplay] = useState([]);


    function addStepTask(newStepTask) {
        if (stepTasks && stepTasks.length > 0) {
            setStepTasks([...stepTasks, newStepTask]);
            console.log("addsteptask if")
            stepTasksRender()
            console.log("addStepTask " + newStepTask.header)
        } else setStepTasks([newStepTask])
        console.log("addsteptask else")
        stepTasksRender();
    }

    function setStepTasksArray(newStepTasks) {
        setStepTasks(newStepTasks)
    }

    function stepTasksRender (){
        const newTaskDisplay = []
        console.log("Step Task Render " + stepTasks.length)
        for (let i=0 ; i < stepTasks.length ; i++){
            newTaskDisplay.push(
                <div className="section__padding">
                    <div className="task">
                        <div>
                            <h1>loulou {stepTasks[i].header}</h1>
                        </div>
                        <div>
                            <p>lala {stepTasks[i].description}</p>
                        </div>
                    </div>
                </div>        )

        }

        setStepTasksDisplay(newTaskDisplay)
        console.log(stepTasksDisplay.length)
    }


  return (
    <div>
      <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/envisager"
                   element={<Envisager user={user} setUser={setUser}
                                       tasks={stepTasks}
                                       setTasks={setStepTasks}
                                       stepTasksDisplay = {stepTasksDisplay}/> } />
            <Route path="/space/:id" element={<Space />} />
            <Route path="/login" element={<SecurityController user={user} setUser={setUser} addStepTasks={addStepTask}/>} />
            <Route path="/register" element={ <RegisterController user={user} setUser={setUser}/>} />
            <Route path="/register/validation"  user={user} setUser={setUser}/>} />
            <Route path="/adminboard" element={<AdminBoardController user={user}
                                                                     setUser={setUser}
                                                                     addStepTask={addStepTask}
                                                                     stepTasks={stepTasks}
                                                                     setStepTasks={setStepTasks}
                                                                     setStepTasksArray = {setStepTasksArray}
                                                                     stepTasksDisplay = {stepTasksDisplay}
                                                                                                />} />
          </Routes>
    </div>
  );
}

export default App;
