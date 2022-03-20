import React, { useState } from 'react';
import { Table, Select, Input, Col, Row} from 'antd';
import '../styles/History.css'
const { Option } = Select;
const { Search } = Input;


const data = [
    {
        key: '1',
        time: 'Sun Mar 20 01:20:23',
        value: 32,
        status: 'Warning',
    },
    {
        key: '2',
        time: 'Sun Mar 20 01:20:24',
        value: 42,
        status: 'Normal',
    },
    {
        key: '3',
        time: 'Sun Mar 20 01:20:24',
        value: 32,
        status: 'Warning',
    },
]


const data_temp = [
    {
        key: '1',
        time: 'Sun Mar 20 01:05:07',
        value: 32,
        status: 'ON',
    },
    {
        key: '2',
        time: 'Sun Mar 20 01:05:08',
        value: 34,
        status: 'OFF',
    },
]
function History() {
    const [type, setType] = useState('all')


    const columns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: '40%',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '40%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    const columns_temp = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: '40%',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '40%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];


    function handleChange(value) {
        console.log(`selected ${value}`);
        setType(value)
    }

    const onSearch = value => console.log(value);

    return (

        <div className='page'>
            <h1>History</h1>
            <Row>
            <Col span={8}><Search size="large" placeholder="input search text" onSearch={onSearch} style={{ marginBottom: 50, marginTop: 50, width: 300}} /></Col>
            <Col span={8} offset={8}>
                <div className="all" style={{ margin: 50 }}>
                    <Select size="large" defaultValue="all" onChange={handleChange} style={{ width: 200, margin: '0 20px', }}>
                        <Option value="all">All</Option>
                        <Option value="temp">Temparature</Option>
                        <Option value="himid">Humidity</Option>
                        <Option value="ligh">Light intensity</Option>
                        <Option value="device">Device</Option>

                    </Select>
                </div>
            </Col>
            </Row>
            
            {type === 'all' ?
                <div sx={{ width: '100%', overflow: 'hidden' }}>
                    <Table columns={columns} dataSource={data} />
                </div> :
                <div sx={{ width: '100%', overflow: 'hidden' }}>
                    <Table columns={columns_temp} dataSource={data_temp} />
                </div>
            }
        </div>
    );
}
export default History