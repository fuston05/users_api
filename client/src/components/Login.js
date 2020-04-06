import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//styles
import './Login.scss';

function Login() {

  //state
  const [formValue, setFormValue]= useState({
    username: '',
    password: ''
  });

  const logInSubmit= e => {
    e.preventDefault();
  }//end loginSubmit

  const logInChange= e => {
    console.log(formValue);
    setFormValue({
      ...formValue, [e.target.name]: e.target.value
    })
  }//end logInChange

  return (
    <div className= 'loginCont'>
      <form onSubmit= {logInSubmit}>
       <div className= 'inputCont'>
          <label htmlFor='username'></label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='User Name'
            onChange= {logInChange}
            value= {formValue.username}
          />
          <span className= 'error'></span>
       </div>

        <div className= 'inputCont'>
          <label htmlFor='password'></label>
          <input
            type='text'
            name='password'
            id='password'
            placeholder='Password'
            onChange= {logInChange}
            value= {formValue.password}
          />
          <span className= 'error'></span>
        </div>

        <button type= 'submit'>Log In</button>
        
        <span>Don't have an account? <Link to= '/register'>Sign Up</Link></span>
      </form>
    </div> // end loginCont
  )

}//end Login

export default Login;