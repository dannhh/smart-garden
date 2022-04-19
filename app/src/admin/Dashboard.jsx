import React from "react";
import '../styles/General.css'
import gardenImg from '../img/garden.png'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function General() {
    function handleClickGarden(e){
        var garden = document.getElementById("garden-1");
        garden.click()
    }
    return (
        <div className="content">
            <div className="line">
                <div className="card">
                    <div className="image">
                        <img src = { gardenImg} alt="gardenImage"/>
                    </div>
                    <div className="info">
                        <h1>Khu vườn 1</h1>
                        <button><Link to="/garden" onClick={handleClickGarden}>View Garden</Link></button>
                    </div>
                </div>
                <div className="card">
                    <div className="image">
                        <img src = { gardenImg} alt="gardenImage"/>
                    </div>
                    <div className="info">
                        <h1>Khu vườn 2</h1>
                        <button><Link to="/garden" onClick={handleClickGarden}>View Garden</Link></button>
                    </div>
                </div>
                <div className="card">
                    <div className="image">
                        <img src = { gardenImg} alt="gardenImage"/>
                    </div>
                    <div className="info">
                        <h1>Khu vườn 3</h1>
                        <button><Link to="/garden" onClick={handleClickGarden}>View Garden</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default General
