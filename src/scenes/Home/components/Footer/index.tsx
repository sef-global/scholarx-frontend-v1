import styles from './styles.css';
import Moment from 'react-moment';
import React from 'react';
import { Layout } from 'antd';

const date = new Date();
const footer = () => {
  const { Footer } = Layout;
  return (
    <Footer className={styles.footer}>
      © <Moment format="YYYY">{date}</Moment>
      <a className={styles.footerLink} href="https://sefglobal.org/">
        Sustainable Education Foundation - SEF
      </a>
    </Footer>
  );
};
export default footer;
