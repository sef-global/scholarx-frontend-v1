import React, { useEffect, useState } from 'react';

import { SmileOutlined } from '@ant-design/icons';
import { Button, Col, notification, Result, Row, Spin, Typography } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';

import { API_URL } from '../../../../constants';
import { SavedProgram } from '../../../../types';
import styles from '../../styles.css';
import MentorProgramCard from './components/MentorProgramCard';

const { Paragraph } = Typography;
// The count of empty program lists, ranges from 0 to 3
let emptyCount = 0;

function MentorPrograms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mentorPrograms, setMentorPrograms] = useState<SavedProgram[]>([]);
  const [pendingMentorPrograms, setPendingMentorPrograms] = useState<
    SavedProgram[]
  >([]);
  const [approvedMentorPrograms, setApprovedMentorPrograms] = useState<
    SavedProgram[]
  >([]);
  const [rejectedMentorPrograms, setRejectedMentorPrograms] = useState<
    SavedProgram[]
  >([]);
  const history = useHistory();

  useEffect(() => {
    getMentorPrograms('PENDING');
    getMentorPrograms('APPROVED');
    getMentorPrograms('REJECTED');
  }, []);

  const getMentorPrograms = (enrolmentState: string) => {
    const mentorPrograms: SavedProgram[] = [];
    setIsLoading(true);
    axios
      .get(`${API_URL}/me/programs/mentor?mentorState=${enrolmentState}`, {
        withCredentials: true,
      })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        if (response.status == 200) {
          response.data.map((program) => {
            if (program.state !== 'COMPLETED' && program.state !== 'REMOVED') {
              mentorPrograms.push(program);
            }
          });
          switch (enrolmentState) {
            case 'APPROVED':
              setApprovedMentorPrograms(mentorPrograms);
              break;
            case 'PENDING':
              setPendingMentorPrograms(mentorPrograms);
              break;
            case 'REJECTED':
              setRejectedMentorPrograms(mentorPrograms);
              break;
          }
        } else if (response.status == 204) {
          emptyCount++;
          // Checks if the empty count is 3 to get the additional programs list
          if (emptyCount == 3) {
            getMentorApplicationPrograms();
          }
        } else {
          throw new Error();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status != 401) {
          notification.error({
            message: 'Something went wrong when fetching the program',
            description: error.toString(),
          });
        }
      });
  };

  // Get the programs that in MENTOR_APPLICATION state to show if the user haven't apply as a mentor
  const getMentorApplicationPrograms = () => {
    const mentorApplicationPrograms: SavedProgram[] = [];
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs`, {
        withCredentials: true,
      })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        response.data.map((program) => {
          if (program.state == 'MENTOR_APPLICATION') {
            mentorApplicationPrograms.push(program);
          }
        });
        setMentorPrograms(mentorApplicationPrograms);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status != 401) {
          notification.error({
            message: 'Something went wrong when fetching the program',
            description: error.toString(),
          });
        }
      });
  };

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      {emptyCount == 3 ? (
        <Row className={styles.resultRow}>
          <Col>
            <Result
              icon={<SmileOutlined />}
              title="You haven't applied for any program as a mentor"
              subTitle={
                mentorPrograms.length != 0 ? (
                  <Paragraph>
                    You can apply for following programs
                    <ul>
                      {mentorPrograms.map((program) => (
                        <li key={program.id} className={styles.removeBullet}>
                          <a key={program.id} href={program.landingPageUrl}>
                            {program.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Paragraph>
                ) : (
                  ''
                )
              }
              extra={
                <Button onClick={() => history.push('/')} type="primary">
                  View available Programs
                </Button>
              }
            />
          </Col>
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          {pendingMentorPrograms.map((program: SavedProgram) => (
            <MentorProgramCard
              key={program.id}
              program={program}
              href={`/program/${program.id}/mentor/edit`}
              buttonText={'Edit Application'}
              isRejected={false}
              state={program.state}
            />
          ))}
          {approvedMentorPrograms.map((program: SavedProgram) => (
            <MentorProgramCard
              key={program.id}
              program={program}
              href={`/mentor/program/${program.id}`}
              buttonText={'Manage'}
              isRejected={false}
              state={program.state}
            />
          ))}
          {rejectedMentorPrograms.map((program: SavedProgram) => (
            <MentorProgramCard
              key={program.id}
              program={program}
              isRejected={true}
              state={program.state}
            />
          ))}
        </Row>
      )}
    </Spin>
  );
}

export default MentorPrograms;
