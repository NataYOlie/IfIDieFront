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
        <p>Il vous faudra naturellement bien moins de temps pour mourir que pour préparer votre mort, c'est pourquoi nous
            vous conseillons de vous y mettre le plus tôt possible !
            <br/>
            <br/>
            Naturellement, nous ne formulons ces questions que pour vous inviter à un cheminement personnel.
            Vous pouvez aussi en discuter avec vos proches s’ils sont prêts à le faire.
            <div>
            <ul>
                <li>Quel regard portez-vous sur le chemin parcouru et les événements majeurs de votre vie ?</li>
                <li>Quelles valeurs essentielles souhaitez-vous transmettre à vos proches ?</li>
                <li>Quelle image voulez-vous que l’on garde de vous ?</li>
                <li>Quel souvenir de vos obsèques voudriez-vous laisser à votre famille et à vos amis ?</li>
                <li>Quelle est votre attente par rapport à une cérémonie d’obsèques ?</li>
                <li>Quelles sont vos convictions quant au sens de la vie et de la mort ?</li>
                <li>Comment envisagez-vous les années à venir et qu’aimeriez-vous vivre avant votre départ ?</li>
            </ul>
            </div>
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