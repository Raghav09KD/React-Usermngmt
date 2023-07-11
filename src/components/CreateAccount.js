import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAccount() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    
    axios
      .post("http://localhost:5000/users", values,)
      .then((response) => {
        navigate("/", { replace: false });
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred during account creation");
      });
  };

  //handle functions.....
  const handleLoginClick = () => {
    navigate("/", { replace: false });
  };

  const handleNameChange = (e) => {
    const key = e.key;
    if (!/^[A-Za-z\s]$/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleMobileChange = (event) => {
    const value = event.target.value;
    const key = event.key;

    if ((!/[0-9]/.test(key) || value.length > 9) && key !== "Backspace") {
      event.preventDefault();
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto", marginTop: "200px" }}>
      <h1 style={{ textAlign: "center" }}>Create Account</h1>
      <Form name="createAccountForm" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Name" onKeyDown={handleNameChange} />
        </Form.Item>

        <Form.Item
          name="mobile"
          rules={[
            { required: true, message: "Please enter your mobile number" },
            {
              pattern: /^\d{10}$/,
              message: "Please enter a valid mobile number",
            },
          ]}
        >
          <Input placeholder="Mobile Number" onKeyDown={handleMobileChange} />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Account
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="default" onClick={handleLoginClick} block>
            Already have an account?
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateAccount;
