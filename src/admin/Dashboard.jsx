import React, { useState, useEffect } from "react";
import '../styles/Dashboard.css'
import axios from "axios";
import '../styles/General.css'
import gardenImg from '../img/garden.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { FaUserPlus } from '@fortawesome/free-solid-svg-icons'
import {
    UserAddOutlined,
    DeleteOutlined,
    PlusCircleFilled,
} from '@ant-design/icons';

import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function General() {
    var [allUser, setAllUser] = useState()
    useEffect(() => {
        axios.get('/admin/all_users').then((response) => {
            setAllUser(response.data)
        })
    }, [])
    var i = [0, 1, 2];

    return (
        <div className="content">
            {
                allUser?.map((user, index) => {
                    if (index % 3 == 0) {
                        return (
                            <div className="line">
                                {
                                    i?.map((ind, index2) => {
                                        if (allUser.length > ind + index) {
                                            return (

                                                <div className="card">
                                                    <div
                                                        style={{
                                                            textAlign: 'right',
                                                            marginRight: '1vw',
                                                            marginTop: '1vw',
                                                        }}>
                                                        <button onClick={handleClick}
                                                            style={{
                                                                backgroundColor: 'rgb(219, 227, 220)',
                                                                borderColor: 'rgb(219, 227, 220)'
                                                            }}>
                                                            <AiOutlineDelete size={25} />
                                                        </button>
                                                    </div>
                                                    <div className="image">
                                                        <img src={gardenImg} alt="gardenImage" />
                                                    </div>
                                                    <div className="info">
                                                        <h1 className="title-card">{allUser[index + ind].username}</h1>
                                                        <br></br>
                                                        <button className="user-button">
                                                            <Link
                                                                to={{
                                                                    pathname: `/userdetail`,
                                                                    state: { users: allUser[index + ind] }
                                                                }}
                                                                style={{
                                                                    fontSize: '1.5vw'
                                                                }}>
                                                                Detail
                                                            </Link>

                                                        </button>
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
            <div className="line">
                <div className="card">
                    <div className="info">

                        <Link
                            to={{ pathname: `/adduser` }}>
                            <AiFillPlusCircle size={60} style={{ color: 'rgb(166, 200, 170)' }} />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default General
