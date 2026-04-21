import React, { useEffect, useState } from "react";

function Complete() {
  const [completedTasks, setCompletedTasks] = useState([]);

  // load completed tasks
  const loadTasks = () => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const filtered = allTasks.filter((task) => task.completed === true);

    setCompletedTasks(filtered);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // delete task
  const handleDelete = (id) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updated = allTasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updated));

    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Completed Tasks
      </h1>

      {completedTasks.length === 0 ? (
        <p className="text-gray-500">No completed tasks yet</p>
      ) : (
        <div className="space-y-4">
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-green-100 p-4 rounded-xl shadow flex justify-between items-start"
            >
              <div>
                <h2 className="font-bold text-lg line-through text-gray-600">
                  {task.title}
                </h2>

                <p className="text-gray-600">{task.desc}</p>

                <p className="text-green-600 text-sm mt-1">
                  Completed ✔
                </p>
              </div>

              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Complete;