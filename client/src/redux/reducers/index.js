import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePosts from './postReducer'
import modal from './modalReducer'
import detailPost from './detailPostReducer'
import message from './messageReducer'
import socket from './socketReducer'


export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePosts,
    modal,
    detailPost,
    message,
    socket,
})