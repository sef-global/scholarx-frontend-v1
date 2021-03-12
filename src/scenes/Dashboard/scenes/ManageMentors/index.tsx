import React, { useEffect, useState } from 'react';
import { Typography, List, notification, Spin, Empty, Col, Row } from 'antd';
import { Mentor } from '../../../../interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import styles from '../../styles.css';
import { SavedProgram } from '../../../../interfaces';
import MentorRow from './components/MentorRow';
import { API_URL } from '../../../../constants';

const { Title } = Typography;

function ManageMentors() {
  const { programId } = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [program, setProgram] = useState<SavedProgram | null>(null);
  const [shouldLoadMentors, setShouldLoadMentors] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getProgram();
  }, []);

  const getProgram = () => {
    axios
      .get(`${API_URL}/programs/${programId}`)
      .then((result: AxiosResponse<SavedProgram>) => {
        if (result.status == 200) {
          setProgram(result.data);
          const shouldLoadMentors = !(
            result.data.state == 'CREATED' ||
            result.data.state == 'COMPLETED' ||
            result.data.state == 'REMOVED'
          );
          setShouldLoadMentors(shouldLoadMentors);
          if (shouldLoadMentors) {
            getMentors();
          } else {
            setIsLoading(false);
          }
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching program details',
        });
      });
  };

  const getMentors = () => {
    axios
      .get(`${API_URL}/programs/${programId}/mentors`)
      .then((result: AxiosResponse<Mentor[]>) => {
        if (result.status == 200 || result.status == 204) {
          setMentors(result.data);
          setIsLoading(false);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching the mentors',
        });
      });
  };

  return (
    <div className={styles.container}>
      <Spin tip="Loading..." spinning={isLoading}>
        <Row>
          <Col md={3} />
          <Col md={15}>
            <Title>Manage Mentors</Title>
            {!shouldLoadMentors && program != null && (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>You are currently in {program.state} state.</span>
                }
              />
            )}
            {shouldLoadMentors && (
              <List
                itemLayout="horizontal"
                size="large"
                pagination={{
                  pageSize: 8,
                }}
                dataSource={mentors}
                renderItem={(mentor: Mentor) => (
                  <MentorRow
                    key={mentor.id}
                    mentor={mentor}
                    programState={program.state}
                  />
                )}
              />
            )}
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default ManageMentors;
