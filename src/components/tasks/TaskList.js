import {nanoid} from "nanoid";
import React from "react";


/**
 * This function Display StepTask in html to be rendered. This should be a component, why is it not ????
 */

export default function TaskList(props) {

    function stepTasksRender() {
        console.log("stepTaskRender !")
        const newTaskDisplay = []
        console.log("Step Task Render " + props.stepTasks.length)
        for (let i = 0; i < stepTasks.length; i++) {
            newTaskDisplay.push(
                <div className="task" key={nanoid()}>
                    <div className="task-header"
                         key={nanoid()}
                         onClick={() => toggleExpand()}>
                        <button className="login-button" key={nanoid()} onClick={() => toggleExpand()}>
                            {expanded ? "Collapse All" : "Expand All"}
                        </button>
                        <h1>{stepTasks[i].header}</h1>
                    </div>
                    <span key={nanoid()}>{expanded ? '-' : '+'}</span>
                    {expanded && (
                        <div
                            key={nanoid()}
                            className="task-container">
                            <p key={nanoid()}>{stepTasks[i].description}</p>
                        </div>
                    )}
                </div>
            )
        }

        props.setStepTasksDisplay(newTaskDisplay)
        console.log(stepTasksDisplay.length)


    }

    return (
        {stepTasksRender}
    )
}