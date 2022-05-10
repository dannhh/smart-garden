import React, { useState, useEffect } from 'react';
import { Table, Select, Input, Col, Row, Button } from 'antd';
import '../styles/History.css'
import axios from "axios";

const { Option } = Select;
const { Search } = Input;

function History() {
    var myVar;

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

    const [temp, setTemp] = useState([])
    const [humid, setHumid] = useState([])
    const [light, setLight] = useState([])
    const [valueSearch, setValueSearch] = useState('');
    const [dataSource, setDataSource] = useState(temp);
    const [tableFilter, setTableFilter] = useState([])

    useEffect(() => {

        axios.get('/user/sensor_history/' + sessionStorage.getItem('garden_id')).then((response) => {
            response.data = response.data.sort(function(a, b){return a['ID'] - b['ID']});
            console.log(response.data)
            for (var i = 0; i < response.data.length; i = i+3) {
                setTemp(data => [...data, { time: response.data[i]['time'], value: response.data[i]['value']}]);
                setDataSource(data => [...data, { time: response.data[i]['time'], value: response.data[i]['value']}]);
                setHumid(data => [...data, { time: response.data[i]['time'], value: response.data[i+1]['value']}]);
                setLight(data => [...data, { time: response.data[i]['time'], value: response.data[i+2]['value']}]);
            }
            showPage()
        })
    }, [])


    const columns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: '80%',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '20%',
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
        // onload={myFunction()} 
        <div className='history' style={{ margin: 0 }}> 
            <h1 style={{textAlign:'left'}}>
                History
                <a href='/motorlog' className="button" style={{float:'right'}}>
                Motors Log
                </a>
            </h1>
            <div id="loader"></div>
            <div style={{ display: "none" }} id="myDiv" className="body animate-bottom">
                <Row>
                    <Col span={12}><Search size="large" placeholder="input search text" onChange={filterData} style={{textAlign: 'start', position: 'relative', marginLeft: 0, marginBottom: 50, marginTop: 50, width: 300 }} /></Col>
                    <Col span={12}>
                        <div className="all" style={{ marginTop: 50, textAlign:'right' }}>
                            <Select size="large" defaultValue="temp" onChange={handleChange} style={{ width: 200, margin: '0 20px', textAlign:'left'}}>
                                <Option value="temp" style={{textAlign:'left'}}>Temparature</Option>
                                <Option value="humid" style={{textAlign:'left'}}>Humidity</Option>
                                <Option value="light" style={{textAlign:'left'}}>Light intensity</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>

                <div sx={{ width: '100%', overflow: 'hidden' }}>
                    {valueSearch.length > 0 ?
                        <Table columns={columns} dataSource={tableFilter} />
                        :
                        <Table columns={columns} dataSource={dataSource}/>}
                </div>
            </div>
        </div>
    );
};
export default History