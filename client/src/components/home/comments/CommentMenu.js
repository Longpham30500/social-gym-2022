import React from 'react'

const CommentMenu = ({post, comment, auth}) => {
  return (
    <div className='menu'>
        {
            (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
            <div></div>
        }
    </div>
  )
}

export default CommentMenu