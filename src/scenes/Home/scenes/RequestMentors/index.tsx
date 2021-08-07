import React, { useContext, useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Typography, notification, Spin, Tabs, Row, Col, Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams, useHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { API_URL } from '../../../../constants';
import { UserContext } from '../../../../index';
import { Profile, SavedProgram } from '../../../../types';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import styles from '../../styles.css';
import AppliedMentors from './components/AppliedMentors';
import Mentors from './components/Mentors';
import MenteeApplication from './scenes/MenteeApplication';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

function RequestMentors() {
  const { programId } = useParams();
  const [program, setProgram] = useState<SavedProgram>({
    headline: '',
    id: 0,
    imageUrl: '',
    landingPageUrl: '',
    state: '',
    title: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs/${programId}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<SavedProgram>) => {
        if (result.status == 200) {
          setIsLoading(false);
          setProgram(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Warning!',
          description: 'Something went wrong when fetching the program',
        });
      });
  }, []);

  return (
    <>
      <NavigationBar />
      <Row>
        <Col md={3} className={styles.backButtonColumn}>
          <Button
            className={styles.backButton}
            icon={<ArrowLeftOutlined />}
            size="large"
            onClick={() => {
              history.push('/');
            }}
          />
        </Col>
        <Col md={15} />
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <div className={styles.container}>
            <Spin tip="Loading..." spinning={isLoading}>
              <Title>{program.title}</Title>
              <Paragraph>{program.headline}</Paragraph>
            </Spin>
            <Router>
              <Switch>
                <Route exact path="/program/:programId">
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Mentors" key="1">
                      <Mentors />
                    </TabPane>
                    {user !== null && (
                      <TabPane tab="Applied Mentors" key="2">
                        <AppliedMentors />
                      </TabPane>
                    )}
                  </Tabs>
                </Route>
                <Route
                  path="/program/:programId/mentor/:mentorId/application"
                  component={MenteeApplication}
                />
              </Switch>
            </Router>
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default RequestMentors;
