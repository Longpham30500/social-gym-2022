import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { MESS_TYPES } from './redux/actions/messageAction'

const SocketClient = () => {
    const {auth, socket} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit('addUser', auth.user._id)
    }, [socket, auth.user._id])
    //Chat
    useEffect(() => {
      socket.on('createMessageToClient', message => {
          dispatch({
            type: MESS_TYPES.ADD_MESSAGE,
            payload: message
          })
      })
          return() => socket.off('createMessageToClient')
  }, [socket, dispatch])

  return  <></>
  
}

export default SocketClient