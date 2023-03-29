import React from 'react'
import './cards.css'
import {AiFillHeart, AiFillHourglass, AiOutlineHeart, AiOutlineHourglass, AiTwotoneHourglass} from "react-icons/ai";
import cimetary from '../../assets/springfield_isometric.jpg'
import bids2 from '../../assets/OLD/bids2.png'
import bids3 from '../../assets/OLD/bids3.png'
import bids4 from '../../assets/OLD/bids4.png'
import bids5 from '../../assets/OLD/bids5.png'
import bids6 from '../../assets/OLD/bids6.png'
import bids7 from '../../assets/OLD/bids7.png'
import bids8 from '../../assets/OLD/bids8.png'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare, faCoffee, faHourglassStart)

const Cards = () => {
  return (
    <div className ='cards section__padding'>
      <div className="cards-container">
        <div className="container-card">


          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" style={{color: "#ff4800",}} />
                {/*<img src={bids1} alt="" />*/}
              <Link to={`/post/123`}>
              <h1 className="cards-title">Life Calendar</h1>
              </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos projets et objectifs à court et long terme !</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" style={{color: "#ff4800",}} />
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/post/123`}>
                  <h1 className="cards-title">Life Calendar</h1>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos projets et objectifs à court et long terme !</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" style={{color: "#ff4800",}} />

                <Link to={`/post/123`}>
                  <h1 className="cards-title">Life Calendar</h1>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos projets et objectifs à court et long terme !</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" style={{color: "#ff4800",}} />
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/post/123`}>
                  <h1 className="cards-title">Life Calendar</h1>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos projets et objectifs à court et long terme !</p>
              </div>
            </div>
          </div>
        </div>
      </div>

          <div className="cimetary-content">
            <div className="cimetary-content-text">
              <h1>Cimetière</h1>
              <p>Hitoshi Christopher Nikaidoh, un chirurgien américain, est décapité en
                montant dans un ascenseur à l'Hôpital Saint-Joseph (en) de Houston au Texas.
                Les portes de l'ascenseur se sont fermées quand Nikaidoh est entré,
                la tête piégée à l'intérieur de la cabine, le reste de son corps encore à l'extérieur.
                Celui-ci a été retrouvé au fond de la fosse tandis que la partie supérieure de sa tête,
                coupée juste au-dessus de la mâchoire inférieure, a été retrouvée dans la cabine</p>
            </div>
            <div className="cimetary-content-img">
              <img src={cimetary} alt="" />
            </div>
          </div>


      <div className="cards-container">
        <div className="container-card">

          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" style={{color: "#ff4800",}} />
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/post/123`}>
                  <h1 className="cards-title">Life Calendar</h1>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos projets et objectifs à court et long terme !</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" style={{color: "#ff4800",}} />
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/post/123`}>
                  <h1 className="cards-title">Life Calendar</h1>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos projets et objectifs à court et long terme !</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" style={{color: "#ff4800",}} />
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/post/123`}>
                  <h1 className="cards-title">Life Calendar</h1>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos projets et objectifs à court et long terme !</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" style={{color: "#ff4800",}} />
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/post/123`}>
                  <h1 className="cards-title">Life Calendar</h1>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos projets et objectifs à court et long terme !</p>
              </div>
            </div>
          </div>

            </div>
          </div>

      {/*<div className="load-more">*/}
      {/*  <button>Load More</button>*/}
      {/*</div>*/}
    </div>
  )
}

export default Cards
