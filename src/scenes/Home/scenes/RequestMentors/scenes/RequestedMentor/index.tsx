import React, { useEffect, useState } from 'react';

import { notification, Spin, Col, Tabs, Button } from 'antd';
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

  const onApply = (mentor: Mentor) => {
    history.push({
      pathname: `/program/${programId}/mentee/apply`,
      state: mentor,
    });
  };

  return (
    <>
      <Tabs defaultActiveKey="1" onTabClick={onBack}>
        <TabPane tab="Mentors" key="1" />
      </Tabs>
      <div className={styles.textPadding}>
        <Spin tip="Loading..." spinning={isLoading}>
          <Col md={12} sm={24}>
            {mentor && <MentorProfileCard mentor={mentor} />}
          </Col>
          <Button
            type="primary"
            size="large"
            className={styles.applyButton}
            onClick={() => {
              onApply(mentor);
            }}
          >
            Apply
          </Button>
          <hr className={styles.horizontalLine} />
        </Spin>
      </div>
    </>
  );
}

export default RequestedMentor;
