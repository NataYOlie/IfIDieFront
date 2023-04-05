import {Register} from "../index";
import "whatwg-fetch";
import RegisterValidation from "./RegisterValidation";


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
                id: json.user.id_user,
                surname: json.user.surname,
                lastname: json.user.lastname,
                email:  json.user.email,
                role: json.user.roles.length > 0 ? json.user.roles[0].roleName : null
            }));
    }

    // RETURN REDIRECT TO USER SPACE IF CONNECTED
    if (props.user) {
        return <RegisterValidation user={props.user} />;
    } else {
        return (
            <Register
                createUser={(username, password, surname, lastname) => createUser(username, password, surname, lastname)}/>
        );
    }
}
