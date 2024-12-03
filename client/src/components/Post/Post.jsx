import React from "react";
import { formatISO9075 } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ id, title, summary, img, date, author }) => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const baseAPI = API.replace("api/", "");

  return (

        <div style={{cursor: 'pointer'}} onClick={() => navigate(`/post/${id}`)} className="post">
          <div className="image">
            <img src={`${baseAPI}${img}`} alt="post image" />
          </div>
          <div className="texts">
            <h2>{title}</h2>
            <p className="info">
              <a href="" className="author">
                {author['username']}
              </a>
              <time>{formatISO9075(new Date(date))}</time>
            </p>
            <p className="summary">{summary}</p>
          </div>
        </div>
  );
};

export default Post;
