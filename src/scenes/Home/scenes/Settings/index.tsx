import React, { useContext } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

import LogInModal from '../../../../components/LogInModal';
import { UserContext } from '../../../../index';
import { Profile } from '../../../../types';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import styles from './styles.css';
const { Title } = Typography;

function Settings() {
  const user: Partial<Profile | null> = useContext(UserContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const updateEmail = () => {
    // send request to update email
  };

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={null} />
      <NavigationBar />
      <Row>
        <Col md={3} className={styles.backButtonColumn}>
          <Button
            className={styles.backButton}
            icon={<ArrowLeftOutlined />}
            size="large"
            onClick={() => {
              history.push('/');
            }}
          />
        </Col>
        <Col md={15} />
      </Row>
      <Title level={2} className={styles.email_edit_title}>
        Update Email
      </Title>
      <Form
        className={styles.email_edit_form}
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="vertical"
        size="large"
        onFinish={updateEmail}
      >
        <Form.Item label="Current Email">
          <Input value={user?.email} readOnly />
        </Form.Item>
        <Form.Item label="New Email">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Edit</Button>
        </Form.Item>
      </Form>

      <Footer />
    </>
  );
}

export default Settings;
