


export default function AdminBoard(props){
    return(
        <table>
            <tbody>
            {props.fetchDefaultStepTasks}
            </tbody>
        </table>
    );
}