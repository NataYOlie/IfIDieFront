import React from 'react';
import {TaskList} from "../../components";
import "./envisager.css"
import cloud_simple from "../../assets/cloud_simple.svg";


const Envisager = (props) => {

    return (
        <>
    <div className="step-list">
        <img src={cloud_simple} alt={cloud_simple}/>
        <h1 >StepList</h1>
        <h2>Mes démarches</h2>
        <div className="steplist-intro">
        <p>Avant d’envisager de régler les détails de vos propres obsèques, nous vous invitons à engager une réflexion
            sur les valeurs et convictions qui sont les vôtres à ce moment précis de votre vie, en esquissant des
            réponses aux questions ci-dessous.
            <br/>
            <br/>
            Naturellement, nous ne formulons ces questions que pour vous inviter à un cheminement personnel.
            Vous pouvez aussi en discuter avec vos proches s’ils sont prêts à le faire.
            <ul>
                <li>Quel regard portez-vous sur le chemin parcouru et les événements majeurs de votre vie ?</li>
                <li>Quelles valeurs essentielles souhaitez-vous transmettre à vos proches ?</li>
                <li>Quelle image voulez-vous que l’on garde de vous ?</li>
                <li>Quel souvenir de vos obsèques voudriez-vous laisser à votre famille et à vos amis ?</li>
                <li>Quelle est votre attente par rapport à une cérémonie d’obsèques ?</li>
                <li>Quelles sont vos convictions quant au sens de la vie et de la mort ?</li>
                <li>Comment envisagez-vous les années à venir et qu’aimeriez-vous vivre avant votre départ ?</li>
            </ul>
        </p>
        </div>
    </div>
    <div>
        <TaskList
            stepTasks={props.stepTasks}
            user={props.user} setUser={props.setUser}
            stepTasksDisplay={props.stepTasksDisplay}
            fetchUserStepTasks={props.fetchUserStepTasks}
            fetchDefaultStepTasks={props.fetchDefaultStepTasks}
            saveStepListTasks={props.saveStepListTasks}
            setStepTasksArray={(newStepTasks)=>props.setStepTasksArray(newStepTasks)}
            setStepTasksDisplayArray={(newStepTasksDisplays)=>props.setStepTasksDisplayArray(newStepTasksDisplays)}
            updateStepTask = {props.updateStepTask}
        />
    </div>
            </>
)};

export default Envisager;