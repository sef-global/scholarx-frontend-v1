import React, { useContext, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Row, Col, notification } from 'antd';
import axios, { AxiosResponse } from 'axios';

import LogInModal from '../../../../components/LogInModal';
import { API_URL } from '../../../../constants';
import { UserContext } from '../../../../index';
import { Profile } from '../../../../types';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import styles from './styles.css';

const { Title } = Typography;

function Settings() {
  const user: Partial<Profile | null> = useContext(UserContext);
  const [email, setEmail] = useState<string>();
  const [form] = Form.useForm();

  const updateEmail = () => {
    // send request to update email
    if (email !== undefined) {
      axios
        .post(
          `${API_URL}/me`,
          {
            email,
          },
          {
            withCredentials: true,
          }
        )
        .then((result: AxiosResponse) => {
          if (result.status == 200) {
            notification.success({
              message: 'Success!',
              description: 'Email successfully updated',
            });
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          notification.warning({
            message: 'Warning!',
            description: 'Something went wrong when updating the email',
          });
        });
    } else {
      notification.warning({
        message: 'Warning!',
        description: 'This email already in use',
      });
    }
  };

  const handleOnChange = (e: any) => {
    setEmail(e.target.value);
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
              window.location.href = '/home';
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
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="vertical"
        size="large"
        onFinish={updateEmail}
      >
        <Form.Item label="Please update your email to the one you currently use">
          <Input
            type="text"
            defaultValue={user?.email}
            className={styles.email_edit_input}
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Edit
          </Button>
        </Form.Item>
      </Form>

      <Footer />
    </>
  );
}

export default Settings;
