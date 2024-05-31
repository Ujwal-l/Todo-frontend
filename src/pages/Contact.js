import React from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const onFinish = async (values) => {
  try {
    await axios.post("https://todo-backend-2-qke1.onrender.com", values);
    message.success("Email sent successfully!");
  } catch (error) {
    message.error("Failed to send email.");
  }
};

const formStyles = {
  maxWidth: 600,
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #d9d9d9",
  borderRadius: "8px",
  backgroundColor: "#f0f2f5",
};

const buttonStyles = {
  backgroundColor: "#1890ff",
  borderColor: "#1890ff",
};

const Contact = () => (
  <div
    style={{ padding: "50px", backgroundColor: "#e6f7ff", minHeight: "100vh" }}
  >
    <h1 style={{ textAlign: "center", color: "#001529" }}>Contact Me</h1>
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={formStyles}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "age"]}
        label="Age"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={["user", "introduction"]} label="Message">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit" style={buttonStyles}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default Contact;
