import React from 'react';
import img1 from '../../assets/img1.jpg';

const Post = () => {
  return (
    <div className="post">
    <div className="image">
      <img src={img1} alt="post image" />
    </div>
    <div className="texts">
      <h2>Full-house battery backup coming later this year</h2>
      <p className="info">
        <a href="" className="author">Edoh Emmanuel</a>
        <time datetime="">2024-11-03 22:54</time>
      </p>
      <p className="summary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Consequuntur dicta pariatur possimus omnis accusantium inventore
        temporibus officia, aperiam aut quisquam ad quidem officiis illum
        corporis minus culpa unde! Molestias, excepturi?
      </p>
    </div>
  </div>
  )
}

export default Post