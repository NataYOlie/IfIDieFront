import React, {useState} from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import './register.css';
import {Link} from 'react-router-dom'

const Register = (props) => {

   const [fields, setFields] = useState({ surname: "", lastname: "", password: "", username: "" }); //Objet qui contients les différents field de la page

    const schema = yup.object().shape({
        nom: yup.string().required("Merci de renseigner votre nom"),
        prenom:yup.string().required("Merci de renseigner votre prénom"),
        mail:yup.string().email().required("Merci de renseigner votre email"),
        motdepasse:yup.string().min(6).max(20).required("Vous devez entrer un mot de passe"),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password"), null], "Les mots de passes doivent être identiques")
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // function handleSubmit(){
    //     props.createUser(fields.username, fields.password, fields.surname, fields.lastname)
    // };
    function onSubmit(data){

        console.log(data);
    };


  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>Créer un compte</h1>
        <form className='register-writeForm' autoComplete='off' onSubmit={()=>handleSubmit(onSubmit)}>

          <div className="register-formGroup">
            <label>Nom</label>
            <input type="text"
                placeholder='Nom'
                value={fields.lastname}
                onChange={form => setFields({...fields, lastname: form.target.value})}
               {...register("jaja")}
            />
              <p>{errors.lastname?.message}</p>
          </div>

          <div className="register-formGroup">
            <label>Prénom</label>
            <input type="text"
                   placeholder='Prénom'
              value={fields.surname}
              onChange={form => setFields({...fields, surname: form.target.value})}
                   {...register("prenom")}
            />
          </div>

          <div className="register-formGroup">
            <label>Email</label>
            <input type="email"
                   placeholder='Email'
              value={fields.username}
              onChange={form => setFields({...fields, username: form.target.value})}
                   {...register("mail")}
            />
          </div>

          <div className="register-formGroup">
            <label>Mot de passe</label>
            <input type="password"
                   placeholder='Mot de passe'
              value={fields.password}
              onChange={form => setFields({...fields, password: form.target.value})}
                   {...register("motdepasse")}
            />
          </div>

            <div className="register-formGroup">
                <label>Confirmer le mot de passe</label>
                <input type="password"
                       placeholder='Confirmer le mot de passe'
                       value={fields.confirmPassword}
                       onChange={form => setFields({...fields, confirmPassword: form.target.value})}
                       {...register("confirmPassword")}
                />
            </div>

         <div className="register-button">
          <button className='register-writeButton'
                  type="submit"
                  // onClick={() => props.createUser(fields.username, fields.password, fields.surname, fields.lastname)}
          >
              Créer un compte</button>
         </div>

        </form>
      </div>
    </div>
   )
};

export default Register;
