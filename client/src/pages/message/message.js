import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import { MessageOutlined } from '@ant-design/icons';

const Message = () => {
    return (
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>

            <div className="col-md-8 px-0 right_mess">
                <div className="d-flex justify-content-center 
                align-items-center flex-column h-100">

                    <MessageOutlined style={{fontSize: '5rem'}}/>
                    <h4>Messenger</h4>

                </div>
            </div>
        </div>
    )
}

export default Message