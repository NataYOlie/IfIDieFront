import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import {  Link } from "react-router-dom";


const Menu = () => {
    const [envisagerToggleMenu,envisagerSetToggleMenu] = useState(false)
    const [serviceToggleMenu,serviceSetToggleMenu] = useState(false)

    return (
    <>
        <Link to="/envisager" ><p>StepList</p></Link>
        {/*<Link to="/" ><p>Services</p></Link>*/}
        {/*<Link to="/" ><p>Cimetière</p></Link>*/}
    </>
 )
}

 const Navbar = (props) => {
     const [toggleMenu,setToggleMenu] = useState(false)


  const handleLogout = () => {
    props.logout();
    props.setStepTasksDisplayArray([])

  }
  const handleLogin = () => {
     props.setUser(props.user);
  }

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <Link to="/"> 
            <h1>If I Die</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          {/*<input type="text" placeholder='Search Item Here' autoFocus={true} />*/}

            {props.user && (
                <>
                    <Link to={`/space/${props.user.id}`}><p>{props.user.surname} {props.user.lastname}</p></Link>

                    {props.user.role === "ROLE_ADMIN" && (
                        <Link to="/adminboard"><p>Admin Board</p></Link>
                    )}
                </>
            )}


        </div>
      </div>
      <div className="navbar-sign">
          <Menu />
      {props.user ? (
        <>
            <Link to="/"><p onClick={handleLogout}>Logout</p></Link>
        </>
      ): (
        <>
        <Link to="/login">
         <p onClick={handleLogin} >Connection</p>
        </Link>
        </>
      )}
       
      </div>
      <div className="navbar-menu">
        {toggleMenu ? 
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
             <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
            {props.user ? (
              <>
                  <Link to="/"><p onClick={handleLogout}>Logout</p></Link>
              </>
            ): (
              <>
                  <Link to="/login">
                      <p onClick={handleLogin} >Connection</p>
                  </Link>
              <Link to="/register"> 
                <button type='button' className='secondary-btn'>Sign Up</button>
              </Link>
              </>
            )}
            </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
