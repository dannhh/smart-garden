import React, { useState } from "react";
import '../styles/Account.css'
import gardenImg from '../img/plant-icon.png'
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const { Option } = Select;

function Account() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const getFields = () => {
        const children = [];

        children.push(
            <Col span={12} key={1}>
                First name
                <Form.Item
                    name={`firstname`}
                >
                    <Input placeholder="Your firstname" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={2}>
                Old password
                <Form.Item
                    name={`oldpwd`}
                    rules={[
                        {
                            required: true,
                            message: 'Type your old password!',
                        },
                    ]}
                >
                    <Input placeholder="Your old password" />
                </Form.Item>
            </Col>,
        );
        children.push(
            <Col span={12} key={3}>
                Last name
                <Form.Item
                    name={`lastname`}
                >
                    <Input placeholder="Your lastname" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={4}>
                New password
                <Form.Item
                    name={`newpwd`}
                    rules={[
                        {
                            required: true,
                            message: 'Type your new password',
                        },
                    ]}
                >
                    <Input placeholder="Your new password" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={5}>
                Email
                <Form.Item
                    name={`email`}
                >
                    <Input placeholder="Your email" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={6}>
                Retype password
                <Form.Item
                    name={`retypepwd`}
                    rules={[
                        {
                            required: true,
                            message: 'Retype your password!',
                        },
                    ]}
                >
                    <Input placeholder="Your new password" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={7}>
                Phone
                <Form.Item
                    name={`phone`}
                >
                    <Input placeholder="Your phone number" />
                </Form.Item>
            </Col>,
        );

        children.push(
            <Col span={12} key={8}>
                Confirm password
                <Form.Item
                    name={`confirmpwd`}
                    rules={[
                        {
                            required: true,
                            message: 'Type your password!',
                        },
                    ]}
                >
                    <Input placeholder="Your password" />
                </Form.Item>
            </Col>,
        );


        return children;
    };
    return (
        <div className="account">
            <div className="user-img">
                <img src={gardenImg} alt="gardenImage" />
                <h2>Toi la AI</h2>
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
                                Update
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


export default Account
