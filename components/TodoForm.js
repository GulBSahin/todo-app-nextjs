import { Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoForm() {
    const {task,setTask,fetchTasks,showMemo, inputRef,input2Ref,taskMemo}=useContext(TodoContext);
    const {id,title,memo,checked,pinned}=task

    // console.log(showMemo)
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
        // console.log(data)
        fetchTasks()
        setTask({...task,title:"",memo:""})
    }

    const updateTask = async (task) => { // update task to the api
        console.log(task)
        // let todo = {title,memo,checked,pinned}
        // console.log("todo:" ,todo )
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({title:task.title,memo:task.memo,checked:task.checked,pinned:task.pinned }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
       fetchTasks()
       
        
    }

    return (
        <form >
            <Typography sx={{mt:3,fontWeight:'bold', textAlign:'center'}} variant="h5" color="darkgray" > Todo List</Typography>
            <hr style={{border:"1px solid #E45D8B",width:"30%"}}/> 
            {/* <TextField className={"textfield"} variant="filled" fullWidth sx={{color: 'white'}} label="Title" margin="normal" value={title} onChange={(e) => setTask({...task,title:e.target.value})}/>
            <TextField className={"textfield"} fullWidth style={{valueColor:'white'}} label="Memo" margin="normal" value={memo} onChange={(e) => setTask({...task,memo:e.target.value})}/> */}
            <input ref={inputRef} placeholder=" &#9776; Add a task..." value={title} onChange={(e) => setTask({...task,title:e.target.value}) } />
            
            { showMemo && 
            <input ref={input2Ref} placeholder=" &#9776; Add a memo..." value={memo} onChange={(e) => setTask({...task,memo:e.target.value})}/>
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
