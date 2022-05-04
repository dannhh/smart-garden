import React, { useState } from "react";
import axios from "axios";
import '../styles/AddUser.css'
import gardenImg from '../img/plant-icon.png'
import useToken from './useToken'
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const { Option } = Select;

function AddUser() {
    const [form] = Form.useForm();
    const { token, removeToken, setToken } = useToken();
    const onFinish = (values) => {
        console.log(values)
        axios({
            method: "POST",
            url: '/admin/add_user',
            data: {
                name: values.firstname,
                username: values.username,
                password: values.password,
                email: values.email,
                phone: values.phone,
                image: "",
            },
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                if (response.data['success'] == false) {
                    console.log(response)
                    alert("Incorrect username or password");
                }
                else {
                    alert("Successful!");
                }

            })
            .catch((err) => {
                alert("Incorrect username or password");
            });
    };
    const getFields = () => {
        const children = [];

        children.push(
            <Col span={12} key={1}>
                First name
                <Form.Item
                    name={`firstname`}
                >
                    <Input placeholder="User's firstname" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={3}>
                Last name
                <Form.Item
                    name={`lastname`}
                >
                    <Input placeholder="User's lastname" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={5}>
                Email
                <Form.Item
                    name={`email`}
                >
                    <Input placeholder="User's email" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={7}>
                Phone
                <Form.Item
                    name={`phone`}
                >
                    <Input placeholder="User's phone number" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={9}>
                Username
                <Form.Item
                    name={`username`}
                >
                    <Input placeholder="Username" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={11}>
                Password
                <Form.Item
                    name={`password`}
                >
                    <Input placeholder="Password" type="password" />
                </Form.Item>
            </Col>,
        );

        return children;
    };

    return (
        <div className="content">
            <div className="user-img">
                <img src={gardenImg} alt="gardenImage" />
                <h2>Add new user</h2>
            </div>
            <div>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                >
                    <Row gutter={24}>{getFields()}</Row>
                    <Row>
                        <Col
                            span={24}
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button className="button" htmlType="submit">
                                Add
                            </Button>
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}


export default AddUser
