import {useState} from "react";
import './tailwind.css'
import Form from "./components/Form";

function App() {

    const [show, setShow] = useState(false)
    return (
        <div className="App">
            {/*<Test text="my first prop"/>*/}
            {/*<Children>*/}
            {/*    <ul>*/}
            {/*        <li>test1</li>*/}
            {/*        <li>test2</li>*/}
            {/*        <li>test3</li>*/}
            {/*        <li>test4</li>*/}
            {/*    </ul>*/}
            {/*</Children>*/}
            {/*<Button onClick={() => setShow(show => !show)} type="primary"> {show ? "HIDE" : "SHOW"}</Button>*/}
            {/*{show && <UseEffectHook/>}*/}
            {/*<UseRefHook/>*/}
            {/*<TodoApp/>*/}
            <Form/>
        </div>
    );
}

export default App;
