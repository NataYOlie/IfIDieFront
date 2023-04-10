import {nanoid} from "nanoid";
import React, {useEffect, useState} from "react";
import "./tasklist.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faEye, faCircle, faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core";
library.add(faEyeSlash, faEye, faCircle, faCircleCheck)


/**
 * This function Display StepTask in html to be rendered.
 */

export default function TaskList(props) {
    const [expanded, setExpanded] = useState(false);
    const [subtypeListState, setSubtypeListState] = useState([])
    const [newTaskDisplay,setNewTaskDisplay] = useState([])
    const [expandedTasks, setExpandedTasks] = useState([]);

    /**
     * This useEffect updates my rendered task everytime steptasks state changes
     */
    useEffect(() => {
        if (props.stepTasks && props.stepTasks.length >0) {
            stepTasksRender()
        };
    }, [props.stepTasks]);

    /**
     * This useEffect fetch StepTasks from ddb when launching app
     */
    useEffect(() => {(props.user ? (props.fetchUserStepTasks()):
        props.fetchDefaultStepTasks());
    }, []);

    useEffect(() => {
        // update subtypeListState here when props.stepTasks changes
        // ...
    }, [props.stepTasks]);

    /**
     * toggle expand ALL tasks
     */
    function toggleExpand() {
        setExpanded(!expanded);
        stepTasksRender()
    }

    /**
     * toggle expand one task
     * @param index
     */
    const toggleTask = (index) => {
        console.log('Toggle task called with index:', index);
        if (expandedTasks.includes(index)) {
            console.log("if toggle " + expandedTasks)
            setExpandedTasks(expandedTasks.filter((i) => i !== index));
        } else {
            console.log("else toggle" + expandedTasks)
            setExpandedTasks([...expandedTasks, index]);
        }
        stepTasksRender()
    };

    // function stepTasksRender() {
    //     console.log("stepTaskRender !")
    //     const newTaskDisplay = []
    //     console.log("Step Task Render " + props.stepTasks.length)
    //     for (let i = 0; i < props.stepTasks.length; i++) {
    //         newTaskDisplay.push(
    //             <div className="task" key={nanoid()}>
    //                 <div className="task-header"
    //                      key={nanoid()}>
    //                     <h1>{props.stepTasks[i].header}</h1>
    //                 </div>
    //                 {expanded && (
    //                     <div
    //                         key={nanoid()}
    //                         className="task-container">
    //                         <p key={nanoid()}>{props.stepTasks[i].description}</p>
    //                     </div>
    //                 )}
    //             </div>
    //         )
    //     }
    //     props.setStepTasksDisplayArray(newTaskDisplay)
    // }

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
                console.log("j'entre dans le if")
                //Enregistrer les tâches dans chacune de leur catégorie
                const newList = []
                console.log(newList)
                for (let n = 0; n < subtypeListState.length; n++) {
                    //Créer une liste du nom de la catégorie et y coller le début du bloc :
                    newList.push(<div className="task-category" key={nanoid()}><h1 key={nanoid()}>{(subtypeListState[n])}</h1></div>)
                    console.log("boucle 2 " + n)
                    console.log(subtypeListState[n])
                    console.log("props.stepTasks.length = " + props.stepTasks.length)
                    //Je boucle sur ma liste de tache et si le nom de la liste equals celui de la catégorie de la tache,
                    // je l'y mets d'dans
                    for (let i = 0; i < props.stepTasks.length; i++) {
                        console.log("boucle 3 " + i)
                        if (props.stepTasks[i].subtype === subtypeListState[n]) {
                            console.log(props.stepTasks[i].subtype + " et " + subtypeListState[n])
                            console.log('expandedTasks:', expandedTasks)
                            newList.push(
                                <div className="task" key={nanoid()}>
                                    <div className="task-header"
                                         key={nanoid()}>
                                        <div key={nanoid()} onClick={() => toggleTask(i)}><h1>{props.stepTasks[i].header}</h1></div>
                                        {props.stepTasks[i].visible ? (
                                            <FontAwesomeIcon icon="fa-solid fa-eye" size="lg" style={{color: "#12a3df"}} />
                                        ) : (<FontAwesomeIcon icon="fa-solid fa-eye-slash" size="sm" style={{color: "#ff4800"}} /> )}
                                        <FontAwesomeIcon icon="fa-circle" size="lg" className={props.stepTasks[i].task_color} key={nanoid()}/>

                                    </div>

                                    {expandedTasks.includes(i) && (
                                        <div
                                            key={nanoid()}
                                            className="task-container">
                                            <p key={nanoid()}>{props.stepTasks[i].description}</p>
                                        </div>
                                    )}
                                    {props.stepTasks[i].validationDate ? (
                                        <FontAwesomeIcon name="check" icon="fa-circle" size="lg" className={props.stepTasks[i].task_color} key={nanoid()}/>
                                    ) : (<FontAwesomeIcon name="check" icon="fa-circle-check" size="sm" className={props.stepTasks[i].task_color} key={nanoid()}/> )}
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
        <div className="tasklist section__padding">
        {/*<button className="expand-writeButton" key={nanoid()} onClick={toggleExpand}>*/}
        {/*    {expanded ? "Expand All" :  "Collapse All" }*/}
        {/*</button>*/}

            <div key={nanoid()} className="task-container">
                {props.stepTasksDisplay}
            </div>

        </div>


    )
}