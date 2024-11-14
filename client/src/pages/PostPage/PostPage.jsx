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
      <div className='image'>
        <img src={`${baseAPI}${postInfo.file}`} alt="post image" />
      </div>
      <h1>{postInfo.title}</h1>
      <div dangerouslySetInnerHTML={{__html: postInfo.content}} />
    </div>
  )
}

export default PostPage