import React, { useContext, useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Row, Col, Input, Form, Spin, Typography, Card } from 'antd';
import { AxiosResponse } from 'axios';
import { useHistory, useParams } from 'react-router';

import LogInModal from '../../../../components/LogInModal';
import { UserContext } from '../../../../index';
import {
  Profile,
  QuestionResponse,
  UpdateQuestion,
  ApplicationFormData,
} from '../../../../types';
import {
  getResponses,
  updateApplication,
} from '../../../../util/mentor-services';
import { getProgramDetails } from '../../../../util/program-services';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import Result from '../../components/ResultScreen';
import mainStyles from '../../styles.css';
import styles from './styles.css';

const { TextArea } = Input;
const { Title } = Typography;

function MentorApplication() {
  const [form] = Form.useForm();
  const { programId } = useParams();
  const [programTitle, setProgramTitle] = useState<string>('');
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApplySuccess, setIsApplySuccess] = useState(false);
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getProgram();
  }, []);

  const getProgram = async () => {
    const program = await getProgramDetails(programId);
    if (program) {
      setProgramTitle(program.title);
      const responses = await getResponses(programId);
      if (responses) {
        setResponses(responses);
      }
    }
    setIsLoading(false);
  };

  const apply = async (values: ApplicationFormData) => {
    setIsLoading(true);
    const application: UpdateQuestion[] = [];
    for (const [key, value] of Object.entries(values)) {
      const questionId: number = parseInt(key, 10);
      const response: QuestionResponse[] = responses.filter(
        (element: QuestionResponse) => {
          if (element.id.questionId === questionId) {
            return element.id.mentorId;
          }
        }
      );
      const question: UpdateQuestion = {
        id: {
          questionId: parseInt(key, 10),
          mentorId: response[0].id.mentorId,
        },
        response: value,
      };
      application.push(question);
    }
    const response: AxiosResponse<QuestionResponse[]> = await updateApplication(
      programId,
      application
    );
    if (response.status === 200) {
      setIsApplySuccess(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={null} />
      <NavigationBar />
      <div className={mainStyles.container}>
        <Row>
          <Col md={2} />
          <Col md={2}>
            <Button
              className={styles.backButton}
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={() => {
                history.push('/');
              }}
            />
          </Col>
          <Col md={12} offset={2} className={styles['center-text']}>
            <Title level={2}> Mentor Application | {programTitle} </Title>
          </Col>
        </Row>
        <Spin tip="Loading..." spinning={isLoading}>
          <Row className={styles.form}>
            <Col span={14} offset={5}>
              <Card className={styles['form-card']}>
                {isApplySuccess ? (
                  <div className={styles.wrapper}>
                    <Card className={styles.card}>
                      <Result programId={programId} type="edit" />
                    </Card>
                  </div>
                ) : (
                  <Form
                    layout="vertical"
                    size="large"
                    onFinish={apply}
                    form={form}
                  >
                    {responses.length > 0 &&
                      responses.map(
                        (question: QuestionResponse, index: number) => (
                          <Row key={index}>
                            <Col span={16} offset={4}>
                              <Title level={4}>
                                {index + 1}.{question.question.question}
                              </Title>
                              <Form.Item
                                name={question.question.id}
                                initialValue={question.response}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Required',
                                  },
                                ]}
                              >
                                <TextArea rows={5} />
                              </Form.Item>
                            </Col>
                          </Row>
                        )
                      )}
                    <Row>
                      <Col
                        span={10}
                        offset={7}
                        className={styles['center-text']}
                      >
                        <Button
                          htmlType="submit"
                          type="primary"
                          className={styles.submitButton}
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Card>
            </Col>
          </Row>
        </Spin>
        <div className={styles.push} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}

export default MentorApplication;
