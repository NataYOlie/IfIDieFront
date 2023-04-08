import './adminBoard.css';
import React from "react";
import {CreateDefaultStepTaskForm, StepTask, TaskList} from '../../components'

export default function AdminBoard(props) {


    return(
        <span>
            <CreateDefaultStepTaskForm
                user={props.user}
                addStepTask={props.addStepTask}
                // createDefaultStepTask={props.createDefaultStepTask}
                stepTasks={props.stepTasks}
                fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                setStepTasks={props.setStepTasks}/>

             <TaskList
                 stepTasks={props.tasks}
                 user={props.user} setUser={props.setUser}
                 stepTasksDisplay={props.stepTasksDisplay}
                 setStepTasksDisplayArray={props.setStepTasksDisplayArray}
             />

        </span>

    )
}