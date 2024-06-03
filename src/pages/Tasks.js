import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Table, Tag, Space } from "antd";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://todo-backend-2-qke1.onrender.com"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const markTaskAsDone = async (id) => {
    try {
      await axios.put(`https://todo-backend-2-qke1.onrender.com/tasks/:id`, {
        is_done: true,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as done:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log(`Deleting task with ID: ${id}`);
      await axios.delete(`https://todo-backend-2-qke1.onrender.com/tasks/:id`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const onFinish = async (values) => {
    try {
      // Send data to the server to add a new task
      await axios.post("https://todo-backend-2-qke1.onrender.com/tasks", {
        username: values.Name,
        task: values.TaskName,
      });
      // Fetch updated tasks
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Task Name",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Status",
      dataIndex: "is_done",
      key: "status",
      render: (isDone) => (
        <Tag color={isDone ? "green" : "red"}>
          {isDone ? "Done" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {!record.is_done && (
            <Button onClick={() => markTaskAsDone(record.id)}>
              Mark as Done
            </Button>
          )}
          <Button onClick={() => deleteTask(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Tasks</h2>
      <Table
        dataSource={tasks}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ margin: "0 auto" }}
      />
      <Form
        layout="inline"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: "30px auto", textAlign: "center" }}
      >
        <Form.Item
          label="Name"
          name="Name"
          rules={[{ required: true, message: "Please input a name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Task Name"
          name="TaskName"
          rules={[{ required: true, message: "Please input a task name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              maxWidth: 600,
              margin: "30px",
              textAlign: "center",
              marginLeft: "220px",
            }}
          >
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Tasks;
