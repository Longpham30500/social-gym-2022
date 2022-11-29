/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessages } from "../../redux/actions/messageAction";
import { imageShow, videoShow } from "../../utils/mediaShow";
const DisplayMessage = ({ member, msg }) => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (message.data) dispatch(deleteMessages({ msg, message, auth }));
  };

  return (
    <>
      <div className="chat_title">
        <img
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          src={member.avatar}
        />
        <span>{member.name}</span>
      </div>
      <div className="you_content">
        {member._id === auth.user._id && (
          <button
            className="mybuttonoverlap btn btn-info"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        {msg?.text && <div className="chat_text">{msg?.text || ''}</div>}
        {msg?.media?.map((item, index) => (
          <div key={index}>
            {item.url.match(/video/i)
              ? videoShow(item.url)
              : imageShow(item.url)}
          </div>
        ))}
        <div></div>
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default DisplayMessage;
