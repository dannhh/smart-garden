import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AddUser.css'
import gardenImg from '../img/plant-icon.png'
import { Form, Row, Col, Input, Button, Select, Card } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Option } = Select;

function Information() {
    var [garden, setGarden] = useState()

    useEffect(() => {   
        axios.get('/user/garden_info/' + sessionStorage.getItem('garden_id')).then((response) => {
            setGarden(response.data)
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
                            <p>Garden:</p>
                            <p>Location:</p>
                            <p>Description:</p>
                            <p>Area:</p>
                        </div>
                        <div style={{ textAlign: 'right', width: '60%' }}>
                            <p>{garden?.name || 'null'}</p>
                            <p>{garden?.location || 'null'}</p>
                            <p>{garden?.description || 'null'}</p>
                            <p>{garden?.area || 'null'}</p>
                        </div>
                    </div>
                </card>
            </div>
        </div>


    )
}


export default Information
