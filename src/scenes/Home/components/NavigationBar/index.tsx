import React, { useContext } from 'react';

import { Avatar, Button, Col, Row } from 'antd';
import { useHistory } from 'react-router-dom';

import { AUTH_URL, LOGOUT_URL } from '../../../../constants';
import { UserContext } from '../../../../index';
import { Profile } from '../../../../types';
import logo from '../../scholarx.png';
import HelpButton from '../HelpButton';
import styles from './styles.css';

const NavigationBar = () => {
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();

  return (
    <div className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="ScholarX logo" />
      <Button
        type="link"
        onClick={() => history.push('/')}
        className={styles.navButtons}
      >
        Home
      </Button>
      {user != null ? (
        <div className={styles.loginComponents}>
          <Row gutter={5}>
            <Col>
              <Button
                className={styles.loginComponents}
                href={LOGOUT_URL}
                type={'text'}
              >
                Logout
              </Button>
              <Avatar src={user.imageUrl} className={styles.loginComponents} />
            </Col>
            <Col>
              <HelpButton />
            </Col>
          </Row>
        </div>
      ) : (
        <div className={styles.loginComponents}>
          <Row gutter={5}>
            <Col>
              <a href={AUTH_URL}>
                <Button type="primary">Sign In</Button>
              </a>
            </Col>
            <Col>
              <HelpButton />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
