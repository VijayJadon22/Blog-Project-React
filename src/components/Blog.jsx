import React, { useEffect, useRef, useState } from "react";
import styles from "../styles.module.css";

const Blog = () => {
  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  const [data, setData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);
  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (blogs.length !== 0) {
      document.title = blogs[0].title;
    } else {
      document.title = "No Blogs!";
    }
  }, [blogs]);

  const addBlog = () => {
    // if (title && content) {
    if (data.title !== "" && data.content !== "") {
      //   setBlogs((prevBlogs) => [{ title, content }, ...prevBlogs]);
      setBlogs((prevBlogs) => [
        { title: data.title, content: data.content },
        ...prevBlogs,
      ]);
      //   setTitle("");
      //   setContent("");
      setData({ title: "", content: "" });
      titleInputRef.current.focus(); // Bring the cursor back to the title input field
    }
  };

  const removeBlog = (index) => {
    setBlogs(blogs.filter((blog, i) => i !== index));
  };

  return (
    <div>
      <div>
        <h1>Create a blog!</h1>
        <input
          style={{ margin: "10px" }}
          type="text"
          placeholder="Enter blog title"
          required
          //   onChange={(e) => setTitle(e.target.value)}
          ref={titleInputRef}
          onChange={(e) =>
            setData({ title: e.target.value, content: data.content })
          }
          value={data.title}
        />
        <br />
        <input
          style={{ margin: "10px" }}
          type="text"
          placeholder="Enter blog content"
          required
          //   onChange={(e) => setContent(e.target.value)}
          onChange={(e) =>
            setData({ content: e.target.value, title: data.title })
          }
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
              <button onClick={() => removeBlog(index)}>Delete</button>
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
