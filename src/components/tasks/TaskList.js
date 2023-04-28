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
    faSquareMinus, faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core";
import {Navigate} from "react-router";
import {Box, Modal} from "@mui/material";
import {CreateUserStepTaskForm} from "../index";
library.add(faEyeSlash, faEye, faCircle, faCircleCheck, faChevronUp,faSquarePlus,faSquareMinus, faCircleXmark)

/**
 * This function Display StepTask in html to be rendered.
 */


export default function TaskList(props) {
    const [expanded, setExpanded] = useState(false);
    const [subtypeListState, setSubtypeListState] = useState([]);
    const [newTaskDisplay,setNewTaskDisplay] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [toggleButton, setToggleButton] = useState("Déplier");

    //MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTimeout(window.location.reload.bind(window.location), 1000)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#FCD200FF',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        width:1000,
        maxHeight:700,
        overflowY:'scroll',
    };

    //TODAY
    const todayprepare = new Date;
    const today = todayprepare.toISOString().slice(0, 10);

    //Pour les commentaires, je créé une liste qui a la taille des step tasks

    const [comments, setComments] = useState(() => {
        return props.stepTasks
            ? props.stepTasks.map((task) => {
                if (!task.comment) {
                    return {
                        comment_id: task.id_task,
                        comment_header: task.header,
                        comment: "Ajoutez un commentaire",
                    };
                } else {
                    return {
                        comment_id: task.id_task,
                        comment_header: task.header,
                        comment: task.comment,
                    };
                }
            })
            : [];
    });

    const [previsionalDate, setPrevisionalDate] = useState(() => {
        return props.stepTasks
            ? props.stepTasks.map((task) => {
                if (!task.previsionalDate) {
                    return {
                        previsionalDate_id: task.id_task,
                        previsionalDate_header: task.header,
                        previsionalDate: today,
                    };
                } else {
                    return {
                        previsionalDate_id: task.id_task,
                        previsionalDate_header: task.header,
                        previsionalDate: today,
                    };
                }
            })
            : [];

    });

    /**
     * This useEffect updates my rendered task everytime steptasks state changes
     */
    useEffect(() => {
        if (props.stepTasks && props.stepTasks.length >0){
            stepTasksRender()
        }
    }, [props.stepTasks, props.setStepTasksDisplayArray, props.setStepTasksArray,
       props.updateStepTaskValidationDate]);


    /**
     * This useEffect sets comments const when entering steplist. If a user is connected, it fetches user tasks comments
     * otherwise it fetches DefaultSteptasks and comments default useState is what is used.
     */
    useEffect(() => {
        if (props.user) {
            setComments(props.stepTasks.map(task => ({comment_id:task.id_task,comment_header:task.header, comment:task.comment})))
        } else {
            props.fetchDefaultStepTasks();
        }
    }, [props.user]);

    /**
     * toggle expand ALL tasks
     */
    function toggleExpand() {
        if (props.stepTasks){
            if (props.stepTasks[0].visible){
                props.stepTasks.forEach((task) => {task.visible = false});
                setExpanded(false)
                setToggleButton("Déplier")
                stepTasksRender()
            }else {
                props.stepTasks.forEach((task) => {task.visible = true})
                setExpanded(true)
                setToggleButton("Plier")
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
            setTimeout(() => (comments[index].comment = value), 500);
            console.log("handleChangeComment steptaskid : " + props.stepTasks[index].id_task)
    }

    /**
     * This function is launched when saving steptasks
     */
    function handleSaveList() {
        const updatedStepTasks = [...props.stepTasks]
        console.log(updatedStepTasks[0].comment);
        if (props.user) {
            props.saveStepListTasks();
        } else {
            console.log("pas d'utilisateur");
            setShouldRedirect(true);
        }
    }

    const handleChangePrevDate = (i) => (event) => {
        setTimeout(()=> (previsionalDate[i].previsionalDate = (event.target.value)), 500);
    };

    function handleSavePrevDate(i) {
        console.log("handle PrevDate : " + i)
            //Si pas de user je demande de login
            if (props.user) {
                let index
                if (previsionalDate[i].previsionalDate_id) {
                    index = props.stepTasks.findIndex(task => task.id_task === previsionalDate[i].previsionalDate_id)
                    console.log("PREV DATE IF index : " + index + " et le PREVDATE ID : " + previsionalDate[i].previsionalDate_id)
                    props.updateStepTaskPrevisionalDate(index, previsionalDate[i].previsionalDate)

                } else {
                    index = props.stepTasks.findIndex(task => task.id_task === previsionalDate[i].previsionalDate_id)
                    console.log("ELSE index : " + index + " pourtant comments header " + comments[i].comment_header)
                    props.updateStepTaskPrevisionalDate(index, previsionalDate[i].previsionalDate)
                }
            } else {
                console.log("pas de user")
                props.setLoginRedirectMessage("Il faut se connecter pour enregistrer une liste de tâches")
                setShouldRedirect(true)
            }
    }

    function deleteTask(i) {
        console.log("DELETE TASK" + props.stepTasks[i].header);

        if (window.confirm(" ATTENTION CETTE ACTION EST IRREVERSIBLE ! Etes vous sur de vouloir supprimer la  tâche suivante : " +  props.stepTasks[i].header + " ?")){
            props.deleteTask(props.stepTasks[i])
        }
    }

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

                                            <h1 className="task-header">{props.stepTasks[i].header}</h1>
                                        </div>

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
                                            key={nanoid()}>
                                            <p key={nanoid()}>{props.stepTasks[i].description}</p>
                                                {props.stepTasks[i].commentEdit ?
                                                    (<div>
                                                    <textarea key={nanoid()}
                                                              defaultValue={props.stepTasks[i].comment}
                                                              placeholder="Ajouter un commentaire"
                                                              onChange={(e) => handleChangeComment(i, e.target.value)}></textarea>
                                                    <h2 onClick={(event)=>handleComment(i)}>Enregistrer mon choix </h2>
                                                        <div className="task-previsionalDate">
                                                            <p>Quand ?</p>
                                                            <input type="date"
                                                                   className="task-previsionalDate"
                                                                   defaultValue={props.stepTasks[i].previsionalDate}
                                                                   onChange={handleChangePrevDate(i)}
                                                                   onBlur={()=>handleSavePrevDate(i)}
                                                                   placeholder='date'/>
                                                        </div>
                                                    </div>)
                                                :
                                                    (<div key={nanoid()}
                                                          className="task-postit"
                                                          onClick={(event)=>handleComment(i)}>
                                                    <div className="comment"><p>{props.stepTasks[i].comment}</p></div>

                                                    </div>
                                                    )}

                                                    </div>
                                                )}

                                    {props.stepTasks[i].external_link  ? (
                                    <a href={props.stepTasks[i].external_link} target="_blank">En savoir plus...</a>):(<></>)}
                                    <div className="task-delete">
                                        <FontAwesomeIcon icon="fa-solid fa-circle-xmark"
                                                         size="xl"
                                                         className={props.stepTasks[i].task_color}
                                                         onClick={()=>deleteTask(i)}/>
                                    </div>
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
                            {props.stepTasksDisplay[0] ? toggleButton :  "Chargez les tâches"}
                    </button>)
                    : (
                        <button className="expand-writeButton"
                                key={nanoid()}
                                onClick={stepTasksRender}>
                                {props.stepTasks ? toggleButton :  "Chargez les tâches"}
                        </button>)}

                <div key={nanoid()} className="task-container">
                    {props.stepTasksDisplay}
                    <div>
                        {props.user ? (
                        <button className="add-writeButton" key={nanoid()} onClick={()=>handleOpen()}> Créer une tâche </button>):
                            null}
                        <button className="save-writeButton" key={nanoid()} onClick={()=>handleSaveList()}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={()=>handleClose()}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 1000 }}>
                    <CreateUserStepTaskForm
                        user={props.user}
                        addStepTask={props.addStepTask}
                        stepTasks={props.stepTasks}
                        fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                        setStepTasks={props.setStepTasks}
                        setLoginRedirectMessage={props.setLoginRedirectMessage}
                        stepTasksDisplay={props.stepTasksDisplay}
                        fetchUserStepTasks={props.fetchUserStepTasks}
                        handleClose={handleClose}
                        stepTasksRender={stepTasksRender}
                        handleSaveList={handleSaveList}
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
                        deleteTask={props.deleteTask}
                    />
                </Box>
            </Modal>
        </>


    )
}