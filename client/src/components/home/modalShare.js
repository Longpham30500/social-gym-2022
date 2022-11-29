

import React from 'react'
import UserCard from '../UserCard'
import { ShareAltOutlined } from '@ant-design/icons';

const ModalShare = ({users, setShowFollow, sharePost}) => {
  return (
    <div className='follow'>
        <div  className='follow_box'>
            <h5 className='text-center'>Your Followers</h5>
            <hr />
            {
                users.map(user => (
                    <UserCard key={user._id} user={user}>
                        <ShareAltOutlined onClick={async (e) => {
                            sharePost(user._id, e)
                        }} 
                        style={{fontSize: 30}} />
                    </UserCard>
                ))
            }
            <div className='close' onClick={() => setShowFollow(false)}>
                &times;
            </div>
        </div>
    </div>
  )
}

export default ModalShare