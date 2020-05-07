import React from 'react';
import {Link} from 'react-router-dom'

const Home = ()=>{
  return(
    <div>
      <h1>Bienvenido a la pagina web</h1>
      <Link to='/login'><button>Ir a login</button></Link>
      <Link to='/register'><button>Ir a register</button></Link>
    </div>
  )
}

export default Home;