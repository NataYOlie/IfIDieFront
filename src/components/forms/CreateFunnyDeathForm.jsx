import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import './createDefaultTask.css';
import * as yup from "yup";
import React, {useEffect, useState} from "react";

export default function CreateFunnyDeathForm(props) {
    //TODAY :
    const todayprepare = new Date;
    const today = todayprepare.toISOString().slice(0, 10);
    const [funnyDeaths, setFunnyDeaths] = useState([])

    /**
     * This use Effect fetches FunnyDeaths frm ddb launching the form
     */
    useEffect(()=>{
        fetchFunnyDeaths()
        }, [])




/////////FUNNYDEATH CONTROLLER///////FUNNYDEATH CONTROLLER/////////////////////////FUNNYDEATH CONTROLLER//////////////////////////////

    const backUrl = "http://localhost:8081/adminboard";
    const [newFunnyDeath, setNewFunnyDeath] = useState()
    const [label, setLabel] = React.useState("");


    function createFunnyDeath(deadName, header, content, deadDate){
        try{
        console.log("Create FunnyDeath : " + header)
        //correspond à un objet AUTHREQUEST
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
                    deadDate: json.deadDate.slice(0, 10)
                }));

        }catch (error) {
            console.error(error);
            // handle error
            alert("Erreur serveur ! Le système ne reconnait pas l'utilisateur admin");
        }
        setTimeout(()=>setLabel(""), 5000)
        console.log("A funny Death was created ! " + newFunnyDeath.header)

        setTimeout(window.location.reload(), 1000)
        // resetFdForm()

    }


    /**
     * This controller update a funnyDeath
     * @param funnyDeath A funnyDeath
     */
    function updateFunnyDeath(){
        console.log("Update funnyDeath : " + funnyDeathForm.header)

        try {
            //correspond à un objet AUTHREQUEST
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${props.user.token}`,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    id_funnydeath: funnyDeathForm.id_funnydeath,
                    deadName: funnyDeathForm.deadName,
                    header: funnyDeathForm.header,
                    content: funnyDeathForm.content,
                    deadDate: getFunnyDeathFormDate()
                })
            };

            //correspond à l'AUTHRESPONSE
            fetch(backUrl + "/funnydeath/update/" + funnyDeathForm.id_funnydeath, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("updateStepListTask : Network response was not ok");
                    }
                    return response.json();
                })

                .then(json => console.log( "Funny Death updated in ddb as follow : \r\n" +
                        "id_funnydeath : " + json.id_funnydeath +
                        " \r\n deadName : " + json.deadName +
                        "\r\n header : " + json.header +
                        "\r\n content : " + json.content +
                        "\r\ndeadDate : " + json.deadDate.slice(0, 10)
                    ))

                .catch(error => {
                    console.error('An error occurred while fetching the API:', error);
                    throw new Error("Network error occurred while fetching the API");
                });

        } catch (error) {
            console.error('An error occurred while saving the step list task:', error);
        }
        // setTimeout(window.location.reload(), 1000)
    }


    function deleteFunnyDeath(funnyDeath){
        console.log("Delete funnyDeath : " + funnyDeath.header)

        try {
            //correspond à un objet AUTHREQUEST
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${props.user.token}`,
                    'Content-Type': 'application/json'
                },
            };

            //correspond à l'AUTHRESPONSE
            fetch(backUrl + "/funnydeath/delete/"  + funnyDeath.id_funnydeath, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("updateStepListTask : Network response was not ok");
                    }
                    return response.json();
                })

                .catch(error => {
                    console.error('An error occurred while fetching the API:', error);
                    throw new Error("Network error occurred while fetching the API");
                });


        } catch (error) {
            console.error('An error occurred while suppressing the step list task:', error);
        }
        setTimeout(()=>setLabel(""), 5000)
        resetFdForm()
        setTimeout(window.location.reload(), 1000)
    }

    /**
     * This function fetch Funny Deaths from ddb
     * @returns the list of FunnyDeaths
     */
    function fetchFunnyDeaths() {
        //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${props.user.token}`,
                'Content-Type': 'application/json'
            }
        };

        const newFunnyDeaths = []
        fetch(backUrl+ "/funnyDeaths", requestOptions)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.length; i++) {

                    newFunnyDeaths.push({
                        id_funnydeath: response[i].id_funnydeath,
                        deadName: response[i].deadName,
                        content: response[i].content,
                        header: response[i].header,
                        deadDate: response[i].deadDate,
                        }
                    );
                }
                setFunnyDeaths(newFunnyDeaths)
                console.log("fetchFunnyDeaths " + newFunnyDeaths.length + " morts hilarantes")
            })

        return funnyDeaths
    }


////////////FORM/////////////////////FORM//////////////////////////////FORM////////////////////////////FORM/////////////////////////////////////////////

    // define state to keep track of whether to show new field or not
    const [searchFunnyDeath, setSearchFunnyDeath] = useState("Créer");
    const [funnyDeathForm, setFunnyDeathForm] = useState({})
    const [funnyDeathRender, setFunnyDeathRender] = useState([])
    const [defaultValues, setDefaultValues]=useState({
        id_funnydeath : "",
        deadName : "",
        header : "",
        content : "",
        deadDate : null
    })

    useEffect(()=>{
        resetFdForm()
    }, [searchFunnyDeath, setSearchFunnyDeath])


    useEffect(()=>{
        setDefaultValues(
            {
                id_funnydeath : funnyDeathForm.id_funnydeath,
                deadName : funnyDeathForm.deadName,
                header : funnyDeathForm.header,
                content : funnyDeathForm.content,
                deadDate : getFunnyDeathFormDate()
            }
        )
    }, [funnyDeathForm])

    useEffect(()=>{
        displayFunnyForm()
    },[defaultValues, funnyDeathForm, searchFunnyDeath])


    useEffect(()=>{
        displayFunnyForm()
    },[])


    const getFunnyDeathFormDate = ()=> {
        if (funnyDeathForm.deadDate) {
            const year = funnyDeathForm.deadDate.slice(0,4)
            const month =funnyDeathForm.deadDate.slice(5,7)
            const day =funnyDeathForm.deadDate.slice(8,10)
            const shortDate = `${year}-${month}-${day}`;
            return shortDate;
        }
    }

    const schema = yup.object().shape({
        deadName: yup.string(),
        header: yup.string(),
        content: yup.string(),
        deadDate: yup.date()
            .max(today, "Les morts sont nécessairement situées dans le passé")}
    );

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function resetFdForm(){
        console.log("RESET FD FORM")
        const tempFd = {
            id_funnydeath : null,
            deadName : "",
            header : "",
            content : "",
            deadDate : null
        }
        setFunnyDeathForm(tempFd);
        // document.getElementById("histoire").value="";
        console.log(tempFd)
    }

    function onSubmit(data){
        console.log("bouton " + data.header)
        console.log(data.deadDate)

        // Set the data state variable to the data object
        const tempFd = {...funnyDeathForm};
        tempFd.header = data.header;
        console.log("data.header : " + data.header)
        tempFd.content = data.content;
        console.log("data.content : " + data.content)
        tempFd.deadName = data.deadName;
        console.log("data.deadName : " + data.deadName)
        tempFd.deadDate = data.deadDate;
        console.log("data.deadDate : " + data.deadDate)
        setFunnyDeathForm(tempFd)

        if(data) {
            switch (searchFunnyDeath) {
                case "Créer" :
                    setLabel
                    ("Mort ajoutée !")
                    console.log("label : " + label)
                    createFunnyDeath(data.deadName, data.header, data.content, data.deadDate);
                    break

                case "Modifier":
                    setLabel
                    ("Mort modifiée !")
                    updateFunnyDeath()
                    break

                case "Supprimer" :
                    setLabel
                    ("Mort supprimée ! (ahahah)")
                    if (window.confirm("Etes vous sur de vouloir supprimer la  funnyDeath " +  tempFd.header + " ?")){
                        deleteFunnyDeath(tempFd)
                    }
                    break

                default :
                    console.log("Ne correspond à aucun cas connu")
                    break
            }

        } else {
            alert("pas de data !");
        }
        // 👇️ clear all input values in the form
        // reset form data




        setTimeout(()=>setLabel(""), 5000)
    }

    /**
     * This handle change when selecting a Funny Death in menu
     * @param e
     * @returns {Promise<void>}
     */
    async function handleChange(e) {
        e.preventDefault();
        const tempFd = JSON.parse(e.target.value)
        setFunnyDeathForm(tempFd)
        console.log(tempFd)
    }

    function displayFunnyForm(){
        console.log("DISPLAY FD FORM")


        setFunnyDeathRender ([
            <div className="createDefaultTaskFormContainer">
                <form id="funnyForm" className='createDefaultTask-writeForm' autoComplete='off'
                      onSubmit={handleSubmit (async (data) => await onSubmit(data))}>
                    <div className="createDefaultTask-formGroup">
                        <label>Action</label>
                        <select
                            name="Action"
                            multiple={false}
                            onChange={(e) => setSearchFunnyDeath(e.target.value)}
                        >
                            <option value="Créer" defaultValue="true">Créer</option>
                            <option value="Modifier">Modifier</option>
                            <option value="Supprimer">Supprimer</option>
                        </select>
                        {(searchFunnyDeath == "Modifier"||searchFunnyDeath == "Supprimer") && (
                            <>
                                <label style={{margin: '2rem 0'}}>Sélectionner une mort cocasse</label>
                                <select
                                    name="SelectFunnyDeath"
                                    multiple={false}
                                    value={JSON.stringify(funnyDeathForm)} // stringify the funnyDeathForm
                                    placeholder="Sectionner une mort cocasse"
                                    onChange={e => handleChange(e)} // parse the JSON string
                                >
                                    <option value="" selected={true}>-- Sectionner une mort cocasse --</option>
                                    {
                                        funnyDeaths.map(funnyDeath=>
                                            <option
                                                key={funnyDeath.id_funnydeath}
                                                value={JSON.stringify(funnyDeath)}>
                                                {funnyDeath.header}
                                            </option>)
                                    }
                                </select>
                            </>
                        )}

                        <div id="Inputs">
                            <div className="createDefaultTask-formGroup">
                                <label>Nom du defunt</label>
                                <input type="text"
                                       placeholder='Nom du défunt'
                                       defaultValue={funnyDeathForm.deadName}
                                       value={funnyDeathForm.deadName}
                                       {...register("deadName")}
                                />
                                <p>{errors.deadName?.message}</p>
                            </div>

                            <div className="createDefaultTask-formGroup">
                                <label>Titre de la Mort sympa</label>
                                <input type="text"
                                       placeholder='Titre'
                                       defaultValue={funnyDeathForm.header}
                                       value={funnyDeathForm.header}
                                       {...register("header")}
                                />
                                <p>{errors.header?.message}</p>
                            </div>

                            <div className="createDefaultTask-formGroup">
                                <label>Histoire</label>
                                <textarea type="text"
                                          id="histoire"
                                          className="large_input"
                                          placeholder='histoire'
                                          defaultValue={funnyDeathForm.content}
                                          value={funnyDeathForm.content}
                                          {...register("content")}
                                />
                                <p>{errors.content?.message}</p>
                            </div>

                            <div className="createDefaultTask-formGroup">
                                <label>Date</label>
                                <input type="date"
                                       placeholder='date'
                                       defaultValue={funnyDeathForm.deadDate}
                                       value={funnyDeathForm.deadDate}
                                       {...register("deadDate")}
                                />
                            </div>
                        </div>
                        <div className="createDefaultTask-button">
                            <button className='createDefaultTask-writeButton' type="submit">
                                {searchFunnyDeath} une Mort Sympa
                            </button>
                        </div>

                        <div>
                            <h3>{label}</h3>
                        </div>

                    </div>
                </form>
            </div>
        ])
    }


return (
    <div className='createDefaultTask section__padding'>
        <div className="createDefaultTask-container">
            <h1>Créer une FunnyDeath ! </h1>
            <h2>Cette FunnyDeath sera ajouté à la liste des FunnyDeath Random affichées en Homepage</h2>

            {funnyDeathRender}

        </div>
    </div>
        )
    }
