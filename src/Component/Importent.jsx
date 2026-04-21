import React, { useEffect, useState } from "react";

function Importent() {
  const [importantTasks, setImportantTasks] = useState([]);

  // load important + NOT completed tasks only
  const loadTasks = () => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const filtered = allTasks.filter(
      (task) => task.important === true && task.completed === false
    );

    setImportantTasks(filtered);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // DELETE TASK
  const handleDelete = (id) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updated = allTasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updated));
    loadTasks();
  };

  // COMPLETE TASK (REMOVE FROM UI)
  const handleComplete = (id) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updated = allTasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updated));

    // refresh UI → completed task will disappear automatically
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        🔥 Important Tasks
      </h1>

      {importantTasks.length === 0 ? (
        <p className="text-gray-500">No important tasks found</p>
      ) : (
        <div className="space-y-4">
          {importantTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-xl shadow flex justify-between items-start gap-4 bg-white"
            >
              <div>
                <h2 className="font-bold text-lg text-gray-800">
                  {task.title} 🔥
                </h2>

                <p className="text-gray-600">{task.desc}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleComplete(task.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Complete
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Importent;