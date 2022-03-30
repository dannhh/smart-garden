import React, { useState, useEffect } from 'react';
import { Table, Select, Input, Col, Row } from 'antd';
import '../styles/History.css'
import axios from "axios";

const { Option } = Select;
const { Search } = Input;

function History() {
    const [temp, setTemp] = useState([])
    const [humid, setHumid] = useState([])
    const [light, setLight] = useState([])

    useEffect(() => {
        axios.get('/history/bbc-test-json/2000').then((response) => {
            console.log(response.data)
            for (var i = 0; i < response.data.length; i++) {
                setTemp(data => [...data, { time: response.data[i].time, value: response.data[i].temp, type: '1' }]);
                setHumid(data => [...data, { time: response.data[i].time, value: response.data[i].humid, type: '2' }]);
                setLight(data => [...data, { time: response.data[i].time, value: response.data[i].light, type: '3' }]);
            }
        })
    }, [])

    const [valueSearch, setValueSearch] = useState('');
    const [dataSource, setDataSource] = useState(temp);
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
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '40%',
        },
    ];


    function handleChange(value) {
        console.log(`selected ${value}`);
        if (value === "temp") {
            setDataSource(temp)
            setTableFilter(temp)
        }
        else if (value === "humid") {
            setDataSource(humid)
            setTableFilter(humid)
        }
        else if (value === "light") {
            setDataSource(light)
            setTableFilter(light)
        }
    }

    const filterData = (e) => {
        if (e.target.value != '') {
            console.log({ valueSearch })
            setValueSearch(e.target.value);
            console.log({ valueSearch })
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
                <Col span={8}><Search size="large" placeholder="input search text" onChange={filterData} style={{ marginBottom: 50, marginTop: 50, width: 300 }} /></Col>
                <Col span={8} offset={8}>
                    <div className="all" style={{ margin: 50 }}>
                        <Select size="large" defaultValue="Choose" onChange={handleChange} style={{ width: 200, margin: '0 20px', }}>
                            <Option value="temp">Temparature</Option>
                            <Option value="humid">Humidity</Option>
                            <Option value="light">Light intensity</Option>
                        </Select>
                    </div>
                </Col>
            </Row>

            <div sx={{ width: '100%', overflow: 'hidden' }}>
                {valueSearch.length > 0 ?
                    <Table columns={columns} dataSource={tableFilter} />
                    :
                    <Table columns={columns} dataSource={dataSource} />}
            </div>
        </div>
    );
};
export default History