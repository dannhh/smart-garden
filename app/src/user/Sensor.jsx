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

    // function myFunction() {
    //     myVar = setTimeout(showPage, 3000);
    // }

    function showPage() {
        if (document.getElementById("loader")){
            document.getElementById("loader").style.display = "none";
        }
        if (document.getElementById("myDiv")){
            document.getElementById("myDiv").style.display = "block";
        }
    }

    var [currentData, setCurrentData] = useState({});
    var [temp, setTemp] = useState([])
    var [humid, setHumid] = useState([])
    var [light, setLight] = useState([])
    var [time, setTime] = useState([])
    var [currentTime, setCurrentTime] = useState(0)
    // var count = 0

    useEffect(() => {
        // sock.on('/current', (data) => {
        //     console.log(1)
        //     setCurrentData(data);
        // })
        axios.get('/current').then((response) => {            
            setCurrentData(response);
            // setCurrentTime(response.data.time)
            console.log(response.temp)
            showPage()
        })
        
        axios.get('/history/bbc-test-json/10').then((response) => {            
            var time = response.data.time.map(x => x.substring(11, 19));
            setTemp(response.data.temp); 
            setHumid(response.data.humid);
            setLight(response.data.light);
            setTime(time);
        })

        sock.on('bbc-test-json', (data) => {
            axios.get('/current').then((response) => {
                var time_real_time = response.data.time.substring(11, 19);
                setCurrentData(response);
                setTemp(temp => [...temp, response.data.temp])
                setTemp(temp => [...temp.slice(0, 0), ...temp.slice(1, 11)]);
                setHumid(humid => [...humid, response.data.humid])
                setHumid(humid => [...humid.slice(0, 0), ...humid.slice(1, 11)]);
                setLight(light => [...light, response.data.light])
                setLight(light => [...light.slice(0, 0), ...light.slice(1, 11)]);
                setTime(time => [...time, time_real_time]);
                setTime(time => [...time.slice(0, 0), ...time.slice(1, 11)])
                setCurrentTime(response.data.time)
            })

        });

        return () => sock.removeAllListeners('bbc-test-json');
    }, [])

    return (
        <div className="content"  style={{margin:0}}>
            <div id="loader"></div>
            <div className="header">
                <h1>Information from sensors</h1>
            </div>
            <div style={{ display : "none"}} id="myDiv" className="body animate-bottom">
                <div className="current">
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src={temperature} alt="g" />
                            </div>
                            <div className="value">
                                <h2>Temperature</h2>
                                <h1 style={ (currentData.data?.temp >= 21 && currentData.data?.temp <= 35 )? {color:'#08f25e'} : {color:'#ff3333'}}>
                                    {currentData.data?.temp}
                                </h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{currentData.data?.time}</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src={humidity} alt="g" />
                            </div>
                            <div className="value">
                                <h2>Humidity</h2>
                                <h1 style={ (currentData.data?.humid >= 60 && currentData.data?.humid <= 80 )? {color:'#08f25e'} : {color:'#ff3333'}}>
                                    {currentData.data?.humid}
                                </h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{currentData.data?.time}</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="top-info">
                            <div className="icon">
                                <img src={light_icon} alt="g" />
                            </div>
                            <div className="value">
                                <h2>Light</h2>
                                <h1 style={ (currentData.data?.light >= 650 && currentData.data?.light <= 850 )? {color:'#08f25e'} : {color:'#ff3333'}}>
                                    {currentData.data?.light}
                                </h1>
                            </div>
                        </div>
                        <div className="time">
                            <div className="line"></div>
                            <h2>{currentData.data?.time}</h2>
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
