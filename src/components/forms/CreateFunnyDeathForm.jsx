import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import './createDefaultTask.css';
import * as yup from "yup";
import React, {useState} from "react";

export default function CreateFunnyDeathForm(props) {
    //TODAY :
    const todayprepare = new Date;
    const today = todayprepare.toISOString().slice(0, 10);


/////////SAVE CONTROLLER//////////////////////////////////////////////////////////////

    const backUrl = "http://localhost:8081/adminboard";
    const [newFunnyDeath, setNewFunnyDeath] = useState()
    const [label, setLabel] = React.useState("");

    function createFunnyDeath(deadName, header, content, deadDate){
        try{
        console.log("Create FunnyDeath : " + header)
        //     //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${props.user.token}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                deadName: deadName,
                header: header,
                content: content,
                deadDate: deadDate,
            })
        };

        //correspond à l'AUTHRESPONSE
        fetch(backUrl + "/funnydeath/save", requestOptions)
            .then(response => response.json())
            .then(json => setNewFunnyDeath(
                {
                    deadName: json.deadName,
                    header: json.header,
                    content: json.content,
                    deadDate: json.deadDate,
                }));

        }catch (error) {
            console.error(error);
            // handle error
            alert("Erreur serveur ! Le système ne reconnait pas l'utilisateur admin");
        }

        console.log("A funny Death was created ! " + newFunnyDeath.header)
    }

////////////////////////////////////////////////////////////////////

    const schema = yup.object().shape({
        deadName: yup.string().required("Ce champs est obligatoire"),
        header: yup.string().required("Ce champs est obligatoire"),
        content: yup.string().required("Ce champs est obligatoire"),
        deadDate: yup.date()
            // .transform(value => {
            //     value.toISOString().slice(0, 10);
            // })
            .required("Ce champs est obligatoire")
            .max(today, "Les morts sont nécessairement situées dans le passé")}
    );



    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data){
        console.log("bouton " + data.header)
        console.log(data.deadDate)
        if(data){
            setLabel("Mort ajoutée !")
            createFunnyDeath(data.deadName, data.header, data.content, data.deadDate);
            // eraseLabel()

        }else {
            alert("pas de data !");
        }
        document.getElementById("funnyForm").reset(); // C'est mal mais ça marche et avec les states j'avais un pb de refresh, avec reset ça le faisait pas...
            }


return (
    <div className='createDefaultTask section__padding'>
        <div className="createDefaultTask-container">
            <h1>Créer une FunnyDeath ! </h1>
            <h2>Cette FunnyDeath sera ajouté à la liste des FunnyDeath Random affichées en Homepage</h2>
            <div className="createDefaultTaskFormContainer">
            <form id="funnyForm" className='createDefaultTask-writeForm' autoComplete='off'
                  onSubmit={handleSubmit (async (data) => await onSubmit(data))}>
                <div className="createDefaultTask-formGroup">
                    <label>Nom du defunt</label>
                    <input type="text"
                           placeholder='Nom du défunt'
                           {...register("deadName")}
                    />
                    <p>{errors.deadName?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>Titre de la Mort sympa</label>
                    <input type="text"
                           placeholder='Titre'
                           {...register("header")}
                    />
                    <p>{errors.header?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>Histoire</label>
                    <textarea type="text"
                           className="large_input"
                           placeholder='histoire'
                           {...register("content")}
                    />
                    <p>{errors.content?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>Date</label>
                    <input type="date"
                           placeholder='date'
                           {...register("deadDate")}
                    />
                </div>

                <div className="createDefaultTask-button">
                    <button className='createDefaultTask-writeButton' type="submit">
                        Créer une Mort Sympa
                    </button>
                </div>
                <div>
                    <h3>{label}</h3>
                </div>
            </form>
            </div>
        </div>
    </div>

    )
}
