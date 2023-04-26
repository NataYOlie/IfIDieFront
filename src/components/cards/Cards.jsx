import React from 'react'
import './cards.css'
import cimetary from '../../assets/springfield_isometric.jpg'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faCoffee,
  faHourglassStart,
  faEnvelope,
  faCloud,
  faCompass, faBroom
} from '@fortawesome/free-solid-svg-icons'
import {FunnyDeath} from "../index";
library.add(faCheckSquare, faCoffee, faHourglassStart, faEnvelope, faCloud, faCompass, faBroom)

const Cards = (props) => {
  return (
    <div className ='cards section__padding'>
      <div className="cards-container">
        <h1>Préparez vous à mourir </h1>
        <div className="container-card">
          <div className="card-column" >
            <div className="card">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-broom" size="2xl" />
                {/*<img src={bids1} alt="" />*/}
              <Link to={`/mettre_en_ordre`}>
              <h2 className="cards-title">Mettre en Ordre</h2>
              </Link>
              </div>
              <div className="card-content">
                <p>Mettre en ordre ses affaires, préparer ses papiers, se poser les questions importantes et y répondre.</p>
                <p>Personnalisez ici une liste qui vous guidera dans ce travail à la fois introspectif et administratif</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card-grey">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-compass" size="2xl"/>
                <Link to={`/`}>
                  <h2 className="cards-title">"En Vie"</h2>
                </Link>
              </div>
              <div className="card-content">
                <p>Si vous êtes ici c'est que vous n'êtes pas mort.e ! Comment faire de ce temps qui nous ai donné sur
                  terre notre vie ? Comment choisir ce que l'on vit et renoncer à ce que l'on ne souhaite plus vivre ?</p>
                  <p>Listez ici vos envies, projets, objectifs personnels,
                professionnels, intimes...</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card-grey">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" />
                <Link to={`/`}>
                  <h2 className="cards-title">Life Calendar</h2>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une vue de votre vie qui tient sur un A4, intégrez y vos "En Vie", les périodes importantes passées
                  ou à venir.
                </p><p>Ce format nous permet de visualiser l'échelle de notre vie en un coup d'oeil.</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card-grey">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-cloud" size="2xl" />
                <Link to={`/`}>
                  <h2 className="cards-title">Ma Mort Numérique</h2>
                </Link>
              </div>
              <div className="card-content">
                <p>Que restera t-il de vous sur les internets ? Que faire de vos réseaux sociaux ? Des différentes plateformes où
                vous êtes actif ou active ?</p>
                <p>Suivez le guide et faites le point !</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FunnyDeath
          currentFunnyDeath = {props.currentFunnyDeath}
          refreshFunnyDeath = {props.refreshFunnyDeath}
          getRandomFunnyDeath={props.getRandomFunnyDeath}/>

      <div className="cards-container">
      <h1>Visitez notre cimetière</h1>
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
      </div>



      <div className="cards-container">
        <h1>Existez encore un peu après</h1>
        <div className="container-card">

          <div className="card-column" >
            <div className="card-grey">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl"  />
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/`}>
                  <h2 className="cards-title">Créez votre cénotaphe</h2>
                </Link>
              </div>
              <div className="card-content">
                <p>Un cénotaphe est une sépulture ne contenant pas de dépouille, créez votre
                cénotaphe en 3D afin que celui-ci soit intégré au cimetière d'If I Die à votre décès. </p>
                <p>Tout est permis, ce cénotaphe pourra également contenir des messages écrits,
                  audio ou vidéos</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card-grey">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-envelope" size="2xl"/>
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/`}>
                  <h2 className="cards-title">Message depuis l'au delà</h2>
                </Link>
              </div>
              <div className="card-content">
                <p>Rédigez des lettres à vos proches qui seront envoyées après votre décès, selon les conditions que vous aurez décidé</p>
              </div>
            </div>
          </div>

          <div className="card-column" >
            <div className="card-grey">
              <div className="cards-top">
                <FontAwesomeIcon icon="fa-solid fa-hourglass-start" size="2xl" />
                {/*<img src={bids1} alt="" />*/}
                <Link to={`/`}>
                  <h2 className="cards-title">Capsule temporelle</h2>
                </Link>
              </div>
              <div className="card-content">
                <p>Créez une capsule temporelle qui témoignera d'un moment  important de votre vie en regroupant des photos,
                des enregistrements audio, des vidéos. Cette capsule sera conservée et ne pourra être ouverte qu'à la
                date que vous aurez décidé, par les personne que vous aurez choisies.</p>
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
