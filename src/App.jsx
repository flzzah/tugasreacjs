import "./App.css";
import { PostProvider } from "./contexts/PostContext";
import NewPostForm from "./components/NewPostForm";
import PostList from "./components/PostList";
import EditModal from "./components/EditModal";

function App() {
  return (
    <PostProvider>
      <div className="App">
        <div className="Header">
          <h1>Program</h1>
          <h2>(Create, Read, Update, dan Delete)</h2>
        </div>
        <NewPostForm />
        <PostList />
        <EditModal />
      </div>
    </PostProvider>
  );
}

export default App;