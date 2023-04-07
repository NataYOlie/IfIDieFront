import React from 'react';
import TasksComp from "../../components/tasks/TasksComp";
import {StepTask} from "../../components";


const Envisager = (props) => {


    return (
    <div>
        <h1>Et si je meurs, qu'est-ce que les autres auraient à gérer ?</h1>
        <p>Avant d’envisager de régler les détails de vos propres obsèques, nous vous invitons à engager une réflexion sur les valeurs et convictions qui sont les vôtres à ce moment précis de votre vie, en esquissant des réponses aux questions ci-dessous. Naturellement, nous ne formulons ces questions que pour vous inviter à un cheminement personnel. Vous pouvez aussi en discuter avec vos proches s’ils sont prêts à le faire.
            Quel regard portez-vous sur le chemin parcouru et les événements majeurs de votre vie ?
            Quelles valeurs essentielles souhaitez-vous transmettre à vos proches ?
            Quelle image voulez-vous que l’on garde de vous ?
            Quel souvenir de vos obsèques voudriez-vous laisser à votre famille et à vos amis ?
            Quelle est votre attente par rapport à une cérémonie d’obsèques ?
            Quelles sont vos convictions quant au sens de la vie et de la mort ?
            Comment envisagez-vous les années à venir et qu’aimeriez-vous vivre avant votre départ ?
        </p>
        <StepTask />



    </div>
)};

export default Envisager;