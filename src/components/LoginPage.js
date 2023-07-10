import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onFinish = (values, event) => {
        console.log('Received values:', values);

        axios
            .get('http://localhost:3001/users') // Assuming users are stored in a 'users' endpoint
            .then((response) => {
                const users = response.data;
                const user = users.find((user) => user.username === values.username && user.password === values.password);

                if (user) {
                    console.log('Login successful');
                    navigate('/ViewUsers', { replace: true })
                    // Redirect to the appropriate page
                } else {
                    setError('Invalid username or password');
                }
            })
            .catch((error) => {
                console.error(error);
            });

        event.target.reset();
    };


    const handleCreateAccount = () => {
        navigate('/Create', { replace: false });
    };


    return (
        <div style={{
            width: '300px', margin: '0 auto', marginTop: '200px',
        }}>
            <h1 style={{ textAlign: 'center' }}>Login Page</h1>
            <Form name="loginForm" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: 'Please enter your name' },
                    ]}

                >
                    <Input placeholder="Name"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter your password' },
                    ]}
                >
                    <Input.Password
                        placeholder="Password"
                    />
                </Form.Item>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
