import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import "../css/style.css";
import "whatwg-fetch";
import TasksView from "./TasksView";
import TasksComp from "./TasksComp";
import {Button, Container, Row} from "react-bootstrap";



export default function TaskController(){

    const [tasks, setTasks] = useState([]);
    const [tasksDisplay, setTasksDisplay] = useState([])
    const [type, setType] = useState("text")
    const [addOrSearch, setAddOrSearch] = useState(true)
    const [fieldText, setTextField] = useState("");
    const [todoCounter, setTodoCounter] = useState(0)
    const [label, setLabel] = useState("")
    const [buttonClassAdd, setButtonClassAdd] = useState(["btn-primary me-3", "btn-info me-3", "btn-info me-3"])
    const [buttonClass, setButtonClass] = useState("btn-secondary")
    const [searchInput, setSearchInput] = useState("");

    useEffect(()=>fetchTasks(), []);

////////////////////////////// FETCH FUNCTIONS //////////////////////////////////////////////////////////////

    function fetchTasks(){
        const newTasks = []
        fetch("http://localhost:8081/tasks")
            .then(response => response.json())
            .then(response => {
                for(let i=0; i<response.length; i++){
                    newTasks.push({
                            id: response[i].id,
                            text: response[i].text,
                            isChecked: response[i].isChecked
                        }
                    );
                    console.log("pipou" + newTasks.length)
                }
                setTasks(newTasks)
                displayTasks(type, newTasks)
            });
        return newTasks
    }

    function addTask(){
        if (fieldText){
            setLabel("")
            const requestOptions = {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({text: fieldText, isChecked: false} )
            };
            fetch("http://localhost:8081/tasks", requestOptions)
                .then(()=>fetchTasks());
            setTextField("")
        }else {
            const newLabel = "Le champs d'ajout est vide ! Essayez encore en tapant des lettres à l'intérieur de celui-ci"
            setLabel(newLabel)
        }
    }


    function searchTask() {
        let newTasks = fetchTasks();
        const newTaskDisplay = [];
        if (fieldText){
            setLabel("")
            // newTasks.filter(newTasks.text.match(fieldText));
            // if(newTasks){
            //     for (let i=0; i<newTasks.length; i++){
            //         newTaskDisplay.push(
            //             <tr className="table-active" >
            //                 <td>
            //                     {newTasks[i].text}
            //                 </td>
            //                 <td align={"right"}>
            //                     <Button id={newTasks[i].text}
            //                             className={buttonClass}
            //                             value={newTasks[i].text}
            //                             onClick={()=>updateTask(newTasks[i].id, newTasks[i].text)}>
            //                         Done
            //                     </Button>
            //                 </td>
            //             </tr>
            //         );
            //
            //     }


            // }

            // setTextField("")
            // setTasksDisplay(newTaskDisplay)
        }else {
            const newLabel = "Le champs d'ajout est vide ! Essayez encore en tapant des lettres à l'intérieur de celui-ci"
            setLabel(newLabel)
        }
    }



    function deleteTask(taskid){
        console.log("tache a supprimer : " + taskid)
        if (taskid){
            const requestOptions = {
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({id:taskid} )
            };
            fetch("http://localhost:8081/tasks/"+taskid, requestOptions)
                .then(()=>fetchTasks());
            setTextField("")
        }else {
            const newLabel = "Aucune Tâche n'est sélectionnée"
            setLabel(newLabel)
        }
        fetchTasks()
    }

    function updateTask(taskid, taskName){
        console.log("tache a supprimer : " + taskid)
        if (taskid){
            const requestOptions = {
                method: 'put',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({id:taskid, isChecked: true, text:taskName} )
            };
            fetch("http://localhost:8081/tasks/"+taskid, requestOptions)
                .then(()=>fetchTasks());
        }else {
            const newLabel = "Aucune Tâche n'est sélectionnée"
            setLabel(newLabel)
        }
        fetchTasks()
    }


///////////////////// DISPLAY FUNCTIONS ///////////////// MAIN FUNCTION ///////////////////////////

    function displayTasks(type, newTasks){
        setType(type)
        const newLabel = ""
        setLabel(newLabel)
        console.log("poupi" + tasks.length)
        const newTaskDisplay = [];
        let newTodoCounter = 0;

            ///// TASKS CASE ALL
            switch (type) {
                case "text":
                    console.log("case text")
                    for (let i = 0 ; i < newTasks.length ; i++){
                    let buttonId = newTasks[i].text
                        if (newTasks[i].isChecked == false) {
                            newTodoCounter += 1;
                            console.log("counter" + newTodoCounter + " buttonid : " + buttonId)
                            newTaskDisplay.push(
                                <tr className="table-active" >
                                <td>
                                    {newTasks[i].text}
                                </td>
                                <td align={"right"}>
                                <Button id={buttonId}
                                        className={buttonClass}
                                        value={buttonId}
                                        onClick={()=>updateTask(newTasks[i].id, buttonId)}>
                                Done
                                </Button>
                                </td>
                                </tr>
                        );
                        }else {
                            newTaskDisplay.push(
                            <tr className="table-active">
                                <td className="text-decoration-line-through">
                                {newTasks[i].text}
                                </td>
                                <td align={"right"}>
                                    <Button
                                        className="btn-danger"
                                        value={buttonId}
                                        onClick={()=>deleteTask(newTasks[i].id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>);
                        }
                    }
                    setTasksDisplay(newTaskDisplay)
                    setTodoCounter(newTodoCounter)

                    return (
                        <div key={nanoid()} className="task-display">
                            <ul key={nanoid}>
                                {newTaskDisplay}
                            </ul>
                        </div>)

                ///// TASKS CASE TODO
                case "todo" :

                    console.log("case todo")
                    for (let i = 0 ; i < newTasks.length ; i++) {
                        let buttonId = newTasks[i].text
                        if (newTasks[i].isChecked === false) {
                            newTaskDisplay.push(
                                <tr className="table-active" >
                                    <td>
                                        {newTasks[i].text}
                                    </td>
                                    <td align={"right"}>
                                        <Button id={buttonId}
                                                className={buttonClass}
                                                value={buttonId}
                                                onClick={()=>updateTask(newTasks[i].id, buttonId)}>
                                            Done
                                        </Button>
                                    </td>
                                </tr>
                            );
                        }
                    }
                    setTasksDisplay(newTaskDisplay)

                    return (
                        <div key={nanoid()}>
                            <ul key={nanoid}>
                                {newTaskDisplay}
                            </ul>
                        </div>)

                ///// TASKS CASE DONE
                case "done" :
                    console.log("case done")
                    for (let i = 0 ; i < newTasks.length ; i++) {
                        let buttonId = newTasks[i].text
                        if (newTasks[i].isChecked === true) {
                            newTaskDisplay.push(
                                <tr className="table-active">
                                    <td className="text-decoration-line-through">
                                        {newTasks[i].text}
                                    </td>
                                    <td align={"right"}>
                                        <Button
                                            className="btn-danger"
                                            value={buttonId}
                                            onClick={()=>deleteTask(newTasks[i].id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>);
                        }
                    }
                    setTasksDisplay(newTaskDisplay)

                    return (
                        <div key={nanoid()}>
                            <ul key={nanoid}>
                                {newTaskDisplay}
                            </ul>
                        </div>)

                default :{
                    console.log("no case for me")
                }
                    break;
            }
    }

//////// INTERNAL FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////

    // CHANGETYPE
    function changeTypeTodo(){
        displayTasks("todo", tasks)
        setButtonClassAdd(["btn-info me-3", "btn-primary me-3", "btn-info me-3"])
    }
    function changeTypeDone() {
        let newButtonClass = [...buttonClassAdd]
        displayTasks("done", tasks)
        setButtonClassAdd(["btn-info me-3", "btn-info me-3", "btn-primary me-3"])
    }

    function changeTypeText(){
        displayTasks("text", tasks)
        setButtonClassAdd(["btn-primary me-3", "btn-info me-3", "btn-info me-3"])
    }

    //COMPONENTS

    function AddOrSearch(){
        const [btnAddSearch, setBtnAddSearch] = useState(["btn-success","btn-light"])
        const [placeholder, setPlaceholder] = useState(["Ajouter une tache", "Rechercher une tâche"])
        const [label, setLabel] = useState(["Ajouter", "Rechercher"])

        if (addOrSearch){
            ////AJOUTER

        return(
            <Container>
                <div className="input-group mb-3">
                    <input id="fieldText"
                           className="form-control"
                           autoFocus //quand la page est chargée le focus de la page est sur cet élément-là
                           type="text"
                           placeholder={placeholder[0]}
                           aria-label={placeholder[0]}
                           aria-describedby="button-addon3"
                           value={fieldText} //ça c'est l'état, on dit que le inputfield correspond à cet état
                           onChange={inputfield => setTextField(inputfield.target.value)}
                    />

                    <Button className={btnAddSearch[0]}
                            type="button"
                            id="button-addon2"
                            onClick={()=>addTask()}
                    >{label[0]} </Button>
                </div>
            </Container>
        )

        }else {
            ////RECHERCHER
            return(
            <Container>
                <div className="input-group mb-3">
                    <input id="fieldText"
                           className="form-control"
                           autoFocus //quand la page est chargée le focus de la page est sur cet élément-là
                           type="text"
                           placeholder={placeholder[1]}
                           aria-label={placeholder[1]}
                           aria-describedby="button-addon3"
                           value={fieldText} //ça c'est l'état, on dit que le inputfield correspond à cet état
                           onChange={inputfield => setTextField(inputfield.target.value)}
                    />

                    <Button className={btnAddSearch[1]}
                            type="button"
                            id="button-addon2"
                            onClick={()=>searchTask()}
                    >{label[1]} </Button>

                </div>
            </Container>
        );}
    }

//////////////////////// VIEW //////////////////////////////////////////////////////////////////////////////////////////

    return(
        <Container>
            <Row>
                <div className="task-display">
                    <h1 className="text-center margin-10">TOUDOUWAP</h1>
                </div>

            </Row>

            <Row>
                <TasksComp
                    todoCounter = {todoCounter}
                    addTask={()=> addTask()}
                    displayTasks={()=>displayTasks()}
                    setaddOrSearch = {setAddOrSearch}
                    tasks = {tasks}
                    buttonClass={buttonClassAdd}
                    changeTypeTodo={()=>changeTypeTodo()}
                    changeTypeDone={()=>changeTypeDone()}
                    changeTypeText={()=>changeTypeText()}
                />
            </Row>

            <Row>
                <TasksView
                    displayTasks={tasksDisplay}
                />
            </Row>
            <Row>
                <p className="text-danger align-self-md-start">
                    {label}
                </p>

            </Row>
            <Row>
                <AddOrSearch
                    addTask={()=>addTask()}
                />
            </Row>

        </Container>
    );

}
