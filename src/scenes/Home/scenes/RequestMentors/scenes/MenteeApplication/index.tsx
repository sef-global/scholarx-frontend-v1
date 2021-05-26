import React, { useEffect, useState } from 'react';
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
import { DownloadOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router';
import axios, { AxiosResponse, Method } from 'axios';
import { Mentee } from '../../../../../Dashboard/scenes/ManageMentees/interfaces';
import { Mentor } from '../../../../../Dashboard/scenes/ManageMentors/interfaces';
import styles from './styles.css';
import { LinkedinOutlined } from '@ant-design/icons';
import { API_URL } from '../../../../../../constants';
import { APPLICATION_TEMPLATE } from '../../../../../../constants';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function MenteeApplication() {
  const { mentorId, programId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [mentor, setMentor] = useState<Mentor>({
    id: 0,
    profile: {
      firstName: '',
      headline: '',
      imageUrl: '',
      lastName: '',
      linkedinUrl: '',
    },
    state: '',
    prerequisites: '',
  });
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/mentors/${mentorId}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          setIsLoading(false);
          setMentor(result.data);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        notification.error({
          message: error.toString(),
          description: 'Something went wrong when fetching the mentor',
        });
      });

    axios
      .get(`${API_URL}/mentors/${mentorId}/mentee`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentee>) => {
        if (result.status == 200) {
          form.setFieldsValue({ submissionURL: result.data.submissionUrl });
          setIsLoading(false);
          setIsApplied(true);
        } else if (result.status == 204) {
          setIsApplied(false);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        notification.error({
          message: error.toString(),
          description: 'Something went wrong when fetching the mentee',
        });
      });
  }, []);

  const requestMentor = (values: any) => {
    const submissionUrl: string = values.submissionURL;
    let statusCode: number, method: Method;
    if (isApplied) {
      statusCode = 200;
      method = 'put';
    } else {
      statusCode = 201;
      method = 'post';
    }
    axios({
      method: method,
      url: `${API_URL}/mentors/${mentorId}/mentee`,
      data: { submissionUrl: submissionUrl },
      withCredentials: true,
    })
      .then((res: AxiosResponse<Mentee>) => {
        if (res.status == statusCode) {
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
      })
      .catch((error) => {
        setIsLoading(false);
        notification.error({
          message: error,
          description: 'Something went wrong when requesting the mentor',
        });
      });
  };

  const onBack = () => {
    history.push(`/program/${programId}`);
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

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
              <Avatar size={64} src={mentor.profile.imageUrl} />
            </Col>
            <Col offset={1}>
              <Title level={3}>
                {mentor.profile.firstName} {mentor.profile.lastName}
              </Title>
              <Text>{mentor.profile.headline}</Text>
            </Col>
          </Row>
          <div className={styles.contentMargin}>
            <Title className={styles.textPadding} level={4}>
              Prerequisites
            </Title>
            <Text>{mentor.prerequisites}</Text>
            <a href={mentor.profile.linkedinUrl}>
              <LinkedinOutlined />
              {''} {mentor.profile.firstName}&apos;s LinkedIn profile
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
