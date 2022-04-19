import React, { useState } from "react";
import '../styles/AddUser.css'
import gardenImg from '../img/plant-icon.png'
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useLocation, Link } from "react-router-dom";

const { Option } = Select;

function UserDetail() {
    const { state } = useLocation();
    return (
        <div className="content">
            <h1>Hello {state.users.ID}</h1>
        </div>
    )
}


export default UserDetail
