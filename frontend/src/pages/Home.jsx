import { useEffect, useState } from "react";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [activeCommentBox, setActiveCommentBox] = useState({});

  const getToken = () => localStorage.getItem("token");
  const getUser = () => localStorage.getItem("user");
  const isLoggedIn = () => Boolean(getToken() && getUser());
  const showAuthAlert = () => alert("Please login or sign up first");

  const getBlogs = async () => {
    const res = await fetch("http://localhost:3000/blog/get-blog");
    const data = await res.json();
    setBlogs(data?.data || []);
  };

  const likeBlog = async (id) => {
    if (!isLoggedIn()) return showAuthAlert();

    const token = getToken();

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
    if (!isLoggedIn()) return showAuthAlert();

    const token = getToken();

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

  const toggleCommentBox = (id) => {
    if (!isLoggedIn()) {
      showAuthAlert();
      return;
    }

    setActiveCommentBox({
      ...activeCommentBox,
      [id]: !activeCommentBox[id],
    });
  };

  return (
    <>
      <div className="home-page">
        <h1>All Blogs</h1>

        {blogs.map((blog) => (
          <div className="first-div" key={blog._id}>
            <h1>{blog.title}</h1>
            <p>
              Posted by <span>{blog.author?.name}</span>
            </p>
            <p>{blog.content}</p>

            <div className="like-comment">
              <button onClick={() => likeBlog(blog._id)}>
                <i className="fa-solid fa-thumbs-up"></i>
                <p>{blog.likes?.length || 0} Likes</p>
              </button>

              <button onClick={() => toggleCommentBox(blog._id)}>
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
                  <p key={index}>
                    <strong>{comment.user?.name || "User"}:</strong>{" "}
                    {comment.text}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
