import React, {useEffect, useState} from "react";
import App from "./App";
import './App.css'

/**
 * This controller is kind of an init method for If I Die App
 * it fetches tasks before launch. What does it do after dinner ?
 * It stores app states and their methods.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppController() {

    /**
     * Connected User
     */
    const [user, setUser] = useState(null);
    /**
     * Step Tasks
     */
    const [stepTasks, setStepTasks] = useState([]);
    /**
     * Step Tasks Display, steptasks in their html dress to go party
     */
    const [stepTasksDisplay, setStepTasksDisplay] = useState([]);


    /**
     * This useEffect fetch StepTasks from ddb when launching app
     */
    useEffect(() => {
        fetchDefaultStepTasks();
    }, []);

    // /**
    //  * This useEffect updates my rendered task everytime steptasks state changes
    //  */
    // useEffect(() => {
    //     stepTasksRender();
    // }, [stepTasks]);



//////////////////TASKS TRAITEMENTS/////////////////////////////////////////////////////////////////////////

    /**
     * This function add a StepTask and update StepTask List
     * @param newStepTask
     */
    function addStepTask(newStepTask) {
        if (stepTasks && stepTasks.length > 0) {
            setStepTasks([...stepTasks, newStepTask]);
        } else setStepTasks([newStepTask])
    }

    /**
     * This function is just a setStepTask to be use in all the components
     * @param newStepTasks
     */
    function setStepTasksArray(newStepTasks) {
        setStepTasks(newStepTasks)
        console.log("steptasks Array " + stepTasks.length)
    }
    /**
     * This function adds a setStepTaskDisplay to be use in all the components
     * @param newStepTaskDisplay
     */
    function addStepTaskDisplay(newStepTaskDisplay) {
        if (stepTasksDisplay && stepTasksDisplay.length > 0) {
            setStepTasksDisplay([...stepTasksDisplay, newStepTaskDisplay]);
        } else setStepTasks([newStepTaskDisplay])
    }

    /**
     * This function is just a setStepTask to be use in all the components
     * @param newStepTasksDisplays
     */
    function setStepTasksDisplayArray(newStepTasksDisplays) {
        setStepTasksDisplay(newStepTasksDisplays)
        console.log("setStepTasksDisplayArray " + stepTasksDisplay.length)
    }


    // /**
    //  * This function Display StepTask in html to be rendered. This should be a component, why is it not ????
    //  */
    // function stepTasksRender(){
    //     console.log("stepTaskRender !")
    //     const newTaskDisplay = []
    //     console.log("Step Task Render " + stepTasks.length)
    //     for (let i=0 ; i < stepTasks.length ; i++){
    //         newTaskDisplay.push(
    //                 <div className="task" key={nanoid()}>
    //                     <div className="task-header"
    //                          key={nanoid()}
    //                          onClick={()=>toggleExpand()}>
    //                     <button className="login-button" key={nanoid()} onClick={()=>toggleExpand()}>
    //                         {expanded ? "Collapse All" : "Expand All"}
    //                     </button>
    //                         <h1>{stepTasks[i].header}</h1>
    //                     </div>
    //                     <span key={nanoid()}>{expanded ? '-' : '+'}</span>
    //                     {expanded && (
    //                         <div
    //                             key={nanoid()}
    //                             className="task-container">
    //                             <p key={nanoid()}>{stepTasks[i].description}</p>
    //                         </div>
    //                     )}
    //                 </div>
    //             )
    //     }
    //
    //     setStepTasksDisplay(newTaskDisplay)
    //     console.log(stepTasksDisplay.length)
    // }
    //


//FETCH TASKS///////////////// FETCH TASKS ////////////////////////////FETCH TASKS////////////////////////////FETCH TASKS///////////////////////////////////////

    const backUrl = "http://localhost:8081/task";

    /**
     * This function fetch DefaultStepTasks from ddb and reinitialize StepTasks
     * @returns {*}
     */

    function fetchDefaultStepTasks() {
        //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const newTasks = []
        fetch(backUrl + "/steplist", requestOptions)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.length; i++) {
                    newTasks.push({
                            id_task: response[i].id_task,
                            description: response[i].description,
                            external_link: response[i].external_link,
                            header: response[i].header,
                            previsionalDate: response[i].previsionalDate,
                            subtype: response[i].subtype,
                            task_color: response[i].task_color,
                            listType: response[i].listType,
                            validationDate : response[i].validationDate

                        }
                    );
                }
                setStepTasksArray(newTasks)
                console.log("fetchDefaultStepTasks " + newTasks.length + " tâches")
            })
        return stepTasks
    }





/////RETURN//////////////////////RETURN////////////////////////RETURN////////////////////////RETURN////////////////////RETURN//////////////////////////

    return <App style={{maxWidth:1400}}
                user={user}
                setUser={setUser}
                addStepTask={(newStepTask)=>addStepTask(newStepTask)}
                stepTasks={stepTasks}
                setStepTasks={setStepTasks}
                fetchDefaultStepTasks={fetchDefaultStepTasks}
                setStepTasksArray = {(newStepTasks)=>setStepTasksArray(newStepTasks)}
                addStepTaskDisplay = {(newStepTaskDisplay)=>addStepTaskDisplay(newStepTaskDisplay)}
                setStepTasksDisplayArray = {setStepTasksDisplayArray}
                stepTasksDisplay = {stepTasksDisplay}/>
}