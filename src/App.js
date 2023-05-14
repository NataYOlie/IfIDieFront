import './App.css';
import './index.css';
import {Navbar} from './components'
import {
    Home,
    Item,
    StepList,
    Space,
    SecurityController,
    RegisterController,
    AdminBoardController,
} from './pages'
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
            <Route path="/mettre_en_ordre"
                   element={<StepList user={props.user} setUser={props.setUser}
                                       setLoginRedirectMessage={props.setLoginRedirectMessage}
                                       stepTasks={props.stepTasks}
                                       setTasks={props.setStepTasks}
                                       refresh={props.refresh}
                                       updateStepTask = {props.updateStepTask}
                                       updateStepTaskComment = {props.updateStepTaskComment}
                                       updateStepTaskVisible={props.updateStepTaskVisible}
                                       updateStepTaskValidationDate = {props.updateStepTaskValidationDate}
                                       updateStepTaskPrevisionalDate = {props.updateStepTaskPrevisionalDate}
                                       stepTasksRender={()=>props.stepTasksRender()}
                                       stepTasksDisplay={props.stepTasksDisplay}
                                       fetchUserStepTasks={props.fetchUserStepTasks}
                                       fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                                       saveStepListTasks={props.saveStepListTasks}
                                       setStepTasksArray={(newStepTasks)=>props.setStepTasksArray(newStepTasks)}
                                       deleteTask={props.deleteTask}
                                       setStepTasksDisplayArray={(newStepTasksDisplays)=>props.setStepTasksDisplayArray(newStepTasksDisplays)}/>} />
            <Route path="/space/:id" element={<Space user={props.user} setUser={props.setUser} stepTasks={props.stepTasks}  fetchUserStepTasks={props.fetchUserStepTasks}/>} />
            <Route path="/login" element={<SecurityController user={props.user} setUser={props.setUser} addStepTasks={props.addStepTask} fetchUserStepTasks={props.fetchUserStepTasks}
                                                              login_label={props.login_label} setLoginRedirectMessage={props.setLoginRedirectMessage} />} />
            <Route path="/register" element={ <RegisterController user={props.user} setUser={props.setUser} setLoginRedirectMessage={props.setLoginRedirectMessage}/>} />
            <Route path="/register/validation"  user={props.user} setUser={props.setUser}/>}
            <Route path="/adminboard" element={<AdminBoardController             stepTasks={props.stepTasks}
                                                                                 user={props.user} setUser={props.setUser}
                                                                                 setLoginRedirectMessage={props.setLoginRedirectMessage}
                                                                                 stepTasksDisplay={props.stepTasksDisplay}
                                                                                 fetchUserStepTasks={props.fetchUserStepTasks}
                                                                                 fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                                                                                 saveStepListTasks={props.saveStepListTasks}
                                                                                 setStepTasksArray={(newStepTasks)=>props.setStepTasksArray(newStepTasks)}
                                                                                 setStepTasksDisplayArray={(newStepTasksDisplays)=>props.setStepTasksDisplayArray(newStepTasksDisplays)}
                                                                                 refresh={props.refresh}
                                                                                 updateStepTask = {props.updateStepTask}
                                                                                 updateStepListTask = {props.updateStepListTask}
                                                                                 updateStepTaskComment = {props.updateStepTaskComment}
                                                                                 updateStepTaskVisible={props.updateStepTaskVisible}
                                                                                 updateStepTaskValidationDate = {props.updateStepTaskValidationDate}
                                                                                 deleteTask={props.deleteTask}
                                                                                 updateStepTaskPrevisionalDate = {props.updateStepTaskPrevisionalDate} />}
            />
          </Routes>
    </>
  );
}

