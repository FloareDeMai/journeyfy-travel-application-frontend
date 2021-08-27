import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "./Signin.module.css";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const buttonStyle = ({ hover }) => ({
  background: hover ? "#4AB8B2" : "white",
  color: hover ? "white" : "black",
  border: hover ? "1px #4AB8B2 solid" : "1px #4AB8B2 solid",
});

function Signin() {
  const [hover, setHover] = useState(false);
  const [user, setUser] = useState();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    // console.log("Success:", values);
    const userForFetch = { userName, password };
    const response = await axios.post(
      "http://localhost:8080/api/user/login",
      userForFetch
    );

    if (response.status === 200) {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(localStorage.getItem("user"));
      console.log(response.data);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

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
            <Input onChange={({ target }) => setUsername(target.value)} />
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
            <Input.Password
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox background_color={"#78EBE5"}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              style={buttonStyle({ hover })}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
          <p style={{ position: "absolute", width: "200%", left: "5px" }}>
            If you don't have yet an account, please{" "}
            <Link to="/register">Register</Link>{" "}
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Signin;
