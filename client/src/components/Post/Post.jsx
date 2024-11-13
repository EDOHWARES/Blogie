import React from 'react';
import {formatISO9075} from 'date-fns';

const Post = ({title, summary, img, content, date, author}) => {
  const API = import.meta.env.VITE_API_URL;
  const baseAPI = API.replace('api/', '');
  console.log(baseAPI);

  return (
    <div className="post">
    <div className="image">
      <img src={`${baseAPI}${img}`} alt="post image" />
    </div>
    <div className="texts">
      <h2>{title}</h2>
      <p className="info">
        <a href="" className="author">{author}</a>
        <time>{formatISO9075(new Date(date))}</time>
      </p>
      <p className="summary">
        {summary}
      </p>
    </div>
  </div>
  )
}

export default Post