import { formatISO9075 } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const PostPage = () => {
    const API = import.meta.env.VITE_API_URL;
    const baseAPI = API.replace("api/", "");
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();

    useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await fetch(`${API}post/viewPost/${id}`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();
            setPostInfo(data.post);
        } catch (error) {
            console.log(error);
        }
    }
    fetchPost();
    }, []);

    if (!postInfo) return '';
  return (
    <div className='post-page'>
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <p className='author'>by @{postInfo.author}</p>
      <div className='image'>
        <img src={`${baseAPI}${postInfo.file}`} alt="post image" />
      </div>
      <div dangerouslySetInnerHTML={{__html: postInfo.content}} />
    </div>
  )
}

export default PostPage