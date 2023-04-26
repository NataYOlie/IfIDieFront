import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assets/IfIDie_logo_blanc.png"
import sun from "../../assets/Header_sun.png"
import Divider from '@mui/material/Divider';


const Header = () => {


  return (
    <div className='header section__padding'>
      <div className={"header-content-content"}>
        <div className={"header-logo"}>
          <img src={sun}/>
        </div>
        <div className="header-content">
          <div>
              <img src={logo} alt="" />
              <h1>Parce que ça peut vous arriver</h1>
          </div>
        </div>
      </div>

      <div className="header-intro">
        <h1>Bienvenue sur If I Die</h1>
        <p>
          Penser sérieusement à la mort permet de profiter sérieusement de la vie, le projet d'If I Die
          est de développer des outils qui guident cette réflexion et pousse à se poser les vraies questions.
        </p>
        <p>Notre conseil est de commencer par la liste Mettre en Ordre, cela fait un point sur toutes les questions
        à se poser avant de mourir qu'en général on laisse à ceux qui reste.</p>
        <p>N'hésitez pas à créer un compte pour sauvegarder votre liste !</p>
        <br/>
        <p>
          Ce projet est naissant, les fonctionnalités prévues sont toutes listées dans cette page d'accueil mais vous
          remarquez que très peu sont déjà accessible, si
          vous souhaitez soutenir le projet pour que ces fonctionnalités existent, n'hésitez pas à nous contacter !
        </p>
      </div>

    </div>
  )
}

export default Header
