import React from 'react';
import { Menu, Layout, Avatar } from 'antd';
import {
  AppstoreOutlined,
  EditOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import logo from '../../../public/logo.png';
import styles from './styles.css';
import Manage from './scenes/Manage';

const { Content, Sider, Header } = Layout;

function Dashboard() {
  return (
    <Layout>
      <Sider
        style={{
          height: '100vh',
          position: 'fixed',
          zIndex: 2,
        }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div>
          <Link to="/dashboard/home">
            <div className={styles.logo}>
              <img src={logo} alt="SEF Logo" />
            </div>
          </Link>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <EditOutlined /> Change State
          </Menu.Item>
          <Menu.Item key="2">
            <AppstoreOutlined /> Edit Details
          </Menu.Item>
          <Menu.Item key="3">
            <TeamOutlined /> Manage Mentors
          </Menu.Item>
          <Menu.Item key="4">
            <TeamOutlined /> Manage Mentees
          </Menu.Item>
        </Menu>
      </Sider>
      <Router>
        <Layout>
          <Header className={styles.header}>
            <Menu mode="horizontal" className={styles.rightAlignedMenu}>
              <Menu.SubMenu
                title={
                  <Avatar className={styles.avatar} icon={<UserOutlined />} />
                }
              >
                <Menu.ItemGroup title={localStorage.username}>
                  <Menu.Item disabled={true}>Logout</Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
            </Menu>
          </Header>
          <Content className={styles.content}>
            <Switch>
              <Redirect exact from="/dashboard" to="/dashboard/home" />
              <Route exact path="/dashboard/home" component={Manage} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
}

export default Dashboard;
