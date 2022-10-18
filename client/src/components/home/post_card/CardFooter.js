import React from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import "boxicons";

const CardFooter = ({post}) => {
  return (
    <div className='card_footer'>
        <div className='card_icon_menu'>
          <div>
            <box-icon name='heart' />

            <Link to={`/post/${post._id}`} className="text-dark">
            <box-icon name='message-rounded' />
            </Link>

            <img src={Send} alt="Send" />
          </div>

          <box-icon name='bookmark' />
        </div>

        <div className='d-flex justify-content-between'>
              <h6 style={{padding: '0 34px', cursor: 'pointer'}}>
                {post.comments.length}
              </h6>

              <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                {post.comments.length} comments
              </h6>
        </div>
    </div>
  )
}

export default CardFooter