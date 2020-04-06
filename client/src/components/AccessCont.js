import React from 'react';
import {Route} from 'react-router-dom';

//style
import './AccessCont.scss';

//components
import Register from './Register';
import Login from './Login';

export const AccessCont = () => {
  return (
      <div className= 'accessCont'>
        <Route path= '/register'><Register /></Route>
        <Route exact path= '/'><Login /></Route>
      </div>
  )
}//end AccessCont
