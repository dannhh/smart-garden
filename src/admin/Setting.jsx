import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../styles/Setting.css'
import { Col, Row, Select, Form, Input, Collapse, Modal, Radio, Button } from 'antd';
const { Option } = Select;
const { Panel } = Collapse;

function handleChange(value) {
    console.log(`selected ${value}`);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
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
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
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
                    name="Your old password"
                    label="Your old password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input this field!',
                        },
                    ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    name="New password"
                    label="New password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input this field!',
                        },
                    ]}
                >
                <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};


function Motor() {
    function onChange(checked) {
        console.log(`switch to ${checked}`);
    }
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    return (
        <div className='setting'>
            <h1 style={{ height: 150 }}>Settings</h1>
            <div className='st-body'>
            <Row>
                <Col span={8}>
                    <h3>Enable model</h3>
                </Col>
                <Col span={8} offset={2}>
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
                <Col span={8} offset={2}>
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
                <Col span={8} offset={2}>
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
                        <h3>Jonny</h3>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <h3>Username</h3>
                    </Col>
                    <Col span={8} offset={8}>
                        <h3>jon_ny</h3>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <h3>Email</h3>
                    </Col>
                    <Col span={8} offset={8}>
                        <h3>jon@ny.com</h3>
                    </Col>
                </Row>
            </div>
            </div>
        </div>
    )

}

export default Motor
