
import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Menu } from 'antd';
//import icons from react icons
import { FaLeaf } from "react-icons/fa";
import { FiUser, FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Dashboard from '../admin/Dashboard';
import Request from '../admin/Request';
import Setting from '../admin/Setting';
import AddUser from '../admin/AddUser';
import '../styles/Sidebar.css'
import UserDetail from "./UserDetail";
import Logout from "../user/Logout";

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

function Sidebar() {

    //create initial menuCollapse state using useState hook

    return (
        <Router>
            <Layout>
                <Content>
                    <Layout className="site-layout-background">
                        <Sider className="site-layout-background"
                            style={{
                                overflow: 'auto',
                                height: '100vh',
                                position: 'fixed',
                                left: 0,
                                top: 0,
                                bottom: 0,
                            }}

                            // breakpoint="lg"
                            // collapsedWidth="0"
                            // onBreakpoint={broken => {
                            //     console.log(broken);
                            // }}
                            // onCollapse={(collapsed, type) => {
                            //     console.log(collapsed, type);
                            // }}
                            >
                            <div className="menu">
                                <Menu className="top" mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
                                    <Menu.Item key="1" icon={<FiHome />}>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<FiHome />}>
                                        <Link to="/setting">Request</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<FiHome />}>
                                        <Link to="/setting">Setting</Link>
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<FiHome />}>
                                        <Link to="/adduser">Add new user</Link>
                                    </Menu.Item>
                                </Menu>
                                <Menu className="bottom">
                                    <Menu.Item key="5" icon={<FiLogOut />}>
                                        <Link to="/logout">Logout</Link>
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </Sider>
                        <Layout className="site-layout" style={{ marginLeft: "200px"}}>
                            <Content style={{ margin: '0 16px' }}>
                                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                    <Switch>
                                        <Suspense fallback={<h1>....</h1>}>
                                            <Route exact path="/dashboard">
                                                <Dashboard />
                                            </Route>
                                            <Route exact path="/userdetail">
                                                <UserDetail />
                                            </Route>
                                            <Route exact path="/sensor">
                                                <Setting />
                                            </Route>
                                            <Route exact path="/setting">
                                                <Setting />
                                            </Route>
                                            <Route exact path="/adduser">
                                                <AddUser />
                                            </Route>
                                            <Route exact path="/logout">
                                                <Logout />
                                            </Route>
                                        </Suspense>
                                    </Switch>
                                </div>
                            </Content>
                            {/* <Footer style={{ textAlign: 'center' }}>..</Footer> */}
                        </Layout>
                    </Layout>
                </Content>
            </Layout>
        </Router>
    );
};

export default Sidebar;
