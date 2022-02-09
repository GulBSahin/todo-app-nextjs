import {useState, useEffect ,useContext} from 'react'
import Todo from "./Todo";
import { TodoContext } from "../contexts/TodoContext";


export default function TodoList() {
    const {tasks}=useContext(TodoContext);
    
    // const pinnedTasks = tasks.filter((task) => task.pinned==true);
    // const unpinnedTasks = tasks.filter((task) => task.pinned==false);
    const pinnedTasks = tasks.filter((task) => task.pinned==true);
    const unpinnedTasks = tasks.filter((task) => task.pinned==false);

    useEffect(() => {
        console.log("task değişti")
        // console.log(pinnedTasks.length)
    }, [tasks]) 
    return (
        <div>
            { 
            tasks.length>0 ? (
                <>
            {pinnedTasks?.map(task => 
             <Todo key={task.id} task={task}/>                    
            )} 
            
            {unpinnedTasks?.map(task => 
             <Todo key={task.id} task={task}/>                    
            )} 
             </>
            ):(
                 <h1 style={{color:"darkgray" , textAlign:"center"}}> No tasks to display  </h1> 
            )}          
        </div>
    )
}