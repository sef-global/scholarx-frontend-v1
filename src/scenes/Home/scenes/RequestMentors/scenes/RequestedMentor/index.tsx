import React, { useEffect, useState } from 'react';

import { notification, Spin, Col, Tabs } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useHistory, useParams } from 'react-router';

import MentorProfileCard from '../../../../../../components/MentorProfileCard';
import { API_URL } from '../../../../../../constants';
import { Mentor } from '../../../../../../types';
import styles from './styles.css';

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
          <div className={styles.contentMargin}>
            <Col span={12}>
              {mentor && <MentorProfileCard mentor={mentor} />}
            </Col>
          </div>
          <hr className={styles.horizontalLine} />
        </Spin>
      </div>
    </>
  );
}

export default RequestedMentor;
