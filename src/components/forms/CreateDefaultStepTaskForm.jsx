import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import './createDefaultTask.css';
import * as yup from "yup";
import StepTask from "../stepTask/StepTask";


const schema = yup.object().shape({
    subtype: yup.string().required("Catégorie : Famille, Administratif, Santé, Transmission, Obsèques, Un proche est décédé ? "),
    header: yup.string().required("Ce champs est obligatoire"),
    description: yup.string().required("Ce champs est obligatoire")
});

export default function CreateDefaultStepTaskForm(props) {

const {
    register,
    formState: {errors},
    handleSubmit,
} = useForm({
    resolver: yupResolver(schema),
});

// function onSubmit(data){
//     console.log(data)
//     let newStepTask = [];
//     newStepTask.push(props.createDefaultStepTask(data.subtype, data.header, data.description, data.externalLink, data.taskColor));
//     props.setStepTasks.push(data)
//     console.log(props.stepTasks[0] + newStepTask.subtype)
// }
    function onSubmit(data) {
        const newStepTask = props.createDefaultStepTask(data.subtype, data.header, data.description, data.externalLink, data.taskColor);
        props.addStepTask(newStepTask)
        console.log(props.stepTasks[0].subtype + newStepTask.subtype);
    }

return (
    <div className='createDefaultTask section__padding'>
        <div className="createDefaultTask-container">
            <h1>Créer une tâche Step par défaut</h1>
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
                    <input type="text"
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
                    <input type="radio" id="bleu" name="bleu" value="" defaultChecked="true" {...register("taskColor")}/>
                    <label htmlFor="bleu">Aucune</label><br />
                    <input type="radio" id="bleu" name="bleu" value="#12a3df" {...register("taskColor")}/>
                    <label htmlFor="bleu">Bleue</label><br />
                    <input type="radio" id="jaune" name="jaune" value="#fcd200" {...register("taskColor")}/>
                    <label htmlFor="jaune">Jaune</label><br />
                    <input type="radio" id="rouge" name="rouge" value="#ff4800" {...register("taskColor")}/>
                    <label htmlFor="rouge">Rouge</label><br />
                    <input type="radio" id="vert" name="vert" value="#46d308" {...register("taskColor")}/>
                    <label htmlFor="vert">Verte</label><br />

                </div>

                <div className="createDefaultTask-button">
                    <button className='createDefaultTask-writeButton'
                            type="submit"
                    >
                        Créer une tache
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>

)
}
