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
    const [choosenTable, setChoosenTable] = useState(data)
    const [valueSearch,setValueSearch] = useState('');
    const [dataSource, setDataSource] = useState(choosenTable);
    const [tableFilter, setTableFilter] = useState([])


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
        if (value === "all") {
            setDataSource(data)
        }
        else if (value === "temp") {
            setDataSource(data_temp)
            setTableFilter(data_temp)
        }
        else if (value === "humid") {
            setDataSource(data_temp)
            setTableFilter(data_temp)
        }
        else if (value == "light") {
            setDataSource(data_temp)
            setTableFilter(data_temp)
        }
        else if (value == "device") {
            setDataSource(data_temp)
            setTableFilter(data_temp)
        }
        setType(value)
    }

    const filterData = (e) => {
        if(e.target.value != ''){
            console.log({valueSearch})
            setValueSearch(e.target.value);
            console.log({valueSearch})
            const filterTable = dataSource.filter(o => Object.keys(o).some(
                k => String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            ));
            setTableFilter([...filterTable]);
        }
        else {
            setValueSearch(e.target.value)
            setDataSource([...dataSource])
        }
    }


    return (

        <div className='page'>
            <h1>History</h1>
            <Row>
            <Col span={8}><Search size="large" placeholder="input search text" onChange = {filterData} style={{ marginBottom: 50, marginTop: 50, width: 300}} /></Col>
            <Col span={8} offset={8}>
                <div className="all" style={{ margin: 50 }}>
                    <Select size="large" defaultValue="all" onChange={handleChange} style={{ width: 200, margin: '0 20px', }}>
                        <Option value="all">All</Option>
                        <Option value="temp">Temparature</Option>
                        <Option value="humid">Humidity</Option>
                        <Option value="light">Light intensity</Option>
                        <Option value="device">Device</Option>

                    </Select>
                </div>
            </Col>
            </Row>
            
            {type === 'all' ?
                <div sx={{ width: '100%', overflow: 'hidden' }}>
                    {valueSearch.length > 0 ? 
                    <Table columns={columns} dataSource={tableFilter} />
                    : 
                    <Table columns={columns} dataSource={dataSource} />}
                </div> :
                <div sx={{ width: '100%', overflow: 'hidden' }}>
                    {valueSearch.length > 0 ? 
                    <Table columns={columns_temp} dataSource={tableFilter} />
                    : 
                    <Table columns={columns_temp} dataSource={dataSource} />}
                </div>
            }
        </div>
    );
}
export default History