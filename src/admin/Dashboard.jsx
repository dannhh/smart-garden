import React, { useState, useEffect } from "react";
import '../styles/Sensor.css'
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
    const handleClick = () => {
        // axios.post('/admin/add_user', {
        //     name: values.firstname,
        //     username : values.username,
        //     password : values.password,
        //     email : values.email,
        //     phone : values.phone,
        //     image : "",
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
    };

    return (
        <div className="content">
            <div className="line">
                {
                    allUser?.map((user, index) => {
                        return (

                            <div className="card">
                                <div className="image">
                                    <img src={gardenImg} alt="gardenImage" />
                                </div>
                                <div className="info">
                                    <h1>{user.username}</h1>
                                    <button onClick={handleClick}>
                                        <AiOutlineDelete size={30} />
                                    </button>
                                    <button className="user-button">
                                        <Link
                                            to={{
                                                pathname: `/userdetail`,
                                                state: { users: user }
                                            }}>
                                            View Infomation
                                        </Link>

                                    </button>
                                </div>
                            </div>


                        );
                    })
                }
            </div>
            <div className="line">
                <div className="card">
                    <div className="info">


                        <Link
                            to={{ pathname: `/adduser` }}>
                            <AiFillPlusCircle size={100} />
                            {/* <FontAwesomeIcon icon={FaUserPlus} /> */}
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default General
