import React, { useContext } from 'react';
import { Avatar, Button } from 'antd';
import styles from './styles.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../index';
import { Profile } from '../../../../interfaces';

const NavigationBar = () => {
  const user: Partial<Profile | null> = useContext(UserContext);
  return (
    <div className={styles.navbar}>
      {user != null ? (
        <Avatar src={user.imageUrl} />
      ) : (
        <Link to={'/sign-in'}>
          <Button type="primary">Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default NavigationBar;
