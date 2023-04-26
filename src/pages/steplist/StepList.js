import React from 'react';
import {TaskList} from "../../components";
import "./steplist.css"
import cloud_simple from "../../assets/cloud_simple.svg";


const StepList = (props) => {

    return (
        <>
    <div className="step-list">
        <img src={cloud_simple} alt={cloud_simple}/>
        <h1 >Mettre en Ordre</h1>
        <h2>döstädning</h2>
        <div className="steplist-intro">
            <p>Ce terme suédois désigne le fait de ranger sa vie pour préparer sa mort, concept développé par Margareta
                Magnusson dans <i>La vie en ordre, L’art de ranger sa vie pour alléger celle des autres(Flammarion, 2018)</i>,
                n'est pas nouveau. Il est courant de s'inscrire dans une démarche similaire à l'hiver de sa vie, néanmoins il est
                également courant d'être surpris précocement par le destin et que ce soient celles et ceux qui restent, les proches
                endeuillé.e.s qui se retrouvent à gérer les affaires matérielles, à prendre des décisions difficiles alors mêmes
                que le choc, la chagrin, la colère parfois, ne permet pas d'aborder sereinement l'ensemble des choses à faire
                quand un être nous quitte.
                <br/>
                <br/>
                Mettre ses affaires en ordre est à la fois un ultime geste d'élégance envers celles et ceux qui vous aiment
                ainsi qu'une démarche de dignité, une occasion d'agir et de décider pour nous même de ce qu'il advient
                de ce qui a constitué notre existence.
                Il n'est jamais trop tôt pour se poser ces questions
            </p>
        </div>
    </div>
    <div>
        <TaskList
            stepTasks={props.stepTasks}
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
            updateStepTaskComment = {props.updateStepTaskComment}
            updateStepTaskVisible={props.updateStepTaskVisible}
            updateStepTaskValidationDate = {props.updateStepTaskValidationDate}
            updateStepTaskPrevisionalDate = {props.updateStepTaskPrevisionalDate}
        />
    </div>
            </>
)};

export default StepList;