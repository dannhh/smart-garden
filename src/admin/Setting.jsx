import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'antd/dist/antd.css';
import '../styles/Setting.css'
import { Col, Row, Select, Form, Input, Collapse, Modal, Radio, Button } from 'antd';
const { Option } = Select;
const { Panel } = Collapse;

function handleChange(value) {
    console.log(`selected ${value}`);
}

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [user, setUser] = useState()
    useEffect(() => {
        axios.get('/user/account_information/' + sessionStorage.getItem('user_id')).then((response) => {
            setUser(response.data)
        })
    }, [])
    return (
        <Modal
            visible={visible}
            title="Update your password"
            okText="Update"
            cancelText="Discard"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();

                            axios.post('/user/account_information/' + sessionStorage.getItem('user_id'), {
                                ID: sessionStorage.getItem('user_id'),
                                name: user.name,
                                username: user.username,
                                password: values.newpwd,
                                email: user.email,
                                phone: user.phone,
                                image: user.image,
                            })
                                .then(function (response) {
                                    console.log(response)
                    
                                    if (response.data.success == false) {
                                        alert("Incorrect username or password");
                                    }
                                    else {
                                        alert("Succesful");
                                    }
                                })
                                .catch((err) => {
                                    alert("Incorrect username or password");
                                });
                    })
                    .catch((info) => {
                        visible={}
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="pwd"
                    label="Your old password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input this field!',
                        },
                    ]}
                >
                    <Input  type="password"/>
                </Form.Item>
                <Form.Item
                    name="newpwd"
                    label="New password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input this field!',
                        },
                    ]}
                >
                    <Input  type="password"/>
                </Form.Item>
            </Form>
        </Modal>
    );
};


function Motor() {

    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    return (
        <div className='setting'>
            <h1 style={{ height: 150 }}>Setting</h1>
            <div className='st-body'>
                <Row>
                    <Col span={8}>
                        <h3>Enable model</h3>
                    </Col>
                    <Col span={8} offset={5}>
                        <Select defaultValue="off" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="off">OFF</Option>
                            <Option value="on">ON</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20, marginBottom: 20 }}>
                    <Col span={8}>
                        <h3>Set pagination</h3>
                    </Col>
                    <Col span={8} offset={5}>
                        <Select defaultValue="5" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="5">5</Option>
                            <Option value="10">10</Option>
                            <Option value="15">15</Option>
                            <Option value="20">20</Option>
                            <Option value="20">25</Option>
                            <Option value="20">50</Option>
                        </Select>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <h3>Edit this account</h3>
                    </Col>
                    <Col span={8} offset={5}>
                        <Button
                            // type="primary"
                            onClick={() => {
                                setVisible(true);
                            }}
                        >
                            Update
                        </Button>
                        <CollectionCreateForm
                            visible={visible}
                            onCreate={onCreate}
                            onCancel={() => {
                                setVisible(false);
                            }}
                        />
                    </Col>
                </Row>
                <div className='st-account'>
                    <Row>
                        <Col span={8}>
                            <h3>Name</h3>
                        </Col>
                        <Col span={8} offset={8}>
                            <h3>Nguyen Van A</h3>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <h3>Username</h3>
                        </Col>
                        <Col span={8} offset={8}>
                            <h3>vana123</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <h3>Email</h3>
                        </Col>
                        <Col span={8} offset={8}>
                            <h3>vana123@gmail.com</h3>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )

}

export default Motor
