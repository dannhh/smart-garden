import React, { useState, useEffect } from 'react';
import { Table, Select, Input, Col, Row, Button } from 'antd';
import '../styles/History.css'
import axios from "axios";

const { Option } = Select;
const { Search } = Input;

function History() {
    // var myVar;

    // function myFunction() {
    //     myVar = setTimeout(showPage, 1000);
    // }

    function showPage() {
        if (document.getElementById("loader")) {
            document.getElementById("loader").style.display = "none";
        }
        if (document.getElementById("myDiv")) {
            document.getElementById("myDiv").style.display = "block";
        }
    }

    const [valueSearch, setValueSearch] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [tableFilter, setTableFilter] = useState([])

    useEffect(() => {

        axios.get('/user/device_history/' + sessionStorage.getItem('garden_id')).then((response) => {
            for (var i = 0; i < response.data.light.length; i++) {
                if (response.data.light[i]['status'] == true) {
                        setDataSource(data => [...data, { time: response.data.light[i]['time'], name: 'LIGHT', status: 'ON' }]);
                }
                else {
                    setDataSource(data => [...data, { time: response.data.light[i]['time'], name: 'LIGHT', status: 'OFF' }]);
                }
            }

                for (var i = 0; i < response.data.pump.length; i++) {
                    if (response.data.pump[i]['status'] == true) {
                        setDataSource(data => [...data, { time: response.data.pump[i]['time'], name: 'PUMP', status: 'ON' }]);
                    }
                    else {
                        setDataSource(data => [...data, { time: response.data.pump[i]['time'], name: 'PUMP', status: 'OFF' }]);
                    }

                }
                showPage()
            })
    }, [])


    const columns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: '40%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '40%'
        },
    ];

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
        // onload={myFunction()} 
        <div className='history' style={{ margin: 0 }}>
            <h1 style={{ textAlign: 'left' }}>
                History
                <a href='/history' className="button" style={{ float: 'right' }}>
                    Sensors Log
                </a>
            </h1>
            <div id="loader"></div>
            <div style={{ display: "none" }} id="myDiv" className="body animate-bottom">
                <Row>
                    <Col span={12}><Search size="large" placeholder="input search text" onChange={filterData} style={{ textAlign: 'start', position: 'relative', marginLeft: 0, marginBottom: 50, marginTop: 50, width: 300 }} /></Col>
                </Row>

                <div sx={{ width: '100%', overflow: 'hidden' }}>
                    {valueSearch.length > 0 ?
                        <Table columns={columns} dataSource={tableFilter} />
                        :
                        <Table columns={columns} dataSource={dataSource} />}
                </div>
            </div>
        </div>
    );
};
export default History