import React, { useEffect, useState } from 'react';

import { DownloadOutlined, LinkedinOutlined } from '@ant-design/icons';
import {
  Typography,
  Button,
  Avatar,
  notification,
  Spin,
  Row,
  Col,
  Form,
  Input,
  Tabs,
} from 'antd';
import { AxiosResponse, Method } from 'axios';
import { useHistory, useParams } from 'react-router';

import { APPLICATION_TEMPLATE } from '../../../../../../constants';
import { Mentee, Mentor } from '../../../../../../types';
import {
  getMenteeApplication,
  requestForAMentor,
} from '../../../../../../util/mentee-services';
import { getMentor } from '../../../../../../util/mentor-services';
import styles from './styles.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function MenteeApplication() {
  const { mentorId, programId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [mentor, setMentor] = useState<Mentor>(null);
  const [form] = Form.useForm();
  const history = useHistory();

  const getMentorDetails = async () => {
    const mentor: Mentor = await getMentor(mentorId);
    if (mentor) {
      setMentor(mentor);
    }
  };

  const getApplicationDetails = async () => {
    const mentee: Mentee = await getMenteeApplication(mentorId);
    if (mentee) {
      form.setFieldsValue({ submissionURL: mentee.submissionUrl });
      setIsApplied(true);
    } else {
      setIsApplied(false);
    }
  };

  const requestMentor = async (values: any) => {
    setIsLoading(true);
    const submissionUrl: string = values.submissionURL;
    let statusCode: number, method: Method;
    if (isApplied) {
      statusCode = 200;
      method = 'put';
    } else {
      statusCode = 201;
      method = 'post';
    }
    const response: AxiosResponse<Mentee> = await requestForAMentor(
      mentorId,
      method,
      submissionUrl
    );
    if (response.status == statusCode) {
      setIsLoading(false);
      setIsFormVisible(false);
      if (statusCode == 201) {
        setIsApplied(true);
      }
      notification.success({
        message: 'Success!',
        description: 'Successfully applied!',
      });
    } else {
      throw new Error();
    }
  };

  const onBack = () => {
    history.push(`/program/${programId}`);
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  useEffect(() => {
    setIsLoading(true);
    getMentorDetails();
    getApplicationDetails();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1" onTabClick={onBack}>
        <TabPane tab="Mentors" key="1" />
        <TabPane tab="Applied Mentors" key="2" />
      </Tabs>
      <div className={styles.textPadding}>
        <Spin tip="Loading..." spinning={isLoading}>
          <Row>
            <Col offset={1} span={1}>
              <Avatar size={64} src={mentor?.profile.imageUrl} />
            </Col>
            <Col offset={1}>
              <Title level={3}>
                {mentor?.profile.firstName} {mentor?.profile.lastName}
              </Title>
              <Text>{mentor?.profile.headline}</Text>
            </Col>
          </Row>
          <div className={styles.contentMargin}>
            <a href={mentor?.profile.linkedinUrl}>
              <LinkedinOutlined />
              {''} {mentor?.profile.firstName}&apos;s LinkedIn profile
            </a>
            <br />
            <br />
            {isFormVisible ? (
              ''
            ) : (
              <Button
                className={styles.textPadding}
                type="primary"
                onClick={showForm}
              >
                {isApplied ? 'Edit my application' : 'Apply '}
              </Button>
            )}
            <Col span={12}>
              {isFormVisible ? (
                <>
                  <Text className={styles.textPadding}>
                    Download the template from the link below and make a
                    document containing your information. Upload the document to
                    a cloud storage platfrom (Ex: GoogleDrive, iCloud, OneDrive,
                    etc) and provide a link. Make sure the document is in pdf
                    and format and it is accessible to anybody with the link.
                  </Text>
                  <Form
                    layout="vertical"
                    size="large"
                    onFinish={requestMentor}
                    form={form}
                  >
                    <Row>
                      <Button
                        className={styles.button}
                        type="primary"
                        icon={<DownloadOutlined />}
                        href={APPLICATION_TEMPLATE}
                        target="_blank"
                      >
                        Download Template
                      </Button>
                    </Row>
                    <Form.Item
                      className={styles.textPadding}
                      name="submissionURL"
                      rules={[
                        {
                          required: true,
                          message: 'Please provide a Google Drive link!',
                        },
                      ]}
                    >
                      <Input placeholder={'Enter the google drive link here'} />
                    </Form.Item>
                    <Row>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Row>
                  </Form>
                </>
              ) : (
                ''
              )}
            </Col>
          </div>
        </Spin>
      </div>
    </>
  );
}

export default MenteeApplication;
