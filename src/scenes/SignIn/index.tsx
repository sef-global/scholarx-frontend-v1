import React from 'react';
import { Button, Col, Row } from 'antd';
import styles from './styles.css';
import logo from './../scholarx.png';

const SignIn = () => {
  return (
    <div className={styles.signInButtonWrapper}>
      <Row justify="center">
        <img src={logo} alt={'ScholarX logo'} className={styles.logo} />
        <Col md={24} lg={21}>
          <Button className={styles.buttonGoogle}>REGISTER WITH GOOGLE</Button>
          <br />
          <Button type="primary" className={styles.buttonFacebook}>
            REGISTER WITH FACEBOOK
          </Button>
          <br />
          <Button className={styles.buttonTwitter}>
            REGISTER WITH TWITTER
          </Button>
          <br />
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
