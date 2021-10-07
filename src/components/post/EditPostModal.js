import {Button, Form, Input, Modal, Rate} from "antd";
import React, {useState} from "react";

function EditPostModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return(
        <Modal
            forceRender
            centered={true}
            getContainer={false}
            title="Basic Modal"
            visible={isModalVisible}
            width={500}
            footer={[
                <Button>OK</Button>,
                <Button>Cancel</Button>,
            ]}
        >
            <Form name="writeReview"
                  form={form}>
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
                    <Rate allowHalf value={rating} onChange={(event, newValue) => {
                        console.log(newValue)
                        setRating(newValue)
                    }}  />
                </Form.Item>
            </Form>
        </Modal>
    )


}


export default EditPostModal