import React, {useState} from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import './register.css';

    const schema = yup.object().shape({
        lastname: yup.string().required("Merci de renseigner votre nom"),
        surname: yup.string().required("Merci de renseigner votre prénom"),
        username: yup.string().email().required("Merci de renseigner votre email"),
        password: yup.string().min(6, "le mot de passe doit faire au moins 6 caractère")
            .max(20, "le mot de passe ne peut dépasser 20 caractères")
            .required("Vous devez entrer un mot de passe"),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password"), null], "Les mots de passes doivent être identiques")
    });

    function Register(props) {

        const {
            register,
            formState: {errors},
            handleSubmit,
        } = useForm({
            resolver: yupResolver(schema),
        });

        function onSubmit(data){
            console.log(data)
            props.createUser(data.username, data.password, data.surname, data.lastname)
        };

        return (
            <div className='register section__padding'>
                <div className="register-container">
                    <h1>Créer un compte</h1>
                    <form className='register-writeForm' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

                        <div className="register-formGroup">
                            <label>Nom</label>
                            <input type="text"
                                   placeholder='Nom'
                                   {...register("lastname")}
                            />
                            <p>{errors.lastname?.message}</p>
                        </div>

                        <div className="register-formGroup">
                            <label>Prénom</label>
                            <input type="text"
                                   placeholder='Prénom'
                                   {...register("surname")}
                            />
                            <p>{errors.surname?.message}</p>
                        </div>

                        <div className="register-formGroup">
                            <label>Email</label>
                            <input type="email"
                                   placeholder='Email'
                                   {...register("username")}
                            />
                            <p>{errors.username?.message}</p>
                        </div>

                        <div className="register-formGroup">
                            <label>Mot de passe</label>
                            <input type="password"
                                   placeholder='Mot de passe'
                                   {...register("password")}
                            />
                            <p>{errors.password?.message}</p>
                        </div>

                        <div className="register-formGroup">
                            <label>Confirmer le mot de passe</label>
                            <input type="password"
                                   placeholder='Confirmer le mot de passe'
                                   {...register("confirmPassword")}
                            />
                            <p>{errors.confirmPassword?.message}</p>
                        </div>

                        <div className="register-button">
                            <button className='register-writeButton'
                                    type="submit"
                            >
                                Créer un compte
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    };


export default Register;
