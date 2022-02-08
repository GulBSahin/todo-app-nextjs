import {useState} from 'react'

export default function TasksPage() {

    const [tasks, setTasks] = useState([]);  // array of tasks that will be display on the page
    const [task, setTask] = useState('');  // task that will be added to the array
    
    const fetchTasks = async () => { // fetch tasks from the api
        const response = await fetch('/api/tasks')
        const data = await response.json()
        setTasks(data)
    }

    const submitTask = async (e) => { // submit task to the api
        e.preventDefault()
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({title: title, memo: 'default memo', checked: false, pinned: false}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    }

    const deleteComment = async (taskId) => { // delete task from the api
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    fetchTasks()
    }
    return (
        <div>
            {/* this about input field to adding data to db */}
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
            <button onClick={submitTask}>Submit Tasks</button>
            {/* these about fetching data and displaying it on the screen */}
            <button onClick={fetchTasks}>Load Tasks</button>
            {tasks.map((task) => {
                    return(
                        <div key={task.id}>
                            <h3>{task.title}</h3>
                            <p>{task.memo}</p>
                            <button onClick={()=>deleteComment(task.id)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}