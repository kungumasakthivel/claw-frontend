import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ShowNotes.css'
import { toast } from 'react-toastify';

const ShowNotes = () => {
    const [data, setData] = useState(null);
    const nav = useNavigate();
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
            console.log(typeof data);
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
        toast.warn('delete')
    }

  return (
    <div>
      <h1>Notes</h1>
      <table>
        <thead>
            <th>TITLE</th>
            <th>BODY</th>
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
  )
}

export default ShowNotes
