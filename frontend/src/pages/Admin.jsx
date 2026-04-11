import { useEffect, useState } from "react";
import "../App.css";

function Admin() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [commentText, setCommentText] = useState({});
  const [activeCommentBox, setActiveCommentBox] = useState({});

  const token = localStorage.getItem("token");

  const getBlogs = async () => {
    const res = await fetch("http://localhost:3000/blog/get-blog");
    const data = await res.json();
    setBlogs(data?.data || []);
  };

  const createBlog = async () => {
    const res = await fetch("http://localhost:3000/blog/create-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.message || "Failed to create blog");
      return;
    }

    setTitle("");
    setContent("");
    getBlogs();
  };

  const deleteBlog = async (id) => {
    const res = await fetch("http://localhost:3000/blog/delete-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.message || "Failed to delete blog");
      return;
    }

    getBlogs();
  };

  const likeBlog = async (id) => {
    const res = await fetch("http://localhost:3000/blog/like-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.message || "Failed to like blog");
      return;
    }

    getBlogs();
  };

  const addComment = async (id) => {
    const text = commentText[id]?.trim();

    if (!text) {
      alert("Comment cannot be empty");
      return;
    }

    const res = await fetch("http://localhost:3000/blog/comment-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, text }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.message || "Failed to add comment");
      return;
    }

    setCommentText({ ...commentText, [id]: "" });
    setActiveCommentBox({ ...activeCommentBox, [id]: false });
    getBlogs();
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className="admin-page">
        <h1>Admin Dashboard</h1>

        <div className="first-div">
          <h1>Create a New Blog</h1>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <button onClick={createBlog}>Create</button>
        </div>

        <h2>All Blogs</h2>

        {blogs.map((blog) => (
          <div className="second-div" key={blog._id}>
            <h1>{blog.title}</h1>
            <p>Posted by <span>{blog.author?.name}</span></p>
            <p>{blog.content}</p>
      

            <div className="like-comment">
              <button onClick={() => likeBlog(blog._id)}>
                <i className="fa-solid fa-thumbs-up"></i>
                <p>{blog.likes?.length || 0} Likes</p>
              </button>

              <button onClick={() => deleteBlog(blog._id)}>
                <i className="fa-solid fa-thumbs-up"></i>
                <p>delete</p>
              </button>

              <button
                onClick={() =>
                  setActiveCommentBox({
                    ...activeCommentBox,
                    [blog._id]: !activeCommentBox[blog._id],
                  })
                }
              >
                <i className="fa-solid fa-comment"></i>
                <p>{blog.comments?.length || 0} Comments</p>
              </button>
            </div>

            {activeCommentBox[blog._id] && (
              <div className="comment-input-box">
                <input
                  placeholder="Write comment..."
                  value={commentText[blog._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [blog._id]: e.target.value,
                    })
                  }
                />
                <button onClick={() => addComment(blog._id)}>Add</button>
              </div>
            )}

            <div className="recent-comments">
              {blog.comments
                ?.slice(-2)
                .reverse()
                .map((comment, index) => (
                  <p key={index}>Comment: {comment.text}</p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Admin;
