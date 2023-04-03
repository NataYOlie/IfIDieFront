import React, {useState} from "react";
import {Home, Register} from "../index";
import "whatwg-fetch";


export default function RegisterController(props){

    const backUrl = "http://localhost:8081/security";

    function createUser(username, password, surname, lastname) {

        //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, surname: surname, lastname: lastname})
        };

        //correspond à l'AUTHRESPONSE
        fetch(backUrl + "/register", requestOptions)
            .then(response => response.json())
            .then(json => props.setUser({
                token: json.token,
                id: json.user.id,
                name: json.user.name,
                surname: json.user.surname
            }));
    }

    return (
        <Register createUser={(username, password, surname, lastname) => createUser(username, password, surname, lastname)}/>
    );
}
