import React, {useState} from 'react'
import './Crud.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Crud = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const nav = useNavigate()
  
  // post method 
  const addNote = async() => {
    const item = {title, body};
    const token = localStorage.getItem('token')
    if(!token){
      nav('/login')
    }
    const result = await fetch('https://claw-backend-hrmw.onrender.com/crud/create', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Authorization": token,
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
    const responce = await result.json();
    console.log(responce)
    const status = responce.status
    if(status === 1) {
      toast.success("Created successfully");
      setTitle('');
      setBody('');
    } else if(status === 0) {
      toast.error("Please enter a valid data");
    }
    
  }

  return (
    <div className='crud-container'>
      <h1>CRUD</h1>
      <div className='input-crud-container'> 
        <input type="text" placeholder="Title" 
        className='input-crud' value={title} 
        onChange={(e) => setTitle(e.target.value)}
        />
        <input type="text" placeholder='Body'
        className='input-crud' value={body}
        onChange={(e) => {setBody(e.target.value)}}
        />
        <button className='button' onClick={addNote}>Add</button>
      </div>
    </div>
  )
}

export default Crud
