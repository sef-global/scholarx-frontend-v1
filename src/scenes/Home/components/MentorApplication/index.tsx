import React from 'react';
import { Button, Row, Col, Input } from 'antd';
import logo from '../../scholarx.png';
import styles from './styles.css';

const { TextArea } = Input;

function MentorApplication() {
  return (
    <>
      <div className={styles.container}>
        <Row>
          <Col md={2} />
          <Col md={12}>
            <img src={logo} alt={'ScholarX logo'} className={styles.logo} />
            <h1>
              <b>Apply as a Mentor</b>
            </h1>
          </Col>
        </Row>
        <div className={styles.form}>
          <Row>
            <Col md={2} />
            <Col md={12}>
              <h2>
                Why do you think you are suitable as a mentor in this program?
              </h2>
              <TextArea rows={5} />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col md={2} />
            <Col md={12}>
              <h2>
                Include the Pre requisites you expect from mentees
                <i>(This will be displayed in public)</i>
              </h2>
              <TextArea rows={8} />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col md={2} />
            <Col md={12}>
              <Button>Cancel</Button>
              <Button type="primary" className={styles.submitButton}>
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default MentorApplication;
