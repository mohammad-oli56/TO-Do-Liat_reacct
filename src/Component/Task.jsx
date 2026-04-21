import React, { useEffect, useState } from "react";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [important, setImportant] = useState(false);

  // ✅ LOAD ONLY ONCE
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // ✅ SAVE MANUALLY (NOT AUTOMATIC useEffect)
  const saveToStorage = (data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  // ADD TASK
  const handleAddTask = (e) => {
    e.preventDefault();

    if (!title) return;

    const newTask = {
      id: Date.now(),
      title,
      desc,
      important,
      completed: false,
    };

    const updated = [newTask, ...tasks];

    setTasks(updated);
    saveToStorage(updated);

    setTitle("");
    setDesc("");
    setImportant(false);
  };

  // DELETE
  const handleDelete = (id) => {
    const updated = tasks.filter((task) => task.id !== id);

    setTasks(updated);
    saveToStorage(updated);
  };

  // COMPLETE (KEEP DATA BUT MOVE STATUS)
  const handleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );

    setTasks(updated);
    saveToStorage(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex flex-col items-center gap-6">

      {/* FORM */}
      <form
        onSubmit={handleAddTask}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-4 border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-gray-800">Add Task</h1>

        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />

        <label className="flex gap-2 text-gray-600">
          <input
            type="checkbox"
            checked={important}
            onChange={() => setImportant(!important)}
          />
          Mark as Important
        </label>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Add Task
        </button>
      </form>

      {/* TASK LIST */}
      <div className="w-full max-w-xl space-y-3">
        {tasks.filter((t) => !t.completed).map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start border border-gray-200 hover:shadow-lg transition"
          >
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                {task.title}
                {task.important && (
                  <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    Important
                  </span>
                )}
              </h3>
              <p className="text-gray-600">{task.desc}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleComplete(task.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
              >
                Complete
              </button>

              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;
