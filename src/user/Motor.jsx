import React, { useState, useEffect } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import '../styles/Motor.css'
import { Card, Col, Row, Switch } from 'antd';

import io from 'socket.io-client';
const sock = io.connect('http://localhost:5000');

function Motor() {
    function onChangePump(checked) { 
        var check = 0;
        if (checked === true){
            check = 1;
        }

        axios.post('control/bbc_pump/'+check, {}).then(function (response) {
            console.log(response);
        })
        return () => sock.removeAllListeners('bbc-test-json');
    }

    function onChangeLed(checked) { 
        var check = 0;
        if (checked === true){
            check = 1;
        }

        axios.post('control/bbc_led/'+check, {}).then(function (response) {
            console.log(response);
        })
        return () => sock.removeAllListeners('bbc-test-json');
    }

    return (
        <div className='page'>
            <h1 style={{ height: 150 }}>Motor</h1>
                <div className='line'>
                    <div className='card' >
                        <Card title="Pump" bordered={false} style={{ borderRadius: 7 }}>
                            <div style={{ textAlign: 'center', marginTop: 50 }}>
                                <span style={{ fontSize: 30, fontWeight: 300, marginTop: 50 }}>OFF</span>
                                <Switch style={{ height: 35, width: 90, marginLeft: 20, marginRight: 20 }} defaultChecked onChange={onChangePump} />
                                <span style={{ fontSize: 30, fontWeight: 300 }}>ON</span>
                            </div>
                        </Card>
                    </div>
                    <div className="card">
                        <Card title="Light" bordered={false} style={{ borderRadius: 7 }}>
                            <div style={{ textAlign: 'center', marginTop: 50 }}>
                                <span style={{ fontSize: 30, fontWeight: 300, marginTop: 50 }}>OFF</span>
                                <Switch style={{ height: 35, width: 90, marginLeft: 20, marginRight: 20 }} defaultChecked onChange={onChangeLed} />
                                <span style={{ fontSize: 30, fontWeight: 300 }}>ON</span>
                            </div>
                        </Card>
                    </div>
                </div>

        </div>
    )

}

export default Motor
