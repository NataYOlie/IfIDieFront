import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import './createDefaultTask.css';
import * as yup from "yup";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";

export default function CreateDefaultStepTaskForm(props) {


/////////////////CONTROLLER///////////////////////CONTROLLER///////////CONTROLLER/////////////CONTROLLER///////

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
        subtype: yup.string(),
        header: yup.string(),
        description: yup.string()
    });

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * this useEffect.js charges default Step Task when loading component
     */
    useEffect(() => {
        props.fetchDefaultStepTasks();
    },[])

    /**
     * this useEffect.js fill color and category fields with the selected task data
     */
    useEffect(() => {
        if (taskForm){
            setTaskColorsDisplay(taskColor.map(color => (
                <option key={nanoid()} value={color.colorValue} selected={taskForm.task_color == color.colorValue.toString()}>
                    {color.colorName}
                </option>
            )));

            setTaskCategoryDisplay(taskCategory.map(category => (
                <option key={nanoid()} value={category} selected={taskForm.subtype === category.toString()}>{category}</option>
            )))
        }
        console.log(taskForm.task_color + " " + taskForm.subtype)
    }, [taskForm]);


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
            switch (searchTask){
                case "Créer" :  createDefaultStepTask(data.subtype, data.header, data.description, data.externalLink, data.taskColor);
                    break

                case "Modifier":
                    console.log("Modifier !")
                    console.log("tempTask is : " +tempTask.header)
                    props.updateStepListTask(tempTask)
                    break;

                case "Supprimer" :
                    console.log("Supprimer !")
                    console.log("tempTask is : " +tempTask.header)
                    if (window.confirm("Etes vous sur de vouloir supprimer la  tâche " +  tempTask.header + " ?")){
                        props.deleteTask(tempTask)
                    }
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
    //defaultValue de la taskFo


//////RETURN///////////////RETURN///////////////////////RETURN/////////////////////RETURN////////////////RETURN/////////////////////////////


    async function handleChange(e) {
        await setTaskForm(JSON.parse(e.target.value))
        // await setTaskCategoryDisplay(taskCategory.map(category => (
        //     <option key={nanoid()} value={category} selected={taskForm.subtype === category.toString()}>{category}</option>
        // )))
    }

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
                                onChange={e => handleChange(e)} // parse the JSON string
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
