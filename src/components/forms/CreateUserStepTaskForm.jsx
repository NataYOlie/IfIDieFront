import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import './createDefaultTask.css';
import * as yup from "yup";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {backUrl} from "../../utils/url_back";

export default function CreateUserStepTaskForm(props) {


/////////////////CONTROLLER///////////////////////CONTROLLER///////////CONTROLLER/////////////CONTROLLER///////

    const backUrlTask = backUrl + "/task";
    const [newTask, setNewTask] = useState({})
    //TODAY :
    const todayprepare = new Date;
    const today = todayprepare.toISOString().slice(0, 10);


    /**
     * This function add freshly created default StepTask in database and populate the stepTasks list with it
     * @param subtype category of the task
     * @param header title of the task
     * @param description well no limit except not too long please
     * @param externalLink resource
     * @param taskColor can be yellow, green, blue or red
     */
    function createUserStepTask(subtype, header, description, externalLink, taskColor){
        console.log("Create User Step Task : " + header)
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
                creationDate: today,
                defaultTask: false
            })
        };

        console.log("lala" + requestOptions.method)

        //correspond à l'AUTHRESPONSE
        fetch(backUrlTask + "/savetask/StepList/" + props.user.id, requestOptions)
            .then(response => response.json())
            .then(json => setNewTask(
                {
                    id_task: json.id_task,
                    subtype: json.subtype,
                    header: json.header,
                    description: json.description,
                    external_link: json.externalLink,
                    task_color: json.taskColor,
                    defaultTask: false,
                    listType: "StepList",
                    creationDate: json.creationDate,
                    commentEdit: false,
                    modificationDate:null,
                    user: props.user
                }));

        props.handleClose()
        console.log(newTask.header)
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // define state to keep track of whether to show new field or not
    const [searchTask, setSearchTask] = useState(["Créer"]);

    //store the selected task from the form
    const [taskForm, setTaskForm]=useState({})
    const [taskCategory, setTaskCategory] = useState(["Famille","Administratif","Sante","Transmission","Divers" ])
    const [taskColor, setTaskColor] = useState([
        {colorName:"Bleu", colorValue:"pastille-bleu"},
        {colorName:"Vert", colorValue:"pastille-vert"},
        {colorName:"Jaune", colorValue:"pastille-jaune"},
        {colorName:"Rouge", colorValue:"pastille-rouge"},
        {colorName:"Aucune", colorValue:""},
    ])
    const [taskColorsDisplay, setTaskColorsDisplay] = useState(taskColor.map(color => (
        <option key={nanoid()} value={color.colorValue} selected={taskForm.task_color === color.colorValue}>
            {color.colorName}
        </option>
    )));
    const [taskCategoryDisplay, setTaskCategoryDisplay] = useState(taskCategory.map(category => (
        <option key={nanoid()} value={category} selected={taskForm.subtype === category.toString()}>{category}</option>
    )))

    const schema = yup.object().shape({
        subtype: yup.string().required("Merci de choisir une catégorie pour cette tâche"),
        header: yup.string().required("Merci de renseigner un titre pour cette tâche"),
        description: yup.string(),
        externalLink: yup.string().url("Cela n'a pas la forme d'une URL valide")
    });

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * this useEffect.js charges User Step Tasks when loading component
     */
    useEffect(() => {
        props.fetchUserStepTasks();
    },[])


    /**
     * This function create, modify or delete task depending on the action field value
     * @param data extracted from the form
     */
    function onSubmit(data){
        console.log("bouton " + data.header)
        // Set the data state variable to the data object
        const tempTask = {...taskForm};
        tempTask.subtype = data.subtype;
        tempTask.header = data.header;
        tempTask.description = data.description;
        tempTask.external_link = data.externalLink;
        tempTask.task_color = data.taskColor;
        console.log("setTaskform : " + taskForm.header)

        if(data){
            createUserStepTask(data.subtype, data.header, data.description, data.externalLink, data.taskColor);

        }else {
            console.log("Pas de data")
            props.fetchUserStepTasks();
            alert("Pas de Data")
        }
    }



//////RETURN///////////////RETURN///////////////////////RETURN/////////////////////RETURN////////////////RETURN/////////////////////////////


    return (
    <div className='createDefaultTask section__padding'>
        <div className="createDefaultTask-container">
            <h1>Créer une tâche</h1>
            <h2>Cette tâche s'ajoutera à votre liste</h2>
            <div className="createDefaultTaskFormContainer">
            <form className='createDefaultTask-writeForm' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div className="createDefaultTask-formGroup">

                    <label style={{margin: '2rem 0'}} >Catégorie</label>
                    <select
                        name="Catégorie"
                        multiple={false}
                        defaultValue={taskForm.subtype}
                        {...register("subtype")}>
                        {taskCategoryDisplay}
                    </select>
                    <p>{errors.subtype?.message}</p>

                <label style={{margin: '2rem 0'}}>Couleur</label>
                <select
                    name="SelectTaskColor"
                    multiple={false}
                    defaultValue={taskForm.task_color}
                    onChange={e => setTaskColor(JSON.parse(e.target.value))} // parse the JSON string
                    {...register("taskColor")}
                >
                    {taskColorsDisplay}
                </select>
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
                    <p>{errors.externalLink?.message}</p>
                </div>

                <div className="createDefaultTask-button">
                    <button className='createDefaultTask-writeButton' type="submit">
                        {searchTask} une tache
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>
    )
}
