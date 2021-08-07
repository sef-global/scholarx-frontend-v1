import React, { useContext } from 'react';

import {
  AppstoreOutlined,
  EditOutlined,
  TeamOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Avatar } from 'antd';
import { useHistory } from 'react-router';
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useParams,
} from 'react-router-dom';

import logo from '../../../public/logo.png';
import LogInModal from '../../components/LogInModal';
import { LOGOUT_URL } from '../../constants';
import { UserContext } from '../../index';
import { Profile } from '../../types';
import ChangeState from './scenes/ChangeState';
import EditProgram from './scenes/EditProgram';
import ManageMentees from './scenes/ManageMentees';
import ManageMentors from './scenes/ManageMentors';
import MenteeQuestions from './scenes/MenteeQuestions';
import MentorQuestions from './scenes/MentorQuestions';
import styles from './styles.css';

const { Content, Sider, Header } = Layout;

function Dashboard() {
  const { programId } = useParams();
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();

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
            <a onClick={() => history.push('/')}>
              <div className={styles.logo}>
                <img src={logo} alt="SEF Logo" />
              </div>
            </a>
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
            <Menu.Item key="5">
              <Link to={`/dashboard/${programId}/mentor-questions`}>
                <ProfileOutlined /> Mentor Questions
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
                  <Menu.Item>
                    <a href={LOGOUT_URL}>Logout</a>
                  </Menu.Item>
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
              <Route
                exact
                path="/dashboard/:programId/mentor-questions"
                component={MentorQuestions}
              />
              <Route
                exact
                path="/dashboard/:programId/mentee-questions"
                component={MenteeQuestions}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Dashboard;
