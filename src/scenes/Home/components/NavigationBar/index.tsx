import React, { useContext } from 'react';
import { Avatar, Button } from 'antd';
import styles from './styles.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../index';
import { Profile } from '../../../../interfaces';
import logo from '../../scholarx.png';

const NavigationBar = () => {
  const user: Partial<Profile | null> = useContext(UserContext);
  return (
    <div className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="ScholarX logo" />
      <Button type="link" href="/home" className={styles.navButtons}>
        Home
      </Button>
      {user != null ? (
        <Avatar src={user.imageUrl} className={styles.loginComponents} />
      ) : (
        <Link to={'/sign-in'}>
          <Button type="primary" className={styles.loginComponents}>
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavigationBar;
