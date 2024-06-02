import { useContext, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { Button } from "antd";

function PostList() {
  const { postData, handleDelete, setEditData } = useContext(PostContext);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <div>
      <table className="Table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(({ userId, id, title, body }) => (
            <tr key={id}>
              <td>{userId}</td>
              <td>{title}</td>
              <td>{body}</td>
              <td>
                <div className="flex-btn">
                  <Button
                    onClick={() => setEditData({ id, userId, title, body })}
                    type="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(id)}
                    type="primary"
                    danger
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="slider">
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        )}
        {page < Math.ceil(postData.length / postsPerPage) && (
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default PostList;