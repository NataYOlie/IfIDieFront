import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import './createDefaultTask.css';
import * as yup from "yup";
import {useState} from "react";


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

////////////////////////////////////////////////////////////////////

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

    function onSubmit(data){
        console.log("bouton " + data.header)
        if(data){
            createDefaultStepTask(data.subtype, data.header, data.description, data.externalLink, data.taskColor);
            props.fetchDefaultStepTasks();
        }else {
            props.fetchDefaultStepTasks();
        }

    }

return (
    <div className='createDefaultTask section__padding'>
        <div className="createDefaultTask-container">
            <h1>Créer une tâche Step par défaut </h1>
            <h2>Cette tâche sera affichée à l'utilisateur dans sa todolist de base pour ses démarches</h2>
            <div className="createDefaultTaskFormContainer">
            <form className='createDefaultTask-writeForm' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div className="createDefaultTask-formGroup">
                    <label>Catégorie</label>
                    <p>Famille, Administratif, Santé, Transmission, Obsèques, Un proche est décédé ? </p>
                    <input type="text"
                           placeholder='Catégorie'
                           {...register("subtype")}
                    />
                    <p>{errors.subtype?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>Titre de la tâche</label>
                    <input type="text"
                           placeholder='Titre'
                           {...register("header")}
                    />
                    <p>{errors.header?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>description</label>
                    <textarea type="text"
                           className="large_input"
                           placeholder='description'
                           {...register("description")}
                    />
                    <p>{errors.description?.message}</p>
                </div>

                <div className="createDefaultTask-formGroup">
                    <label>Ressource extérieure</label>
                    <input type="text"
                           placeholder='externalLink'
                           {...register("externalLink")}
                    />
                </div>

                <div className="createDefaultTask-Radio">
                    <h3>Couleur de la tâche</h3><br />
                    {/*bleu  	 #12a3df
                        rouge   	#ff4800
                        jaune   	#fcd200
                        vert    	#46d308
                        marron	#6d5839
                        orange   #c89345
                        */}
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
