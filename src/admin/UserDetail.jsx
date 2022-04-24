import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/UserDetail.css'
import gardenImg from '../img/plant-icon.png'
import { Form, Row, Col, Input, Button, Select, Card } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useLocation, Link } from "react-router-dom";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
const { Option } = Select;

function UserDetail() {
    const { state } = useLocation();
    var [garden, setGarden] = useState()
    var [user, setUser] = useState()
    var i = [0, 1]

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
                    <h1>{user?.name}</h1>
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
                    garden?.map((user, index) => {
                        if (index % 3 == 0) {
                            return (
                                <div className="line">
                                    {
                                        i?.map((ind, index2) => {
                                            if (garden.length > ind + index) {
                                                return (

                                                    <div className="garden-card">
                                                        <div
                                                            style={{
                                                                textAlign: 'right',
                                                                marginRight: '1vw',
                                                                marginTop: '1vw',
                                                            }}>
                                                        </div>
                                                        <div className="image-garden">
                                                            <img src={gardenImg} alt="gardenImage" className="img-garden"/>
                                                        </div>
                                                        <div className="info-garden">
                                                            <h1 className="title-card">{garden[index + ind].name}</h1>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    flexFlow: 'row',
                                                                }}
                                                            >
                                                                <div style={{ textAlign: 'left', width: '40%' }}>
                                                                    <p>Location:</p>
                                                                    <p>Area:</p>
                                                                    <p>Description:</p>
                                                                </div>
                                                                <div style={{ textAlign: 'right', width: '50%' }}>
                                                                    <p>{garden[index + ind].location}</p>
                                                                    <p>{garden[index + ind].area}m2</p>
                                                                    <p>{garden[index + ind].description}</p>
                                                                </div>
                                                            </div>
                                                            <br></br>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }
                                        )
                                    }
                                </div>
                            );
                        }

                    })
                }
            </div>
            <div className="line">
                <div className="card">
                    <div className="info">

                        <Link
                            to={{ pathname: `/adduser` }}>
                            <AiFillPlusCircle size={60} style={{ color: 'rgb(166, 200, 170)' }} />
                            {/* <FontAwesomeIcon icon={FaUserPlus} /> */}
                        </Link>

                    </div>
                </div>
            </div>
        </div>


    )
}


export default UserDetail
