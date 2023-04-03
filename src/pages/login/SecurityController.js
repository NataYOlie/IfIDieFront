import React from "react";
import Login from "./Login";
import {Navigate} from "react-router";


export default function SecurityController(props){

    const backUrl = "http://localhost:8081/security";

    function fetchUser(login, password) {
        //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: login, password: password})
        };

        //correspond à l'AUTHRESPONSE
        fetch(backUrl + "/authorize", requestOptions)
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
