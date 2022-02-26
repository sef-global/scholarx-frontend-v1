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
                  support for talented undergraduate students in Sri Lanka. Our
                  mentors are engaged with some of the world’s top universities
                  and Fortune 500 companies and are carefully selected for their
                  expertise in academia and industry.
                </Paragraph>
                <Paragraph>
                  This free premium mentoring platform was created for Sri
                  Lankans who see the opportunity and positive change brought
                  about by a culture of knowledge and expertise sharing without
                  the limitations of geographical borders.
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
