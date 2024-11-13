import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post';

const Home = () => {
  const API = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API}user/posts`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      {
        posts.length > 0 && posts.map(post=> (
          <Post
            key={post['_id']}
            title={post['title']}
            img={post['file']}
            summary={post['summary']}
            content={post['content']}
            date={post['createdAt']}
            author={post['author']}
          />
        ))
      }
    </>
  )
}

export default Home