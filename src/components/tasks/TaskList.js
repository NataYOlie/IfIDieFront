import {nanoid} from "nanoid";
import React, {useEffect, useState} from "react";
import "./tasklist.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEyeSlash,
    faEye,
    faCircle,
    faCircleCheck,
    faChevronUp,
    faSquarePlus,
    faSquareMinus
} from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core";
import {forEach} from "react-bootstrap/ElementChildren";
import {Link} from "react-router-dom";
import {Navigate} from "react-router";
library.add(faEyeSlash, faEye, faCircle, faCircleCheck, faChevronUp,faSquarePlus,faSquareMinus)




/**
 * This function Display StepTask in html to be rendered.
 */

export default function TaskList(props) {
    const [expanded, setExpanded] = useState(false);
    const [subtypeListState, setSubtypeListState] = useState([])
    const [newTaskDisplay,setNewTaskDisplay] = useState([])
    // const [comments, setComments] = useState('Hello');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    //TODAY
    const todayprepare = new Date;
    const today = todayprepare.toISOString().slice(0, 10);

    /**
     * This useEffect updates my rendered task everytime steptasks state changes
     */
    useEffect(() => {
        if (props.stepTasks && props.stepTasks.length >0) {
            stepTasksRender()
        };
    }, [props.stepTasks]);

    /**
     * This useEffect fetch StepTasks from ddb when launching app. If a user is connected, it fetches user tasks
     * otherwise it fetches DefaultSteptasks
     */
    useEffect(() => {(props.user ? (props.fetchUserStepTasks()):
        props.fetchDefaultStepTasks());
    }, []);


    /**
     * toggle expand ALL tasks
     */
    function toggleExpand() {
        if (props.stepTasks[0].visible){
            props.stepTasks.forEach((task) => {task.visible = false});
            setExpanded(false)
        }else {
            props.stepTasks.forEach((task) => {task.visible = true})
            setExpanded(true)
        }
        stepTasksRender()
    }

    /**
     * toggle expand one task
     * @param index
     */
    const toggleTask = (index) => {
        console.log('Toggle task called with index:', index);
        if (props.stepTasks[index].visible){
            props.stepTasks[index].visible = false
        } else{
            props.stepTasks[index].visible = true
        }
        stepTasksRender()
    };

    /**
     * This method set validationDate for the task (if task has a validation date, the task is checked, else (if the
     * date is set to null) then task is unchecked
     * @param index index of the task is the list (stepTasks)
     */
    const checkTask = (index) => {
        if (props.stepTasks[index].validationDate){
            props.stepTasks[index].validationDate = null
        } else{
                props.stepTasks[index].validationDate = today
            }
            stepTasksRender()
        }

    const handleComment = (i, value) => {
        let commentTemp

        //Enregistrer le commentaire
        if(props.stepTasks[i].commentEdit){
            props.stepTasks[i].commentEdit = false
            stepTasksRender()
        }
        //Mon choix
        else{
            props.stepTasks[i].commentEdit = true
            console.log("handleComment TRUE " + props.stepTasks[i].comment)
            stepTasksRender()
        }

    }

    function handleChangeComment(value, index){
        let commentTemp = props.stepTasks[index].comment
        console.log("handle Change : " + value)
        setTimeout(() => (props.stepTasks[index].comment = value), 800);

    }


    function handleSaveList(e) {
        if (props.user){
            e.preventDefault();
            props.saveStepListTasks(props.stepTasks)
            stepTasksRender()
        }else {
            console.log("pas d'utilisateur")
            setShouldRedirect(true)
        }
    }


    function stepTasksRender() {
        console.log("stepTaskRender !")
        newTaskDisplay.length = 0;

        if (props.stepTasks && props.stepTasks.length > 0) {
            const steptasksMirror = props.stepTasks
            console.log("Step Task Render " + props.stepTasks.length + " et son miroir " + steptasksMirror.length)

            //Créer une liste de catégorie (subtype) - j'utilise un set pour éviter les doublons
            let subtypeList = new Set();
            for (let i = 0; i < props.stepTasks.length; i++) {
                console.log("boucle 1 " + i)
                subtypeList.add(steptasksMirror[i].subtype)
                console.log(steptasksMirror[i].subtype + " taille de mon set " + subtypeList.size + " est de type " + typeof steptasksMirror[i].subtype)
            }
            //je passe mon set en array parce que je suis plus à l'aise pour la suite pour le manipuler
            setSubtypeListState(Array.from(subtypeList))
            console.log(subtypeListState.length)

            if (subtypeListState.length > 0) {
                //Enregistrer les tâches dans chacune de leur catégorie
                const newList = []
                console.log(newList)
                for (let n = 0; n < subtypeListState.length; n++) {
                    //Créer une liste du nom de la catégorie et y coller le début du bloc :
                    newList.push(<div className="task-category" key={nanoid()}><h1 key={nanoid()}>{(subtypeListState[n])}</h1></div>)
                    //Je boucle sur ma liste de tache et si le nom de la liste equals celui de la catégorie de la tache,
                    // je l'y mets d'dans
                    for (let i = 0; i < props.stepTasks.length; i++) {
                        if (props.stepTasks[i].subtype === subtypeListState[n]) {
                            let value = "";

                            newList.push(
                                <div className="task" key={nanoid()}>
                                    <div className="task-header"
                                         key={nanoid()}>
                                        {props.stepTasks[i].visible ? (
                                            <FontAwesomeIcon icon="fa-square-minus" size="lg" style={{color: "#12a3df"}} onClick={() => toggleTask(i)}/>
                                        ) : (<FontAwesomeIcon icon="fa-square-plus" size="lg" style={{color: "#12a3df"}} onClick={() => toggleTask(i)}/> )}
                                        <div key={nanoid()} onClick={() => toggleTask(i)}>

                                            <h1>{props.stepTasks[i].header}</h1></div>

                                        {props.stepTasks[i].validationDate ? (
                                            <FontAwesomeIcon icon="fa-circle" size="xl" className={props.stepTasks[i].task_color} onClick={()=>checkTask(i)}/>
                                        ) : (<FontAwesomeIcon icon="fa-circle-check" size="xl" className={props.stepTasks[i].task_color} onClick={()=>checkTask(i)}/> )}

                                    </div>

                                    {props.stepTasks[i].visible  && (
                                        <div
                                            key={nanoid()}
                                            className="task-container">
                                            <p key={nanoid()}>{props.stepTasks[i].description}</p>
                                            {props.stepTasks[i].commentEdit ? <div>
                                            <textarea key={nanoid()} defaultValue={props.stepTasks[i].comment} onChange={(e) => handleChangeComment(e.target.value, i)}></textarea>
                                                    <h2 onClick={(event)=>handleComment(i, value)}>Enregistrer mon choix </h2></div>:<div><div className="comment">{props.stepTasks[i].comment}</div>
                                                    <h2 onClick={(event)=>handleComment(i, value)}>Mon choix</h2>{props.stepTasks[i].comment}</div>}

                                        </div>
                                    )}
                                    {props.stepTasks[i].external_link  ? (
                                    <a href={props.stepTasks[i].external_link} target="_blank">En savoir plus...</a>):(<></>)}
                                </div>
                            )
                            console.log("task pushed " + props.stepTasks[i].header + " on en est à " + newList.length)
                            //A chaque tâche traitée je l'ajoute à la liste entière
                        }
                    }
                }
                //J'ai fait une catégorie, je passe à la suivante
                newTaskDisplay.push(newList)
                console.log(newList.length + " en tout : " + newTaskDisplay.length)
                //Pis je met à jour mon props quoi en lui collant ma liste de travail
                props.setStepTasksDisplayArray(newTaskDisplay)
            }
        }
    }
    return (
        <>
            {shouldRedirect && <Navigate replace to="/login" />}
            {/* rest of your component */}
            <div className="tasklist section__padding">
                <button className="expand-writeButton" key={nanoid()} onClick={toggleExpand}>
                    {!props.stepTasks[0].visible ? "Expand All" :  "Collapse All" }
                </button>

                <div key={nanoid()} className="task-container">
                    {props.stepTasksDisplay}
                    <button className="save-writeButton" key={nanoid()} onClick={(e)=>handleSaveList(e)}>
                        Enregistrer
                    </button>
                </div>


            </div>
        </>


    )
}