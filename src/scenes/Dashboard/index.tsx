import React, { useContext } from 'react';
import { Menu, Layout, Avatar } from 'antd';
import {
  AppstoreOutlined,
  EditOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useParams,
} from 'react-router-dom';
import logo from '../../../public/logo.png';
import styles from './styles.css';
import EditProgram from './scenes/EditProgram';
import ManageMentees from './scenes/ManageMentees';
import ManageMentors from './scenes/ManageMentors';
import ChangeState from './scenes/ChangeState';
import { Profile } from '../../interfaces';
import { UserContext } from '../../index';
import LogInModal from '../../components /LogInModal';

const { Content, Sider, Header } = Layout;

function Dashboard() {
  const { programId } = useParams();
  const user: Partial<Profile | null> = useContext(UserContext);
  return (
    <Router>
      <LogInModal isModalVisible={user === null} onCancel={null} />
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
              <Link to={`/dashboard/${programId}/edit-state`}>
                <EditOutlined /> Change State
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/dashboard/${programId}/edit-program`}>
                <AppstoreOutlined /> Edit Program
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={`/dashboard/${programId}/manage-mentors`}>
                <TeamOutlined /> Manage Mentors
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`/dashboard/${programId}/manage-mentees`}>
                <TeamOutlined /> Manage Mentees
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Menu mode="horizontal" className={styles.rightAlignedMenu}>
              <Menu.SubMenu
                title={
                  <Avatar className={styles.avatar} src={user?.imageUrl} />
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
              <Redirect
                exact
                from="/dashboard/:programId"
                to="/dashboard/:programId/edit-state"
              />
              <Route
                exact
                path="/dashboard/:programId/edit-state"
                component={ChangeState}
              />
              <Route
                exact
                path="/dashboard/:programId/edit-program"
                component={EditProgram}
              />
              <Route
                exact
                path="/dashboard/:programId/manage-mentors"
                component={ManageMentors}
              />
              <Route
                exact
                path="/dashboard/:programId/manage-mentees"
                component={ManageMentees}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Dashboard;
