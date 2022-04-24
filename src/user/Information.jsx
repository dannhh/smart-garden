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
                    <div style={{textAlign: 'center'}}>
                        <img src={gardenImg} alt="gardenImage" className="img-garden" style={{width: '25%'}}/>
                    </div>
                    <h1 style={{fontWeight: 'bold'}}>{garden?.name || 'null'}</h1>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row',
                        }}
                    >
                        <div style={{ textAlign: 'left', width: '40%' , fontSize: '20px'}}>
                            <p>Location:</p>
                            <p>Area:</p>
                            <p>Description:</p>
                        </div>
                        <div style={{ textAlign: 'right', width: '60%' , fontSize: '20px' }}>
                            <p>{garden?.location || 'null'}</p>
                            <p>{garden?.area || 'null'}</p>
                            <p>{garden?.description || 'null'}</p>
                        </div>
                    </div>
                </card>
            </div>
        </div>


    )
}


export default Information
