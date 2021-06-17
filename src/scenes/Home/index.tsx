import React, { useContext } from 'react';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import styles from './styles.css';
import logo from './scholarx.png';
import { Col, Row, Tabs, Typography } from 'antd';
import MentorPrograms from './components/MentorPrograms';
import MenteePrograms from './components/MenteePrograms';
import ActivePrograms from './components/ActivePrograms';
import PastPrograms from './components/PastPrograms';
import CompletedPrograms from './components/CompletedPrograms';
import { UserContext } from '../../index';
import { Profile } from '../../types';

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const Home = () => {
  const user: Partial<Profile | null> = useContext(UserContext);
  return (
    <>
      <div>
        <NavigationBar />
        <Row justify="center">
          <Col md={24} lg={21}>
            <Row>
              <Col md={12}>
                <img src={logo} alt={'ScholarX logo'} className={styles.logo} />
                <Paragraph>
                  ScholarX is an exclusive program aimed at providing mentoring
                  support to a selected pool of high Potential undergraduate
                  students based in Sri Lanka ideally by a Sri Lankan expat
                  currently engaged with one of the world’s top universities or
                  Fortune 500 companies. It’s our free premium mentoring
                  platform by Sri Lankans for Sri Lankans working towards
                  creating a culture of knowledge and expertise sharing without
                  the limitation of geographical borders.
                </Paragraph>
              </Col>
            </Row>
            <Tabs defaultActiveKey="ongoingPrograms">
              <TabPane tab="Ongoing Programs" key="ongoingPrograms">
                <div className={styles.cardWrapper}>
                  <ActivePrograms />
                </div>
              </TabPane>
              {user == null || user.type == 'ADMIN' ? (
                ''
              ) : (
                <>
                  <TabPane tab="Programs I mentor" key="mentorPrograms">
                    <div className={styles.cardWrapper}>
                      <MentorPrograms />
                    </div>
                  </TabPane>
                  <TabPane tab="Programs I get mentored" key="menteePrograms">
                    <div className={styles.cardWrapper}>
                      <MenteePrograms />
                    </div>
                  </TabPane>
                  <TabPane tab="Completed Programs" key="completedPrograms">
                    <div className={styles.cardWrapper}>
                      <CompletedPrograms />
                    </div>
                  </TabPane>
                </>
              )}
              <TabPane tab="Past Programs" key="pastPrograms">
                <div className={styles.cardWrapper}>
                  <PastPrograms />
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <div className={styles.push} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
