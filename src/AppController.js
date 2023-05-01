import React, {useEffect, useState} from "react";
import App from "./App";
import './App.css'
import jwt_decode from 'jwt-decode';
import {Navigate} from "react-router";
import {backUrl} from "./utils/url_back";

/**
 * This controller is kind of an init method for If I Die App
 * it fetches tasks before launch. What does it do after dinner ?
 * It stores app states and their methods.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppController() {

///////CONSTANTES///////////////////////CONSTANTES//////////////////////CONSTANTES//////////////////////////CONSTANTES/////////////

    /**
     * Connected User
     */
    const storedUser = localStorage.getItem('user');
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

    /**
     * Step Tasks
     */
    const storedStepTasks = localStorage.getItem('stepTasks');
    const [stepTasks, setStepTasks] = useState(storedStepTasks ? JSON.parse(storedStepTasks) : []);

    /**
     * Step Tasks Display, steptasks in their html dress to go party
     */
    const [stepTasksDisplay, setStepTasksDisplay] = useState([]);

    /**
     * This state is nourrished by getRandomFunnyDeathMethod
     */
    const [currentFunnyDeath, setCurrentFunnyDeath] = useState({})

    /**
     * used in update and save controller method for tasks
     */
    const [newTask, setNewTask] = useState({})
    const [stepTasksDao, setStepTasksDao] = useState([]);

    //TODAY :
    const todayprepare = new Date;
    const today = todayprepare.toISOString().slice(0, 10);

    /**
     * This label display on the login page and message is customed depending on redirects
     */
    const [login_label, setLogin_label] = useState("")

/////USE EFFECTS//////////////////USE EFFECTS///////////////USE EFFECTS////////////////////////////////USE EFFECTS/////////////////////////////
//     /**
//      * This useEffect.js fetch StepTasks from ddb when launching app
//      */
//     useEffect(() => {
//         if (!user) {
//             fetchDefaultStepTasks();
//         } else fetchUserStepTasks()
//     }, []);

    /**
     * This useEffect.js fetch random funnyDeath when launching app
     */
    useEffect(() => {
        getRandomFunnyDeath();
    }, []);


    /**
     * This useEffect.js fetch StepTasks from ddb when launching app. If a user is connected, it fetches user tasks
     * otherwise it fetches DefaultSteptasks
     */
    useEffect(() => {
        if (user) {
            fetchUserStepTasks();
        } else {
           fetchDefaultStepTasks();
        }
    }, [user]);


///////////////GLOBAL TRAITMENTS////////////////////////GLOBAL TRAITMENTS/////////////////////GLOBAL TRAITMENTS/////////////////////////

    function refresh(){
        window.location.reload()
    }

//////////USER////////////////USER/////////////////USER//////////////////////////////////////////USER///////////////////////

    function logout(){
        setUser(null)
        localStorage.removeItem(JSON.stringify(user))
        localStorage.clear()
    }


    function forcedLogout(){
        setUser(null)
        localStorage.removeItem(JSON.stringify(user))
        localStorage.clear()
        if (window.confirm("Votre session a expiré ! Merci de vous reconnecter")) {
            fetchDefaultStepTasks()
            return (
                <Navigate to={"/login"}/>
            )
        }
    }

    function setUserNew(newUser){
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    }

    /**
     * This use Effect check if user token is still valid, if not it forces a logout
     */
    useEffect(() => {
        if(storedUser && user) {
            const token = user.token;
            if (token) {
                const decodedToken = jwt_decode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.log("AUTO LOGOUT");
                    // Token has expired
                    forcedLogout();
                } else {
                    // Set an interval to check if the token has expired
                    const intervalId = setInterval(() => {
                        if (decodedToken.exp * 1000 < Date.now()) {
                            // Token has expired, clear the interval and logout
                            clearInterval(intervalId);
                            console.log("AUTO LOGOUT")
                            forcedLogout();
                        }
                    }, 60000); // Check every minute
                }
            }
        }
    }, []);

    /**
     * This function updates login label which informs user why they need to login
     * @param newLoginMessage
     */
    function setLoginRedirectMessage(newLoginMessage){
        setLogin_label(newLoginMessage)
    }


/////////FUNNY DEATH////////////////////////FUNNY DEATH//////////////////////////////////FUNNY DEATH//////////////FUNNY DEATH///////////////////////////////

    function refreshFunnyDeath(){
        setCurrentFunnyDeath(getRandomFunnyDeath())
        console.log("refresh")
    }

//////////////////TASKS TRAITEMENTS/////////////////////////////////////////////////////////////////////////

    /**
     * This function add a StepTask and update StepTask List
     * @param newStepTask
     */
    function addStepTask(newStepTask) {
        const updatedStepTasks = [...stepTasks]
        updatedStepTasks.push(newStepTask);
        if (stepTasks && stepTasks.length > 0) {
            setStepTasksArray(updatedStepTasks)
        }
        saveStepListTasks()

    }

    /**
     * This function update a StepTask and update StepTask List
     * @param stepTask
     */
    function updateStepTask(stepTask){
        const updatedStepTasks = [...stepTasks]; // Make a copy of the stepTasks array
        //Trouver la tache dans la liste "stepTasks"
        let index = updatedStepTasks.findIndex(task => task.id_task === stepTask.id_task)
        console.log("update steptask : task id : " + index + " et steptaskId : " + stepTask.id_task)
        if (index !== -1) {
            updatedStepTasks[index] = {...stepTask, modificationDate: today}; // Update the task object with new data
            setStepTasks(updatedStepTasks); // Update the stepTasks state
            localStorage.setItem('stepTasks', JSON.stringify(updatedStepTasks)); // Save the updated stepTasks data to local storage
        }
    }

    /**
     * this function is called to update comment of a task of stepTasks
     * @param index is the index of the task to update in the stepTasks list
     * @param comment is the new value for comment attribute
     */
    function updateStepTaskComment(index, comment){
        const updatedStepTasks = [...stepTasks]; // Make a copy of the stepTasks array
        //SI on a un index (vu qu'on le cherche avec l'id de la tache, si on n'a pas encore enregistrer il n'y a pas d'index
        if (index != null){
            updatedStepTasks[index] = { ...updatedStepTasks[index], comment: comment};
            console.log(updatedStepTasks[index].header + "new comment is " + updatedStepTasks[index].comment);
            setStepTasksArray(updatedStepTasks);
            updateStepListTask(updatedStepTasks[index]);
        }else {
            console.log("comment pas d'index");
        }
    }

    /**
     * this function is called to update visible state of a task of stepTasks
     * @param index is the index of the task to update in the stepTasks list
     * @param boolean is the new value for visible attribute
     */
    function updateStepTaskVisible(index, boolean){
        // Make a copy of the stepTasks array
        const updatedStepTasks = [...stepTasks];
        // Update the task object with new data
        updatedStepTasks[index] = {...updatedStepTasks[index], visible: boolean};
        setStepTasksArray(updatedStepTasks); // Update the stepTasks state
        updateStepListTask(updatedStepTasks[index]);
        console.log(stepTasks[index].header + "visible status " +stepTasks[index].visible )
    }

    function updateStepTaskValidationDate(index, validationDate){
        if (index != null) {
            const updatedStepTasks = [...stepTasks]; // Make a copy of the stepTasks array
            updatedStepTasks[index] = {...updatedStepTasks[index], validationDate: validationDate}; // Update the task object with new data
            setStepTasksArray(updatedStepTasks); // Update the stepTasks state
            updateStepListTask(updatedStepTasks[index]);
            console.log(stepTasks[index].header + "validationDate APP CONTROLLER " + updatedStepTasks[index].validationDate)
        }else console.log("check pas d'index")
    }

    function updateStepTaskPrevisionalDate(index, previsionalDate){
        if (index != null) {
            const updatedStepTasks = [...stepTasks]; // Make a copy of the stepTasks array
            updatedStepTasks[index] = {...updatedStepTasks[index], previsionalDate: previsionalDate}; // Update the task object with new data
            setStepTasksArray(updatedStepTasks); // Update the stepTasks state
            updateStepListTask(updatedStepTasks[index]);
            console.log(stepTasks[index].header + "previsionalDate APP CONTROLLER " + updatedStepTasks[index].previsionalDate)
        }else console.log("check pas d'index")
    }

    /**
     * This function is just a setStepTask to be use in all the components, it sets and updates tasks in localstorage
     * @param newStepTasks
     */
    function setStepTasksArray(newStepTasks) {
        setStepTasks(newStepTasks)
        localStorage.removeItem('stepTasks')
        localStorage.setItem('stepTasks', JSON.stringify(newStepTasks));
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
     * This function is just a setStepTasksDisplay to be use in all the components
     * @param newStepTasksDisplays
     */
    function setStepTasksDisplayArray(newStepTasksDisplays) {
        setStepTasksDisplay(newStepTasksDisplays)
        console.log("setStepTasksDisplayArray " + stepTasksDisplay.length)
    }



//FETCH TASKS///////////////// FETCH TASKS ////////////////////////////FETCH TASKS////////////////////////////FETCH TASKS///////////////////////////////////////

    const backUrlTask = backUrl+"/task";

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
        fetch(backUrlTask + "/steplist", requestOptions)
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
                            default_task:response[i].defaultTask,
                            user:response[i].user

                        }
                    );
                }
                setStepTasksArray(newTasks)
                // refreshTasks()
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

        const newTasksUser = []
        fetch(backUrlTask + "/mySteplist/" + user.id, requestOptions)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.length; i++) {
                    newTasksUser.push({
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
                            modificationDate:response[i].modificationDate,
                            user:user
                        }
                    );
                    console.log("fetchuser push")
                }if (newTasksUser.length>0){
                    console.log("fetchUserStepTasks " + newTasksUser.length + " tâches")
                    setStepTasksArray(newTasksUser)
                    return newTasksUser;

                    //C'est ici que je crée mes tâches user si c'est la première fois
                }else {
                    const defaultTasks = stepTasks.filter(task => task.default_task);
                    const userDefaultTasks =
                        defaultTasks.map(task =>
                            saveStepListTask(
                                task.subtype,
                                task.header,
                                task.description,
                                task.external_link,
                                task.task_color,
                                task.comment,
                                task.validationDate,
                                task.previsionalDate,
                                task.modificationDate)
                            )


                    fetch(backUrlTask + "/mySteplist/" + user.id, requestOptions)
                        .then(response => response.json())
                        .then(response => {
                            for (let i = 0; i < response.length; i++) {
                                userDefaultTasks.push({
                                        id_task: response[i].id_task,
                                        description: response[i].description,
                                        external_link: response[i].externalLink,
                                        header: response[i].header,
                                        previsionalDate: response[i].previsionalDate,
                                        subtype: response[i].subtype,
                                        task_color: response[i].taskColor,
                                        listType: response[i].listType,
                                        validationDate: response[i].validationDate,
                                        visible: response[i].visible,
                                        comment: response[i].comment,
                                        creationDate: response[i].creationDate,
                                        commentEdit: false,
                                        default_task: response[i].defaultTask,
                                        modificationDate: response[i].modificationDate,
                                        user: user
                                    }
                                );
                                console.log("fetchuser push")
                                setStepTasksArray(userDefaultTasks)
                            }
                            })
                    console.log("User DUPLICATE DEFAULT " + userDefaultTasks.length + " tâches ");
                    return userDefaultTasks;
                }
            })

    }


    /**
     * This function saves or updates tasklist depending on if they are new or known. It refreshes the page after
     * execution (full refresh) that ensure the update of the states, because I am new to React and couldn't do better
     * Don't be to harsh. It's hard enough around here.
     * @returns {Promise<void>}
     */
    async function saveStepListTasks() {
        console.log("ENTERING SAVE STEPLIST TASK");
        if (stepTasks) {
            await Promise.all(stepTasks.map(async (task) => {
                if (task.id_task == null) {
                    task.modificationDate = today;
                    console.log("today is : " + today);
                    await saveStepListTask(
                        task.subtype,
                        task.header,
                        task.description,
                        task.external_link,
                        task.task_color,
                        task.comment,
                        task.validationDate,
                        task.previsionalDate,
                        task.modificationDate
                    );
                    console.log("saving " + task.header + " " + today);
                } else {
                    task.modificationDate = today;
                    await updateStepListTask(task);
                    console.log("updating " + task.header + " " + today);
                }
            }));
            console.log("Steplist is saved " + stepTasks.length);
        }

        //C'est mal mais ça marche et j'ai pas trouvé mieux avec les promises et await je m'en sortais pas
        setTimeout(() => refresh(), 1000);
    }

    /**
     *
     * @param subtype
     * @param header
     * @param description
     * @param external_link
     * @param taskColor
     * @param comment
     * @param validationDate
     * @param previsionalDate
     * @param modificationDate
     * @param user
     */
    function saveStepListTask(subtype, header, description, external_link, taskColor, comment, validationDate, previsionalDate, modificationDate){
        console.log("Save Step Task : " + header)

        try {
            //correspond à un objet AUTHREQUEST
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    subtype: subtype,
                    header: header,
                    description: description,
                    externalLink: external_link,
                    taskColor: taskColor,
                    defaultTask: false,
                    comment : comment,
                    validationDate : validationDate,
                    previsionalDate : previsionalDate,
                    modificationDate : modificationDate,
                    creationDate: today,

                })
            };

            //correspond à l'AUTHRESPONSE
            fetch(backUrlTask + "/savetask/StepList/" + user.id, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(json => setNewTask(
                    {
                        id_task: json.id_task,
                        subtype: json.subtype,
                        header: json.header,
                        description: json.description,
                        external_link: json.external_link,
                        taskColor: json.taskColor,
                        defaultTask: json.defaultTask,
                        listType: "StepList",
                        comment:json.comment,
                        modificationDate : json.modificationDate,
                        validationDate : json.validationDate,
                        creationDate: today,
                        user:user
                    }))
                .catch(error => {
                    console.error('An error occurred while fetching the API:', error);
                    throw new Error("Network error occurred while fetching the API");
                });

            stepTasksDao.push(newTask)
            console.log(newTask.size)
        } catch (error) {
            console.error('An error occurred while saving the step list task:', error);
        }
    }

    /**
     * This controller update a stepTask
     * @param stepTask A stepTask
     */
    function updateStepListTask(stepTask){
        console.log("Update Step Task : " + stepTask.header)

        try {
            //correspond à un objet AUTHREQUEST
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    subtype: stepTask.subtype,
                    header: stepTask.header,
                    description: stepTask.description,
                    externalLink: stepTask.external_link,
                    taskColor: stepTask.task_color,
                    defaultTask: stepTask.default_task,
                    comment : stepTask.comment,
                    validationDate : stepTask.validationDate,
                    previsionalDate : stepTask.previsionalDate,
                    creationDate: stepTask.creationDate,
                    modificationDate : today,
                    visible : stepTask.visible,
                    user : stepTask.user
                })
            };

            //correspond à l'AUTHRESPONSE
            fetch(backUrlTask + "/updatetask/" + user.id + "/" + stepTask.id_task, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("updateStepListTask : Network response was not ok");
                    }
                    return response.json();
                })
                .then(json => setNewTask(
                    {
                        subtype: json.subtype,
                        header: json.header,
                        description: json.description,
                        external_link: json.externalLink,
                        task_color: json.taskColor,
                        default_task: json.defaultTask,
                        listType: "StepList",
                        user: user,
                        comment:json.comment,
                        creationDate: json.creationDate,
                        modificationDate: today
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


    function deleteTask(task){
        console.log("Delete Step Task : " + task.header)

        try {
            //correspond à un objet AUTHREQUEST
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
            };

            //correspond à l'AUTHRESPONSE
            fetch(backUrlTask + "/delete/"  + task.id_task, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("updateStepListTask : Network response was not ok");
                    }
                    return response.json();
                })

                .catch(error => {
                    console.error('An error occurred while fetching the API:', error);
                    throw new Error("Network error occurred while fetching the API");
                });


        } catch (error) {
            console.error('An error occurred while suppressing the step list task:', error);
        }

        setTimeout(() => refresh(), 1000);
    }





//////FUNNY DEATH///////////////////FUNNY DEATH///////////////////FUNNY DEATH///////////////////FUNNY DEATH////////////////////////////////////
    const backUrlFunnyDeath = backUrl + "/funnydeath";

    /**
     * This function fetch a random funnyDeath from ddb
     * @returns {*}
     */
    async function getRandomFunnyDeath() {
        try {
            console.log("RANDOM FUNNYDEATH")
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const newFunnyDeath = {};
            const response = await fetch(backUrlFunnyDeath, requestOptions);
            const responseData = await response.json();
            console.log("responseData"+ responseData.id_funnydeath)
            if (responseData) {
                const newFunnyDeath = {
                    id_funnydeath: responseData.id_funnydeath,
                    deadName: responseData.deadName,
                    header: responseData.header,
                    content: responseData.content,
                    deadDate: responseData.deadDate.slice(0, 10)
                };
                setCurrentFunnyDeath(newFunnyDeath);
                console.log("fetchFunnyDeath " + newFunnyDeath.length + " FunnyDeath");
            } else {
                console.log("Pas de Funny Death en stock");
            }

            return newFunnyDeath;
        } catch (error) {
            console.error(error);
        }
    }




/////RETURN//////////////////////RETURN////////////////////////RETURN////////////////////////RETURN////////////////////RETURN//////////////////////////

    return <App style={{maxWidth:1400}}
                //USER
                user={user}
                setUser={setUserNew}
                logout={logout}
                setLoginRedirectMessage={setLoginRedirectMessage}
                login_label={login_label}
                //STEP TASKS
                refresh={refresh}
                addStepTask={(newStepTask)=>addStepTask(newStepTask)}
                stepTasks={stepTasks}
                setStepTasks={setStepTasks}
                updateStepTaskComment = {updateStepTaskComment}
                updateStepTaskVisible={updateStepTaskVisible}
                saveStepListTasks={saveStepListTasks}
                fetchDefaultStepTasks={fetchDefaultStepTasks}
                fetchUserStepTasks={fetchUserStepTasks}
                setStepTasksArray = {(newStepTasks)=>setStepTasksArray(newStepTasks)}
                addStepTaskDisplay = {(newStepTaskDisplay)=>addStepTaskDisplay(newStepTaskDisplay)}
                setStepTasksDisplayArray = {setStepTasksDisplayArray}
                stepTasksDisplay = {stepTasksDisplay}
                updateStepTask = {updateStepTask}
                updateStepListTask = {updateStepListTask}
                updateStepTaskValidationDate = {updateStepTaskValidationDate}
                updateStepTaskPrevisionalDate = {updateStepTaskPrevisionalDate}
                deleteTask={deleteTask}

                //FUNNYDEATH
                getRandomFunnyDeath = {getRandomFunnyDeath}
                refreshFunnyDeath = {refreshFunnyDeath}
                currentFunnyDeath = {currentFunnyDeath}

    />

}