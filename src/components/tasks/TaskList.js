import {nanoid} from "nanoid";
import React, {useEffect, useState} from "react";
import "./tasklist.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core";
library.add(faEyeSlash, faEye)


/**
 * This function Display StepTask in html to be rendered.
 */

export default function TaskList(props) {
    const [expanded, setExpanded] = useState(false);
    const [subtypeListState, setSubtypeListState] = useState([])
    const [newTaskDisplay,setNewTaskDisplay] = useState([])


    /**
     * This useEffect updates my rendered task everytime steptasks state changes
     */
    useEffect(() => {
        if (props.stepTasks && props.stepTasks.length >0) {
            stepTasksRender()
        };
    }, [props.stepTasks]);

    function toggleExpand() {
        setExpanded(!expanded);
        stepTasksRender()
    }

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
                    newList.push(<div className="task-category"><h1>{(subtypeListState[n])}</h1></div>)
                    console.log("boucle 2 " + n)
                    console.log(subtypeListState[n])
                    console.log("props.stepTasks.length = " + props.stepTasks.length)
                    //Je boucle sur ma liste de tache et si le nom de la liste equals celui de la catégorie de la tache,
                    // je l'y mets d'dans
                    for (let i = 0; i < props.stepTasks.length; i++) {
                        console.log("boucle 3 " + i)
                        if (props.stepTasks[i].subtype === subtypeListState[n]) {
                            console.log(props.stepTasks[i].subtype + " et " + subtypeListState[n])
                            newList.push(
                                <div className="task" key={nanoid()}>
                                    <div className="task-header"
                                         key={nanoid()}>
                                        <div key={nanoid()}><h1>{props.stepTasks[i].header}</h1></div>
                                        {props.stepTasks[i].visible ? (
                                            <FontAwesomeIcon icon="fa-solid fa-eye" size="lg" style={{color: "#12a3df"}} />
                                        ) : (<FontAwesomeIcon icon="fa-solid fa-eye-slash" size="sm" style={{color: "#ff4800"}} /> )}

                                        <div className={props.stepTasks[i].task_color} key={nanoid()}></div>
                                    </div>
                                    {expanded && (
                                        <div
                                            key={nanoid()}
                                            className="task-container">
                                            <p key={nanoid()}>{props.stepTasks[i].description}</p>
                                        </div>
                                    )}
                                    {props.stepTasks[i].validationDate ? (
                                        <FontAwesomeIcon icon="fa-solid fa-eye" size="lg" style={{color: "#12a3df"}} />
                                    ) : (<FontAwesomeIcon icon="fa-solid fa-eye-slash" size="sm" style={{color: "#ff4800"}} /> )}
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

            //
            //     switch (props.stepTasks.subtype) {
            //         case "Famille":
            //             newTaskDisplayFamille.push()
            //             break;
            //         case "Administratif":
            //             newTaskDisplayAdministratif.push()
            //             break;
            //         case "Santé":
            //             newTaskDisplaySante.push()
            //             break;
            //         case "Transmission":
            //             newTaskDisplayTransmission.push()
            //             break;
            //         case "Obsèques":
            //             newTaskDisplayObseques.push()
            //             break;
            //         default :
            //             newTaskDisplayAutre.push()
            //             break;
            //     }
            //
            //     newTaskDisplay.push(
            //         <div className="task" key={nanoid()}>
            //             <div className="task-header"
            //                  key={nanoid()}>
            //                 <h1>{props.stepTasks[i].header}</h1>
            //             </div>
            //             {expanded && (
            //                 <div
            //                     key={nanoid()}
            //                     className="task-container">
            //                     <p key={nanoid()}>{props.stepTasks[i].description}</p>
            //                 </div>
            //             )}
            //         </div>
            //     )
            // }

    //         props.setStepTasksDisplayArray(newTaskDisplay)
    //     }
    // }

    return (
        <div className="tasklist section__padding">
        <button className="expand-writeButton" key={nanoid()} onClick={toggleExpand}>
            {expanded ? "Expand All" :  "Collapse All" }
        </button>

            <div className="task-container">
                {props.stepTasksDisplay}
            </div>

        </div>


    )
}