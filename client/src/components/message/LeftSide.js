import React, { useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserCardMessage from './UserCardMessage';
import { useHistory, useParams } from 'react-router-dom';
import {addUser, getConversations} from '../../redux/actions/messageAction'
import { getDataAPI } from '../../utils/fetchData';


const LeftSide = () => {
    const { auth, message } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()
    const pageEnd = useRef()
    const [page, setPage] = useState(0)

    const [searchUsers, setSearchUsers] = useState([])
    const [search, setSearch] = useState('')


    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch(addUser({user, message}))
        return history.push(`/message/${user._id}`)
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return setSearch([]);
        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() =>{
        if(message.firstLoad) return;
        dispatch(getConversations({auth}))
    },[dispatch,auth,message.firstLoad])


  return (
    <>
        <form className="message_header" onClick={handleSearch} >
            <input type="text" value={search}
            placeholder="Enter to Search User"
            onChange={e => setSearch(e.target.value)} />

            <button type="submit">Search User</button>
        </form>

        <div className="message_chat_list">
            {
                searchUsers.length !== 0
                ?   <>
                    {
                        searchUsers.map(user => (
                            <div key={user._id} className={`message_user ${isActive(user)}`} 
                            onClick={() => handleAddUser(user)}>
                                <UserCardMessage member={user} />
                            </div>
                        ))
                    }
                    </>
                : 
                    <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCardMessage member={user} msg={true} />
                                </div>
                            ))
                        }
                    </>
            }
            <button style={{opacity: 0}} ref={pageEnd}>Load Message</button>
        </div>
    </>
  )
}

export default LeftSide