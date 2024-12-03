import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { PropagateLoader } from "react-spinners";

const Home = () => {
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const API = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API}post/posts`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
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

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post["_id"]}
            id={post["_id"]}
            title={post["title"]}
            img={post["file"]}
            summary={post["summary"]}
            content={post["content"]}
            date={post["createdAt"]}
            author={post["author"]}
          />
        ))}
    </>
  );
};

export default Home;
