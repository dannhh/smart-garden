import React, { useState, useEffect } from "react";
import '../styles/Sensor.css'
import axios from "axios";
import { Line, defaults } from 'react-chartjs-2'
import temperature from '../img/temperature-icon.png'
import humidity from '../img/humidity-icon.png'
import light_icon from '../img/light-icon.png'


import io from 'socket.io-client';
const sock = io.connect('http://localhost:5000');

function Sensor() {
    var myVar;

    function showPage() {
        if (document.getElementById("loader")) {
            document.getElementById("loader").style.display = "none";
        }
        if (document.getElementById("myDiv")) {
            document.getElementById("myDiv").style.display = "block";
        }
    }

    var [currentData, setCurrentData] = useState({});
    var [temp, setTemp] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10,1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    var [humid, setHumid] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    var [light, setLight] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    var [temp_pred, setTempPred] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    var [humid_pred, setHumidPred] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    
    var [time, setTime] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    var [currentTime, setCurrentTime] = useState(0)
    var [currentTemp, setCurrentTemp] = useState(0)
    var [currentHumid, setCurrentHumid] = useState(0)
    var [currentLight, setCurrentLight] = useState(0)
    var [nextTime, setNextTime] = useState(0)
    var [nextTemp, setNextTemp] = useState(0)
    var [nextHumid, setNextHumid] = useState(0)
    var [nextLight, setNextLight] = useState(0)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(() => {
        axios.get('/sensor/current').then((response) => {

            setCurrentTime(response.data[0].time)
            setCurrentTemp(response.data[0].value)
            setCurrentHumid(response.data[1].value)
            setCurrentLight(response.data[2].value)

            axios.post('/predict', {
                "temp": parseInt(response.data[0].value),
                "humidity": parseInt(response.data[1].value),
                "month": parseInt(months.indexOf(response.data[0].time.toString().substring(8, 11))+1),
                "date": parseInt(response.data[0].time.toString().substring(5, 7)),
                "hour": parseInt(response.data[0].time.toString().substring(17, 19))
                
                
            })
                .then(function (response) {
                    console.log(response)
                    setNextTime(response.data.hour)
                    setNextTemp(response.data.pred_temp.toFixed(2))
                    setNextHumid(response.data.pred_humid.toFixed(0))
                })
    

            showPage()
        })

        axios.get('/user/sensor_history/' + sessionStorage.getItem('garden_id')).then((response) => {
            response.data = response.data.sort(function (a, b) { return a['ID'] - b['ID'] });

            var count = 20
            for (var i = response.data.length - 60; i >= 0; i = i + 3) {
                count--;
                var time_real_time = response.data[i]['time'].substring(11, 19);

                axios.post('/predict', {
                    "temp": parseInt(response.data[i].value),
                    "humidity": parseInt(response.data[i+1].value),
                    "month": parseInt(months.indexOf(response.data[0].time.toString().substring(8, 11))+1),
                    "date": parseInt(response.data[i].time.toString().substring(5, 7)),
                    "hour": parseInt(response.data[i].time.toString().substring(17, 19)-1)
                    
                    
                })
                    .then(function (response) {
                        console.log(response)
                        setTempPred(temp_pred => [...temp_pred, response.data.pred_temp.toFixed(2)])
                        setTempPred(temp_pred => [...temp_pred.slice(0, 0), ...temp_pred.slice(1, 21)]);
                        setHumidPred(humid_pred => [...humid_pred, response.data.pred_humid.toFixed(0)])
                        setHumidPred(humid_pred => [...humid_pred.slice(0, 0), ...humid_pred.slice(1, 21)]);
                    })

                setTemp(temp => [...temp, response.data[i]['value']])
                setTemp(temp => [...temp.slice(0, 0), ...temp.slice(1, 21)]);
                setHumid(humid => [...humid, response.data[i + 1]['value']])
                setHumid(humid => [...humid.slice(0, 0), ...humid.slice(1, 21)]);
                setLight(light => [...light, response.data[i + 2]['value']])
                setLight(light => [...light.slice(0, 0), ...light.slice(1, 21)]);
                setTime(time => [...time, time_real_time]);
                setTime(time => [...time.slice(0, 0), ...time.slice(1, 21)])
                if (count == 0) {
                    break;
                }
            }
        })

        sock.on('bbc-test-json', (data) => {
            axios.get('/sensor/current').then((response) => {
                console.log(response)
                var time_real_time = response.data[0]['time'].substring(11, 19);
                setTemp(temp => [...temp, response.data[0]['value']])
                setTemp(temp => [...temp.slice(0, 0), ...temp.slice(1, 21)]);
                setHumid(humid => [...humid, response.data[1]['value']])
                setHumid(humid => [...humid.slice(0, 0), ...humid.slice(1, 21)]);
                setLight(light => [...light, response.data[2]['value']])
                setLight(light => [...light.slice(0, 0), ...light.slice(1, 21)]);
                setTime(time => [...time, time_real_time]);
                setTime(time => [...time.slice(0, 0), ...time.slice(1, 21)])

                setCurrentTime(response.data[0].time)
                setCurrentTemp(response.data[0].value)
                setCurrentHumid(response.data[1].value)
                setCurrentLight(response.data[2].value)

                axios.post('/predict', {
                    "temp": parseInt(response.data[0].value),
                    "humidity": parseInt(response.data[1].value),
                    "month": parseInt(months.indexOf(response.data[0].time.toString().substring(8, 11))+1),
                    "date": parseInt(response.data[0].time.toString().substring(5, 7)),
                    "hour": parseInt(response.data[0].time.toString().substring(17, 19))
                })
                    .then(function (response) {
                        console.log(response)
                        setNextTime(response.data.hour)
                        setNextTemp(response.data.pred_temp.toFixed(2))
                        setNextHumid(response.data.pred_humid.toFixed(0))

                        setTempPred(temp_pred => [...temp_pred, response.data.pred_temp.toFixed(2)])
                        setTempPred(temp_pred => [...temp_pred.slice(0, 0), ...temp_pred.slice(1, 21)]);
                        setHumidPred(humid_pred => [...humid_pred, response.data.pred_humid.toFixed(0)])
                        setHumidPred(humid_pred => [...humid_pred.slice(0, 0), ...humid_pred.slice(1, 21)]);
                    })

            })
        });

        return () => sock.removeAllListeners('bbc-test-json');
    }, [])

    return (
        <div className="content" style={{ margin: 0 }}>
            <div id="loader"></div>
            <div className="header">
                <h1>Information from sensors</h1>
            </div>
            <div style={{ display: "none" }} id="myDiv" className="body animate-bottom">
                <div className="current">
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src={temperature} alt="g" />
                            </div>
                            <div className="value">
                                <h2>Temperature</h2>
                                <h1>
                                    {currentTemp}
                                </h1>
                                <span>Next hour:</span>
                                <h1>
                                    
                                    {nextTemp}
                                </h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{currentTime}</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src={humidity} alt="g" />
                            </div>
                            <div className="value">
                                <h2>Humidity</h2>
                                <h1>
                                    {currentHumid}
                                </h1>
                                <span>Next hour:</span>
                                <h1>
                                    {nextHumid}
                                </h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{currentTime}</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src={light_icon} alt="g" />
                            </div>
                            <div className="value">
                                <h2>Light</h2>
                                <h1>
                                    {currentLight}
                                </h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{currentTime}</h2>
                        </div>
                    </div>
                </div>

                <div className='db-chart' style={{ marginTop: 50 }}>
                    <Line
                        data={{
                            labels: time,
                            datasets: [
                                {
                                    label: 'Temperature',
                                    data: temp,
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
                                    label: 'Predict Temparature',
                                    data: temp_pred,
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
                                    text: 'Temperature '
                                }
                            },
                            scales: {
                                x: [{
                                    ticks: {
                                        display: false
                                    }
                                }],
                                y: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                },
                                y1: {
                                    type: 'linear',
                                    display: false,
                                    position: 'right',
                                    grid: {
                                        drawOnChartArea: true,
                                    },
                                },
                            }
                        }}
                    />
                </div>

                <div className='db-chart' style={{ marginTop: 50 }}>
                    <Line
                        data={{
                            labels: time,
                            datasets: [
                                {
                                    label: 'Humidity',
                                    data: humid,
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
                                    label: 'Predict Humidity',
                                    data: humid_pred,
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
                                    text: 'Humidity'
                                }
                            },
                            scales: {
                                x: [{
                                    ticks: {
                                        display: false
                                    }
                                }],
                                y: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                },
                                y1: {
                                    type: 'linear',
                                    display: false,
                                    position: 'right',
                                    grid: {
                                        drawOnChartArea: true,
                                    },
                                },
                            }
                        }}
                    />
                </div>

                <div className='db-chart'>
                    <Line
                        data={{
                            labels: time,
                            datasets: [
                                {
                                    label: 'Light',
                                    data: light,
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
                                    display: false,
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
