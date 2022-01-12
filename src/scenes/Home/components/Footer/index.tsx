import React from 'react';

import { Layout } from 'antd';

import styles from './styles.css';

const date = new Date();
const footer = () => {
  const { Footer } = Layout;
  return (
    <Footer className={styles.footer}>
      © {date.getFullYear()}
      <a className={styles.footerLink} href="https://sefglobal.org/">
        Sustainable Education Foundation - SEF
      </a>
    </Footer>
  );
};
export default footer;
