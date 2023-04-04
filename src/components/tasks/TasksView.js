import React, {useState, useEffect} from "react";
import {nanoid} from "nanoid";
import "../css/style.css";

export default function TasksView(props){
    return(
        <table className="table table-hover">
            <tbody>
            {props.displayTasks}
            </tbody>
        </table>
    );
}


