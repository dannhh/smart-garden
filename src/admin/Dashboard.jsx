import React, { useState, useEffect } from "react";
import '../styles/Sensor.css'
import axios from "axios";
import '../styles/General.css'
import gardenImg from '../img/garden.png'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function General() {
    var [allUser, setAllUser] = useState()
    function handleClickGarden(e) {
        var garden = document.getElementById("garden-1");
        garden.click()
    }

    axios.get('/admin/all_users').then((response) => {
        setAllUser(response.data)
    })

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
                                    <button>
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
        </div>
    )
}

export default General
