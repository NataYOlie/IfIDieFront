import React, {useEffect, useState} from "react";
import Login from "./Login";
import {Navigate} from "react-router";

export default function SecurityController(props) {

    const backUrl = "http://localhost:8081/security";

    /**
     * This method fetch user and gives them a token + affect a role.
     * @param login is email
     * @param password the password of the user in clear
     */
    function fetchUser(login, password) {
        //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: login, password: password})
        };

        //correspond à l'AUTHRESPONSE
        fetch(backUrl + "/authorize", requestOptions)
            .then(response => response.json())
            .then(
                json => {
                    props.setUser(prevState => ({
                        ...prevState,
                        token: json.token,
                        id: json.user.id_user,
                        surname: json.user.surname,
                        lastname: json.user.lastname,
                        role: json.user.roles.length > 0 ? json.user.roles[0].roleName : null
                    }));
                })
    }

    // RETURN REDIRECT TO USER SPACE IF CONNECTED
    if (props.user) {
        return <Navigate replace to="/"/>;
    } else {
        return (
            <Login fetchUser={(login, password) => fetchUser(login, password)}/>
        );
    }
}

