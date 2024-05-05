import React from "react";
import { Button, Card, Form, Row, Col, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginFrom: React.FC = () => {
  const navigate = useNavigate();

  const loginForm = async (d: Record<string, any>) => {
    const payload = { ...d };
    console.log(d);
    try {
      const response = await axios.post("/users/login", payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Row>
        <Col sm={6}></Col>
        <Col xs={24} sm={12}>
          <Card className=" mt-24" hoverable>
            <Form onFinish={loginForm} layout="vertical">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input />
              </Form.Item>
              <Button htmlType="submit" icon={<LoginOutlined />}>
                Login
              </Button>

              <Button
                style={{ float: "right" }}
                type="link"
                onClick={() => navigate("/resgister-user")}
              >
                Create your account
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginFrom;
