import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import "boxicons";
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost } from '../../../redux/actions/postAction';
import {MessageOutlined, ShareAltOutlined} from '@ant-design/icons'
import ModalShare from '../modalShare';
import { BASE_URL } from '../../../utils/config';
import { addMessage } from '../../../redux/actions/messageAction';

const CardFooter = ({post}) => {
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const [userData, setUserData] = useState([])
  const [showFollow, setShowFollow] = useState(false)

  const { auth, profile, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
      if(post.likes.find(like => like._id === auth.user._id)) {
        setIsLike(true)
      }
  }, [post.likes, auth.user._id])

  const handleLike = async () => {
    if(loadLike) return;
    setIsLike(true)

    setLoadLike(true)

    await dispatch(likePost({post, auth}))
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if(loadLike) return;
    setIsLike(false)

    setLoadLike(true)
    await dispatch(unLikePost({post, auth}))
    setLoadLike(false)
  }

    // ${BASE_URL}/post/${post._id}
  const sharePost = async (id, e) => {
    e.preventDefault()
    const msg = {
      sender: auth.user._id,
      recipient: id,
      text: `${BASE_URL}/post/${post._id}`,
      createdAt: new Date().toISOString(),
      media: [],
    };
    await dispatch(addMessage({ msg, auth, socket }));
  };

  useEffect(() => {
        const newData = auth?.user?.followers
        setUserData(newData)
}, [ auth, dispatch, profile.users])



  return (
    <div className='card_footer'>
        <div className='card_icon_menu'>
          <div style={{marginTop:'5px', marginBottom:'10px'}}>
            <LikeButton
            isLike={isLike} 
            handleLike={handleLike}
            handleUnLike={handleUnLike}/>
            <Link style={{marginLeft:'10px'}} to={`/post/${post._id}`} className="text-dark">
            <MessageOutlined style={{fontSize: 22}} />
            </Link>
            {showFollow === true && <ModalShare users={userData} setShowFollow={setShowFollow} sharePost={sharePost}/>}
            <ShareAltOutlined onClick={() => setShowFollow(true)} style={{fontSize: 22, marginLeft:'9px'}} name='send'/>
          </div>
          <div style={{display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <box-icon name='bookmark' />
          </div>
          
        </div>

        <div className='d-flex justify-content-between'>
              <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                {post.likes.length} likes
              </h6>

              <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                {post.comments.length} comments
              </h6>
        </div>
    </div>
  )
}

export default CardFooter