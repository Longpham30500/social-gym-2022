import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";

const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0) return <h2 className="text-center">No Post</h2>;

  return (
    <div className="post_thumb">
      {posts &&
        posts.map((post) => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="post_thumb_display">
              {post.images[0].url.match(/video/i) ? (
                <video
                  controls
                  src={post.images[0].url}
                  alt={post.images[0].url}
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
              ) : (
                <img
                  src={post.images[0].url}
                  alt={post.images[0].url}
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
              )}
              <div className="post_thumb_menu">
                <HeartOutlined style={{ color: "white", fontSize: 30 }} />
                <span style={{ fontSize: 30, color: "white", margin: "5px" }}>
                  {post.likes.length}
                </span>
                <MessageOutlined
                  style={{ color: "white", fontSize: 30, marginLeft: "30px" }}
                />
                <span style={{ fontSize: 30, color: "white", margin: "5px" }}>
                  {post.comments.length}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default PostThumb;
