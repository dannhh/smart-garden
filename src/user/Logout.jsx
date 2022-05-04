import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useToken from '../admin/useToken'
import Login from './Login';

function Logout() {

    var { token, removeToken, setToken } = useToken();
    console.log(token)
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('is_admin');
    sessionStorage.removeItem('garden_id');
    window.location.reload(true);
    return (
            <div className="App">
                {
                    <>
                        {/* <Login /> */}
                    </>
                }
                {/* <Login /> */}
                {/* <Sidebar /> */}
            </div>
    );
}

export default Logout;
