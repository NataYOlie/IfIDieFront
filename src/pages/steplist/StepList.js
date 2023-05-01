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
        <h2>Döstädning</h2>
        <div className="steplist-intro">
            <p>Le <i>döstädning</i> est un terme suédois désignant le fait de <b>ranger sa vie pour préparer sa mort</b>.
                <br />
                <br/>
                Ce concept développé par Margareta Magnusson dans <i>La vie en ordre, L’art de ranger sa vie pour alléger celle des autres(Flammarion, 2018)</i>,
                n'est pas vraiment nouveau, depuis toujours cette démarche de mettre de l'ordre dans ses affaires à
                l'hiver de sa vie est pratiquée.
                <br />
                <br />
                Néanmoins il est également courant d'être surpris précocément par le destin et que ce soient celles
                et ceux qui restent, les proches
                endeuillé.e.s qui se retrouvent à gérer les affaires matérielles, à prendre des décisions difficiles alors mêmes
                que le choc, le chagrin, la colère parfois, ne permettent pas d'aborder sereinement l'ensemble des choses à faire
                quand un être cher nous quitte.
                <br/>
                <br/>
                Mettre ses affaires en ordre est à la fois un ultime geste d'élégance envers celles et ceux qui vous aiment
                ainsi qu'une démarche de dignité, une occasion d'agir et de décider pour nous même de ce qu'il advient
                de ce qui a constitué notre existence.
                <br/>
                <br/>
                Il n'est jamais trop tôt pour se poser ces questions, nous risquerions simplement de nous rappeler que
                la vie est un cadeau qui peut nous être repris.
                <br/>
                <br/>
                <center><b>Voici une liste non exhaustive qui pourrait constituer une base de réflexion,
                à vous de vous l'approprier en <a href="/register"><u>créant un compte sur la plateforme !</u></a></b></center>
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
            deleteTask={props.deleteTask}
        />
    </div>
            </>
)};

export default StepList;