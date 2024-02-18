import Test from "./components/Test";
import Children from "./components/Children";
import './tailwind.css'

function App() {
    return (
        <div className="App">
            <Test text="my first prop"/>
            <Children>
                <ul>
                    <li>test1</li>
                    <li>test2</li>
                    <li>test3</li>
                    <li>test4</li>
                </ul>
            </Children>
        </div>
    );
}

export default App;
