import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoForm() {
    const {task,setTask,fetchTasks,showMemo,setShowMemo}=useContext(TodoContext);
    const {title,memo}=task


    const submitTask = async (e) => { // submit task to the api
        e.preventDefault();
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({title: title, memo: memo, checked: false, pinned: false}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        fetchTasks() // fetch tasks from the api
        setTask({...task,title:"",memo:""}) //reset value
    }

    const updateTask = async (task) => { // update task to the api
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({title:task.title,memo:task.memo }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
       fetchTasks()    
       setShowMemo(false)
       setTask({...task,title:"",memo:""}) 
    }

    return (
        <form >
            <Typography sx={{mt:3,fontWeight:'bold', textAlign:'center'}} variant="h5" color="darkgray" > Todo List</Typography>
            <hr style={{border:"1px solid #E45D8B",width:"30%"}}/> 
            
            <input  placeholder=" &#9776; Add a task..." value={title} onChange={(e) => setTask({...task,title:e.target.value}) } />
            { showMemo && 
            <input  placeholder=" &#9776; Add a memo..." value={memo} onChange={(e) => setTask({...task,memo:e.target.value})}/>
            } 
             {showMemo ?  
            <Button sx={{mt:3}} variant="outlined" style={{color:"#EC6190" ,borderColor:"#EC6190"}} onClick={() =>updateTask(task)} > UPDATE TODO </Button>
             : 
            <Button sx={{mt:3}} variant="outlined" style={{color:"#EC6190" ,borderColor:"#EC6190"}} onClick={submitTask} > ADD TODO </Button>
             } 
            <br />
        </form>
    )
}
                      