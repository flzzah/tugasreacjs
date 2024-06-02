import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [newPost, setNewPost] = useState({ userId: "", title: "", body: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //New post using JSONPlaceholder API
  const handleCreate = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        if (!newPost.userId || !newPost.body || !newPost.title) return;
        console.log("Post created successfully");
        const createdPost = await response.json();
        const maxId = Math.max(...postData.map((data) => data.id));
        const newId = maxId + 1;
        const newPostWithId = { ...createdPost, id: newId };
        setPostData([...postData, newPostWithId]);
        setNewPost({ title: "", body: "", userId: "" });
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Edit post using JSONPlaceholder API
  const handleEdit = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(editData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        console.log("Post edited successfully");
        const updatedPosts = postData.map((post) => {
          if (post.id === id) {
            return { ...post, ...editData }; // Update the edited post
          }
          return post;
        });
        setPostData(updatedPosts); // Update the state with edited data
        setEditData(null); // Clear editData
      } else {
        console.error("Failed to edit post");
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  // Edit delete using JSONPlaceholder API
  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus post ini?"
      );
      if (isConfirmed) {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log("Post deleted successfully");
          const delateData = postData.filter((post) => post.id !== id);
          console.log(delateData);
          setPostData(delateData); // Fetch updated posts
        } else {
          console.error("Failed to delete post");
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        postData,
        editData,
        newPost,
        setEditData,
        setNewPost,
        fetchPosts,
        handleEdit,
        handleCreate,
        handleDelete,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

PostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};