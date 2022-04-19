import React from "react";
import '../styles/Sensor.css'
import { Line, defaults } from 'react-chartjs-2'
import '../styles/Dashboard.css'
import temperature from '../img/temperature-icon.png'
import humidity from '../img/humidity-icon.png'
import light from '../img/light-icon.png'


function Garden() {

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
                                <h1>40%</h1>
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
                                <h1>100%</h1>
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
                                <h1>60</h1>
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
                                    data: [12, 19, 3, 5, 2, 3],
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
                                    data: [10, 50, 60, 30, 20, 70],
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
                                    label: 'Temperature',
                                    data: [12, 19, 3, 5, 2, 3],
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

export default Garden
