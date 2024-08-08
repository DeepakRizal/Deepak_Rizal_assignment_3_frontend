/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DeleteFilled,
  HeartOutlined,
  EditOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Card, Button } from "antd";
import EditModal from "./EditModal";

const UserCard = ({
  avatar,
  id,
  name,
  email,
  phone,
  website,
  updateUser,
  deleteUser,
  url,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateUserData = (updatedData) => {
    updateUser(id, updatedData);
    handleCancel();
  };

  return (
    <div>
      {isModalVisible && (
        <EditModal
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          id={id}
          name={name}
          email={email}
          phone={phone}
          website={website}
          updateUserData={updateUserData}
          deleteUser={deleteUser}
          url={url}
        />
      )}
      <Card
        style={{ width: 350, margin: "1rem", borderRadius: "0" }}
        cover={
          <img
            alt="user avatar"
            src={avatar}
            className="w-[60%] h-48 bg-gray-100"
          />
        }
        actions={[
          <Button
            onClick={handleClick}
            icon={
              isClicked ? (
                <HeartFilled
                  style={{
                    fontSize: "20px",
                    color: "red",
                  }}
                />
              ) : (
                <HeartOutlined
                  style={{
                    fontSize: "20px",
                    color: "red",
                  }}
                />
              )
            }
            key="heart"
            className="border-0 p-0 "
          />,
          <Button
            onClick={showModal}
            className="border-0 text-gray-500"
            icon={<EditOutlined style={{ fontSize: "20px" }} />}
            key="edit"
          />,
          <Button
            onClick={() => deleteUser(id)}
            className="text-gray-500 border-0 p-0"
            icon={<DeleteFilled style={{ fontSize: "20px" }} />}
            key="delete"
          />,
        ]}
      >
        <Card.Meta
          title={name}
          description={
            <div className="text-gray-600">
              <div className="flex items-center">
                <MailOutlined className="mr-2" /> {email}
              </div>
              <div className="flex items-center mt-2">
                <PhoneOutlined className="mr-2" /> {phone}
              </div>
              <div className="flex items-center mt-2">
                <GlobalOutlined className="mr-2" />{" "}
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default UserCard;
