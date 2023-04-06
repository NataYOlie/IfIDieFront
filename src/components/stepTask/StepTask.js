import "./stepTask.css"
import React from "react";

const StepTask = (props) => {

    function render (){
        props.fetchDefaultStepTasks();
        for (let i=0 ; i < props.stepTasks.length ; i++){
            return (
                <div className="StepTask section__padding">
                    <div className="StepTask">
                        <div>
                            <h1>{props.stepTasks.header}</h1>
                        </div>
                        <div>
                            <p>{props.stepTasks.description}</p>
                        </div>
                    </div>
                </div>        )

            }
        }
    return (
        <>
            <h1>RETURN</h1>
            {render}
        </>
    )

};

export default StepTask;