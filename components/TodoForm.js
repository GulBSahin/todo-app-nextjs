import { Button, TextField, Typography } from "@mui/material";
import { useContext,useRef,useEffect } from "react";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoForm() {
    const {task,setTask,fetchTasks}=useContext(TodoContext);
    const {id,title,memo,checked,pinned}=task

    const submitTask = async (e) => { // submit task to the api
        
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({title: title, memo: memo, checked: false, pinned: false}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        
        fetchTasks()
        
    }

    return (
        <div >
            <Typography sx={{mt:3,fontWeight:'bold'}} variant="h5" color="darkgray" > Yeni Todo Ekle</Typography>
            {/* <TextField className={"textfield"} variant="filled" fullWidth sx={{color: 'white'}} label="Title" margin="normal" value={title} onChange={(e) => setTask({...task,title:e.target.value})}/>
            <TextField className={"textfield"} fullWidth style={{valueColor:'white'}} label="Memo" margin="normal" value={memo} onChange={(e) => setTask({...task,memo:e.target.value})}/> */}
            <input placeholder=" &#9776; Add a task..." value={title} onChange={(e) => setTask({...task,title:e.target.value})}/>
            <input placeholder=" &#9776; Add a memo..."value={memo} onChange={(e) => setTask({...task,memo:e.target.value})}/>
            <Button sx={{mt:3}} variant="outlined" style={{color:"#EC6190" ,borderColor:"#EC6190"}} onClick={submitTask} > TODO EKLE</Button>
            <br />
        </div>
    )
}
