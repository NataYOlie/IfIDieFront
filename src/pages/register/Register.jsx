import React, {useState} from 'react';
import './register.css'
import {Link} from 'react-router-dom'

const Register = (props) => {
    const [fields, setFields] = useState({ surname: "", lastname: "", password: "", username: "" }); //Objet qui contients les différents field de la page

  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>register</h1>
        {/* <p className='upload-file'>Upload Space pic</p>
        <div className="upload-img-show">
          <img src={Image} alt="banner" />
          <p>browse media on your device</p>
        </div> */}
        <form className='register-writeForm' autoComplete='off' >
          {/* <div className="register-formGroup">
            <label>Upload</label>
            <input type="file" className='custom-file-input'
          />
          </div> */}
          <div className="register-formGroup">
            <label>Nom</label>
            <input type="text" placeholder='Name'
              value={fields.lastname}
              onChange={form => setFields({...fields, lastname: form.target.value})}
            />
          </div>
          <div className="register-formGroup">
            <label>Prénom</label>
            <input type="text" placeholder='Username'
              value={fields.surname}
              onChange={form => setFields({...fields, surname: form.target.value})}
            />
          </div>
          <div className="register-formGroup">
            <label>Email</label>
            <input type="email" placeholder='Email'
              value={fields.username}
              onChange={form => setFields({...fields, username: form.target.value})}
            />
          </div>
          <div className="register-formGroup">
            <label>Password</label>
            <input type="password" placeholder='Password'
              value={fields.password}
              onChange={form => setFields({...fields, password: form.target.value})}
            />
          </div>
         <div className="register-button">
          <button className='register-writeButton' type="button" onClick={() => props.createUser(fields.username, fields.password, fields.surname, fields.lastname)}>register</button>
          <Link to="/login">
            <button className='reg-login-writeButton' >Login</button>
          </Link>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Register;
