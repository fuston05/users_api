import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//styles
import './Register.scss';

function Register() {

  //state
  const [formValue, setFormValue] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const registerSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/auth/register`, formValue)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log(err);
      })

  }//end registerSubmit

  const registerChange = e => {
    console.log(formValue);
    setFormValue({
      ...formValue, [e.target.name]: e.target.value
    })
  }//end registerChange

  return (
    <div className='registerCont'>
      <form onSubmit={registerSubmit}>
        <div className='inputCont'>
          <label htmlFor='username'></label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='User Name'
            onChange={registerChange}
            value={formValue.username}
          />
          <span className='error'></span>
        </div>

        <div className='inputCont'>
          <label htmlFor='first_name'></label>
          <input
            type='text'
            name='first_name'
            id='first_name'
            placeholder='First Name'
            onChange={registerChange}
            value={formValue.first_name}
          />
          <span className='error'></span>
        </div>

        <div className='inputCont'>
          <label htmlFor='last_name'></label>
          <input
            type='text'
            name='last_name'
            id='last_name'
            placeholder='Last Name'
            onChange={registerChange}
            value={formValue.last_name}
          />
          <span className='error'></span>
        </div>

        <div className='inputCont'>
          <label htmlFor='email'></label>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='Email'
            onChange={registerChange}
            value={formValue.email}
          />
          <span className='error'></span>
        </div>

        <div className='inputCont'>
          <label htmlFor='phone'></label>
          <input
            type='text'
            name='phone'
            id='phone'
            placeholder='Phone'
            onChange={registerChange}
            value={formValue.phone}
          />
          <span className='error'></span>
        </div>

        <div className='inputCont'>
          <label htmlFor='address'></label>
          <input
            type='text'
            name='address'
            id='address'
            placeholder='Address'
            onChange={registerChange}
            value={formValue.address}
          />
          <span className='error'></span>
        </div>

        <div className='inputCont'>
          <label htmlFor='password'></label>
          <input
            type='text'
            name='password'
            id='password'
            placeholder='Password'
            onChange={registerChange}
            value={formValue.password}
          />
          <span className='error'></span>
        </div>

        <div className='inputCont '>
          <label htmlFor='cPassword'></label>
          <input
            type='text'
            name='cPassword'
            id='cPassword'
            placeholder='Confirm Password'
          />
          <span className='error'></span>
        </div>
        <button type='submit'>Submit</button>
        <span>Already have an account? <Link to='/'>Log In</Link></span>
      </form>
    </div> // end registerCont
  )

}//end Register

export default Register;