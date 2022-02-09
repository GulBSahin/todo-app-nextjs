import {useContext} from 'react';
import { TodoContext } from "../contexts/TodoContext";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Delete,PushPin,StickyNote2} from '@mui/icons-material';

export default function MenuList({task, anchorEl,  handleClose}) {
    const {setTask,tasks,setTasks,fetchTasks,toggleMemo}=useContext(TodoContext);
    

    
    
        //delete tasks with DELETE Method
const deleteComment = async (taskId) => { // delete task from the api
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    fetchTasks()
}
    
    const open = Boolean(anchorEl);
   
    
    
    const handlePin= async (task) => {
        console.log(task)
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PATCH',
                body: JSON.stringify({title:task.title,memo:task.memo,checked:task.checked,pinned:!task.pinned }),
                headers: {
                    'Content-Type': 'application/json'   
                }
            })
            const data = await response.json()
            console.log(data)
     
            fetchTasks()
        }
    
    
    return (
        <div>
            <Menu
            id="demo-customized-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            >
            <MenuItem onClick={()=>handlePin(task)}disableRipple>
            <PushPin />
             {task.pinned ? "Remove Pin" : "Pin on the Top" }
            </MenuItem>
            <MenuItem onClick={()=>toggleMemo(task)} disableRipple>
            <StickyNote2  />
            Add a memo
            </MenuItem>
            <MenuItem onClick={()=>deleteComment(task.id)} disableRipple>
            <Delete />
            Delete
            </MenuItem>    
            </Menu>
        </div>
    )
}
