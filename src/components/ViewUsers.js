import React, { useState, useEffect } from "react";
import { Table, Spin, Alert, Button, Modal, Form, Input } from "antd";
import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while fetching users");
        setLoading(false);
      });
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    editForm.setFieldsValue(user);
    setEditModalVisible(true);
  };

  const handleDeleteClick = (user) => {
    // Perform delete logic here
    // Send a request to the backend server to delete the user
    axios
      .delete(`http://localhost:5000/users/${user.uuid}`)
      .then(() => {
        // Remove the deleted user from the local state
        const updatedUsers = users.filter((u) => u.uuid !== user.uuid);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred during user deletion");
      });
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditingUser(null);
    editForm.resetFields();
  };

  const handleEditModalOk = () => {
    editForm
      .validateFields()
      .then((values) => {
        const userToUpdate = users.find(
          (user) => user.uuid === editingUser.uuid
        );
        if (userToUpdate) {
          const updatedUser = { ...userToUpdate, ...values };
          // Perform update logic here
          // Send a request to the backend server to update the user data
          axios
            .put(`http://localhost:5000/users/${editingUser.uuid}`, updatedUser)
            .then(() => {
              // Update the user in the local state
              const updatedUsers = users.map((user) => {
                if (user.uuid === editingUser.uuid) {
                  return updatedUser;
                }
                return user;
              });
              setUsers(updatedUsers);
              setEditModalVisible(false);
              setEditingUser(null);
              editForm.resetFields();
            })
            .catch((error) => {
              console.error(error);
              setError("An error occurred during user update");
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <div>
          <Button type="primary" onClick={() => handleEditClick(user)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteClick(user)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        <Table columns={columns} dataSource={users} />
      )}

      <Modal
        title="Edit User"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="mobile"
            rules={[
              { required: true, message: "Please enter mobile no" },
              { type: "tel", message: "Please enter mobile no" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="address"
            rules={[{ required: true, message: "Please enter addreess" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewUsers;