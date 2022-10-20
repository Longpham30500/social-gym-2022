import React from 'react'
import "boxicons";
import { useSelector } from 'react-redux';


const LikeButton = ({isLike, handleLike, handleUnLike}) => {
    const { theme } = useSelector(state => state)
    
  return (
    <>
        {
            isLike
            ? <box-icon name='heart' type='solid' onClick={handleUnLike} 
            style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
            : <box-icon style={{marginRight: 10}} name='heart' onClick={handleLike} />
        }
    </>
  )
}

export default LikeButton

