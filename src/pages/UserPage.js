import React, { useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import { Row, Col } from "antd";
import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { Menu, Button, Modal, Form, Input, Select } from "antd";
import { Link, useHistory } from "react-router-dom";
import { getUserByUsername } from "../components/layout/fetchUser";
import { editUserProfile } from "../components/user/postUserAPI";
import { EditOutlined } from "@ant-design/icons";
import { getCountries } from "../components/api/fetchCountriesAndCities";
import { getCities } from "../components/api/fetchCountriesAndCities";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const menu = (
  <Menu className={styles.menu}>
    <Menu.Item>
      <Link className={styles.link} to="/lala">
        Activity feed
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className={styles.link} to="/lalga">
        Journeys
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className={styles.link} to="/lagdfla">
        Photos
      </Link>
    </Menu.Item>
  </Menu>
);

function UserPage() {
  const [user, setUser] = useState({});
  const [aboutState, setAboutState] = useState(false);
  //-------------------------------------------------
  const [countries, setCountries] = useState([]);
  const [countryForm, setCountryForm] = useState("");
  const [cities, setCities] = useState([]);
  //-------------------------------------------------

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();

  let history = useHistory();
  const { Option } = Select;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showToastError = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showToastSuccess = (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showModal = () => {
    form.setFieldsValue({
      username: AuthService.getCurrentUser().username,
      email: AuthService.getCurrentUser().email,
      gender: AuthService.getCurrentUser().gender
        ? AuthService.getCurrentUser().gender
        : gender,
      country: AuthService.getCurrentUser().country
        ? AuthService.getCurrentUser().country
        : country,
      city: AuthService.getCurrentUser().city
        ? AuthService.getCurrentUser().city
        : city,
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setCountry("")
    setCity("")
    setIsModalVisible(false);
  };

  const handleCancel = () => {
     setCountry("");
     setCity("");
    setIsModalVisible(false);
  };

  const onFinishEditing = (values) => {
    let currentUser = AuthService.getCurrentUser();
    let username = values.username;
    let email = values.email;
    let city = values.city;
    let country = values.country;
    let gender = values.gender;
    let description2 = description;
    

    let userForUpdate = {
      username,
      email,
      city,
      country,
      gender,
      description: description2,
      
    };

    editUserProfile(
      AuthService.getCurrentUser().id,
      userForUpdate,
      currentUser.username
    ).then(
      (res) => {
        if (res.status === 200) {
          showToastSuccess("User updated successfuly!");
          AuthService.addUserToLocalStorage(res.data);
          history.push(`/user-page/`);
        }
      },
      (error) => {
        showToastError(error.response.data.message);
        form.setFieldsValue({
          username: AuthService.getCurrentUser().username,
          email: AuthService.getCurrentUser().email,
          gender: AuthService.getCurrentUser().gender
            ? AuthService.getCurrentUser().gender
            : gender,
          country: AuthService.getCurrentUser().country
            ? AuthService.getCurrentUser().country
            : country,
          city: AuthService.getCurrentUser().city
            ? AuthService.getCurrentUser().city
            : city,
        });
        console.log(error.response.data.message);
      }
    );
    handleOk();
  };

  useEffect(() => {
    getUserByUsername(AuthService.getCurrentUser().username).then((data) => {
      setUser(data.data);

    });
    setDescription(user.description);
    setUsername(user.username);
    setCountry(user.country);
    setCity(user.city);
    setGender(user.gender);
  }, [
    user.username,
    user.email,
    user.gender,
    user.description,
    user.country,
    user.city,
  ]);

  const handleEditDescription = (e) => {
    setAboutState((prevCheck) => !prevCheck);
  };

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    getCities(countryForm).then((data) => {
      setCities(data);
    });
  }, [countryForm]);

  console.log(description)

  return (
    <div className={styles.container}>
      <Row>
        <Col span={8} className={styles.upperBarMiddle}>
          <Avatar
            className={styles.avatar}
            size={{
              xs: 130,
              sm: 140,
              md: 200,
              lg: 210,
              xl: 230,
              xxl: 250,
            }}
            icon={<AntDesignOutlined />}
            src={
              "https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg"
            }
          />
          <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <h1 style={{ color: "black", margin: "0" }}>
            {AuthService.getCurrentUser().username}
          </h1>
        </Col>
        <Col span={8} className={styles.upperBarLeft}></Col>
        <Col span={8} className={styles.upperBarRight}>
          <div className={styles.buttonsLeft}>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </Button>
            <Button onClick={showModal}>Edit profile</Button>
          </div>
          <div className={styles.infoRight}>
            <div className={styles.followers}>
              <div className={styles.followersText}>
                <h2>Followers</h2>
              </div>
              <div className={styles.followersNumber}>
                <h2>0</h2>
              </div>
            </div>
            <div className={styles.following}>
              <div className={styles.followingText}>
                <h2>Following</h2>
              </div>
              <div className={styles.followingNumber}>
                <h2>0</h2>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.navbarUser}>
          {menu}
        </Col>
      </Row>
      <Row>
        <Col span={6} className={styles.sideBar}>
          <div className={styles.location}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            
            <p style={{ fontSize: "20px" }}>
              {AuthService.getCurrentUser().city
                ? AuthService.getCurrentUser().city
                : city}
              ,{" "}
              {AuthService.getCurrentUser().country
                ? AuthService.getCurrentUser().country
                : country}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "17px" }}>Joined in {user.joinedDate}</p>
          </div>
          <div style={{ display: "flex" }}>
            {" "}
            <h2>About me </h2> &nbsp;
            <EditOutlined onClick={handleEditDescription} />
          </div>
          <br></br>
          {!aboutState ? (
            <h3 style={{ paddingRight: "40px" }}>{description}</h3>
          ) : (
            <div>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
                id="description"
                name="description"
                rows="4"
                cols="50"
              ></textarea>
              <button
                onClick={() => {
                  let currentUser = AuthService.getCurrentUser();
                  editUserProfile(
                    AuthService.getCurrentUser().id,
                    {
                      username: currentUser.username,
                      email: currentUser.email,
                      city: currentUser.city,
                      country: currentUser.country,
                      gender: currentUser.gender,
                      description: description,
                    },
                    currentUser.username
                  ).then(
                    (res) => {
                      AuthService.addUserToLocalStorage(res.data);
                      showToastSuccess("Description updated successfuly!");
                      setAboutState(false);
                    },
                    (error) => {
                      showToastError(error.response.data.message);
                    }
                  );
                }}
              >
                Change
              </button>
            </div>
          )}
        </Col>
        <Col span={18} className={styles.profileInfoContainer}></Col>
      </Row>
      <Row>
        <Col span={8} className={styles.baraReviewuri}>
          <h1>Reviews:</h1>
        </Col>
        <Col span={8} className={styles.baraCommenturi}>
          <h1>Comments:</h1>
        </Col>
        <Col span={8} className={styles.baraBadge}>
          <h1>Awards:</h1>
        </Col>
      </Row>
      <Modal
        forceRender
        centered={true}
        getContainer={false}
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        footer={[
          <Button onClick={() => handleOk()}>OK</Button>,
          <Button onClick={() => handleCancel()}>Cancel</Button>,
        ]}
      >
        <div className={styles.containerModal}>
          <div className={styles.containerPhotoModal}>
            <h2>UPLOAD AVATAR</h2>
          </div>
          <div className={styles.containerFormModal}>
            <Form name="editProfile" form={form} onFinish={onFinishEditing}>
              <Form.Item
                key={user.username}
                name="username"
                label="Username"
                rules={[
                  { message: "Please input your username!", whitespace: true },
                ]}
              >
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={user.username}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ message: "Please select gender!" }]}
              >
                <Select
                  onChange={(e) => setGender(e.toUpperCase())}
                  placeholder="select your gender"
                  name="gender"
                >
                  <Option value="MALE" name="male">
                    Male
                  </Option>
                  <Option value="FEMALE" name="female">
                    Female
                  </Option>
                  <Option value="OTHER" name="other">
                    Other
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item name="country">
                <Select
                  onChange={(country) => {
                    setCountryForm(country);
                    setCountry(country);
                  }}
                  placeholder="Select a country"
                >
                  {countries?.map((country, i) => {
                    return (
                      <Option key={i} selected value={country.key}>
                        {country.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item name="city">
                <Select
                  onChange={(e) => setCity(e)}
                  placeholder="Select a city"
                >
                  {cities?.map((city, i) => {
                    return (
                      <Option key={i} selected value={city.name}>
                        {city.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserPage;
