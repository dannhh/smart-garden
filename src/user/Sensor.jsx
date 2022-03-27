import React, { useState, useEffect } from "react";
import '../styles/Sensor.css'
import { Line, defaults } from 'react-chartjs-2'
import temperature from '../img/temperature-icon.png'
import humidity from '../img/humidity-icon.png'
import light from '../img/light-icon.png'


import io from 'socket.io-client';
const sock = io.connect('http://localhost:5000');

function Sensor() {

    const [currentData, setCurrentData] = useState({});
    const [recentData, setRecentData] = useState({
        temp: [21, 20, 21, 22, 23, 24],
        humid: [0.6, 0.5, 0.5, 0.4, 0.4, 0.5].map((h) => { return h; }),
        light: [300, 350, 300, 420, 470, 420],
    }); 

    useEffect(() => {
        sock.on('connect', () => { console.log("Successful"); });
    
        // It would be best to get feed_id ('bbc-test-json') from user info,
        // not hard-coded like this
        sock.on('bbc-test-json', (data) => { 
            console.log(data);
            setCurrentData(JSON.parse(data));
        });
    
        return () => sock.removeAllListeners('bbc-test-json');
    }, [])


    return (
        <div className="content">
            <div className="header">
                <h1>Information from sensors</h1>
            </div>
            <div className="body">
                <div className="current">
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src = { temperature } alt="g"/>
                            </div>
                            <div className="value">
                                <h2>Temperature</h2>
                                <h1>{currentData?.temp || 'Null'}</h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{new Date().toLocaleString() + ''}</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src = { humidity } alt="g"/>
                            </div>
                            <div className="value">
                                <h2>Humidity</h2>
                                <h1>{currentData?.humid || 'Null'}</h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{new Date().toLocaleString() + ''}</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src = { light } alt="g"/>
                            </div>
                            <div className="value">
                                <h2>Light</h2>
                                <h1>{currentData?.light || 'Null'}</h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{new Date().toLocaleString() + ''}</h2>
                        </div>
                    </div>
                </div>
                
                <div className='db-chart' style={{ marginTop: 50 }}>
                    <Line
                        data={{
                            labels: ['01:01:01', '01:01:02', '01:01:03', '01:01:04', '01:01:05', '01:01:06'],
                            datasets: [
                                {
                                    label: 'Temperature',
                                    data: recentData.temp,
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Humidity',
                                    data: recentData.humid,
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={200}
                        width={700}
                        options={{
                            responsive: true,
                            interaction: {
                                mode: 'index',
                                intersect: false,
                            },
                            stacked: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Temperature - Humidity'
                                }
                            },
                            scales: {
                                y: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                },
                                y1: {
                                    type: 'linear',
                                    display: true,
                                    position: 'right',
                                    grid: {
                                        drawOnChartArea: false,
                                    },
                                },
                            }
                        }}
                    />
                </div>
                <div className='db-chart'>
                    <Line
                        data={{
                            labels: ['01:01:01', '01:01:02', '01:01:03', '01:01:04', '01:01:05', '01:01:06'],
                            datasets: [
                                {
                                    label: 'Light',
                                    data: recentData.light,
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                }
                            ],
                        }}
                        height={200}
                        width={700}
                        options={{
                            responsive: true,
                            interaction: {
                                mode: 'index',
                                intersect: false,
                            },
                            stacked: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Light intensity'
                                }
                            },
                            scales: {
                                y: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                },
                                y1: {
                                    type: 'linear',
                                    display: true,
                                    position: 'right',

                                    grid: {
                                        drawOnChartArea: false,
                                    },
                                },
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Sensor
