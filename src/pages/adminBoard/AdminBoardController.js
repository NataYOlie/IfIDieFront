import React, {useState} from "react";
import Login from "./Login";
import {Navigate} from "react-router";


export default function AdminBoardController(props){

    const backUrl = "http://localhost:8081/adminboard"; ///steplist/{id}/{subtype}
    const [subtypes, setSubtypes] = useState();

    function fetchStepTasks(){
        const newTasks = []
        fetch(backUrl +"/steplist/")
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
                        task_color: response[i].task_color
                        }
                    );
                }
                props.setStepTasks(newTasks)
            });
        return newTasks
    }
    };

    function fetchTask(login, password) {
        //correspond à un objet AUTHREQUEST
        //task (id_task, description, external_link, header, previsional_date, subtype, task_color, validation_date,
        //                   visible, list_type_id_task_type)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: login, password: password})
        };

        //correspond à l'AUTHRESPONSE
        fetch(backUrl + "/task", requestOptions)
            .then(response => response.json())
            .then(json => props.setUser({
                token: json.token,
                id: json.user.id,
                name: json.user.name,
                surname: json.user.surname,
                lastname: json.user.lastname
            }));
    }


    // RETURN REDIRECT TO USER SPACE IF CONNECTED
    if (props.user) {
        return <Navigate replace to="/" />;
    } else {
        return (
            <Login fetchUser={(login, password) => fetchUser(login, password)} />
        );
    }
}
