import React from 'react';
import 'antd/dist/antd.less';
import { hot } from 'react-hot-loader';
import styles from './styles.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.mainContent}>
        <h1> Hello, World! </h1>
      </div>
    );
  }
}

export default hot(module)(App);
