import {useEffect, useState} from "react";


function App() {

    const [constantsThatTriggersTheDoSomething, setConstantsThatTriggersTheDoSomething]=useState("something")

    /**
     * This use Effect does something when my constant changes
     */

    useEffect(() => {
        doSomething()
    }, [constantsThatTriggersTheDoSomething])



    function doSomething() {
        console.log("the constant has changed")
    }


return <div>My App</div>;

}

export default App;