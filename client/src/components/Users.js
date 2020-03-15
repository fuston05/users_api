import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {User} from './User';
import shortid from 'shortid';

export const Users = ({users}) => {
  return (
    <div className= 'usersCont'>
      {
        users.map(user => {
          return(
            <User 
              key= {shortid()}
              user= {user}
            />
          )
        })//end map
      }
    </div>
  )
}// end Users
