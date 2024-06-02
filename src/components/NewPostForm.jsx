import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import { Button } from "antd";

function NewPostForm() {
  const { handleCreate, setNewPost, newPost } = useContext(PostContext);
  return (
    <>
      {/* Modal atau form untuk membuat data baru */}
      <div className="form-add">
        <h2>Add New Post</h2>
        <label>UserId</label>
        <input
          type="text"
          placeholder="UserID"
          value={newPost.userId}
          onChange={(e) => setNewPost({ ...newPost, userId: e.target.value })}
        />
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <label>Body</label>
        <textarea
          placeholder="Body..."
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <Button
          onClick={handleCreate}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Add+
        </Button>
      </div>
    </>
  );
}

export default NewPostForm;