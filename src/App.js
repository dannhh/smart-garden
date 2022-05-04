import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css";
import useToken from './admin/useToken'
import Login from './user/Login';
import Sidebar from './admin/Sidebar';
import SiderDemo from './user/Sidebar';

function App() {
    var { token, removeToken, setToken } = useToken();
    useEffect(() => {
        token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ""
    }, [])
    console.log(sessionStorage.getItem('is_admin'))
    return (
        <div className="App">
            {!token && token !== "" && token !== undefined ?
                <Login setToken={setToken} />
                : (

                    <>
                        {sessionStorage.getItem('is_admin')  === 'true'?
                            <Sidebar /> :
                            (
                                <>
                                    <SiderDemo />
                                </>
                            )

                        }

                    </>
                )}
        </div>
    );
}

export default App;
