// AddTask.js
import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ fetchTasks }) => {
  const [username, setUsername] = useState("");
  const [task, setTask] = useState("");

  const addTask = async () => {
    await axios.post("https://todo-backend-2-qke1.onrender.com", {
      username,
      task,
    });
    setUsername("");
    setTask("");
    fetchTasks();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
