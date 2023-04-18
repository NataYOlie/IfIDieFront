import './App.css';
import './index.css';
import {Navbar} from './components'
import {Home, Item, Envisager, Space, SecurityController, RegisterController, AdminBoardController} from './pages'
import { Routes, Route,  } from "react-router-dom";


export default function App(props) {

  return (
    <>
      <Navbar logout={props.logout} user={props.user}  setUser={props.setUser} setStepTasksDisplayArray={(newStepTasksDisplays)=>props.setStepTasksDisplayArray(newStepTasksDisplays)}/>
          <Routes>
            <Route path="/" element={<Home
                currentFunnyDeath = {props.currentFunnyDeath}
                refreshFunnyDeath = {props.refreshFunnyDeath}
                getRandomFunnyDeath={props.getRandomFunnyDeath}/>} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/envisager"
                   element={<Envisager user={props.user} setUser={props.setUser}
                                       setLoginRedirectMessage={props.setLoginRedirectMessage}
                                       stepTasks={props.stepTasks}
                                       setTasks={props.setStepTasks}
                                       updateStepTask = {props.updateStepTask}
                                       updateStepTaskComment = {props.updateStepTaskComment}
                                       updateStepTaskVisible={props.updateStepTaskVisible}
                                       updateStepTaskValidationDate = {props.updateStepTaskValidationDate}
                                       stepTasksRender={()=>props.stepTasksRender()}
                                       stepTasksDisplay={props.stepTasksDisplay}
                                       fetchUserStepTasks={props.fetchUserStepTasks}
                                       fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                                       saveStepListTasks={props.saveStepListTasks}
                                       setStepTasksArray={(newStepTasks)=>props.setStepTasksArray(newStepTasks)}
                                       setStepTasksDisplayArray={(newStepTasksDisplays)=>props.setStepTasksDisplayArray(newStepTasksDisplays)}/>} />
            <Route path="/space/:id" element={<Space />} />
            <Route path="/login" element={<SecurityController user={props.user} setUser={props.setUser} addStepTasks={props.addStepTask}
                                                              login_label={props.login_label} setLoginRedirectMessage={props.setLoginRedirectMessage}/>} />
            <Route path="/register" element={ <RegisterController user={props.user} setUser={props.setUser}/>} />
            <Route path="/register/validation"  user={props.user} setUser={props.setUser}/>}
            <Route path="/adminboard" element={<AdminBoardController user={props.user}
                                                                     setUser={props.setUser}
                                                                     fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                                                                     addStepTask={(newStepTask)=>props.addStepTask(newStepTask)}
                                                                     stepTasks={props.stepTasks}
                                                                     setStepTasksDisplayArray={props.setStepTasksDisplayArray}
                                                                     stepTasksDisplay={props.stepTasksDisplay} />}
            />
          </Routes>
    </>
  );
}

