import {useState} from "react"

function Index() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    const submitHandle = (e) => {
        e.preventDefault()
        setTodos([...todos, todo])
        setTodo('')
    }

    const handleChange = (e) => {
        setTodo(e.target.value)
    }
    return (
        <>
            <h1>Todo app</h1>
            <form onSubmit={submitHandle}>
                <input type="text" value={todo} onChange={handleChange}/>
                <button type="submit" disabled={!todo}>Add</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </>
    )
}

export default Index;