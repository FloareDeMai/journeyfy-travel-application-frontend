import React from "react";
import {Form, Input, Button, Checkbox} from "antd";
import styles from "./Signin.module.css";
import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import {useAtom} from "jotai";
import {userAtom} from "../App";
import {tokenAtom} from "../App";


const buttonStyle = ({hover}) => ({
    background: hover ? "#4AB8B2" : "white",
    color: hover ? "white" : "black",
    border: hover ? "1px #4AB8B2 solid" : "1px #4AB8B2 solid",
});


function Signin() {
    const [hover, setHover] = useState(false);
    const [user, setUser] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [userLogged, setUserLogged] = useAtom(userAtom)
    const [token, setToken] = useAtom(tokenAtom)

    const onFinish = async () => {
        const userForFetch = {username, password};
        AuthService.login(userForFetch.username, userForFetch.password).then(() => {
            setUser(localStorage.getItem('user'))
            setUserLogged(localStorage.getItem('user'))
            setToken(localStorage.getItem('token'))
        }, (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()
            setLoading(false)
            setMessage("USER OR PASSWORD INCORRECT")
        });
    }

    if (user) {
        return <Redirect to="/"/>;
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
                        <Input onChange={({target}) => setUsername(target.value)}/>
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
                            onChange={({target}) => setPassword(target.value)}
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
                            style={buttonStyle({hover})}
                            onPointerOver={() => setHover(true)}
                            onPointerOut={() => setHover(false)}
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                    <p style={{position: "absolute", width: "200%", left: "5px"}}>
                        If you don't have yet an account, please{" "}
                        <Link to="/register">Register</Link>{" "}
                    </p>
                </Form>
            </div>
            <div className={styles.message}>{message}</div>
        </div>

        //TODO show message error
    );
}

export default Signin;
