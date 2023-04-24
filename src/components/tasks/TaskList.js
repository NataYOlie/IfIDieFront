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
    const [shouldRedirect, setShouldRedirect] = useState(false);

    //TODAY
    const todayprepare = new Date;
    const today = todayprepare.toISOString().slice(0, 10);

    //Pour les commentaires, je créé une liste qui a la taille des step tasks
    const [comments, setComments] =
        useState(props.stepTasks.map(task => ({comment_id:task.id_task,comment_header:task.header, comment:task.comment})));

    /**
     * This useEffect.js updates my rendered task everytime steptasks state changes
     */
    useEffect(() => {
        if (props.stepTasks && props.stepTasks.length >0){
            stepTasksRender()
        }
    }, [props.stepTasks, props.setStepTasksDisplayArray, props.setStepTasksArray,
        props.updateStepTaskComment, props.updateStepTaskValidationDate]);

    /**
     * This useEffect.js sets comments const when entering steplist. If a user is connected, it fetches user tasks comments
     * otherwise it fetches DefaultSteptasks and comments default useState is what is used (empty strings).
     */
    useEffect(() => {
        if (props.user) {
            setComments(props.stepTasks.map(task => ({comment_id:task.id_task,comment_header:task.header, comment:task.comment})))
        } else {
            props.fetchDefaultStepTasks();
        }
    }, [props.user, props.updateStepTaskComment, props.stepTasks]);


    /**
     * toggle expand ALL tasks
     */
    function toggleExpand() {
        if (props.stepTasks){
            if (props.stepTasks[0].visible){
                props.stepTasks.forEach((task) => {task.visible = false});
                setExpanded(false)
                stepTasksRender()
            }else {
                props.stepTasks.forEach((task) => {task.visible = true})
                setExpanded(true)
                stepTasksRender()
            }
        }
    }

    /**
     * toggle expand one task
     * @param index
     */
    const toggleTask = (index) => {
        console.log('Toggle task called with index:', index);
        if (props.stepTasks[index].visible){
            props.stepTasks[index].visible = false
            props.updateStepTaskVisible(index, false)
        } else{
            props.stepTasks[index].visible = true
            props.updateStepTaskVisible(index, true)
        }
        stepTasksRender()

    };

    /**
     * This method set validationDate for the task (if task has a validation date, the task is checked, else (if the
     * date is set to null) then task is unchecked
     * @param index index of the task is the list (stepTasks)
     */
    const checkTask = (index) => {
        console.log("index : " + index)
        // console.log("validation date : " + props.stepTasks[index].validationDate + " // today : "+ today)
        if (props.stepTasks[index].validationDate){
            console.log("IF validation date : " + props.stepTasks[index].validationDate + " // index : "+ index)
            props.updateStepTaskValidationDate(index, null)
        } else{
            console.log("ELSE validation date : " + props.stepTasks[index].validationDate + " // index : "+ index)
            props.updateStepTaskValidationDate(index, today)
            }
        }


    function handleComment(i){
        // let commentTemp = props.stepTasks[i].commentEdit
        console.log("handle Comment : " + i)
        //Enregistrer le commentaire
        if (props.stepTasks[i].commentEdit) {
            //Si pas de user je demande de login
            if (props.user) {
                props.stepTasks[i].commentEdit = false
                let index
                if (comments[i].comment_id) {
                    index = props.stepTasks.findIndex(task => task.id_task === comments[i].comment_id)
                    console.log("IF index : " + index + " et le commentsID : " + comments[i].comment_id)
                    props.updateStepTaskComment(index, comments[i].comment)


                } else {
                    index = props.stepTasks.findIndex(task => task.header == comments[i].comment_header)
                    console.log("ELSE index : " + index + " pourtant comments header " + comments[i].comment_header)
                    props.updateStepTaskComment(index, comments[i].comment)
                }


            } else {
                console.log("pas de user")
                props.setLoginRedirectMessage("Il faut se connecter pour enregistrer une liste de tâches")
                setShouldRedirect(true)
            }


            //Mon choix
        } else {
            props.stepTasks[i].commentEdit = true
            console.log("handleComment TRUE " + props.stepTasks[i].comment)
            stepTasksRender()
        }
    }

    const handleChangeComment = (index, value) => {
            console.log("handle Change : " + comments[index].comment)
            // props.updateStepTaskComment(index,value)
            setTimeout(() => (comments[index].comment = value), 500);
            console.log("handleChangeComment steptaskid : " + props.stepTasks[index].id_task)
    }

    function updateComments (){
        setComments((prevComments) =>props.stepTasks.map(task => ({comment_id:task.id_task,comment_header:task.header,
            comment:task.comment})));
        stepTasksRender()
    }

    /**
     * This function is launched when saving steptasks
     */
    function handleSaveList() {
        const updatedStepTasks = [...props.stepTasks]
        console.log(updatedStepTasks[0].comment)
        if (props.user) {
            props.saveStepListTasks();
        } else {
            console.log("pas d'utilisateur");
            setShouldRedirect(true);
        }
    }

    const handleChangePrevDate = (index) => (event) => {
        const previsionalDate = event.target.value;
        props.updateStepTaskPrevisionalDate(index, previsionalDate)
    };


    function stepTasksRender() {
        console.log("stepTaskRender !")
        newTaskDisplay.length = 0;

        if (props.stepTasks && props.stepTasks.length > 0) {
            const steptasksMirror = props.stepTasks

            //Créer une liste de catégorie (subtype) - j'utilise un set pour éviter les doublons
            let subtypeList = new Set();
            for (let i = 0; i < props.stepTasks.length; i++) {
                subtypeList.add(steptasksMirror[i].subtype)
            }

            //je passe mon set en array parce que je suis plus à l'aise pour la suite pour le manipuler
            setSubtypeListState(Array.from(subtypeList))

            if (subtypeListState.length > 0) {
                //Enregistrer les tâches dans chacune de leur catégorie
                const newList = []
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
                                            <FontAwesomeIcon icon="fa-square-minus"
                                                             size="lg" style={{color: "#12a3df"}}
                                                             onClick={() => toggleTask(i)}/>
                                        ) : (<FontAwesomeIcon icon="fa-square-plus" size="lg"
                                                              style={{color: "#12a3df"}}
                                                              onClick={() => toggleTask(i)}/> )}
                                        <div key={nanoid()} onClick={() => toggleTask(i)}>

                                            <h1>{props.stepTasks[i].header}</h1></div>

                                        {props.stepTasks[i].validationDate ? (
                                            <div className="task-done">
                                                <FontAwesomeIcon icon="fa-circle-check"
                                                                 size="xl"
                                                                 className={props.stepTasks[i].task_color}
                                                                 onClick={()=>checkTask(i)}/>
                                                <h4>OK</h4>
                                            </div>

                                        ) : (
                                            <div className="task-done">
                                            <FontAwesomeIcon icon="fa-circle"
                                                              size="xl"
                                                              className={props.stepTasks[i].task_color}
                                                              onClick={()=>checkTask(i)}/>
                                                <h4>En attente</h4>
                                            </div>
                                                )}

                                    </div>

                                    {props.stepTasks[i].visible && (
                                        <div
                                            key={nanoid()}
                                            className="task-container">
                                            <p key={nanoid()}>{props.stepTasks[i].description}</p>
                                                {props.stepTasks[i].commentEdit ?
                                                    (<div>
                                                    <textarea key={nanoid()}
                                                              defaultValue={props.stepTasks[i].comment}
                                                              placeholder="Ajouter un commentaire"
                                                              onChange={(e) => handleChangeComment(i, e.target.value)}></textarea>
                                                    <h2 onClick={(event)=>handleComment(i)}>Enregistrer mon choix </h2></div>)
                                                :
                                                    (<div key={nanoid()}
                                                          className="comment-container"
                                                          onClick={(event)=>handleComment(i)}>
                                                    <div className="comment"><p>{props.stepTasks[i].comment}</p></div>
                                                    {/*<h2 onClick={(event)=>handleComment(i)}>Modifier</h2>*/}
                                                    </div>
                                                    )}
                                            <div>
                                                <p>Prévu pour le :</p>
                                                <input type="date"
                                                       className="task-previsionnalDate"
                                                       defaultValue={props.stepTasks[i].previsionalDate}
                                                       onChange={handleChangePrevDate(i)}
                                                       placeholder='date'/>
                                            </div>
                                                    </div>
                                                )}


                                    {props.stepTasks[i].external_link  ? (
                                    <a href={props.stepTasks[i].external_link} target="_blank">En savoir plus...</a>):(<></>)}
                                </div>
                            )
                            //A chaque tâche traitée je l'ajoute à la liste entière
                        }
                    }
                }
                //J'ai fait une catégorie, je passe à la suivante
                newTaskDisplay.push(newList)

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
                {props.stepTasks ? (
                    <button className="expand-writeButton"
                            key={nanoid()}
                            onClick={toggleExpand}>
                            {props.stepTasksDisplay[0] ? "Toggle" :  "Chargez les tâches"}
                    </button>)
                    : (
                        <button className="expand-writeButton"
                                key={nanoid()}
                                onClick={stepTasksRender}>
                                {props.stepTasks ? "Toggle" :  "Chargez les tâches"}
                        </button>)}

                <div key={nanoid()} className="task-container">
                    {props.stepTasksDisplay}
                    <button className="save-writeButton" key={nanoid()} onClick={()=>handleSaveList()}>
                        Enregistrer
                    </button>
                </div>


            </div>
        </>


    )
}