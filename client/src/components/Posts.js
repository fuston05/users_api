import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

export const Posts = ({getUserPosts, userPosts}) => {
  const id= useParams();

  useEffect(() => {
    getUserPosts(id);
  }, [id])
  console.log('id:', id);
  return (
    <div className= 'postsCont'>
      {
        userPosts && userPosts.map(post => {
          return <p>{post}</p>
        })
      }
    </div>
  )
}// end Posts
