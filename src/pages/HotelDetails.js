import React, {useEffect, useState} from "react";
import styles from "./HotelDetails.module.css";
import BreadcrumbHistory from "../components/layout/BreadcrumbHistory";
import {Rate, Button, Form, Modal, Input, Space, Tag} from "antd";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import axios from "axios";
import {Rating} from "@mui/material";
import {EditOutlined} from "@ant-design/icons";
const { TextArea } = Input;

function HotelDetails(props) {
  let hotel = props.location.state.hotel;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [title, setTile] = useState("")
  const [text, setText] = useState("")
  const [rating, setRating] = useState(0)
  const [likes, setLikes] = useState(0)
  const [posts, setPosts] = useState([])


  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveToDatabase = async () => {
    let entity = {
      'name': hotel.name,
      'rating': parseFloat(hotel.rating),
      'price': parseFloat(hotel.price?.slice(1, 3).trim()),
      'hotelClass': hotel.hotel_class,
      'pictureLink': hotel.photo?.images.large.url ? hotel.photo.images.large.url : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg",
      'id': hotel.name,
      'cityName': hotel.ranking_geo,
      'activityType': 'HOTEL'
    }

    const URL = "http://localhost:8080/hotels/add-hotel"
    const response = await axios.post(URL, entity)
    console.log(response)
    console.log(entity)
  }

  const handlePost = async (values) => {
    await saveToDatabase()
    let userId = AuthService.getCurrentUser().id;
    let title = values.title
    let text = values.text
    let rating = values.rating
    let data = {
      userId,
      title,
      text,
      rating
    }
    await PostService.addPost(hotel.name, userId, data)
    window.location.reload()
    form.resetFields()
  }


  let data = {
    title,
    text,
    rating
  }

  // useEffect(() => {
  //   PostService.getAllPostsByEntityId(hotel.name).then((response) => {
  //         setPosts(response.data)
  //   })
  // },[hotel.name])

  useEffect(() => {
    // const getData = async () => {
    //   const response = await fetch(`http://localhost:8080/api/posts/list/${hotel.name}`);
    //   const newData = await response.json();
    //   setPosts(newData);
    // };
    // getData();
    PostService.getAllPostsByEntityId(hotel.name).then((response) => {
      setPosts(response.data)
    })
  }, [hotel.name]);


  const getPosts = () => {
    const post = {title, text, rating}
    PostService.getAllPostsByEntityId(hotel.name).then((response) => {
      setPosts(response.data)
    })
  }

  const editPost = async (values) => {
   await PostService.editPost()
  }


  return (
    <div>
      <BreadcrumbHistory
        name="about"
        times={{
          pages: [
            { name: "places to stay", link: "/places-to-stay" },
            { name: props.location.state.hotel.name, link: "" },
          ],
        }}
      />
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <div className={styles.title}>
            <h1>{hotel.name}</h1>
          </div>
          <div className={styles.title}>
            <h3>{hotel.ranking}</h3>
          </div>
          <div className={styles.rating}>
            <Rate
              disabled
              allowHalf
              defaultValue={hotel.rating}
            />
            {hotel.price} €
          </div>
          <div className={styles.hoursAndWebsiteLink}>
            <a href={hotel.siteLink}>
              Visit website{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 10"
              >
                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.containerPhoto}>
          <div className={styles.topComments}>
            <h2>What people are saying:</h2>{" "}
          </div>
          <div className={styles.picture}>
            <img
              style={{ width: "100%" }}
              src={
                hotel.photo
                  ? hotel.photo.images.large.url
                  : "https://d2fdt3nym3n14p.cloudfront.net/venue/3094/gallery/13009/conversions/121113237_811315479645435_5054498167316426209_o-big.jpg"
              }
              alt={hotel.name}
            ></img>
          </div>
        </div>
        <div className={styles.containerMap}>
          <div className={styles.locationDescription}>
            <h3>{hotel.description}</h3>
          </div>
          <div className={styles.infoNeighbourhood}>
            <h2>What you can find nearby:</h2>
            {hotel.neighborhood_info?.map((place) => {
              return <h3>{place.name}</h3>
            })}
          </div>
          <div className={styles.map}>[MAP HERE]</div>
        </div>
        <div className={styles.containerUsers}>
          <div className={styles.writeReview}>
            <Button onClick={showModal}>Write a review!</Button>
            <Modal
                forceRender
                centered={true}
                getContainer={false}
                title="Basic Modal"
                visible={isModalVisible}
                width={500}
                onCancel={handleCancel}
                footer={[
                  <Button>OK</Button>,
                  <Button>Cancel</Button>,
                ]}
            >
              <Form name="writeReview"
                    form={form}
                    onFinish={handlePost}
              >
                <Form.Item
                    name="title"
                    label="title"
                    rules={[
                      {message: "Please enter a title!", whitespace: true}
                    ]}>
                  <Input
                      onChange={(e) => setTile(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                    name="text"
                    label="text"
                    rules={[
                      {message: "Please enter your text!", whitespace: true}
                    ]}>
                  <TextArea
                      onChange={(e) => setText(e.target.value)}
                      defaultValue={text}
                      name="text"
                      rows="4"
                      cols="50"/>

                </Form.Item>
                <Form.Item
                    name="rating"
                    label="rating"
                    rules={[{message: "Select rating"}]}
                >
                  <Rating name="half-rating" defaultValue={rating} precision={0.5}  />

                {/*  onChange={(event, newValue) => {*/}
                {/*  console.log(newValue)*/}
                {/*  setRating(newValue)*/}
                {/*}}*/}

                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className={styles.allReviews}>Comments:
            {posts.map((post) => <p>{post.title}</p>
            )}
            <Space size="middle">
              <a onClick={() => {
                editPost()
              }
              }>
                <Tag color="orange">
                  <EditOutlined/>
                </Tag>
              </a>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
