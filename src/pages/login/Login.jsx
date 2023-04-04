import {useState} from "react";
import './login.css'
import {Link} from 'react-router-dom'
import clouds from "../../assets/clouds.svg";

const Login = (props) => {
    const [fields, setFields] = useState({ login: "", password: "" }); //Objet qui contients les différents field de la page
  return (
    <div className='login section__padding'>
        <img src={clouds}/>
      <div className="login-container">
        <h1>Se connecter</h1>
        <form className='login-writeForm' autoComplete='off'>

          <div className="login-formGroup">
            <label>Username</label>
            <input type="text"
                   placeholder='Username'
                   value={fields.login}
                   onChange={form => setFields({...fields, login: form.target.value})}
            />
          </div>

          <div className="login-formGroup">
            <label>Mot de passe</label>
            <input type="password"
                   placeholder='Mot de passe'
                   value={fields.password}
                   onChange={form => setFields({...fields, password: form.target.value})}
            />
          </div>
          <div>
            <a href className="login-formGroup">Mot de passe oublié ? </a>
          </div>
         <div className="login-button">
          <button className='login-writeButton' type='button' onClick={() => props.fetchUser(fields.login, fields.password)}>Se Connecter</button>
          <Link to="/register">
            <button className='login-writeButton' type='submit'>Créer un compte</button>
          </Link>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Login;
