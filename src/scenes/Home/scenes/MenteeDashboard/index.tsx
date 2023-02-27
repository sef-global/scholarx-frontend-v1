import React, { useContext, useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useHistory, useParams } from 'react-router';

import LogInModal from '../../../../components/LogInModal';
import MentorProfileCard from '../../../../components/MentorProfileCard';
import { UserContext } from '../../../../index';
import { Mentee, Profile, SavedProgram } from '../../../../types';
import { getMenteeApplication } from '../../../../util/mentee-services';
import { getProgramDetails } from '../../../../util/program-services';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import styles from '../../styles.css';

const { Title, Text, Link } = Typography;
const { Meta } = Card;

function MenteeDashboard() {
  const { programId } = useParams();
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();
  const [mentee, setMentee] = useState<Mentee>(null);
  const [program, setProgram] = useState<SavedProgram>(null);

  useEffect(() => {
    getMentee();
    getProgram();
  }, []);

  async function getMentee() {
    getMenteeApplication(programId).then((menteePayload: Mentee) => {
      setMentee(menteePayload);
    });
  }

  async function getProgram() {
    getProgramDetails(programId).then((programPayload: SavedProgram) => {
      setProgram(programPayload);
    });
  }

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={null} />
      <NavigationBar />
      <div className={styles.container}>
        <Row gutter={1}>
          <Col md={3} className={styles.backButtonColumn}>
            <Button
              className={styles.backButton}
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={() => {
                history.push('/');
              }}
            />
          </Col>
          <Col md={10} span={10}>
            <Space direction={'vertical'}>
              <Title level={2}>Application</Title>
              <div>
                <Meta
                  title={
                    <>
                      <Tooltip title={'linkedin'}>
                        <Link
                          href={mentee?.profile.linkedinUrl}
                          target={'_blank'}
                        >
                          {mentee?.profile.firstName +
                            ' ' +
                            mentee?.profile.lastName}
                        </Link>
                      </Tooltip>
                    </>
                  }
                  avatar={<Avatar size={64} src={mentee?.profile.imageUrl} />}
                />
                <br />
              </div>
              <Row>
                <Text strong>University</Text>
              </Row>
              <Row>
                <Text>{mentee?.university}</Text>
              </Row>
              <Row>
                <Text strong>Course</Text>
              </Row>
              <Row>
                <Text>{mentee?.course}</Text>
              </Row>
              <Row>
                <Text strong>Year</Text>
              </Row>
              <Row>
                <Text>{mentee?.year}</Text>
              </Row>
              <Row>
                <Text strong>Future Ambitions and Intentions</Text>
              </Row>
              <Row>
                <Text>{mentee?.intent}</Text>
              </Row>
              <Row>
                <Text strong>Reason for choosing this mentor</Text>
              </Row>
              <Row>
                <Text>{mentee?.reasonForChoice}</Text>
              </Row>
              <Row>
                <Text strong>Summary of your achievements</Text>
              </Row>
              <Row>
                <Text>{mentee?.achievements}</Text>
              </Row>
              <Row>
                <Text strong>Resume URL</Text>
              </Row>
              <Row>
                <Link href={mentee?.resumeUrl} target={'_blank'}>
                  {mentee?.resumeUrl}
                </Link>
              </Row>
              <Row>
                <Text strong>Applied mentor</Text>
              </Row>
              <Row>
                <Col md={22} className={styles.marginBottom}>
                  {mentee != null && (
                    <MentorProfileCard mentor={mentee?.appliedMentor} />
                  )}
                </Col>
              </Row>
            </Space>
          </Col>
          <Col md={10}>
            <Space direction={'vertical'}>
              <Title level={2}>Assigned Mentor</Title>
              {program?.state !== 'ONGOING' && (
                <Space direction={'vertical'}>
                  <Card>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                      Not assigned to a mentor yet
                    </Empty>
                  </Card>
                  {program?.state === 'ADMIN_MENTEE_FILTRATION' && (
                    <div>
                      <Space direction={'vertical'}>
                        <Row>
                          <Text strong>Application Filtration Phase</Text>
                        </Row>
                        <Row>
                          <Text>
                            Our ScholarX team is filtering through the
                            applications before sending them through to mentors
                            to pick in this stage. In the meantime see how the
                            previous editions of ScholarX went down.
                          </Text>
                        </Row>
                        <Button
                          href={'https://sefglobal.org/scholarx/archive/'}
                          target={'_blank'}
                          type={'primary'}
                        >
                          View
                        </Button>
                      </Space>
                    </div>
                  )}
                  {program?.state === 'MENTEE_SELECTION' && (
                    <div>
                      <Space direction={'vertical'}>
                        <Row>
                          <Text strong>Application Assess Phase</Text>
                        </Row>
                        <Row>
                          <Text>
                            Mentors are going through the applications in this
                            stage. In the meantime checkout how our engineering
                            team made this application. Join SEF hive today.
                          </Text>
                        </Row>
                        <Button
                          href={'http://sef.discourse.group'}
                          target={'_blank'}
                          type={'primary'}
                        >
                          View
                        </Button>
                      </Space>
                    </div>
                  )}
                  {program?.state === 'WILDCARD' && (
                    <div>
                      <Space direction={'vertical'}>
                        <Row>
                          <Text strong>Finalising the Final Results Phase</Text>
                        </Row>
                        <Row>
                          <Text>
                            Our ScholarX team is going through the rest of the
                            applications and assigning them with vacant slots.
                            While waiting, check out the awesome projects we
                            have over here at SEF
                          </Text>
                        </Row>
                        <Button
                          href={'https://sefglobal.org'}
                          target={'_blank'}
                          type={'primary'}
                        >
                          View
                        </Button>
                      </Space>
                    </div>
                  )}
                </Space>
              )}
              {program?.state === 'ONGOING' && mentee?.state == 'APPROVED' && (
                <Row>
                  <div>
                    <Space direction={'vertical'}>
                      <Row>
                        <Text>Congratulations!! 🥳</Text>
                      </Row>
                      <Row>
                        <Text type={'secondary'}>
                          On getting selected as one of the mentees of batch
                        </Text>
                      </Row>
                    </Space>
                  </div>
                  <Col md={22}>
                    <br />
                    <MentorProfileCard mentor={mentee?.assignedMentor} />
                  </Col>
                </Row>
              )}
              {program?.state === 'ONGOING' && mentee?.state != 'APPROVED' && (
                <Card>
                  <Space direction={'vertical'}>
                    <Row>
                      <Text type={'danger'}>Not Accepted</Text>
                    </Row>
                    <Row>
                      <Text type={'secondary'}>
                        Unfortunately, your application did not manage to get
                        accepted this time
                      </Text>
                    </Row>
                    <Row>
                      <Text>
                        But this does not mean you now have zero chance of
                        getting into ScholarX. You can always brush up on your
                        application and apply next time.
                      </Text>
                    </Row>
                  </Space>
                </Card>
              )}
            </Space>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default MenteeDashboard;
