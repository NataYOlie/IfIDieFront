import React, {useEffect} from 'react';
import './funnydeath.css';


const FunnyDeath = (props) => {

    useEffect(() => {
        props.refreshFunnyDeath();
    }, []);


    return(
        <div className="funnydeath">
        <div className="funnydeath-header">
            <h1>Histoires de faucheuses</h1>
        </div>
        <div className="funny-content " onClick={props.getRandomFunnyDeath}>
        <div className="funny-pascontent">
            <div className="funny-pasdutoutcontent">
                <h1>{props.currentFunnyDeath.header}</h1>
            </div>
            <div className="funny-div">
                <div className="funny-divdeux">
                <h2>RIP {props.currentFunnyDeath.deadName} - {props.currentFunnyDeath.deadDate}</h2>
                </div>
                <div className="funny-divdeux">
                <p>{props.currentFunnyDeath.content}</p>
                </div>
            </div>
        </div>
        </div>
        </div>
        )};

export default FunnyDeath