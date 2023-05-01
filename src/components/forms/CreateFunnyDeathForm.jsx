import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import './createDefaultTask.css';
import * as yup from "yup";
import React, {useEffect, useState} from "react";
import {log} from "util";

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
                }) );


        }catch (error) {
            console.error(error);
            // handle error
            alert("Erreur serveur ! Le système ne reconnait pas l'utilisateur admin");
        }
        setTimeout(()=>setLabel(""), 5000)
        console.log("A funny Death was created ! " + newFunnyDeath.header)
        setTimeout(()=>window.location.reload(), 1000)

    }


    /**
     * This controller update a funnyDeath
     * @param funnyDeath A funnyDeath
     */
    function updateFunnyDeath(funnyDeath){
        console.log("Update funnyDeath : " + funnyDeath.header)

            try {
                //correspond à un objet AUTHREQUEST
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${props.user.token}`,
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        id_funnydeath: funnyDeath.id_funnydeath,
                        deadName: funnyDeath.deadName,
                        header: funnyDeath.header,
                        content: funnyDeath.content,
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

                    .then(json => {
                            console.log("Funny Death updated in ddb as follow : \r\n" +
                                "id_funnydeath : " + json.id_funnydeath +
                                " \r\n deadName : " + json.deadName +
                                "\r\n header : " + json.header +
                                "\r\n content : " + json.content +
                                "\r\ndeadDate : " + json.deadDate.slice(0, 10)
                            )


                        }
                    )

                    .catch(error => {
                        console.error('An error occurred while fetching the API:', error);
                        throw new Error("Network error occurred while fetching the API");
                    });

            } catch (error) {
                console.error('An error occurred while saving the step list task:', error);
            }
        }



    function deleteFunnyDeath(funnyDeath_id){
        console.log("Delete funnyDeath : " + funnyDeath_id)

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
            fetch(backUrl + "/funnydeath/delete/"  + funnyDeath_id, requestOptions)
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

    // useEffect(()=>{
    //     resetFdForm()
    // }, [searchFunnyDeath, setSearchFunnyDeath])


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

    const getFunnyDeathContent = ()=> {
        return funnyDeathForm.content
    }
    const getFunnyDeathTitle = ()=> {
        return funnyDeathForm.header
    }
    const getFunnyDeathDeadName = ()=> {
        console.log("get deadName " + funnyDeathForm.deadName)
        return funnyDeathForm.deadName
    }

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
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
                deadName: funnyDeathForm.deadName,
                header: funnyDeathForm.header,
                content: funnyDeathForm.content,
                deadDate: getFunnyDeathFormDate(),
            }

        // defaultValues:(searchFunnyDeath == "Modifier"||searchFunnyDeath == "Supprimer") ? {
        //         deadName: funnyDeathForm.deadName,
        //         header: funnyDeathForm.header,
        //         content: funnyDeathForm.content,
        //         deadDate: getFunnyDeathFormDate(),
        //     }
        //     : {
        //         deadName: "caca",
        //         header: "",
        //         content: "",
        //         deadDate: null,
        //     },
    });

    function refresh(){
        window.location.reload()
    }

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
        reset()
        // document.getElementById("histoire").value="";
        console.log(tempFd)
       refresh()
    }

    function onSubmit(data){
        console.log("bouton " + data.header)
        console.log(data);
        reset();

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

                    console.log("Modifier "+ tempFd)
                    updateFunnyDeath(tempFd)
                    break

                case "Supprimer" :
                    setLabel
                    ("Mort supprimée ! (ahahah)")
                    const id = funnyDeathForm.id_funnydeath
                    if (window.confirm("Etes vous sur de vouloir supprimer la  funnyDeath " +  tempFd.header + " ?")){
                        deleteFunnyDeath(id)
                    }
                    break

                default :
                    console.log("Ne correspond à aucun cas connu")
                    break
            }

        } else {
            alert("pas de data !");
        }

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
        console.log("tempFd handle change :" + tempFd.header)
        reset()
    }

    function displayFunnyForm(){
        setFunnyDeathRender ([
            <div className="createDefaultTaskFormContainer">
                <form id="funnyForm" className='createDefaultTask-writeForm' autoComplete='off'
                      onSubmit={handleSubmit (async (data) => await onSubmit(data))}>
                    <div className="createDefaultTask-formGroup">
                        <label>Action</label>
                        <select
                            name="Action"
                            multiple={false}
                            {...register("Action")}
                            value={searchFunnyDeath}
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
                        <p> </p>

                        <div id="Inputs">
                            <div className="createDefaultTask-formGroup">
                                <label>Nom du défunt</label>
                                <input type="text"
                                       placeholder='Nom du défunt'
                                       defaultValue={funnyDeathForm.deadName}
                                       {...register("deadName")}
                                />
                                <p>{errors.deadName?.message}</p>
                            </div>

                            <div className="createDefaultTask-formGroup">
                                <label>Titre de la FunnyDeath</label>
                                <input type="text"
                                       placeholder='Titre'
                                       defaultValue={funnyDeathForm.header}
                                       {...register("header")}
                                />
                                <p>{errors.header?.message}</p>
                            </div>

                            <div className="createDefaultTask-formGroup">
                                <label>Histoire</label>
                                <textarea type="text"
                                          id="histoire"
                                          className="large_input"
                                          placeholder='Histoire'
                                          defaultValue={funnyDeathForm.content}
                                          {...register("content")}
                                />
                                <p>{errors.content?.message}</p>
                            </div>

                            <div className="createDefaultTask-formGroup">
                                <label>Date</label>
                                <input type="date"
                                       placeholder='Date'
                                       defaultValue={getFunnyDeathFormDate()}
                                       {...register("deadDate")}
                                />
                            </div>
                        </div>
                        <div className="createDefaultTask-button">
                            <button className='createDefaultTask-writeButton' type="submit">
                                {searchFunnyDeath} une FunnyDeath
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
            <h1>FunnyDeath</h1>
            <h2>--  Administrer les FunnyDeaths affichées en Homepage  --</h2>

            {funnyDeathRender}

        </div>
    </div>
        )
    }
