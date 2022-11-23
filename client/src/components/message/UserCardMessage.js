import React from "react";
import { Link } from "react-router-dom";

const UserCardMessage = ({ member, msg }) => {
  const showMsg = (member) => {
    return (
      <div>
        <div>{member.text}</div>
        {member.media.length > 0 && <div>{member.media.length} Media</div>}
      </div>
    );
  };
  if (!member) return <></>;
  return (
    member && (
      <div
        style={{ cursor: "pointer", borderRadius: "15px", marginTop: "12px" }}
        className="d-flex p-1 justify-content-between align-items-center"
      >
        <img
          src={member.avatar}
          alt="Avatar"
          style={{ width: "37px", height: "37px", borderRadius: "50%" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="text-dark mt-1">
            <Link
              to={`/infor/${member._id}`}
              style={{ color: "black", textDecoration: "none" }}
              className="d-flex align-items-center"
            >
              {member.name}
            </Link>
          </span>

          <small style={{ opacity: 0.6 }}>
            {msg ? showMsg(member) : member.name}
          </small>
        </div>

        {/* </Link> */}
      </div>
    )
  );
};
export default UserCardMessage;
