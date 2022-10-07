import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import "boxicons";
const StatusModal = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS,
                payload: false,
              })
            }
          >
            &times;
          </span>
        </div>

        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="input_images">
                <box-icon type='solid' name='camera'></box-icon>
            
                <div className="file_upload">
                    <box-icon type="solid" name="file-image" />
                    <input
                        type="file"
                        name="file"
                        id="file"
                        multiple
                        accept="image/*" />           
                </div>
          </div>
        </div>

        <div className="status_footer">
          <button className="btn btn-secondary w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
