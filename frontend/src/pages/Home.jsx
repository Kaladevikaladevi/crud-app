import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  // NEW: edit states
  const [editingId, setEditingId] = useState(null);

  // GET tasks
  const fetchTasks = async () => {
    const res = await API.get(`/?search=${search}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [search]);

  // CREATE or UPDATE
  const handleSave = async () => {
    if (editingId) {
      await API.put(`/${editingId}`, { title });
      setEditingId(null);
    } else {
      await API.post("/", { title });
    }

    setTitle("");
    fetchTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    await API.delete(`/${id}`);
    fetchTasks();
  };

  // START EDIT
  const startEdit = (task) => {
    setTitle(task.title);
    setEditingId(task._id);
  };

 return (
  <div className="container">
    <h1>CRUD Task Manager</h1>

    {/* SEARCH */}
    <input
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div className="input-group">
      <input
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="add"
        onClick={handleSave}
      >
        {editingId ? "Update Task" : "Add Task"}
      </button>
    </div>

    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
  <span>{task.title}</span>

  <div className="actions">
    <button
      className="edit"
      onClick={() => startEdit(task)}
    >
      ✏️ Edit
    </button>

    <button
      className="delete"
      onClick={() => deleteTask(task._id)}
    >
      🗑 Delete
    </button>
  </div>
</li>
      ))}
    </ul>
  </div>
);
}