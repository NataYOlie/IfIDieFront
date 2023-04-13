import React, {useEffect} from 'react';
import './funnydeath.css';


const FunnyDeath = (props) => {

    useEffect(() => {
        props.refreshFunnyDeath();
    }, []);


    return(
        <div className="funny-content section__padding" onClick={props.getRandomFunnyDeath}>
        <div className="funny-content">
            <div className="funny-content">
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

)

};

export default FunnyDeath