import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  notification,
  Spin,
  Typography,
  Card,
  Steps,
} from 'antd';

import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { UserContext } from '../../../../index';
import LogInModal from '../../../../components/LogInModal';
import Result from '../../components/ResultScreen';

import {
  Application,
  SavedProgram,
  Profile,
  MentorQuestion as Question,
} from '../../../../interfaces';
import { API_URL } from '../../../../constants';

import { SaveFilled } from '@ant-design/icons';
import { ArrowLeftOutlined } from '@ant-design/icons';

import styles from './styles.css';
import mainStyles from '../../styles.css';

const { TextArea } = Input;
const { Title } = Typography;
const { Step } = Steps;

function MentorApplication() {
  const [form] = Form.useForm();
  const { programId } = useParams();
  const [programTitle, setProgramTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApplySuccess, setIsApplySuccess] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [currentQuestion, setcurrentQuestion] = useState<Question>();
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getProgram();
  }, []);

  const getProgram = () => {
    axios
      .get(`${API_URL}/programs/${programId}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<SavedProgram>) => {
        if (result.status == 200) {
          setProgramTitle(result.data.title);
          getQuestions();
        } else {
          setIsLoading(false);
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching the program detail',
        });
      });
  };

  const getQuestions = () => {
    axios
      .get(`${API_URL}/programs/${programId}/questions/MENTOR`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Question[]>) => {
        if (result.status === 200) {
          setQuestions(result.data);
          setcurrentQuestion(result.data[0]);
        } else {
          notification.error({
            description: 'Something went wrong while fetching the errors',
            message: 'Error!',
          });
        }
        setIsLoading(false);
      })
      .catch(() => {
        notification.error({
          description: 'Something went wrong while fetching the errors',
          message: 'Error!',
        });
        setIsLoading(false);
      });
  };

  const apply = () => {
    setIsLoading(true);
    const application: Application[] = [];
    let error: any = null;
    questions.forEach((question: Question) => {
      const answer = answers.find(
        (element) => question.id === element.questionId
      );
      if (!answer) {
        error = {
          message: 'All questions must be answered',
          questionId: question.id,
        };
        setcurrentQuestion(question);
      } else {
        const submitResponse: Application = {
          question: {
            id: question.id,
          },
          response: answer.response,
        };
        application.push(submitResponse);
      }
    });
    if (error) {
      notification.warning({
        message: 'Warning!',
        description: error.message,
      });
      setIsLoading(false);
    } else {
      axios
        .post(`${API_URL}/programs/${programId}/mentor`, application, {
          withCredentials: true,
        })
        .then((result: AxiosResponse<any>) => {
          if (result.status == 201) {
            setIsLoading(false);
            setIsApplySuccess(true);
            notification.success({
              message: 'Success!',
              description: 'Successfully applied!',
            });
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          setIsLoading(false);
          notification.warning({
            message: 'Warning!',
            description: 'Something went wrong when applying for the program',
          });
        });
    }
  };

  const updateValues = (value: any) => {
    const questionId: number = parseInt(Object.keys(value)[0], 10);
    const response = value[questionId];
    const allanswers = [...answers];
    let index = 0;
    const prevAnswer = allanswers.find((answer, i) => {
      index = i;
      return answer.questionId === questionId;
    });
    if (prevAnswer) {
      allanswers[index].response = response;
    } else {
      allanswers.push({ questionId, response });
    }
    setAnswers(allanswers);
  };

  const onChange = (currentStep: number) => {
    setStep(currentStep);
    setcurrentQuestion(questions[currentStep]);
  };

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={null} />
      <NavigationBar />
      <div className={mainStyles.container}>
        <Spin tip="Loading..." spinning={isLoading}>
          <Row>
            <Col md={2} />
            <Col md={12}>
              <Button
                shape="circle"
                icon={<ArrowLeftOutlined />}
                size="large"
                onClick={() => {
                  history.goBack();
                }}
              />
            </Col>
          </Row>
          <div className={styles['form-container']}>
            <Form
              layout="vertical"
              size="large"
              onFinish={apply}
              form={form}
              onValuesChange={updateValues}
            >
              {isApplySuccess ? (
                <div className={styles.wrapper}>
                  <Card className={styles.card}>
                    <Result programId={programId} />
                  </Card>
                </div>
              ) : (
                <Card
                  className={styles['form-card']}
                  title={
                    <>
                      <Title level={2} className={styles['center-text']}>
                        {programTitle}
                      </Title>
                      <Title
                        level={3}
                        className={styles['center-text']}
                        type="secondary"
                      >
                        Mentor Application
                      </Title>
                    </>
                  }
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => onChange(step - 1)}
                      disabled={!(step > 0)}
                      key="prev-button"
                    >
                      Previous
                    </Button>,
                    <Button
                      htmlType="submit"
                      type="primary"
                      className={styles.submitButton}
                      icon={<SaveFilled />}
                      key={'submit-button'}
                      disabled={step !== questions.length - 1}
                    >
                      Submit
                    </Button>,
                    <Button
                      type="primary"
                      onClick={() => onChange(step + 1)}
                      key="next-button"
                      disabled={!(step < questions.length - 1)}
                    >
                      Next
                    </Button>,
                  ]}
                >
                  <Row>
                    <Col span={6}>
                      <Steps
                        direction="vertical"
                        size="small"
                        current={step}
                        onChange={onChange}
                      >
                        {questions.map((question: Question) => (
                          <Step
                            title={`Question ${question.id}`}
                            description={question.question}
                            key={question.id}
                          />
                        ))}
                      </Steps>
                    </Col>
                    <Col span={18}>
                      {currentQuestion && (
                        <Card title={currentQuestion.question}>
                          <Form.Item
                            name={currentQuestion.id}
                            rules={[
                              {
                                required: true,
                                message: 'This question cannot be left empty',
                              },
                            ]}
                          >
                            <TextArea rows={15} />
                          </Form.Item>
                        </Card>
                      )}
                    </Col>
                  </Row>
                </Card>
              )}
            </Form>
          </div>
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
