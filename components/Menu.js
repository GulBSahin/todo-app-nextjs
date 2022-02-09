import {useContext} from 'react';
import { TodoContext } from "../contexts/TodoContext";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Delete,PushPin,StickyNote2} from '@mui/icons-material';

export default function MenuList({task, anchorEl,  handleClose}) {
    const {fetchTasks,toggleMemo,showMemo}=useContext(TodoContext);
    
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
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PATCH',
                body: JSON.stringify({pinned:!task.pinned}),
                headers: {
                    'Content-Type': 'application/json'   
                }
            })
            const data = await response.json()
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
            {showMemo ? 
            (<p onClick={()=>toggleMemo(task)}> Close Memo </p> )
            : (<p>Add a memo </p> )}
            </MenuItem>
            <MenuItem onClick={()=>deleteComment(task.id)} disableRipple>
            <Delete />
            Delete
            </MenuItem>    
            </Menu>
        </div>
    )
}
