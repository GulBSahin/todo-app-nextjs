import {useState, useEffect ,useContext} from 'react'
import Todo from "./Todo"
import { Typography } from "@mui/material"
import { TodoContext } from "../contexts/TodoContext";


export default function TodoList() {
    const {tasks}=useContext(TodoContext);


    return (
        <div>
            <Typography sx={{mt:5,fontWeight:'bold' }} align="center "variant="h3" color="darkgray" >Todo Listesi</Typography>
            {/* these about fetching data and displaying it on the screen */}
            <hr style={{border:"2px solid #E45D8B", }}/>
            {tasks.map(task => 
             <Todo key={task.id} task={task}/>                    
            )}            
        </div>
    )
}