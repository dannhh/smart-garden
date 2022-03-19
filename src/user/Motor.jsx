import React from 'react';
import 'antd/dist/antd.css';
import '../styles/Motor.css'
import { Card, Col, Row, Switch} from 'antd';

function Motor() {
    function onChange(checked) {
        console.log(`switch to ${checked}`);
    }

    return (
        <div className='page'>
            <h1 style={{ height: 150}}>Motor</h1>
            <Row>
                <Col span={8} offset = {2}>
                    <div className="site-card-border-less-wrapper">
                        <Card title="Pump" bordered={false} style={{ margin: 50, width: 300, height: 300, borderRadius: 7}}>
                        <div style={{ textAlign: 'center', marginTop: 50}}>
                            <span style = {{ fontSize: 30, fontWeight: 300, marginTop: 50}}>ON</span> 
                            <Switch style = {{ height: 35, width: 90, marginLeft: 20, marginRight: 20}} defaultChecked onChange={onChange} /> 
                            <span style = {{ fontSize: 30, fontWeight: 300}}>OFF</span>
                        </div>
                        </Card>
                    </div>
                </Col>
                <Col span={8} offset={2}>
                <div className="site-card-border-less-wrapper">
                        <Card title="Light" bordered={false} style={{ margin: 50, width: 300, height: 300, borderRadius: 7}}>
                        <div style={{ textAlign: 'center', marginTop: 50}}>
                            <span style = {{ fontSize: 30, fontWeight: 300, marginTop: 50}}>ON</span> 
                            <Switch style = {{ height: 35, width: 90, marginLeft: 20, marginRight: 20}} defaultChecked onChange={onChange} /> 
                            <span style = {{ fontSize: 30, fontWeight: 300}}>OFF</span>
                        </div>
                        </Card>
                    </div>
                </Col>
            </Row>
            
        </div>
    )
    
}

export default Motor
