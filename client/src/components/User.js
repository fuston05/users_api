import React from 'react';
import {Link} from 'react-router-dom';

export const User = ({user}) => {

  return (
    <div className= 'userCard'>
      <h1>{user.name}</h1>
      <Link to= {`/user/${user.id}/posts`}>See Posts</Link>
    </div>
  )
}// end User
