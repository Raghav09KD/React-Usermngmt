import React, { useState, useEffect } from "react";
import { List, Modal, Button } from "antd";
import axios from "axios";

function ViewDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch user details from the server
    axios
      .get("http://localhost:5000/ViewUsers")
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  const handleDeleteUser = (user) => {
    axios
      .delete(`http://localhost:5000/users/${user.mobile}`)
      .then((response) => {
        // Remove the deleted user from the userDetails state
        setUserDetails((prevUserDetails) =>
          prevUserDetails.filter((u) => u.mobile !== user.mobile)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateUser = () => {
    console.log('updating user');
  };

  return (
    <div>
      <h1>User Details</h1>
      <List
        dataSource={userDetails}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta title={<h3>Name: {user.name}</h3>} />
            <Button type="primary" onClick={() => handleViewDetails(user)}>
              View Details
            </Button>
            <Button danger onClick={() => handleDeleteUser(user)}>
              Delete
            </Button>

            <Button type="dashed" onClick={() => handleUpdateUser(user)}>
              Update
            </Button>
          </List.Item>
        )}
      />
      {selectedUser && (
        <Modal
          title={`Details for ${selectedUser.name}`}
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          <p>Mobile: {selectedUser.mobile}</p>
          <p>Address: {selectedUser.address}</p>
        </Modal>
      )}
    </div>
  );
}

export default ViewDetails;
