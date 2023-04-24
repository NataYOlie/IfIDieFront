import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";
import {nanoid} from "nanoid";


function MenuBar(props){

    return(
        <div>
            {props.children}
        </div>
    );
}

function AddAndSearchBar(props){
    return(
        <>
            {props.children}
        </>

    )
}

function ToDoDone(props){
    return(
        <>
            {props.children}
        </>

    )
}


export default function TasksComp(props){
    const lefTasks = leftToDo(props)
    const isSmallScreen = window.innerWidth <= 768;

    // const [isSmallScreen, setIsSmallScreen] = useState(false);
    // useEffect.js(() => {
    //     function handleResize() {
    //         setIsSmallScreen(window.innerWidth <= 768);
    //     }
    //     window.addEventListener('resize', handleResize);
    //     handleResize(); // Call the function once to initialize the value
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    // TOUT CA POUR UN BRAVO
    function leftToDo(props){

        if (props.todoCounter >0){
            return(
                <p>Il vous reste {props.todoCounter} tâche(s) à faire</p>
            )
        }else {
            return(
                <p>Bravo vous avez fini ! </p>
                )
        }
    }


///////////////////////////VIEW/////////////////////////////////////////////////////////

    return(


        <Container>
            {isSmallScreen?(
                <MenuBar>

                    <ToDoDone>
                        <Button
                            className={props.buttonClass[1]}
                            key={nanoid()}
                            onClick={()=>props.changeTypeTodo()}>
                            A Faire
                        </Button>
                        <Button
                            className={props.buttonClass[2]}
                            key={nanoid()}
                            onClick={()=>props.changeTypeDone()}>
                            Finies
                        </Button>
                    </ToDoDone>
                    <Button
                        className={props.buttonClass[0]}
                        key={nanoid()}
                        onClick={()=> props.changeTypeText()}>
                        Toutes Les Tâches
                    </Button>
                    <AddAndSearchBar>
                        <Button
                            className="btn-success me-3"
                            key={nanoid()}
                            onClick={()=>props.setaddOrSearch(true)}
                        >Ajouter</Button>

                        <Button
                            className="btn-light me-3"
                            key={nanoid()}
                            onClick={()=>props.setaddOrSearch(false)}
                        >Chercher</Button>
                    </AddAndSearchBar>
                    <Button
                        className="btn-secondary me-3 bg-transparent"
                        onClick={props.changeTypeDone}>
                        {lefTasks}
                    </Button>

                </MenuBar>
            ):(
            <MenuBar>
                <Button
                    className={props.buttonClass[0]}
                    key={nanoid()}
                    onClick={()=> props.changeTypeText()}>
                    Toutes Les Tâches
                </Button>
                <ToDoDone>
                    <Button
                        className={props.buttonClass[1]}
                        key={nanoid()}
                        onClick={()=>props.changeTypeTodo()}>
                        A Faire
                    </Button>
                    <Button
                        className={props.buttonClass[2]}
                        key={nanoid()}
                        onClick={()=>props.changeTypeDone()}>
                        Finies
                    </Button>
                </ToDoDone>

                <Button
                    className="btn-secondary me-3 bg-transparent"
                    onClick={props.changeTypeDone}>
                    {lefTasks}
                </Button>
                <AddAndSearchBar>
                    <Button
                        className="btn-success me-3"
                        key={nanoid()}
                        onClick={()=>props.setaddOrSearch(true)}
                    >Ajouter</Button>

                    <Button
                        className="btn-light me-3"
                        key={nanoid()}
                        onClick={()=>props.setaddOrSearch(false)}
                    >Chercher</Button>
                </AddAndSearchBar>
            </MenuBar>
            )}

        </Container>

    );
}
