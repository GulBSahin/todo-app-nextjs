import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import {TodoContext} from '../contexts/TodoContext'
import {useState, useEffect} from 'react'
import { Container } from '@mui/material'


export default function Home() {
 
  // this state will be used to display the tasks
  const [tasks, setTasks] = useState([]);  // array of tasks that will be display on the page
  const [task, setTask] = useState('');  // task that will be added to the array
  const fetchTasks = async () => { // fetch tasks from the api
    const response = await fetch('/api/tasks')
    const data = await response.json()
    setTasks(data)
    }
    useEffect(() => {
    fetchTasks()
    }, [])
  
  return (
    <div className={styles.triangle}>
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="todo app with next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoContext.Provider value={{task,setTask,tasks, setTasks,fetchTasks}} >
        <Container maxWidth="md" className={styles.container}>
            <TodoForm />
            <TodoList /> 
        </Container>
      </TodoContext.Provider>
    </div>
  )
}





























 // this state will be used to add the tasks
  // const [task,setTask]=useState({
  //   title:'',
  //   memo:'',
  //   checked:'',
  //   pinned:''
  // })