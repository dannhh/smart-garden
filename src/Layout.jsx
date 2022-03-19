
import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu} from 'antd';
//import icons from react icons
import { FaLeaf } from "react-icons/fa";
import { FiUser, FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import {
  BrowserRouter as Router,    
  Switch,
  Route,
  Link
} from "react-router-dom";

import Sensor from './user/Sensor';
import History from './user/History';
import Motor from './user/Motor';
import Dashboard from './user/Dashboard';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;



function Sidebar(){
  
    //create initial menuCollapse state using useState hook

    return (
      <Router>
      <Layout>
      <Content>
        <Layout className="site-layout-background">
          <Sider className="site-layout-background" width={250}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu key="1" icon={<FiHome />} title=" Dashboard">
                <Menu.Item key="2" icon={<FiHome />}>
                  <Link to="/">Dashboard</Link>
                </Menu.Item>
              </Menu>
              <Menu key="3" icon={<FiUser />} title=" Account">
                <Menu.Item key="4" icon={<FiUser />}>
                  <Link to="/"> Account</Link>
                </Menu.Item>
              </Menu>
              <SubMenu key="sub1" icon={<FaLeaf />} title=" My garden">
                <Menu.Item key="5">
                  <Link to="/"> Information</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/sensor">Sensor</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/motor">Motor</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/history">History</Link>
                </Menu.Item>
              </SubMenu>
              <Footer style={{margin:0, padding: 0}}>
                <Menu>
                  <Menu.Item key="9" icon={<FiLogOut />}>
                    <Link to="/">Logout</Link>
                  </Menu.Item>
                </Menu>
              </Footer>
            </Menu>
            
          </Sider>
          <Layout className="site-layout">
              <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                    <Suspense fallback={<h1>....</h1>}>
                    <Route exact path="/dashboard">
                        <Sensor/>
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
