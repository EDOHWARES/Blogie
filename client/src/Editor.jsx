import React from 'react';
import ReactQuill from "react-quill-new";

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
  

const Editor = ({value, onChange}) => {
  return (
    <ReactQuill
    required
    value={value}
    onChange={onChange}
    theme="snow"
    modules={modules}
    formats={formats}
  />
  )
}

export default Editor;