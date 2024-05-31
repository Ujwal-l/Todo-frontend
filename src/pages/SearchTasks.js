import React, { useState } from "react";
import { Table, Tag, Button, Input, Space } from "antd";

const SearchTasks = ({ tasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filteredResults = tasks.filter((task) => {
      // Check if the task username includes the search query
      const usernameMatch = task.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      // Check if the task is done or not based on search query
      const doneMatch =
        (searchQuery.toLowerCase() === "done" && task.is_done) ||
        (searchQuery.toLowerCase() === "not done" && !task.is_done);
      return usernameMatch || doneMatch;
    });
    setSearchResults(filteredResults);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Status",
      dataIndex: "is_done",
      key: "status",
      render: (isDone) => (
        <Tag color={isDone ? "green" : "red"}>
          {isDone ? "Done" : "Not Done"}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search Tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Space>
      <Table
        dataSource={searchResults}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default SearchTasks;
