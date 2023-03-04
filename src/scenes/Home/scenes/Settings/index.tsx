import React, { useContext, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Row, Col, notification } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';

import styles from './styles.css';
import LogInModal from '../../../../components/LogInModal';
import { API_URL } from '../../../../constants';
import { UserContext } from '../../../../index';
import { Profile } from '../../../../types';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';

const { Title } = Typography;

function Settings() {
  const user: Partial<Profile | null> = useContext(UserContext);
  const [email, setEmail] = useState<string>(null);
  const [linkedinUrl, setLinkedinUrl] = useState<string>(null);
  const [form] = Form.useForm();
  const history = useHistory();

  const updateUserDetails = () => {
    // send request to update email
    axios
      .post(
        `${API_URL}/me`,
        {
          email: email ?? user?.email,
          linkedinUrl: linkedinUrl ?? user?.linkedinUrl,
        },
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse) => {
        if (result.status == 200) {
          notification.success({
            message: 'Success!',
            description: 'Information successfully updated',
          });
          user.hasConfirmedUserDetails = true;
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when updating the details',
        });
      });
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
        Settings
      </Title>
      <Form
        className={styles.email_edit_form}
        form={form}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="vertical"
        size="large"
        onFinish={updateUserDetails}
      >
        <Form.Item label="Please update your email to the one you currently use">
          <Input
            type="text"
            defaultValue={user?.email}
            className={styles.email_edit_input}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Item>
        <Form.Item label="Please add your LinkedIn URL">
          <Input
            type="url"
            defaultValue={user?.linkedinUrl}
            className={styles.email_edit_input}
            onChange={(event) => setLinkedinUrl(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}

export default Settings;
