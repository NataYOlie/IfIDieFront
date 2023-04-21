import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import './createDefaultTask.css';
import * as yup from "yup";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";


export default function CreateDefaultStepTaskForm(props) {


///////////////////////////////////////////////////////////////////////

    const backUrl = "http://localhost:8081/adminboard";
    const [newTask, setNewTask] = useState({})



    /**
     * This function add freshly created default StepTask in database and populate the stepTasks list with it
     * @param subtype category of the task
     * @param header title of the task
     * @param description well no limit except not too long please
     * @param externalLink resource
     * @param taskColor can be yellow, green, blue or red
     */
    function createDefaultStepTask(subtype, header, description, externalLink, taskColor){
        console.log("Create Default Step Task : " + header)
        //correspond à un objet AUTHREQUEST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${props.user.token}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                subtype: subtype,
                header: header,
                description: description,
                externalLink: externalLink,
                taskColor: taskColor,
                defaultTask: true
            })
        };

        console.log("lala" + requestOptions.method)

        //correspond à l'AUTHRESPONSE
        fetch(backUrl + "/savetask/StepList/" + props.user.id, requestOptions)
            .then(response => response.json())
            .then(json => setNewTask(
                {
                    subtype: json.subtype,
                    header: json.header,
                    description: json.description,
                    externalLink: json.externalLink,
                    taskColor: json.taskColor,
                    defaultTask: true,
                    listType: "StepList",
                    createdBy: props.user
                }));
        props.addStepTask(newTask)
        console.log(newTask.header)
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // define state to keep track of whether to show new field or not
    const [searchTask, setSearchTask] = useState("Créer");

    //store the selected task from the form
    const [taskForm, setTaskForm]=useState({})
    const [tempTask, setTempTask] = useState({...taskForm})
    const [taskCategory, setTaskCategory] = useState(["Famille","Administratif","Sante","Transmission","Divers" ])
    const [taskColor, setTaskColor] = useState([
        {colorName:"Bleu", colorValue:"pastille-bleu"},
        {colorName:"Vert", colorValue:"pastille-vert"},
        {colorName:"Jaune", colorValue:"pastille-jaune"},
        {colorName:"Rouge", colorValue:"pastille-rouge"},
        {colorName:"Aucune", colorValue:""},
    ])
    const [taskColorsDisplay, setTaskColorsDisplay] = useState(taskColor.map(color => (
        <option key={nanoid()} value={color.colorValue}>
            {color.colorName}
        </option>
    )));
    const [taskCategoryDisplay, setTaskCategoryDisplay] = useState(taskCategory.map(category => (
        <option key={nanoid()} value={category}>{category}</option>
    )))

    const schema = yup.object().shape({
        subtype: yup.string().required("Catégorie : Famille, Administratif, Santé, Transmission, Obsèques, Un proche est décédé ? "),
        header: yup.string().required("Ce champs est obligatoire"),
        description: yup.string().required("Ce champs est obligatoire")
    });

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        getTaskFormColor()
    }, [setTaskForm]);

    const getTaskFormColor = () => {
        if (taskForm.task_color){
            let taskColorDisplayTemp =[]
            console.log(taskColor[0].colorValue + " et taskform : " + taskForm.task_color)
            taskColor.forEach((color, i) => {
                console.log("i : " + i)
                if (taskForm.task_color !== color.colorValue) {
                    // Display taskColor as an option if it is not the selected color
                    taskColorDisplayTemp.push(<option key={nanoid()} value={color.colorValue}>{color.colorName}</option>);
                } else {
                    // Display selected taskColor as the default value
                    console.log("colorvalue match : " + color.colorValue)
                    taskColorDisplayTemp.push(
                        <option key={nanoid()} value={color.colorValue} selected>
                            {color.colorName}
                        </option>
                    );
                }
                setTaskColorsDisplay(taskColorDisplayTemp);
            });
        }else {
            console.log("no taskform")
        }
    };

    function onSubmit(data){
        console.log("bouton " + data.header)


        if(data){
            switch (searchTask){
                case "Créer" :  createDefaultStepTask(data.subtype, data.header, data.description, data.externalLink, data.taskColor);
                    break

                case "Modifier":
                    // setTempTask(prevTempTask => ({
                    //     ...prevTempTask,
                    //     ...data
                    // }));

                    //ATTENTION defaultTask	false !!!!!!!
                    props.updateStepListTask(taskForm => ({
                        ...taskForm,
                        ...data
                    }));
                    break;

                case "Supprimer" :
                    //ICI IL FAUT POPPER UN MODAL QUI RECAP LA TACHE ET QUI DEMANDE SI ON EST SUR OUI VRAIMENT ?
                    break

                default :
                    console.log("Ne correspond à aucun cas connu")
                    break
            }
        }else {
            props.fetchDefaultStepTasks();
        }
        props.fetchDefaultStepTasks();
    }

    //Peut être il faut que mon formulaire soit dans un genre de stepTaskRender, pb re refresh par exemple les
    //defaultValue de la taskForm

return (
    <div className='createDefaultTask section__padding'>
        <div className="createDefaultTask-container">
            <h1>Créer une tâche Step par défaut </h1>
            <h2>Cette tâche sera affichée à l'utilisateur dans sa todolist de base pour ses démarches</h2>
            <div className="createDefaultTaskFormContainer">
            <form className='createDefaultTask-writeForm' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div className="createDefaultTask-formGroup">
                    <label>Action</label>
                    <select
                        name="Action"
                        multiple={false}
                        onChange={(e) => setSearchTask(e.target.value)}
                    >
                        <option value="Créer" defaultValue="true">Créer</option>
                        <option value="Modifier">Modifier</option>
                        <option value="Supprimer">Supprimer</option>
                    </select>
                    {(searchTask == "Modifier"||searchTask == "Supprimer") && (
                        <>
                            <label style={{margin: '2rem 0'}}>Sélectionner la tâche</label>
                            <select
                                name="SelectTask"
                                multiple={false}
                                value={JSON.stringify(taskForm)} // stringify the steptask
                                placeholder="Sectionner une tâche"
                                onChange={e => setTaskForm(JSON.parse(e.target.value))} // parse the JSON string
                            >
                                <option value="">-- Sectionner une tâche --</option>
                                {
                                    props.stepTasks.map(task=><option key={task.id_task} value={JSON.stringify(task)}>{task.header}</option>)
                                }
                            </select>
                        </>
                    )}

                    <label style={{margin: '2rem 0'}} >Catégorie</label>
                    <select
                        name="Catégorie"
                        multiple={false}
                        defaultValue={taskForm.subtype}
                        {...register("subtype")}>
                        {taskCategoryDisplay}
                        {/*<option value="Famille">Famille</option>*/}
                        {/*<option value="Administratif">Administratif</option>*/}
                        {/*<option value="Sante">Santé</option>*/}
                        {/*<option value="Transmission">Transmission</option>*/}
                        {/*<option value="Divers">Divers</option>*/}
                    </select>
                    <p>{errors.subtype?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>Titre de la tâche</label>
                    <input type="text"
                           placeholder='Titre'
                           defaultValue={taskForm.header}
                           {...register("header")}
                    />
                    <p>{errors.header?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>description</label>
                    <textarea type="text"
                           className="large_input"
                           placeholder='description'
                           defaultValue={taskForm.description}
                           {...register("description")}
                    />
                    <p>{errors.description?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>Ressource extérieure</label>
                    <input type="text"
                           placeholder='externalLink'
                           defaultValue={taskForm.external_link}
                           {...register("externalLink")}
                    />
                </div>

                <div className="createDefaultTask-Radio">
                    <h3>Couleur de la tâche</h3><br />
                    <input type="radio" id="none" name="none" value="" defaultChecked="true" {...register("taskColor")}/>
                    <label htmlFor="none">Aucune</label><br />
                    <input type="radio" id="bleu" name="bleu" value="pastille-bleu" {...register("taskColor")}/>
                    <label htmlFor="bleu">Bleue</label><br />
                    <input type="radio" id="jaune" name="jaune" value="pastille-jaune" {...register("taskColor")}/>
                    <label htmlFor="jaune">Jaune</label><br />
                    <input type="radio" id="rouge" name="rouge" value="pastille-rouge" {...register("taskColor")}/>
                    <label htmlFor="rouge">Rouge</label><br />
                    <input type="radio" id="vert" name="vert" value="pastille-vert" {...register("taskColor")}/>
                    <label htmlFor="vert">Verte</label><br />
                </div>
                <label>Couleur</label>
                <select
                    name="SelectTask"
                    multiple={false}
                    value={JSON.stringify(taskColor)} // stringify the steptask
                    onChange={e => setTaskColor(JSON.parse(e.target.value))} // parse the JSON string
                    {...register("taskColor")}
                >
                    {taskColorsDisplay}
                </select>
                <div className="createDefaultTask-button">
                    <button className='createDefaultTask-writeButton' type="submit">
                        Créer une tache
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>

    )
}
