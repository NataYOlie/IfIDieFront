import React, {useEffect, useState} from "react";
import {AdminBoard} from "../index";
import './adminBoard.css';


export default function AdminBoardController(props) {
    //
    // const backUrl = "http://localhost:8081/adminboard";
    // const [newTask, setNewTask] = useState({})
    //
    // /**
    //  * This function add freshly created default StepTask in database and populate the stepTasks list with it
    //  * @param subtype category of the task
    //  * @param header title of the task
    //  * @param description well no limit except not too long please
    //  * @param externalLink resource
    //  * @param taskColor can be yellow, green, blue or red
    //  */
    // function createDefaultStepTask(subtype, header, description, externalLink, taskColor){
    //     console.log("Create Default Step Task : " + header)
    //     //correspond à un objet AUTHREQUEST
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${props.user.token}`,
    //             'Content-Type': 'application/json'
    //         },
    //
    //         body: JSON.stringify({
    //             subtype: subtype,
    //             header: header,
    //             description: description,
    //             externalLink: externalLink,
    //             taskColor: taskColor,
    //             defaultTask: true
    //         })
    //     };
    //
    //     console.log("lala" + requestOptions.method)
    //
    //     //correspond à l'AUTHRESPONSE
    //     fetch(backUrl + "/savetask/StepList/" + props.user.id, requestOptions)
    //         .then(response => response.json())
    //         .then(json => setNewTask(
    //             {
    //                 subtype: json.subtype,
    //                 header: json.header,
    //                 description: json.description,
    //                 externalLink: json.externalLink,
    //                 taskColor: json.taskColor,
    //                 defaultTask: true,
    //                 listType: "StepList",
    //                 createdBy: props.user
    //             }));
    //     props.addStepTask(newTask)
    //     console.log(newTask.header)
    // }

    const backUrl = "http://localhost:8081/adminboard";
    const [newFunnyDeath, setNewFunnyDeath] = useState()

    function createFunnyDeath(deadName, header, content, deadDate){
        console.log("Create FunnyDeath : " + header)
    //     //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${props.user.token}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                deadName: deadName,
                header: header,
                content: content,
                deadDate: deadDate,
            })
        };

        //correspond à l'AUTHRESPONSE
        fetch(backUrl + "/funnydeath/save", requestOptions)
            .then(response => response.json())
            .then(json => setNewFunnyDeath(
                {
                    deadName: json.deadName,
                    header: json.header,
                    content: json.content,
                    deadDate: json.deadDate,
                }));

        console.log(newFunnyDeath.header)
    }



        return (
            <>



            <AdminBoard
                user={props.user}
                // createDefaultStepTask={createDefaultStepTask}
                stepTasks={props.stepTasks}
                addStepTask={(newStepTask)=>props.addStepTask(newStepTask)}
                setStepTasks={props.setStepTasks}
                fetchDefaultStepTasks={props.fetchDefaultStepTasks}
                setStepTasksDisplayArray={props.setStepTasksDisplayArray}
                stepTasksDisplay = {props.stepTasksDisplay}/>
            </>
        );
    }

