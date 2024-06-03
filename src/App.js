import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import SearchTasks from "./pages/SearchTasks";
import Contact from "./pages/Contact";

import "./App.css"; // Import custom CSS file for styling

const { Header, Content } = Layout;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
  const [current, setCurrent] = useState("tasks"); // State for the current selected menu item

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https:todo-backend-v2gd.onrender.com/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(
        `https://todo-backend-v2gd.onrender.com/tasks/search?q=${query}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error searching tasks:", error);
    }
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to="/tasks">Tasks</Link>,
      key: "tasks",
      icon: <DesktopOutlined />,
    },
    {
      label: "Search Tasks",
      key: "search-tasks",
      icon: <ContainerOutlined />,
      children: [
        {
          type: "group",
          label: "Options",
          children: [
            {
              label: <Link to="/search-tasks">Search Tasks</Link>,
              key: "search",
            },
          ],
        },
      ],
    },
    {
      key: "contact",
      label: <Link to="/contact">Contact</Link>,
      icon: <MailOutlined />,
    },
  ];

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <div className="logo">
            <span className="heading">Todo</span>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[current]}
            onClick={onClick}
            items={items}
            className="nav-menu"
          />
          <Avatar size={40} icon={<UserOutlined />} className="avatar" />
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Routes>
              <Route path="/tasks" element={<Tasks tasks={tasks} />} />
              <Route
                path="/search-tasks"
                element={
                  <SearchTasks
                    tasks={tasks}
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                  />
                }
              />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
