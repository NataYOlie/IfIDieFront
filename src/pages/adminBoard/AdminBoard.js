import './adminBoard.css';
import React, {useState} from "react";
import {CreateDefaultStepTaskForm, CreateFunnyDeathForm, StepTask, TaskList} from '../../components'

export default function AdminBoard(props) {
    const [toggleCreateTask, setToggleCreateTask]=useState(false)
    const [toggleCreateFunnyDeath, setToggleCreateFunnyDeath]=useState(true)
    const [toggleTaskList, setToggleTaskList]=useState(false)
    const [buttonClass, setButtonClass]=useState(["adminBoard-white-writeButton",
        "adminBoard-white-writeButton-activated"])

    function handleToggle(){
        setToggleCreateTask(!toggleCreateTask);
        setToggleCreateFunnyDeath(!toggleCreateFunnyDeath);
        setButtonClass(buttonClass.reverse())
    }

    function ButtonSet (){
        return (
            <div className="adminBoard-button-container">
                <button className={buttonClass[0]}
                        type="submit"
                        onClick={handleToggle}>
                    Créer une tache
                </button>
                <button className={buttonClass[1]}
                        type="submit"
                        onClick={handleToggle}>
                Créer une funnydeath
                </button>
            </div>

        )
    }


    return(
        <div className="adminBoard section__padding">
            <div>
                <div className="adminBoard-container">
                <h1>Bienvenue cher Administratrice !</h1>
                <div className="button-centered">
                <p>Que souhaitez vous faire ?</p>
                <ButtonSet />
                </div>
            </div>

            {toggleCreateTask &&(
                <div>
                <CreateDefaultStepTaskForm
                    user={props.user}
                    addStepTask={props.addStepTask}
                    // createDefaultStepTask={props.createDefaultStepTask}
                    stepTasks={props.stepTasks}
                    fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                    setStepTasks={props.setStepTasks}
                    setLoginRedirectMessage={props.setLoginRedirectMessage}
                    stepTasksDisplay={props.stepTasksDisplay}
                    fetchUserStepTasks={props.fetchUserStepTasks}
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

                />
                <div className="adminBoard-button-container">
                <button className='adminBoard-white-writeButton'
                        type="submit"
                        onClick={()=> setToggleTaskList(!toggleTaskList)}>
                    Voir les tâches
                </button>
                </div>

                    {toggleTaskList && (
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
                    )}
                </div>
            )
            }


                {toggleCreateFunnyDeath &&(
                    <>
                        <CreateFunnyDeathForm
                            user={props.user}
                            addStepTask={props.addStepTask}
                            // createDefaultStepTask={props.createDefaultStepTask}
                            stepTasks={props.stepTasks}
                            fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                            createFunnyDeath={props.createFunnyDeath}
                            setStepTasks={props.setStepTasks}/>
                    </>)
                }

            </div>
        </div>

    )
}