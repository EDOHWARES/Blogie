import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../../Editor";
import { PropagateLoader } from "react-spinners";

import Swal from "sweetalert2";

const EditPost = () => {
  const API = import.meta.env.VITE_API_URL;
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  console.log(loading);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${API}post/viewPost/` + id).then((resp) => {
      resp.json().then((postInfo) => {
        setTitle(postInfo.post.title);
        setSummary(postInfo.post.summary);
        setContent(postInfo.post.content);
      });
    });
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.set("title", title);
    form.set("summary", summary);
    form.set("content", content);
    form.set("id", id);
    if (files?.[0]) {
      form.set("file", files?.[0]);
    }

    const response = await fetch(`${API}post/updatePost`, {
      method: "PUT",
      credentials: "include",
      body: form,
    });

    const data = await response.json();

    if (data.success) {
      setLoading(false);
      Swal.fire(data.message);
      setRedirect(true);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.message,
      });
    }
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

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
    <form onSubmit={updatePost}>
      <input
        required
        type="text"
        placeholder="Title"
        maxLength={"70"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        required
        type="text"
        placeholder="Summary"
        maxLength={"270"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        name="file"
        onChange={(e) => setFiles(e.target.files)}
      />

      <Editor value={content} onChange={setContent} />

      <button type="submit" style={{ marginTop: "5px", height: "3rem" }}>
        {loading ? "Updating..." : "Update Post"}
      </button>
    </form>
  );
};

export default EditPost;
