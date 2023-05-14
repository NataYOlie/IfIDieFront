import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function RegisterValidation (props){

    useEffect(() => {
        window.location.reload()
    }, [])

    return(
        <div className='register section__padding'>
            <div className="register-validation-container">
                <h2>
                    Bienvenue {props.user.surname} {props.user.lastname} !
                </h2>
                <h3>Un email de validation a été envoyé à votre adresse {props.user.email}, merci de cliquer sur le
                    lien de validation afin de finaliser l'enregistrement de votre compte.</h3>
                <Link to={`/`}>
                    <div className="register-button">
                    <button className='register-writeButton' type='submit'>Accéder au site</button>
                    </div>
                </Link>
            </div>


        </div>

    );
}
