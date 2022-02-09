import { ListItem, ListItemText,IconButton, ListItemIcon } from "@mui/material";
import {Delete,MoreHoriz,PushPin,StickyNote2} from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import {useState, useContext} from 'react';
import { TodoContext } from "../contexts/TodoContext";
import MenuList from "./Menu";



export default function Todo({task}) {

    const {fetchTasks}=useContext(TodoContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);     
    };
    const handleClose = () => {
    setAnchorEl(null);    
     };
   
    const checkHandler = async (taskId) => {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PATCH',
            body: JSON.stringify({checked: !task.checked}),
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
            
          
        <ListItem sx={{mt:3,boxShadow:3}} style={{backgroundColor:'#3C424A'}}
            secondaryAction={
            <IconButton id="demo-customized-button" aria-controls={open ? 'demo-customized-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
            variant="contained" disableElevation style={{color:'#939AA3'}} onClick={handleClick}>
                     <MoreHoriz />
             </IconButton>
            }
            >
            <ListItemIcon> 
                {task.pinned? ( <PushPin fontSize="large"style={{color:"#EC6190"}} />) : ( <StickyNote2 fontSize="large"style={{color:"#3C424A"}} />) }  
              
                <Checkbox 
                    style={{color:'#939AA3'}}
                    size='large'
                    checked={task.checked}
                    inputProps={{ 'aria-label': 'controlled' }} 
                    onChange={()=>checkHandler(task.id)}
                />  
            </ListItemIcon>
 
            <ListItemText 
            primaryTypographyProps={{ sx: { color:"white",fontSize: "25px", mt:"3px"}}}
            secondaryTypographyProps={{ sx: { color:"#939AA3",fontSize: "20px" }}} primary={task.title} secondary={task.memo} />   

        </ListItem>
        
        <MenuList key={task.id} task={task} anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleClose={handleClose}/>

       </div> 
    )
}
