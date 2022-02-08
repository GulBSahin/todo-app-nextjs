import { ListItem, ListItemText,IconButton, ListItemIcon } from "@mui/material";
import {Delete,MoreHoriz,PushPin,StickyNote2} from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState, useContext} from 'react';
import { TodoContext } from "../contexts/TodoContext";




export default function Todo({task}) {

    const {tasks,setTasks,fetchTasks}=useContext(TodoContext);
    const {id,title,memo,checked,pinned}=task
    
    //dropdown menu settings
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
     };
     const secondaryColor = { color: '#939AA3' }
    
    //----------------------------------------------------------------------
    //delete tasks with DELETE Method
    const deleteComment = async (taskId) => { // delete task from the api
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    fetchTasks()
    }
    //----------------------------------------------------------------------
    
    const handlePin=(pinId) => {
        setTasks(            
            tasks.map((task)=> task.id === pinId ? {...task, pinned: !task.pinned} : task))
        pinHandler(pinId),
        console.log(task.pinned)
        }
    const pinHandler = async (pinId) => {

        const response = await fetch(`/api/tasks/${pinId}`, {
            method: 'PATCH',
            body: JSON.stringify({title: title, memo: memo, checked: checked, pinned: pinned}),
            headers: {
                'Content-Type': 'application/json'   
            }
        })
        const data = await response.json()
        console.log(data)
        
        }
    //check handling
  
    const [checkState, setCheckState] = useState(true)
    const toggleTask=(toggleDoneId) => {
        setTasks(            
            tasks.map((task)=> task.id === toggleDoneId ? {...task, checked: !task.checked} : task))
        checkHandler(toggleDoneId),
        setCheckState(!checkState),
        console.log(task.checked , checkState)
        
        }

    
    const checkHandler = async (taskId) => {
    
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PATCH',
            body: JSON.stringify({title: title, memo: memo, checked: checkState, pinned: pinned}),
            headers: {
                'Content-Type': 'application/json'   
            }
        })
        const data = await response.json()
        console.log(data)
        
        }
    
    return (
        <div >   
            
            
        <ListItem sx={{mt:3,boxShadow:3}} 
            
            style={{backgroundColor:'#3C424A'}}
            secondaryAction={
  
            <IconButton id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            style={{color:'#939AA3'}}
            onClick={handleClick}>
                     <MoreHoriz />
             </IconButton>

            }
        >
    
    
    {/* //checkbox and sen checked value to api/tasks */}
            <ListItemIcon>
   
                <PushPin fontSize="large"style={{color:"#EC6190"}} />
                <Checkbox 
                    style={{color:'#939AA3'}}
                    size='large'
                    checked={checkState}
                    inputProps={{ 'aria-label': 'controlled' }} 
                    onChange={()=>toggleTask(task.id)}
                />  
        </ListItemIcon>
    {/* //----------------------------------------------------------------------         */}


            <ListItemText 
            primaryTypographyProps={{ sx: { color:"white",fontSize: "25px", mt:"3px"}}}
            secondaryTypographyProps={{ sx: { color:"#939AA3",fontSize: "20px" }}} primary={task.title} secondary={task.memo} />    
            
    {/* //----------------------------------------------------------------------         */}        
    </ListItem>
      
    {/* //dropdown menu     */}
        <Menu
            id="demo-customized-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
        <MenuItem onClick={()=>handlePin(task.id)}disableRipple>
          <PushPin />
          Pin on the Top
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <StickyNote2 />
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
