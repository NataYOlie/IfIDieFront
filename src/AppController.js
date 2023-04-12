import React, {useEffect, useState} from "react";
import App from "./App";
import './App.css'
import {forEach} from "react-bootstrap/ElementChildren";

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

    /////A EXPLIQUER
    const [newTask, setNewTask] = useState({})
    const [stepTasksDao, setStepTasksDao] = useState([]);

    const [funnyDeath, setFunnyDeath] = useState({})

    //TODAY :
    const todayprepare = new Date;
    const today = todayprepare.toISOString().slice(0, 10);


    /**
     * This useEffect fetch StepTasks from ddb when launching app
     */
    useEffect(() =>
        fetchDefaultStepTasks(),
     []);

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

    /*
  @PutMapping("/updatetask/{userid}/{taskid}")
public Task updateTask(@RequestBody Task newTask, @PathVariable Integer userid, @PathVariable Integer taskid) {
    return taskService.findById(taskid)
 */
    /**
     * This function update a StepTask and update StepTask List
     * @param stepTask
     */
    function updateStepTask(stepTask){
        let index = stepTasks.findIndex(task => task.id_task === stepTask.id_task)
        console.log("update steptask : task id : " + index + " et steptaskId : " + stepTask.id_task)
        stepTasks[index].modificationDate = today
        stepTasks[index] = stepTask;

        //Trouver la tache dans la liste "stepTasks"
        //remplacer la tâche
        //mettre à jour la liste

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
                'Access-Control-Allow-Origin': '*',
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
                            external_link: response[i].externalLink,
                            header: response[i].header,
                            previsionalDate: response[i].previsionalDate,
                            subtype: response[i].subtype,
                            task_color: response[i].taskColor,
                            listType: response[i].listType,
                            validationDate : response[i].validationDate,
                            visible:response[i].visible,
                            comment:response[i].comment,
                            creationDate:response[i].creationDate,
                            commentEdit: false,
                            modificationDate:null,
                            default_task:response[i].defaultTask

                        }
                    );
                }
                setStepTasksArray(newTasks)
                console.log("fetchDefaultStepTasks " + newTasks.length + " tâches")
            })
        return stepTasks
    }

    /**
     * This function fetch User StepTasks from ddb and reinitialize StepTasks
     * @returns {*}
     */
    function fetchUserStepTasks() {
        //correspond à un objet AUTHREQUEST
        console.log("USER STEPTASK")
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        };

        const newTasks = []
        fetch(backUrl + "/mySteplist/" + user.id, requestOptions)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.length; i++) {
                    newTasks.push({
                            id_task: response[i].id_task,
                            description: response[i].description,
                            external_link: response[i].externalLink,
                            header: response[i].header,
                            previsionalDate: response[i].previsionalDate,
                            subtype: response[i].subtype,
                            task_color: response[i].taskColor,
                            listType: response[i].listType,
                            validationDate : response[i].validationDate,
                            visible:response[i].visible,
                            comment:response[i].comment,
                            creationDate:response[i].creationDate,
                            commentEdit: false,
                            default_task:response[i].defaultTask,
                            modificationDate:response[i].modificationDate
                        }
                    );
                }if (newTasks.length>0){
                    setStepTasksArray(newTasks)
                    console.log("fetchUserStepTasks " + newTasks.length + " tâches")
                }else saveStepListTasks(stepTasks)

            })
        return stepTasks
    }

    function saveStepListTasks (steplisttask){
        console.log("ENTERING SAVE STEPLIST TASK")
        if (steplisttask){
            steplisttask.forEach(task => {

                //Si la tâche est nouvelle :
                if (task.id_task === null) {
                    saveStepListTask(task.subtype, task.header, task.description, task.externalLink, task.task_color,
                        task.comment, task.validationDate, task.previsionalDate, task.modificationDate);
                    console.log("saving " + task.header + " " + today)

                    //Si la tache est une tache par défaut
                }else if (task.default_task){
                    console.log("tache default dans savesteplist")
                    saveStepListTask(task.subtype, task.header, task.description, task.externalLink, task.task_color,
                        task.comment, task.validationDate, task.previsionalDate, task.modificationDate);

                    //Si la tache existe déjà
                }else {
                    task.modificationDate = today;
                    updateStepListTask(task)
                    console.log("updating " + task.header + " " + today)
                }
            });
            fetchUserStepTasks()
            console.log("Steplist is saved " + stepTasks.length)
        }

    }

    /**
     *ATTENTION DEFAULT SET TO TRUE
     * @param subtype
     * @param header
     * @param description
     * @param externalLink
     * @param taskColor
     * @param comment
     * @param validationDate
     * @param previsionalDate
     */
    function saveStepListTask(subtype, header, description, externalLink, taskColor, comment, validationDate, previsionalDate, modificationDate){
        console.log("Save Step Task : " + header)

        try {
            //correspond à un objet AUTHREQUEST
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    subtype: subtype,
                    header: header,
                    description: description,
                    external_link: externalLink,
                    taskColor: taskColor,
                    // defaultTask: false,
                    comment : comment,
                    validationDate : validationDate,
                    previsionalDate : previsionalDate,
                    creationDate: today,
                    modificationDate : modificationDate
                })
            };

            //correspond à l'AUTHRESPONSE
            fetch(backUrl + "/savetask/StepList/" + user.id, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(json => setNewTask(
                    {
                        subtype: json.subtype,
                        header: json.header,
                        description: json.description,
                        external_link: json.externalLink,
                        taskColor: json.taskColor,
                        defaultTask: true,
                        listType: "StepList",
                        createdBy: user,
                        comment:json.comment,
                        creationDate: today
                    }))
                .catch(error => {
                    console.error('An error occurred while fetching the API:', error);
                    throw new Error("Network error occurred while fetching the API");
                });

            stepTasksDao.push(newTask)
            console.log(newTask.header)
        } catch (error) {
            console.error('An error occurred while saving the step list task:', error);
        }
    }

    /**
     *
     * @param stepTask A stepTask
     */
    function updateStepListTask(stepTask){
        console.log("Update Step Task : " + stepTask.header)

        try {
            //correspond à un objet AUTHREQUEST
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    subtype: stepTask.subtype,
                    header: stepTask.header,
                    description: stepTask.description,
                    externalLink: stepTask.external_link,
                    taskColor: stepTask.task_color,
                    defaultTask: false,
                    comment : stepTask.comment,
                    validationDate : stepTask.validationDate,
                    previsionalDate : stepTask.previsionalDate,
                    creationDate: stepTask.creationDate,
                    modificationDate : today,
                    visible : stepTask.visible
                })
            };

            //correspond à l'AUTHRESPONSE
            fetch(backUrl + "/updatetask/" + user.id + "/" + stepTask.id_task, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(json => setNewTask(
                    {
                        subtype: json.subtype,
                        header: json.header,
                        description: json.description,
                        externalLink: json.externalLink,
                        taskColor: json.taskColor,
                        defaultTask: true,
                        listType: "StepList",
                        createdBy: user,
                        comment:json.comment,
                        creationDate: json.creationDate,
                        modificationDate: json.modificationDate
                    }))
                .catch(error => {
                    console.error('An error occurred while fetching the API:', error);
                    throw new Error("Network error occurred while fetching the API");
                });

            stepTasksDao.push(newTask)
            console.log(newTask.header)
        } catch (error) {
            console.error('An error occurred while saving the step list task:', error);
        }
    }

    /**
     * This function fetch User StepTasks from ddb and reinitialize StepTasks
     * @returns {*}
     */
    function fetchUserStepTasks() {
        //correspond à un objet AUTHREQUEST
        console.log("USER STEPTASK")
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        };

        const newTasks = []
        fetch(backUrl + "/mySteplist/" + user.id, requestOptions)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.length; i++) {
                    newTasks.push({
                            id_task: response[i].id_task,
                            description: response[i].description,
                            external_link: response[i].externalLink,
                            header: response[i].header,
                            previsionalDate: response[i].previsionalDate,
                            subtype: response[i].subtype,
                            task_color: response[i].taskColor,
                            listType: response[i].listType,
                            validationDate : response[i].validationDate,
                            visible:response[i].visible,
                            comment:response[i].comment,
                            creationDate:response[i].creationDate,
                            commentEdit: false,
                            modificationDate:response[i].modificationDate,
                            default_task:false
                        }
                    );
                }if (newTasks.length>0){
                    setStepTasksArray(newTasks)
                    console.log("fetchUserStepTasks " + newTasks.length + " tâches")
                }else saveStepListTasks()

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
                saveStepListTasks={saveStepListTasks}
                fetchDefaultStepTasks={fetchDefaultStepTasks}
                fetchUserStepTasks={fetchUserStepTasks}
                setStepTasksArray = {(newStepTasks)=>setStepTasksArray(newStepTasks)}
                addStepTaskDisplay = {(newStepTaskDisplay)=>addStepTaskDisplay(newStepTaskDisplay)}
                setStepTasksDisplayArray = {setStepTasksDisplayArray}
                stepTasksDisplay = {stepTasksDisplay}
                updateStepTask = {updateStepTask}

    />

}