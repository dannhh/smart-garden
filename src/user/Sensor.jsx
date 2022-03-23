import React from "react";
import '../styles/Sensor.css'

// Web	https://io.adafruit.com/toilaaihcmut/feeds/bbc-temp
// API	https://io.adafruit.com/api/v2/toilaaihcmut/feeds/bbc-temp
// MQTT:	toilaaihcmut/feeds/bbc-temp

// Web	https://io.adafruit.com/toilaaihcmut/feeds/bbc-humid
// API	https://io.adafruit.com/api/v2/toilaaihcmut/feeds/bbc-humid
// MQTT toilaaihcmut/feeds/bbc-humid

// Web	https://io.adafruit.com/toilaaihcmut/feeds/bbc-temp1
// API	https://io.adafruit.com/api/v2/toilaaihcmut/feeds/bbc-temp1
// MQTT toilaaihcmut/feeds/bbc-temp1

function CurrentFigure() {


    return (
        <div className="content">
            <div className="header">
                <h1>Information from sensors</h1>
            </div>
            <div className="body">
                <div className="card">
                    <div className="sensor">
                        <h2>Temperature</h2>
                    </div>
                    <div className="value">
                        <h1>40%</h1>
                    </div>
                    <div className="time">
                        <h2>{new Date().toLocaleString() + ''}</h2>
                    </div>
                </div>
                <div className="card">
                <div className="sensor">
                        <h2>Humidity</h2>
                    </div>
                    <div className="value">
                        <h1>100%</h1>
                    </div>
                    <div className="time">
                        <h2>{new Date().toLocaleString() + ''}</h2>
                    </div>
                </div>
                <div className="card">
                <div className="sensor">
                        <h2>Light</h2>
                    </div>
                    <div className="value">
                        <h1>60</h1>
                    </div>
                    <div className="time">
                        <h2>{new Date().toLocaleString() + ''}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentFigure
