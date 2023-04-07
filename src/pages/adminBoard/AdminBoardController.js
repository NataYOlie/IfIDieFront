import React, {useEffect, useState} from "react";
import {AdminBoard} from "../index";



export default function AdminBoardController(props){

    const backUrl = "http://localhost:8081/adminboard"; ///steplist/{id}/{subtype}
    const [newTask, setNewTask] = useState({})

    function createDefaultStepTask(subtype, header, description, externalLink, taskColor){
        console.log("Create Default Step Task : " + header)

        //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${props.user.token}`,
                'Content-Type': 'application/json' },

            body: JSON.stringify({
                subtype: subtype,
                header: header,
                description: description,
                externalLink: externalLink,
                taskColor: taskColor,
                defaultTask: true
            })
        };

        console.log("lala" + requestOptions.method)

        //correspond à l'AUTHRESPONSE
        fetch(backUrl + "/savetask/StepList/" + props.user.id, requestOptions)
            .then(response => response.json())
            .then(json => setNewTask(
                {
                subtype: json.subtype,
                header: json.header,
                description: json.description,
                externalLink: json.externalLink,
                taskColor: json.taskColor,
                defaultTask: true,
                listType: "StepList",
                createdBy : props.user
            }));
        props.addStepTask(newTask)
        console.log(newTask.header)
    }


        return (
            <AdminBoard
                        createDefaultStepTask={(subtype, header, description, externalLink, taskColor) =>
                            createDefaultStepTask(subtype, header, description, externalLink, taskColor)}
                        stepTasks={props.stepTasks}
                        addStepTask={(newStepTask)=>props.addStepTask(newStepTask)}
                        setStepTasks={props.setStepTasks}
                        stepTasksDisplay = {props.stepTasksDisplay}/>
        );
    }



    /*
    OBJET TASK :
    "id_task": 1,
    "subtype": "famille",
    "header": "header 3",
    "description": "description 2",
    "externalLink": "lien externe",
    "validationDate": null,
    "previsionalDate": null,
    "taskColor": null,
    "visible": true,
    "defaultTask": true,
    listType = {}
    user = {}



    CONTROLLER DU BACK :


    @GetMapping("/steplist")
    public List<Task> getDefaultStepTasksAdmin (){
        return taskService.getDefaultStepTasks();
    }
        @PostMapping("/savetask/{listType}/{id}")
    public Task saveTask(@RequestBody Task task, @PathVariable Integer id, @PathVariable String listType){
        User user = (User) userService.getUserById(id);
        task.setUser(user);
        return taskService.saveTask(task, listType);
    }

    @PutMapping("/updatetask")
    public Task updateTask(@RequestBody Task task){
        return taskService.updateTask(task);
    }

     */