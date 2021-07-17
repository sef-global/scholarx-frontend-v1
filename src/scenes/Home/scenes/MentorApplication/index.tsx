import React, { useContext, useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Row, Col, Input, Form, Spin, Typography, Card } from 'antd';
import { AxiosResponse } from 'axios';
import { useHistory, useParams } from 'react-router';

import LogInModal from '../../../../components/LogInModal';
import { UserContext } from '../../../../index';
import {
  Application,
  Question,
  Profile,
  ApplicationFormData,
} from '../../../../types';
import { applyForProgram } from '../../../../util/mentor-services';
import {
  getProgramDetails,
  getQuestions,
} from '../../../../util/program-services';
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
  const [questions, setQuestions] = useState<Question[]>([]);
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
      const questions = await getQuestions(programId, 'MENTOR');
      if (questions) {
        setQuestions(questions);
      }
    }
    setIsLoading(false);
  };

  const apply = async (values: ApplicationFormData) => {
    setIsLoading(true);
    const application: Application[] = [];
    for (const [key, value] of Object.entries(values)) {
      const question: Application = {
        question: {
          id: parseInt(key, 10),
        },
        response: value,
      };
      application.push(question);
    }
    const response: AxiosResponse = await applyForProgram(
      application,
      programId
    );
    if (response.status === 201) {
      setIsLoading(false);
    }
    setIsApplySuccess(true);
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
                history.goBack();
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
                      <Result programId={programId} type="apply" />
                    </Card>
                  </div>
                ) : (
                  <Form
                    layout="vertical"
                    size="large"
                    onFinish={apply}
                    form={form}
                  >
                    {questions.length > 0 &&
                      questions.map((question: Question, index: number) => (
                        <Row key={question.id}>
                          <Col span={16} offset={4}>
                            <Title level={4}>
                              {index + 1}.{question.question}
                            </Title>
                            <Form.Item
                              name={question.id}
                              rules={[{ required: true }]}
                            >
                              <TextArea rows={5} />
                            </Form.Item>
                          </Col>
                        </Row>
                      ))}
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
