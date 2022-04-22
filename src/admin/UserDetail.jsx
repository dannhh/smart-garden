import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AddUser.css'
import gardenImg from '../img/plant-icon.png'
import { Form, Row, Col, Input, Button, Select, Card } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useLocation, Link } from "react-router-dom";

const { Option } = Select;

function UserDetail() {
    const { state } = useLocation();
    var [garden, setGarden] = useState()
    var [user, setUser] = useState()

    useEffect(() => {   
        axios.get('/user/all_garden/' + state.users.ID).then((response) => {
            setGarden(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get('/user/account_information/' + state.users.ID).then((response) => {
            setUser(response.data)
        })
    }, [])

    return (
        <div className="content">
            <div className="userinfo">
                <card className='payment-card'>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row',
                        }}
                    >
                        <div style={{ textAlign: 'left', width: '40%' }}>
                            <p>Email:</p>
                            <p>Phone:</p>
                        </div>
                        <div style={{ textAlign: 'right', width: '60%' }}>
                            <p>{user?.email}</p>
                            <p>{user?.phone}</p>
                        </div>
                    </div>
                </card>
            </div>
            <div>
                {
                    garden?.map((gd, index) => {
                        return (
                            <div className="card">
                                <div className="info">
                                    <h1>Hello</h1>
                                    <h1>{gd?.name}</h1>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>


    )
}


export default UserDetail
