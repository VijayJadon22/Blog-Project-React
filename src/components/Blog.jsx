import React, { useState } from "react";
import styles from "../styles.module.css";

const Blog = () => {
  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  const [data, setData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);

  const addBlog = () => {
    // if (title && content) {
    if (data.title !== "" && data.content !== "") {
      //   setBlogs((prevBlogs) => [{ title, content }, ...prevBlogs]);
      setBlogs((prevBlogs) => [...data, ...prevBlogs]);
      //   setTitle("");
      //   setContent("");
      setData({ title: "", content: "" });
    }
  };
  return (
    <div>
      <div>
        <h1>Write a Blog!</h1>
        <input
          style={{ margin: "10px" }}
          type="text"
          placeholder="Enter blog title"
          required
          //   onChange={(e) => setTitle(e.target.value)}
          onChange={(e) => setData({ title: e.target.value, ...data.content })}
          value={data.title}
        />
        <br />
        <input
          style={{ margin: "10px" }}
          type="text"
          placeholder="Enter blog content"
          required
          //   onChange={(e) => setContent(e.target.value)}
          onChange={(e) => setData({ content: e.target.value, ...data.title })}
          value={data.content}
        />
        <button onClick={addBlog}>Add blog!</button>
      </div>
      <hr />
      <div className={styles.blogContainer}>
        {blogs.length !== 0 ? (
          blogs.map((ele, index) => (
            <div key={index} className={styles.blogCards}>
              <h3>{ele.title}</h3>
              <p>{ele.content}</p>
            </div>
          ))
        ) : (
          <p>No blogs!</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
