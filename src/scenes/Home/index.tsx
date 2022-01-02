import React, { useEffect } from 'react';

import { Col, Row, Tabs, Typography } from 'antd';

import { trackPageWithGoogleAnalytics } from '../../util/google-analytics';
import ActivePrograms from './components/ActivePrograms';
import Footer from './components/Footer';
import HelpButton from './components/HelpButton';
import NavigationBar from './components/NavigationBar';
import PastPrograms from './components/PastPrograms';
import logo from './scholarx.png';
import styles from './styles.css';

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const Home = () => {
  useEffect(() => {
    trackPageWithGoogleAnalytics();
  }, []);

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
                  Fortune 500 companies.
                </Paragraph>
              </Col>
            </Row>
            <Tabs defaultActiveKey="activePrograms">
              <TabPane tab="Active Programs" key="activePrograms">
                <div className={styles.cardWrapper}>
                  <ActivePrograms />
                </div>
              </TabPane>
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
      <HelpButton />
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
