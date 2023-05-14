import {Link} from "react-router-dom";

export default function RegisterValidation (props){
    function onSubmit() {
        location.replace(location.href);
    }

    return(
        <div className='register section__padding'>
            <div className="register-validation-container">
                <h2>
                    Bienvenue {props.user.surname} {props.user.lastname} !
                </h2>
                <h3>Un email de validation a été envoyé à votre adresse {props.user.email}, merci de cliquer sur le
                    lien de validation afin de finaliser l'enregistrement de votre compte.</h3>
                {/*<Link to={`/space/${props.user.id}`}>*/}
                {/*    <div className="register-button">*/}
                {/*        <button className='register-writeButton' type='submit'>Voir mon espace</button>*/}
                {/*    </div>*/}
                {/*</Link>*/}

                <div className="register-button">
                    <button className='register-writeButton' type='submit' onSubmit={()=>onSubmit()}>Voir mon espace</button>
                </div>

            </div>


        </div>

    );
}
