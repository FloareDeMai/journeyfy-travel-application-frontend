import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "./Signin.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const buttonStyle = ({ hover }) => ({
  background: hover ? "#4AB8B2" : "white",
  color: hover ? "white" : "black",
  border: hover ? "1px #4AB8B2 solid" : "1px #4AB8B2 solid",
});

function Signin() {
  const [hover, setHover] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox background_color={'#78EBE5'}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              style={buttonStyle({hover})}
              onPointerOver={()=> setHover(true)}
              onPointerOut={() => setHover(false)}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
          <p>If you don't have yet an account, please <Link to="/register">Register</Link> </p>
        </Form>
      </div>
    </div>
  );
}

export default Signin;
