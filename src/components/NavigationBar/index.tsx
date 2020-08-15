import React from 'react';
import { NavigationBarProps } from './interfaces';
import { Avatar, Button } from 'antd';
import styles from './styles.css';
import { Link } from 'react-router-dom';

const NavigationBar: React.FunctionComponent<NavigationBarProps> = ({
  user,
}: NavigationBarProps) => {
  return (
    <div className={styles.navbar}>
      {user ? (
        <Avatar src={user.imgUrl} size={'large'} />
      ) : (
        <Link to={'/sign-in'}>
          <Button type="primary">Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default NavigationBar;
