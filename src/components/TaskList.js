import React from "react";
import axios from "axios";

const TaskList = ({ tasks, fetchTasks }) => {
  const markTaskAsDone = async (id) => {
    await axios.put(`https://todo-backend-2-qke1.onrender.com/tasks/:id`, {
      is_done: true,
    });
    fetchTasks();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.task} - {task.username} - {task.is_done ? "Done" : "Pending"}
          {!task.is_done && (
            <button onClick={() => markTaskAsDone(task.id)}>
              Mark as Done
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
