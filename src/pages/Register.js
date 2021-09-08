import React from "react";
import styles from "./Register.module.css";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 

const buttonStyle = ({ hover }) => ({
  background: hover ? "#4AB8B2" : "white",
  color: hover ? "white" : "black",
  border: hover ? "1px #4AB8B2 solid" : "1px #4AB8B2 solid",
});

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



function Register() {
  const [hover, setHover] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinishRegister = async (values) => {
    let username = values.username;
    let password = values.confirm;
    let gender = values.gender.toUpperCase();
    let email = values.email;
    let user = { username, password, email, gender };
    await axios.post("http://localhost:8080/api/user/add-user", user);
     history.push("/");
    
  };

  

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinishRegister}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>I have read the agreement</Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            
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
        </Form>
      </div>
    </div>
  );
}

export default Register;
