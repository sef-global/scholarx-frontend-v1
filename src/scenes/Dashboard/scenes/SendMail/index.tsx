import React, { useEffect, useState } from 'react';

import {
  Typography,
  Row,
  Col,
  Input,
  Form,
  Select,
  Button,
  notification,
  Spin,
} from 'antd';
import axios from 'axios';
import { useParams } from 'react-router';

import { API_URL } from '../../../../constants';
import { EmailGroups, Email } from './interfaces';

const { Title } = Typography;

function SendMail() {
  const { programId } = useParams();
  const { Option, OptGroup } = Select;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<string[]>([]);
  const mailingGroups: EmailGroups[] = [
    {
      label: 'All',
      value: 'ALL',
    },
    {
      label: 'All Mentors',
      value: 'ALL_MENTORS',
    },
    {
      label: 'All Mentees',
      value: 'ALL_MENTEES',
    },
    {
      label: 'Approved Mentors',
      value: 'APPROVED_MENTORS',
    },
    {
      label: 'Rejected Mentors',
      value: 'REJECTED_MENTORS',
    },
    {
      label: 'Approved Mentees',
      value: 'APPROVED_MENTEES',
    },
    {
      label: 'Discarded Mentees',
      value: 'DISCARDED_MENTEES',
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getEmails();
  }, []);

  const getEmails = () => {
    axios
      .get(`${API_URL}/admin/programs/${programId}/emails`, {
        withCredentials: true,
      })
      .then((result) => {
        setIsLoading(false);
        if (result.status == 200) {
          setEmails(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the program',
        });
      });
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const email: Email = {
      message: values.message,
      subject: values.subject,
      mailGroup: values.mailingGroup,
      // in progress
      // additionalEmails: values,
    };
    console.log(email);
    try {
      const result = await axios.post(
        `${API_URL}/admin/program/${programId}/email`,
        email,
        {
          withCredentials: true,
        }
      );
      if (result.status == 201) {
        console.log('200!!!');
        setIsLoading(false);
        notification.success({
          message: 'Success!',
          description: 'Successfully sent!',
        });
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      notification.error({
        message: 'Something went wrong',
        description: 'Something went wrong when sending the email',
      });
    }
  };

  console.log(`Email: ${emails[0]}`);
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Row>
        <Col md={18}>
          <Title>Send Mail</Title>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="vertical"
            size="large"
            onFinish={onFinish}
          >
            <Form.Item name="subject" label="Subject">
              <Input />
            </Form.Item>
            <Form.Item name="mailingGroup" label="Mailing Group">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                allowClear
                placeholder="Select"
              >
                <OptGroup label={'Emails'}>
                  {emails.map((email) => {
                    return (
                      <Option key={email} value={email}>
                        {email}
                      </Option>
                    );
                  })}
                </OptGroup>
                <OptGroup label={'Groups'}>
                  {mailingGroups.map((group) => {
                    return (
                      <Option key={group.value} value={group.value}>
                        {group.label}
                      </Option>
                    );
                  })}
                </OptGroup>
              </Select>
            </Form.Item>
            <Form.Item name="message" label="Message">
              <Input.TextArea />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Spin>
  );
}

export default SendMail;
