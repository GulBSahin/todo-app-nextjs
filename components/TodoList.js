import {useState, useEffect } from 'react'
import Todo from "./Todo"

export default function TodoList() {

    const [tasks, setTasks] = useState([]);  // array of tasks that will be display on the page
    const [task, setTask] = useState('');  // task that will be added to the array
    
    const fetchTasks = async () => { // fetch tasks from the api
        const response = await fetch('/api/tasks')
        const data = await response.json()
        setTasks(data)
    }
    useEffect(() => {
        fetchTasks()
    }, [])
    const submitTask = async (e) => { // submit task to the api
        e.preventDefault()
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({title: task, memo: 'default memo', checked: false, pinned: false}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <div>
            {/* this about input field to adding data to db */}
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
            <button onClick={submitTask}>Submit Tasks</button>
            {/* these about fetching data and displaying it on the screen */}
            
            {tasks.map(task => 
             <Todo key={task.id} task={task}/>                    
            )}            
        </div>
    )
}