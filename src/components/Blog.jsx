import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "../styles.module.css";
// import { db } from "../firebase";

const Blog = () => {
  const blogReducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [action.payload, ...state];
      /* action.payload is basically what we wrote in payload of dispatch below => { title: data.title, content: data.content }, if we used payload directly then we have to write like this the line below which is same as { title: action.payload.title, content: action.payload.content } */

      case "remove":
        return state.filter((blog, i) => i !== action.payload.index);

      default:
        return state;
    }
  };

  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  const [data, setData] = useState({ title: "", content: "" });
  // const [blogs, setBlogs] = useState([]);
  const [blogs, dispatch] = useReducer(blogReducer, []);
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

      // setBlogs((prevBlogs) => [
      //   { title: data.title, content: data.content },
      //   ...prevBlogs,
      // ]);

      dispatch({
        type: "add",
        payload: { title: data.title, content: data.content },
      });

      //   setTitle("");
      //   setContent("");
      setData({ title: "", content: "" });
      titleInputRef.current.focus(); // Bring the cursor back to the title input field
    }
  };

  const removeBlog = (index) => {
    // setBlogs(blogs.filter((blog, i) => i !== index));
    dispatch({ type: "remove", payload: { index: index } });
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
