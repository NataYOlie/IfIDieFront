import './adminBoard.css';
import React from "react";
import {CreateDefaultStepTaskForm, StepTask} from '../../components'

export default function AdminBoard(props) {

    return(
        <>
            <CreateDefaultStepTaskForm
                createDefaultStepTask={(subtype, header, description, externalLink, taskColor)=>
                    props.createDefaultStepTask(subtype, header, description, externalLink, taskColor)}
                addStepTask={props.addStepTask}
                stepTasks={props.stepTasks}
                setStepTasks={props.setStepTasks}/>

            <StepTask stepTasks={props.stepTasks}
                      setStepTasks={props.setStepTasks} />
        </>

    )
}