import React, { useState } from 'react'
import './App.css'
import axios from 'axios'

export default function Create({onAdd}) {
  const [task,setTask]= useState('')

  const handleAdd= ()=>{
    if (task.trim() === '') {
      alert('Please enter a task');
      return;
    }
    axios.post('http://localhost:3001/add' ,{task:task} )
    .then(result=>{
      console.log('Task added successfully');
      location.reload() // will automatically update the page 
      setTask('');
      onAdd();
  })
    .catch(err=> console.log(err));
} 
  return (
  <div className="create_form">
      <input 
      type="text"  
      placeholder='Enter the Task '
      onChange={ (e)=> setTask(e.target.value)}/>
      
      <button type="button" onClick={handleAdd}>ADD</button>
    </div>
  )
}

