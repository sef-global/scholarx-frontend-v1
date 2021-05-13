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
import LogInModal from '../../../../components/LogInModal';
import { UserContext } from '../../../../index';
import Result from '../../components/ResultScreen';

import {
  SavedProgram,
  Profile,
  QuestionResponse,
  UpdateQuestion,
} from '../../../../interfaces';
import { API_URL } from '../../../../constants';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { SaveFilled } from '@ant-design/icons';

import styles from './styles.css';
import mainStyles from '../../styles.css';

const { TextArea } = Input;
const { Title } = Typography;
const { Step } = Steps;

function EditMentorApplication() {
  const [form] = Form.useForm();
  const { programId } = useParams();
  const [programTitle, setProgramTitle] = useState<string>('');
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [isApplySuccess, setIsApplySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<QuestionResponse>();
  const [values, setValues] = useState<QuestionResponse[]>([]);
  const [step, setStep] = useState<number>(0);
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    console.log('Here');
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
          getResponses();
        } else {
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

  const getResponses = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs/${programId}/responses/mentor`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<QuestionResponse[]>) => {
        if (result.status == 200) {
          setResponses(JSON.parse(JSON.stringify(result.data)));
          setValues(JSON.parse(JSON.stringify(result.data)));
          setCurrent(result.data[0]);
          setStep(0);
        } else {
          setIsLoading(false);
          throw new Error();
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the program',
        });
      });
  };

  const apply = () => {
    setIsLoading(true);
    const application: UpdateQuestion[] = [];
    let index: number;
    let error: any;
    values.forEach((response: QuestionResponse) => {
      const prevRes: QuestionResponse = responses.find(
        (element: QuestionResponse, i: number) => {
          if (element.id.questionId === response.id.questionId) {
            index = i;
            return element;
          }
        }
      );
      if (values[index].response.length === 0) {
        error = {
          message: 'Values cannot be empty',
        };
        setCurrent(response);
      } else if (values[index].response !== prevRes.response) {
        const res: UpdateQuestion = {
          id: {
            questionId: prevRes.id.questionId,
            mentorId: prevRes.id.mentorId,
          },
          response: values[index].response,
        };
        application.push(res);
      }
    });
    if (application.length > 0) {
      axios
        .put(`${API_URL}/programs/${programId}/responses/mentor`, application, {
          withCredentials: true,
        })
        .then((result: AxiosResponse<QuestionResponse[]>) => {
          if (result.status == 200) {
            notification.success({
              message: 'Success!',
              description: 'Successfully edited!',
            });
            setIsApplySuccess(true);
          } else {
            notification.warning({
              message: 'Warning!',
              description: 'Something went wrong when editing the program',
            });
            throw new Error();
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          notification.warning({
            message: 'Warning!',
            description: 'Something went wrong when editing the program',
          });
        });
    } else {
      notification.warning({
        message: 'Warning!',
        description: error ? error.message : 'Values have not been changed',
      });
      setIsLoading(false);
    }
  };

  const onChange = (current: number) => {
    setStep(current);
    setCurrent(values[current]);
  };

  const onUpdateValues = (value: any) => {
    const allvalues = [...values];
    let index = 0;
    const question: QuestionResponse = allvalues.find(
      (element: QuestionResponse, i: number) => {
        if (element.id.questionId === parseInt(Object.keys(value)[0], 10)) {
          index = i;
          return element;
        }
      }
    );
    question.response = Object.values(value)[0];
    allvalues[index] = question;
    setValues(allvalues);
  };

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={null} />
      <NavigationBar />
      <div className={mainStyles.container}>
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
        <Spin tip="Loading..." spinning={isLoading}>
          <div className={styles['form-container']}>
            <Form
              layout="vertical"
              size="large"
              onFinish={apply}
              form={form}
              onValuesChange={onUpdateValues}
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
                      key="previous-button"
                      onClick={() => onChange(step - 1)}
                      disabled={!(step > 0)}
                    >
                      Previous
                    </Button>,
                    <Button
                      htmlType="submit"
                      type="primary"
                      className={styles.submitButton}
                      icon={<SaveFilled />}
                      key={'submit-button'}
                      disabled={step !== values.length - 1}
                    >
                      Submit
                    </Button>,
                    <Button
                      type="primary"
                      key="next-button"
                      onClick={() => onChange(step + 1)}
                      disabled={!(step < values.length - 1)}
                    >
                      Next
                    </Button>,
                  ]}
                >
                  <Row>
                    <Col span={6}>
                      <Card title="Questions" style={{ textAlign: 'center' }}>
                        <Steps
                          direction="vertical"
                          size="small"
                          current={step}
                          onChange={onChange}
                        >
                          {responses.map((response: QuestionResponse) => (
                            <Step
                              style={{ marginBottom: '0.5rem' }}
                              key={response.id.questionId}
                              title={`Question ${response.id.questionId}`}
                              description={response.question.question}
                            />
                          ))}
                        </Steps>
                      </Card>
                    </Col>
                    <Col span={18}>
                      {current && (
                        <Card title={current.question.question}>
                          <Form.Item
                            initialValue={current.response}
                            name={current.id.questionId}
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

export default EditMentorApplication;
