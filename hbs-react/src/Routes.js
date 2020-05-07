import React from 'react';
import Home from './Home'
import Register from './Register'
import Login from './Login'
import {Route} from 'react-router-dom'

const Routes = ()=>{
  return(
    <div>
      <Route path='/' exact component={Home} />
      <Route path='/register' exact component={Register} />
      <Route path='/login' exact component={Login} />
    </div>
  )
}

export default Routes;