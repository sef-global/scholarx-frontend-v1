import React, { useContext } from 'react';
import { Avatar, Button } from 'antd';
import styles from './styles.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../index';

const NavigationBar = () => {
  const user = useContext(UserContext);
  return (
    <div className={styles.navbar}>
      {user ? (
        <Avatar src={user.imgUrl} size={50} />
      ) : (
        <Link to={'/sign-in'}>
          <Button type="primary">Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default NavigationBar;
