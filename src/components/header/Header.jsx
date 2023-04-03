import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assets/IfIDie_logo_blanc.png"
import sun from "../../assets/Header_sun.png"


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
            <div>
              <h1>Parce que ça peut vous arriver</h1>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Header
