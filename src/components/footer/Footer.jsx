import React from 'react'
import './footer.css'
import logo from '../../assets/IfIDie_logo_blanc.png'
import plants from '../../assets/plants.png'
import { AiOutlineInstagram,AiOutlineTwitter, } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {

  return (
      <div className='plants'>
        <img src={plants} alt="plants"/>
    <div className='footer'>
      <div className="footer-links">
          <img src={logo} alt="logo" />
        <div className="footer-links_logo">
        <div>
          <h1>If I Die</h1>
        </div>
        <div>
          <h3>Abonnez-vous à notre Newsletter</h3>
        </div>
        <div>
          <input type="text" placeholder='Entrez votre email' />
          <button>OK</button>
        </div>
        </div>
        <div className="footer-links_logo">
          <div className="centered">
          <p>Politique de confidentialité</p>
          <p>FAQ</p>
          <p>Carte du Site</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div>
        <p> © {(new Date().getFullYear())} If I Die, Inc. All Rights Reserved</p>
        </div>
        <div>
          <p>Suivez-nous</p>
          <AiOutlineInstagram size={25} color='white' className='footer-icon' />
          <AiOutlineTwitter size={25} color='white' className='footer-icon'/>
          <FaTelegramPlane size={25} color='white'  className='footer-icon' />
        </div>

      </div>
    </div>
      </div>
  )
}
export default Footer

