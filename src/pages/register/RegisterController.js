import {Register} from "../index";
import "whatwg-fetch";
import RegisterValidation from "./RegisterValidation";
import {backUrl} from "../../utils/url_back";


export default function RegisterController(props){

    const backUrlSecurity = backUrl + "/security";

    function createUser(username, password, surname, lastname) {

        //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, surname: surname, lastname: lastname})
        };


        //correspond à l'AUTHRESPONSE
        fetch(backUrlSecurity + "/register", requestOptions)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 409) {
                        throw new Error('Conflict');
                    }
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                props.setUser({
                    token: json.token,
                    id: json.user.id_user,
                    surname: json.user.surname,
                    lastname: json.user.lastname,
                    email: json.user.email,
                    role: json.user.roles.length > 0 ? json.user.roles[0].roleName : null
                    });
                })

            .catch(error => {
                    console.error('Error creating user :', error);
                if (error.message === 'Conflict') {
                    alert("Ce compte existe déjà !");
                }
            });
    }

    // RETURN REDIRECT TO USER SPACE IF CONNECTED
    if (props.user) {
        return <RegisterValidation user={props.user} fetchUserStepTasks={props.fetchUserStepTasks}/>;
    } else {
        return (
            <Register
                createUser={(username, password, surname, lastname) => createUser(username, password, surname, lastname)}/>
        );
    }
}
