import React, {useEffect, useState} from 'react'
import './Crud.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import ShowNotes from '../../components/ShowNotes'

const Crud = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [data, setData] = useState(null);
  // const [appLoad, setAppLoad] = useState(false);
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
      setTimeout(() => (
        window.location.reload()
      ), 1000)
    } else if(status === 0) {
      toast.error("Please enter a valid data");
    }
  }

  //
  useEffect(() => {
        const token = localStorage.getItem('token')

        if(!token) {
            nav('/login');
        }

        const getNotes = async() => {
            const result = await fetch('https://claw-backend-hrmw.onrender.com/crud/', {
                method: 'GET',
                headers: {
                    "Authorization": token,
                }
            })
            setData('');
            const responce = await result.json();
            const data = await responce.data;
            // console.log(typeof data);
            setData(data);
        }
        getNotes();
    }, [])

    // delete notes
    const deleteNote = async(objId) => {
        console.log('objId',objId)
        const token = localStorage.getItem('token')
        const result = await fetch('https://claw-backend-hrmw.onrender.com/crud/', {
            method: 'DELETE',
            headers: {
                "Authorization": token,
                "id": objId
            }
        })
        const responce = await result.json();
        console.log('delete', responce)
        if(responce.status === 1) {
          toast.success('Deleted successfully')
          setTimeout(() => (
            window.location.reload()
          ), 1000)
        } else {
          toast.warn('Something went wrong!')
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
      <div>
          <h1>Notes</h1>
          <table>
            <thead>
              <tr>
                <th>TITLE</th>
                <th>BODY</th>
                <th>Delete Button</th>
              </tr>
            </thead>
            <tbody className='t-daya'>
                {data && data.map(d => (
                    <tr key={d._id}>
                        <td>{d.title}</td>
                        <td>{d.body}</td>
                        <button onClick={() => deleteNote(d._id)}>Delete</button>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Crud
