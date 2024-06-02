import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";

function EditModal() {
  const { editData, setEditData, handleEdit } = useContext(PostContext);
  return (
    editData && (
      <div className="modal">
        <div className="modal-content">
          <button className="close" onClick={() => setEditData(null)}>
            ×
          </button>
          <h2>Edit Data</h2>
          <label>UserId</label>
          <input type="text" value={editData.userId} onChange={(e) => setEditData({ ...editData, userId: e.target.value })} />
          <label>Title</label>
          <input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
          <label>Body</label>
          <textarea value={editData.body} onChange={(e) => setEditData({ ...editData, body: e.target.value })} />
          <button onClick={() => handleEdit(editData.id)}>Simpan</button>
        </div>
      </div>
    )
  );
}

export default EditModal;
