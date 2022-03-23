
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

// import Dashboard from '../admin/Dashboard';
// import Request from '../admin/Request';
import Setting from '../admin/Setting';
import '../styles/Sidebar.css'

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;



function Sidebar() {

    //create initial menuCollapse state using useState hook

    return (
        <Router>
            <Layout>
                <Content>
                    <Layout className="site-layout-background">
                        <Sider className="site-layout-background" width={250} style={{overflow: 'auto',height: '100vh',position: 'fixed',left: 0, top: 0, bottom: 0}}>
                            <div className="menu">
                                <Menu className="top" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                                    <Menu key="1" icon={<FiHome />} title=" Dashboard">
                                        <Menu.Item key="2" icon={<FiHome />}>
                                            <Link to="/setting">Dashboard</Link>
                                        </Menu.Item>
                                    </Menu>
                                    <Menu key="3" icon={<FiHome />} title=" Dashboard">
                                        <Menu.Item key="4" icon={<FiHome />}>
                                            <Link to="/setting">Request</Link>
                                        </Menu.Item>
                                    </Menu>
                                    <Menu key="5" icon={<FiHome />} title=" Dashboard">
                                        <Menu.Item key="6" icon={<FiHome />}>
                                            <Link to="/setting">Setting</Link>
                                        </Menu.Item>
                                    </Menu>
                                </Menu>
                                <Menu className="bottom">
                                    <Menu.Item key="9" icon={<FiLogOut />}>
                                        <Link to="/">Logout</Link>
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </Sider>
                        <Layout className="site-layout" style={{ /*marginLeft: 250*/ }}>
                            <Content style={{ margin: '0 16px' }}>
                                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                    <Switch>
                                        <Suspense fallback={<h1>....</h1>}>
                                            <Route exact path="/dashboard">
                                                <Setting />
                                            </Route>
                                            <Route exact path="/sensor">
                                                <Setting />
                                            </Route>
                                            <Route exact path="/setting">
                                                <Setting />
                                            </Route>
                                        </Suspense>
                                    </Switch>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>..</Footer>
                        </Layout>
                    </Layout>
                </Content>
            </Layout>
        </Router>
    );
};

export default Sidebar;
