import {useState} from "react";
import './login.css'
import {Link} from 'react-router-dom'

const Login = (props) => {
    const [fields, setFields] = useState({ login: "", password: "" }); //Objet qui contients les différents field de la page
  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Login</h1>
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
            <label>Password</label>
            <input type="password"
                   placeholder='Password'
                   value={fields.password}
                   onChange={form => setFields({...fields, password: form.target.value})}
            />
          </div>
          <div>
            <a href className="login-formGroup">Forgot your password ?</a>
          </div>
         <div className="login-button">
          <button className='login-writeButton' type='button' onClick={() => props.fetchUser(fields.login, fields.password)}>Login</button>
          <Link to="/register">
            <button className='login-writeButton' type='submit'>Register</button>
          </Link>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Login;
