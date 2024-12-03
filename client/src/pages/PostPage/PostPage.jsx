import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { PropagateLoader } from "react-spinners";

const PostPage = () => {
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL;
  const baseAPI = API.replace("api/", "");
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API}post/viewPost/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        setPostInfo(data.post);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PropagateLoader
          color={"#5C6BC0"}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!postInfo) return "No Post Info";
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <p className="author">by @{postInfo?.author["username"]}</p>

      <div className="image">
        <img src={`${baseAPI}${postInfo.file}`} alt="post image" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
