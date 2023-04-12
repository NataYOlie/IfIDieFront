import './adminBoard.css';
import React, {useState} from "react";
import {CreateDefaultStepTaskForm, StepTask, TaskList} from '../../components'

export default function AdminBoard(props) {
    const [toggleCreateTask, setToggleCreateTask]=useState(false)
    const [toggleCreateFunnyDeath, setToggleCreateFunnyDeath]=useState(false)
    const [toggleTaskList, setToggleTaskList]=useState(false)


    function ButtonSet (){
        return (
            <div className="adminBoard-button-container">
                <button className='adminBoard-white-writeButton'
                        type="submit"
                        onClick={()=>setToggleCreateTask(!toggleCreateTask)}>
                    Créer une tache
                </button>
                <button className='adminBoard-white-writeButton'
                        type="submit"
                        onClick={()=>setToggleCreateFunnyDeath(!toggleCreateFunnyDeath)}>
                Créer une funnydeath
                </button>
            </div>

        )
    }


    return(
        <div className="adminBoard section__padding">
            <div>
                <div className="adminBoard-container">
                <h1>Bienvenue cher Administratrice ! </h1>

                <div className="button-centered">
                <p>Que souhaitez vous faire ?</p>
                <ButtonSet />
                </div>
            </div>

            {toggleCreateTask &&(
                <>
                <CreateDefaultStepTaskForm
                    user={props.user}
                    addStepTask={props.addStepTask}
                    // createDefaultStepTask={props.createDefaultStepTask}
                    stepTasks={props.stepTasks}
                    fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                    setStepTasks={props.setStepTasks}/>

                <button className='adminBoard-white-writeButton'
                        type="submit"
                        onClick={()=> setToggleTaskList(!toggleTaskList)}>
                    Voir les tâches
                </button>
                </>)
            }

            {toggleTaskList && (
             <TaskList
                 stepTasks={props.tasks}
                 user={props.user} setUser={props.setUser}
                 stepTasksDisplay={props.stepTasksDisplay}
                 setStepTasksDisplayArray={props.setStepTasksDisplayArray}
                />
            )}

            </div>
        </div>

    )
}