import React, { useState, useEffect, useRef} from 'react'
import { getData } from '../../utils/fetchData'
import { useSelector, useDispatch } from 'react-redux'
import CardMessage from './CardMessage';
import { useHistory, useParams } from 'react-router-dom';
import {addUser, getConversations} from '../../redux/actions/messageAction'


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
        return history(`/message/${user._id}`)
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return setSearch([]);
        try {
            const res = await getData(`search?name=${search}`, auth.token)
            setSearchUsers(res.data.user)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() =>{
        if(message.firstLoad) return;
        dispatch(getConversations({auth}))
    },[dispatch,auth,message.firstLoad])

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
          if(entries[0].isIntersecting){
            setPage(p => p + 1)
          }
        },{
          threshold: 0.1
        })
        observer.observe(pageEnd.current)
      },[setPage])
      
      useEffect(() => {
        if(message.resultUsers >= (page - 1) * 9 && page > 1){
          dispatch(getConversations({auth, page}))
        }
      },[message.resultUsers, page , auth, dispatch])

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
                                <CardMessage member={user} />
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
                                    <CardMessage member={user} msg={true} />
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