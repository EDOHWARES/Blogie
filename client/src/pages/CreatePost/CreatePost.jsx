import React, { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import Editor from '../../Editor';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {

  const API = import.meta.env.VITE_API_URL;
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const createNewPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.set("title", title);
    form.set("summary", summary);
    form.set("file", files[0]);
    form.set("content", content);

    const response = await fetch(`${API}post/`, {
      method: 'POST',
      credentials: 'include',
      body: form
    })

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
    return <Navigate to='/' />
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        required
        type="text"
        placeholder="Title"
        maxLength={'70'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        required
        type="text"
        placeholder="Summary"
        maxLength={'270'}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        required
        type="file"
        name='file'
        onChange={(e) => setFiles(e.target.files)}
      />
      <Editor 
        value={content}
        onChange={setContent}
      />

      <button type="submit" style={{ marginTop: "5px", height: '3rem' }}>
        {
          loading ? 'Creating...' : 'Create Post'
        }
      </button>
    </form>
  );
};

export default CreatePost;
