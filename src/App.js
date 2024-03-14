import {useState} from "react";
import {Route, Routes} from 'react-router-dom';
import './tailwind.css'
//Components
//Views
import Users from "./views/Users";
import Posts from "./views/Posts";
import Navbar from "./components/Navbar";

function App() {

    const [show, setShow] = useState(false)
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/users" element={<Users/>}/>
                <Route path="/posts" element={<Posts/>}/>
            </Routes>
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
            {/*<Form/>*/}
        </div>
    );
}

export default App;
