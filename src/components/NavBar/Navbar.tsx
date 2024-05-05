import React from "react";
import { Menu, Avatar, Typography, Button, Dropdown, Space, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const NavBar = () => {
    const navigate = useNavigate()
  const menuStyle = {
    height: "50px",
    lineHeight: "50px",
    fontSize: "18px",
  };

  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => navigate('/login-user')} >Login User</div>,
      key: '0',
    },
    {
      label: <div onClick={() => navigate('/resgister-user')} >Resgister User</div>,
      key: '1',
    },
    
  ];

  return (
    <>
      <Menu mode="horizontal" style={menuStyle}>
        <Menu.Item key="icon" disabled>
          <UnorderedListOutlined
            style={{ padding: 14, fontSize: 27, color: "#8a8686" }}
          />
        </Menu.Item>
        <Menu.Item key="name" disabled></Menu.Item>
        <Menu.Item key="logout" disabled style={{ marginLeft: "auto" }}>
          <Button type="link" icon={<LogoutOutlined />} danger>
            Logout
          </Button>
        </Menu.Item>

        <Menu.Item key="avatar" disabled>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar
              style={{ backgroundColor: "#8a8686" }}
              size="large"
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default NavBar;
