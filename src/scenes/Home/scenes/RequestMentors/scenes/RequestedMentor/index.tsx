import React, { useEffect, useState } from 'react';

import { LinkedinOutlined } from '@ant-design/icons';
import {
  Typography,
  Avatar,
  notification,
  Spin,
  Row,
  Col,
  Tabs,
} from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useHistory, useParams } from 'react-router';

import { API_URL } from '../../../../../../constants';
import { Mentor } from '../../../../../../types';
import styles from './styles.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function RequestedMentor() {
  const { mentorId, programId } = useParams<{
    mentorId: string,
    programId: string,
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mentor, setMentor] = useState<Mentor>(null);
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
  }, []);

  const onBack = () => {
    history.push(`/program/${programId}`);
  };

  return (
    <>
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
              <a
                href={mentor?.profile.linkedinUrl}
                rel="noreferrer"
                target="_blank"
              >
                <LinkedinOutlined />
                {''} {mentor?.profile.firstName}&apos;s LinkedIn profile
              </a>
            </Col>
          </Row>
          <br />
          <div className={styles.contentMargin}>
            <Col span={12}>
              <Row>
                <Text strong>Category</Text>
              </Row>
              <Row>{mentor?.category.replace('_', ' ')}</Row>
              <br />
              <Row>
                <Text strong>Expertise</Text>
              </Row>
              <Row>{mentor?.expertise}</Row>
              <br />
              <Row>
                <Text strong>Institution</Text>
              </Row>
              <Row>{mentor?.institution}</Row>
              <br />
              <Row>
                <Text strong>Position</Text>
              </Row>
              <Row>{mentor?.position}</Row>
              <br />
              <Row>
                <Text strong>Bio</Text>
              </Row>
              <Row>{mentor?.bio}</Row>
              <br />
              <Row>
                <Text strong>Available Mentee Slots</Text>
              </Row>
              <Row>{mentor?.slots}</Row>
            </Col>
          </div>
          <hr className={styles.horizontalLine} />
        </Spin>
      </div>
    </>
  );
}

export default RequestedMentor;
