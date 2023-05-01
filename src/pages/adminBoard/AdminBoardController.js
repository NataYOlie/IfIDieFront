import React, {useEffect, useState} from "react";
import {AdminBoard} from "../index";
import './adminBoard.css';


export default function AdminBoardController(props) {

        return (
            <>

            <AdminBoard
                user={props.user}
                // createDefaultStepTask={createDefaultStepTask}
                stepTasks={props.stepTasks}
                addStepTask={(newStepTask)=>props.addStepTask(newStepTask)}
                setStepTasks={props.setStepTasks}
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
                updateStepTaskPrevisionalDate = {props.updateStepTaskPrevisionalDate}
            />

            </>
        );
    }

