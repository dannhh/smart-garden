
import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
//import icons from react icons
import { FaLeaf } from "react-icons/fa";
import { FiUser, FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import {
    AppstoreOutlined,
    CloudDownloadOutlined
  } from '@ant-design/icons';
  

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Sensor from '../user/Sensor';
import History from '../user/History';
import Motor from '../user/Motor';
import Information from './Information';
import General from '../user/General';
import Admin from '../admin/Sidebar';
import Account from '../user/Account';
import HistoryMotor from '../user/HistoryMotor';
import '../styles/Sidebar.css'
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
                                        General<Link to="/general"></Link>
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<FiUser />}>
                                        <Link to="/account">Account</Link>
                                    </Menu.Item>
                                    <SubMenu key="sub1" icon={<CloudDownloadOutlined />} title= "My garden">
                                        <Menu.Item key="3">
                                            <Link to="/information"> Information</Link>
                                        </Menu.Item>
                                        <Menu.Item key="4">
                                            <Link to="/sensor">Sensor</Link>
                                        </Menu.Item>
                                        <Menu.Item key="5">
                                            <Link to="/motor">Motor</Link>
                                        </Menu.Item>
                                        <Menu.Item key="6">
                                            <Link to="/history">History</Link>
                                        </Menu.Item>
                                    </SubMenu>
                                    <Menu key="9" icon={<FiUser />} title=" Admin">
                                        <Menu.Item key="10" icon={<FiUser />}>
                                            <Link to="/admin"> Admin</Link>
                                        </Menu.Item>
                                    </Menu>
                                </Menu>
                                <Menu className="bottom">
                                    <Menu.Item key="9" icon={<FiLogOut />}>
                                        <Link to="/logout">Logout</Link>
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </Sider>
                        <Layout className="site-layout" style={{ marginLeft: 200 }}>
                            <Content style={{ margin: '0 16px' }}>
                                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                    <Switch>
                                        <Suspense fallback={<h1>....</h1>}>
                                        <Route exact path="/">
                                                <General />
                                            </Route>
                                            <Route exact path="/general">
                                                <General />
                                            </Route>
                                            <Route exact path="/information">
                                                <Information />
                                            </Route>
                                            <Route exact path="/sensor">
                                                <Sensor />
                                            </Route>
                                            <Route exact path="/motor">
                                                <Motor />
                                            </Route>
                                            <Route exact path="/history">
                                                <History />
                                            </Route>
                                            <Route exact path="/admin">
                                                <Admin />
                                            </Route>
                                            <Route exact path="/account">
                                                <Account />
                                            </Route>
                                            <Route exact path="/motorlog">
                                                <HistoryMotor />
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
