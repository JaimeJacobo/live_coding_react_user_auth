import React from 'react';
import {Link} from 'react-router-dom';


const Login = ()=>{
  return(
    <div>
      <h2>Login</h2>

      <Link to='/'><button>Ir a Home</button></Link>
      <Link to='/register'><button>Ir a Register</button></Link>
    </div>
  )
}

export default Login;