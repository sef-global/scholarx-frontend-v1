import React, { useEffect, useState } from 'react';

import { LinkedinOutlined } from '@ant-design/icons';
import {
  Typography,
  Avatar,
  notification,
  Spin,
  Row,
  Col,
  Form,
  Tabs,
  Button,
} from 'antd';
import axios, { AxiosResponse, Method } from 'axios';
import { useHistory, useParams } from 'react-router';

import MentorResponses from '../../../../../../components/MentorResponses';
import { API_URL } from '../../../../../../constants';
import { Mentee, Mentor } from '../../../../../../types';
import styles from './styles.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function RequestedMentor() {
  const { mentorId, programId } = useParams<{
    mentorId: string,
    programId: string,
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [mentor, setMentor] = useState<Mentor>(null);
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

  const onApply = () => {
    history.push(`/program/${programId}/mentor/4/apply`); // Hardcoded mentorId
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={onApply}
        className={styles.button}
      >
        Apply
      </Button>
      <br />
      <Tabs defaultActiveKey="1" onTabClick={onBack}>
        <TabPane tab="Mentors" key="1" />
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
              <a href={mentor?.profile.linkedinUrl} target="_blank">
                <LinkedinOutlined />
                {''} {mentor?.profile.firstName}&apos;s LinkedIn profile
              </a>
            </Col>
          </Row>
          <br />
          <div className={styles.contentMargin}>
            <Col span={12}>
              <MentorResponses
                programId={Number(programId)}
                mentorId={Number(mentorId)}
              />
            </Col>
            <h2>Pre-requisites:</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
          <hr className={styles.horizontalLine} />
        </Spin>
      </div>
    </>
  );
}

export default RequestedMentor;
