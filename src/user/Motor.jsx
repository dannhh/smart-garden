import React from 'react';
import 'antd/dist/antd.css';
import '../styles/Motor.css'
import { Card, Col, Row, Switch } from 'antd';

function Motor() {
    function onChange(checked) {
        console.log(`switch to ${checked}`);
    }

    return (
        <div className='page'>
            <h1 style={{ height: 150 }}>Motor</h1>
                <div className='line'>
                    <div className='card' >
                        <Card title="Pump" bordered={false} style={{ borderRadius: 7 }}>
                            <div style={{ textAlign: 'center', marginTop: 50 }}>
                                <span style={{ fontSize: 30, fontWeight: 300, marginTop: 50 }}>OFF</span>
                                <Switch style={{ height: 35, width: 90, marginLeft: 20, marginRight: 20 }} defaultChecked onChange={onChange} />
                                <span style={{ fontSize: 30, fontWeight: 300 }}>ON</span>
                            </div>
                        </Card>
                    </div>
                    <div className="card">
                        <Card title="Light" bordered={false} style={{ borderRadius: 7 }}>
                            <div style={{ textAlign: 'center', marginTop: 50 }}>
                                <span style={{ fontSize: 30, fontWeight: 300, marginTop: 50 }}>OFF</span>
                                <Switch style={{ height: 35, width: 90, marginLeft: 20, marginRight: 20 }} defaultChecked onChange={onChange} />
                                <span style={{ fontSize: 30, fontWeight: 300 }}>ON</span>
                            </div>
                        </Card>
                    </div>
                </div>

        </div>
    )

}

export default Motor
