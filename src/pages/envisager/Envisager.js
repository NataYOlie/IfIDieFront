import React from 'react';
import {TaskList} from "../../components";
import "./envisager.css"


const Envisager = (props) => {

    return (
        <>
    <div className="step-list">
        <h1 >StepList</h1>
        <h2>Mes démarches</h2>
    </div>
    <div>
        <TaskList
            stepTasks={props.tasks}
            user={props.user} setUser={props.setUser}
            stepTasksDisplay={props.stepTasksDisplay}
            setStepTasksDisplayArray={(newStepTasksDisplays)=>props.setStepTasksDisplayArray(newStepTasksDisplays)}
        />
    </div>
            </>
)};

export default Envisager;