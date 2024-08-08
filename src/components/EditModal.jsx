/* eslint-disable react/prop-types */
import { Modal, Input, Form, message } from "antd";
import { useState } from "react";

const EditModal = ({
  handleCancel,
  isModalVisible,
  id,
  name,
  email,
  phone,
  website,
  updateUserData,
  url,
}) => {
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    phone: phone,
    website: website,
  });

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleFormSubmit() {
    try {
      const response = await fetch(url + `/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        message.success("User updated successfully!");
        updateUserData(data.data.user); // Update the user data in the parent component
        handleCancel(); // Close the modal
      } else {
        message.error("Failed to update user!");
      }
    } catch (error) {
      message.error("An error occurred while updating the user.");
    }
  }

  return (
    <Modal
      title="Edit User"
      open={isModalVisible}
      onOk={handleFormSubmit}
      onCancel={handleCancel}
      okText="OK"
      cancelText="Cancel"
    >
      <Form layout="vertical">
        <Form.Item label="Name" required>
          <Input
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Phone" required>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Website" required>
          <Input
            name="website"
            value={formData.website}
            onChange={handleFormChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
