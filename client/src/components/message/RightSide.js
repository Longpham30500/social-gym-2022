import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import {
  addMessage,
  deleteConversation,
  getMessages,
} from "../../redux/actions/messageAction";
import { imageShow, videoShow } from "../../utils/mediaShow";
import UserCardMessage from "./UserCardMessage";
import { DeleteOutlined } from "@ant-design/icons";
import DisplayMessage from "./DisplayMessage";
import { imageUpload } from "../../utils/imageUpload";
const RightSide = () => {
  const { auth, message, socket } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [user, setUser] = useState([]);
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const history = useHistory();
  const [page, setPage] = useState(0);
  const pageEnd = useRef();

  const refMessage = useRef();

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) setUser(newUser);
  }, [message.users, id]);

  const handleChangeFile = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "Please choose file is existing.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "please input image/video largest is 5mb.");
      }

      return newMedia.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };
    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));
    if (refMessage.current) {
      refMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };
  const handleDeleteFile = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const deleteConversations = () => {
    dispatch(deleteConversation({ auth, id }));
    return history.push("/message");
  };
  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        await dispatch(getMessages({ auth, id }));

        if (refMessage.current) {
          refMessage.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      };
      getMessagesData();
    }
  }, [id, dispatch, auth]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultData >= (page - 1) * 9 && page > 1) {
      dispatch(getMessages({ auth, id, page }));
    }
  }, [message.resultData, page, id, auth, dispatch]);

  useEffect(() => {
    if (refMessage.current) {
      refMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [text]);

  return (
    <div>
      <div className="message_header">
        {user.length !== 0 && (
          <>
            <UserCardMessage member={user}></UserCardMessage>
            <DeleteOutlined onClick={deleteConversations} />
          </>
        )}
      </div>

      <div
        className="chat_container"
        style={{ height: media.length > 0 ? "calc(100% - 180px)" : "" }}
      >
        <div className="chat_display" ref={refMessage}>
          <button ref={pageEnd} style={{ marginTop: "-25px", opacity: 0 }}>
            Load Message
          </button>
          {message.data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <DisplayMessage member={user} msg={msg} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <DisplayMessage member={user} msg={msg} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="show_media"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : imageShow(URL.createObjectURL(item))}
            <span onClick={() => handleDeleteFile(index)}>&times;</span>
          </div>
        ))}
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="chat with member..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="file_upload">
          <box-icon type="solid" name="file-image" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeFile}
          />
        </div>

        <button
          type="submit"
          disabled={text || media.length > 0 ? false : true}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default RightSide;
