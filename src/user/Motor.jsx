import React, { useState, useEffect } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import '../styles/Motor.css'
import { Card, Col, Row, Switch } from 'antd';

import io from 'socket.io-client';
const sock = io.connect('http://localhost:5000');

function Motor() {
    var [ledState, setLedState] = useState(true);
    var [pumpState, setPumpState] = useState(true);


    function onChangePump(checked) {
        var check = 0;
        if (checked === true) {
            check = 1;
        }

        axios.post('control/' + sessionStorage.getItem('garden_id') + '/bbc_pump/' + check, {}).then(function (response) {
        })
        return () => sock.removeAllListeners('bbc-test-json');
    }

    function onChangeLed(checked) {
        var check = 0;
        if (checked === true) {
            check = 1;
        }

        axios.post('control/' + sessionStorage.getItem('garden_id') + '/bbc_led/' + check, {}).then(function (response) {
        })
        return () => sock.removeAllListeners('bbc-test-json');
    }

    useEffect(() => {
        axios.get('/bbc-led/current').then((response) => {

            if (response.data.status) {
                setLedState(response.data.status)
            }
            else {
                setLedState(response.data.status)
            }
        });
        axios.get('/bbc-pump/current').then((response) => {
            
            if (response.data.status) {
                console.log("pump", response.data.status)
                setPumpState(response.data.status)
            }
            else {
                setPumpState(response.data.status)
            }
        });
    }, [ledState, pumpState])
    return (
        <div className='page'>
            <h1 style={{ height: 150 }}>Motor</h1>
            <div className='line'>
                <div className='card' >
                    <Card title="Pump" bordered={false} style={{ borderRadius: 7 }}>
                        <div style={{ textAlign: 'center', marginTop: 50 }}>
                            <span style={{ fontSize: 30, fontWeight: 300, marginTop: 50 }}>OFF</span>
                            {
                                pumpState === true ?
                                    <Switch style={{ height: 35, width: 90, marginLeft: 20, marginRight: 20 }} defaultChecked onChange={onChangePump} />
                                    :
                                    <Switch style={{ height: 35, width: 90, marginLeft: 20, marginRight: 20 }} onChange={onChangePump} />
                            }

                            <span style={{ fontSize: 30, fontWeight: 300 }}>ON</span>
                        </div>
                    </Card>
                </div>
                <div className="card">
                    <Card title="Light" bordered={false} style={{ borderRadius: 7 }}>
                        <div style={{ textAlign: 'center', marginTop: 50 }}>
                            <span style={{ fontSize: 30, fontWeight: 300, marginTop: 50 }}>OFF</span>
                            {
                                ledState === true ?
                                    <Switch style={{ height: 35, width: 90, marginLeft: 20, marginRight: 20 }} defaultChecked onChange={onChangeLed} />
                                    :
                                    <Switch style={{ height: 35, width: 90, marginLeft: 20, marginRight: 20 }} onChange={onChangeLed} />
                            }

                            <span style={{ fontSize: 30, fontWeight: 300 }}>ON</span>
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    )

}

export default Motor
