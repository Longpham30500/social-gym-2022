import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

const FollowBtn = (user) => {
  const [followed, setFollowed] = useState(false)

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleFollow = () => {
    setFollowed(true)
  }

  const handleUnFollow = () => {
    setFollowed(false)
  }

  return (
    <>
    {
      followed 
      ? <button className='btn btn-outline-danger'
      onClick={handleUnFollow}>
        UnFollow
        </button>
      : <button className='btn btn-outline-info'
      onClick={handleFollow}>
        Follow
        </button>

    }
    </>
  )
}

export default FollowBtn