import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

//components
import {Users} from './components/Users';
import {Posts} from './components/Posts';

function App() {
  const [users, setUsers]= useState([]);
  const [userPosts, setUserPosts]= useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [isError, setIsError]= useState(false);
  const [message, setMessage]= useState('');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/api/users`)
      .then(usersRes => {
        setUsers(usersRes.data);
        console.log('usersRes.data', usersRes.data);
        setIsLoading(false);
      })
      .catch(err => {console.log('uersError:', err);})
  }, [])

  //get user posts
  const getUserPosts= (userId) => {
    setIsLoading(true);
    axios
    .get(`http://localhost:8000/users/${userId}/posts`)
    .then(userPostsRes => {
      console.log('userPostsRes', userPostsRes);
      setUserPosts(userPostsRes.data);
      setIsLoading(false);
    })
    .catch(userPostsErr => {console.log('userPostsErr: ', userPostsErr);})
  }//end getUserPosts

  return (
    <div className="App">
      <h1>test</h1>
      <Route exact path= '/'>
        <Users 
          users= {users}
        />
      </Route>
    <Route exact path= 'user/:id/posts'>
      <Posts 
        getUserPosts= {getUserPosts}
        userPosts= {userPosts}
      />
    </Route>
    </div>


  );

}//end APP

export default App;
