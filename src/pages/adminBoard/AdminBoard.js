import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import './adminBoard.css';


const schema = yup.object().shape({
    subtype: yup.string().required("Catégorie : Famille, Administratif, Santé, Transmission, Obsèques, Un proche est décédé ? "),
    header: yup.string().required("Ce champs est obligatoire"),
    description: yup.string().required("Ce champs est obligatoire")
});
/*
    OBJET TASK :
    "id_task": 1,
    "subtype": "famille",
    "header": "header 3",
    "description": "description 2",
    "externalLink": "lien externe",
    "validationDate": null,
    "previsionalDate": null,
    "taskColor": null,
    "visible": true,
    "defaultTask": true,
    listType = {}
    user = {}
    
    createDefaultStepTask(subtype, header, description, externalLink, taskColor)
 */

function AdminBoard(props) {

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data){
        console.log(data)
        props.createDefaultStepTask(data.subtype, data.header, data.description, data.externalLink, data.taskColor)
    }

    return (
        <div className='adminBoard section__padding'>
            <div className="adminBoard -container">
                <h1>Créer une tâche Step par défaut</h1>
                <p>Cette tâche sera affichée à l'utilisateur dans sa todolist de base pour ses démarches</p>
                <form className='adminBoard-writeForm' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

                    <div className="adminBoard-formGroup">
                        <label>Catégorie</label>
                        <p>Famille, Administratif, Santé, Transmission, Obsèques, Un proche est décédé ? </p>
                        <input type="text"
                               placeholder='Catégorie'
                               {...register("subtype")}
                        />
                        <p>{errors.subtype?.message}</p>
                    </div>

                    <div className="adminBoard-formGroup">
                        <label>Titre de la tâche</label>
                        <input type="text"
                               placeholder='Titre'
                               {...register("header")}
                        />
                        <p>{errors.header?.message}</p>
                    </div>

                    <div className="adminBoard-formGroup">
                        <label>description</label>
                        <input type="text"
                               className="large_input"
                               placeholder='description'
                               {...register("description")}
                        />
                        <p>{errors.description?.message}</p>
                    </div>

                    <div className="adminBoard-formGroup">
                        <label>Ressource extérieure</label>
                        <input type="text"
                               placeholder='externalLink'
                               {...register("externalLink")}
                        />
                    </div>
                    <div className="adminBoard-formGroup">

                        <label>taskColor</label>
                        {/*bleu  	 #12a3df
                        rouge   	#ff4800
                        jaune   	#fcd200
                        vert    	#46d308
                        marron	#6d5839
                        orange   #c89345
                        */}
                        <input type="radio" id="bleu" name="bleu" value="#12a3df" {...register("taskColor")}/>
                        <label htmlFor="bleu">Bleue</label><br />
                        <input type="radio" id="jaune" name="jaune" value="#fcd200" {...register("taskColor")}/>
                        <label htmlFor="jaune">Jaune</label><br />
                        <input type="radio" id="rouge" name="rouge" value="#ff4800" {...register("taskColor")}/>
                        <label htmlFor="rouge">Rouge</label><br />
                        <input type="radio" id="vert" name="vert" value="#46d308" {...register("taskColor")}/>
                        <label htmlFor="vert">Verte</label><br />

                    </div>



                    <div className="adminBoard-button">
                        <button className='adminBoard-writeButton'
                                type="submit"
                        >
                            Créer une tache
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}



export default AdminBoard;