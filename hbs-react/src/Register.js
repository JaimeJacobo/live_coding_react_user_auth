import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Register = ()=>{

  const [inputState, updateInputState] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: ''
  })

  const [fetchedData, updateFetchedData] = useState([])

  const enviarInfoAPI = (event)=>{

    event.preventDefault();

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputState)
    })
    .then((data)=>{
      return data.json()
    })
    .then((dataJSON)=>{
      // console.log(dataJSON)
      updateFetchedData(dataJSON)
    })
  }


  return(
    <div>
      <h2>Register</h2>
      
      <Link to='/'><button>Ir a Home</button></Link>
      <Link to='/login'><button>Ir a Login</button></Link>

      <form>
        <input type="text" name="name" placeholder="Name" onChange={(event)=>updateInputState({...inputState, name: event.target.value})}/>
        <input type="password" name="password" placeholder="Password" onChange={(event)=>updateInputState({...inputState, password: event.target.value})}/>
        <input type="password" name="confirmPassword" placeholder="Repeat Password" onChange={(event)=>updateInputState({...inputState, confirmPassword: event.target.value})}/>
        <input type="text" name="email" placeholder="Email" onChange={(event)=>updateInputState({...inputState, email: event.target.value})}/>

        <button onClick={(event)=>enviarInfoAPI(event)}>Crear</button>
      </form>

      {
        fetchedData.map((message, index)=>{
          return(
            <div key={index}>
              <p>{message.msg}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Register;