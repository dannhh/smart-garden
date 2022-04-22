import React, { useState, useEffect } from "react";
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
    var [garden, setAllGarden] = useState()
    const [editIndex, setEditIndex] = useState(null);
    sessionStorage.setItem('user_id', 1)
    useEffect(() => {
        axios.get('/user/all_garden/' + sessionStorage.getItem('user_id')).then((response) => {
            setAllGarden(response.data)
        })
        if (!sessionStorage.getItem('garden_id')) {
            axios.get('/user/all_garden/' + sessionStorage.getItem('user_id')).then((response) => {
                console.log(response)
                sessionStorage.setItem('garden_id', response.data[0].gardenID)
            })
        }
    }, [])

    var click = false
    function handleClick(e) {
        if (click == false) {
            sessionStorage.setItem('garden_id', e)
        }
        click = true
    }
    return (
        <div className="content">
            <div className="line">
                {
                    garden?.map((gd, index) => {
                        return (
                            <div className="card">
                                <div className="image">
                                    <img src={gardenImg} alt="gardenImage" />
                                </div>
                                <div className="info">
                                    <h1>{gd?.name}</h1>
                                    <button id={index} onClick={() => handleClick(gd.gardenID)}>
                                        <Link to={{
                                            pathname: `/information`
                                        }}>
                                            View Garden
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
