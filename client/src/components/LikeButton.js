import React from 'react'
import "boxicons";
import { useSelector } from 'react-redux';
import {HeartOutlined , HeartFilled} from '@ant-design/icons'

const LikeButton = ({isLike, handleLike, handleUnLike}) => {
    const { theme } = useSelector(state => state)
    
  return (
    <>
        {
            isLike
            ? <HeartFilled onClick={handleUnLike} style={{filter: theme ? 'invert(1)' : 'invert(0)', color: 'red' , fontSize:22}} />
            : <HeartOutlined style={{fontSize:22}} name='heart' onClick={handleLike} />
        }
    </>
  )
}

export default LikeButton

