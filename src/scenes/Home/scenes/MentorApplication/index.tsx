import React, { useContext, useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Spin,
  Typography,
  Card,
  InputNumber,
  Select,
} from 'antd';
import { AxiosResponse } from 'axios';
import { useHistory, useParams } from 'react-router';

import LogInModal from '../../../../components/LogInModal';
import { UserContext } from '../../../../index';
import { Profile, Mentor } from '../../../../types';
import { applyForProgram } from '../../../../util/mentor-services';
import { getProgramDetails } from '../../../../util/program-services';
import Footer from '../../components/Footer';
import HelpButton from '../../components/HelpButton';
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
    }
    setIsLoading(false);
  };

  const apply = async (values: Mentor) => {
    const mentor: Mentor = {
      category: values.category,
      expertise: values.expertise,
      institution: values.institution,
      position: values.position,
      bio: values.bio,
      slots: values.slots,
    };
    setIsLoading(true);
    const response: AxiosResponse = await applyForProgram(programId, mentor);
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
                    <Row>
                      <Col span={16} offset={4}>
                        <Title level={4}>Category</Title>
                        <Form.Item
                          name="category"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Select
                            options={[
                              { label: 'Engineering',
                                value: 'ENGINEERING' },
                              {
                                label: 'Computer Science',
                                value: 'COMPUTER_SCIENCE',
                              },
                              {
                                label: 'Life Sciences',
                                value: 'LIFE_SCIENCES',
                              },
                              { label: 'Data Science',
                                value: 'DATA_SCIENCE' },
                              {
                                label: 'Physical Science',
                                value: 'PHYSICAL_SCIENCE',
                              },
                              { label: 'Other',
                                value: 'OTHER' },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16} offset={4}>
                        <Title level={4}>Expertise</Title>
                        <Form.Item
                          name="expertise"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16} offset={4}>
                        <Title level={4}>Institution</Title>
                        <Form.Item
                          name="institution"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16} offset={4}>
                        <Title level={4}>Current Position</Title>
                        <Form.Item
                          name="position"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16} offset={4}>
                        <Title level={4}>Bio</Title>
                        <Form.Item
                          name="bio"
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
                    <Row>
                      <Col span={16} offset={4}>
                        <Title level={4}>Number of Mentee Slots</Title>
                        <Form.Item
                          name="slots"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                      </Col>
                    </Row>
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
      <HelpButton />
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}

export default MentorApplication;
