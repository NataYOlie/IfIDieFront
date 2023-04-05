import React, {useEffect, useState} from "react";
import {AdminBoard} from "../index";
import "whatwg-fetch";


export default function AdminBoardController(props){

    const backUrl = "http://localhost:8081/adminboard"; ///steplist/{id}/{subtype}
    const [subtypes, setSubtypes] = useState();
    useEffect(()=>fetchDefaultStepTasks(), []);

    function fetchDefaultStepTasks(){
        const newTasks = []
        fetch(backUrl +"/steplist")
            .then(response => response.json())
            .then(response => {
                for(let i=0; i<response.length; i++){
                    newTasks.push({
                        id_task: response[i].id_task,
                        description: response[i].description,
                        external_link: response[i].external_link,
                        header: response[i].header,
                        previsional_date: response[i].previsional_date,
                        subtype: response[i].subtype,
                        task_color: response[i].task_color,
                        listType: response[i].listType
                        }
                    );
                }
                props.setStepTasks(newTasks)
            });
        return newTasks
    }

        return (

            <AdminBoard fetchDefaultStepTasks={fetchDefaultStepTasks()}
                        stepTasks={props.stepTasks}
                        setStepTasks={props.setStepTasks}/>
        );
    }

