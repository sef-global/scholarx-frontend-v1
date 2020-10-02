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
import ChangeState from './scenes/ChangeState';

const { Content, Sider, Header } = Layout;

function Dashboard() {
  return (
    <Router>
      <Layout>
        <Sider
          className={styles.siderPosition}
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
              <Link to="/dashboard/edit_state">
                <EditOutlined /> Change State
              </Link>
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
              <Route
                exact
                path="/dashboard/edit-state"
                component={ChangeState}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Dashboard;
