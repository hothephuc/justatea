import React from 'react'
import userData from '../assets/user'
import './Comment.css'

const Comment = ({comment}) => {
    const user=userData.find(user=>user.userID===comment.userID)
  return (
    <div className='comment'>
      <img src={user.avatar} alt={user.name}/>
      <div className='comment-content'>
        <strong>{user.name}</strong>
        <p>{comment.text}</p>
      </div>
    </div>
  )
}

export default Comment