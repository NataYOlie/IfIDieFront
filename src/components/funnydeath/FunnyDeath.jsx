import React, {useEffect} from 'react';
import './funnydeath.css';


const FunnyDeath = (props) => {

    useEffect(() => {
        props.refreshFunnyDeath();
    }, []);

    return(
        <div className="funny-content section__padding">
        <div className="funny-content">
            <div>
                <h1>Ils sont passés par là</h1>
            </div>
            <div>
                <p>{props.currentFunnyDeath.content} ICI</p>
            </div>
        </div>
        </div>

)

};

export default FunnyDeath