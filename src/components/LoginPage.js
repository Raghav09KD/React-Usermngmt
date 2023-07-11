import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    const { mobile, password } = values;

    // console.log(mobile);
    // console.log(password);
  
    axios
      .post('http://localhost:5000/login', { mobile, password })
      .then((response) => {
        const { success, message } = response.data;
  
        if (success) {
          console.log('Login successful');
          navigate('/ViewUsers', { replace: true });
          // Redirect to the appropriate page
        } else {
          setError(message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Remove the event.target.reset() line since event is undefined
  };

  const handleCreateAccount = () => {
    navigate("/Create", { replace: false });
  };

  return (
    <div style={{ width: "300px", margin: "0 auto", marginTop: "200px" }}>
      <h1 style={{ textAlign: "center" }}>Login Page</h1>
      <Form name="loginForm" onFinish={onFinish}>
        <Form.Item
          name="mobile"
          rules={[{ required: true, message: "Please enter your Mobile No" }]}
        >
          <Input placeholder="Mobile no." />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="default" onClick={handleCreateAccount}>
              Create Account
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
