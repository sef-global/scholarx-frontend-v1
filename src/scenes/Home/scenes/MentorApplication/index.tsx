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
    if (response && response.status === 201) {
      setIsApplySuccess(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={null} />
      <NavigationBar />
      <Row>
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
        <Col md={15} />
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <div className={mainStyles.container}>
            <Spin tip="Loading..." spinning={isLoading}>
              <Title level={2}> Mentor Application | {programTitle} </Title>
            </Spin>
            <Spin tip="Loading..." spinning={isLoading}>
              {isApplySuccess ? (
                <div className={styles.wrapper}>
                  <Card className={styles.card}>
                    <Result programId={programId} type="apply" />
                  </Card>
                </div>
              ) : (
                <div className={styles.contentMargin}>
                  <Form
                    layout="vertical"
                    size="middle"
                    onFinish={apply}
                    form={form}
                  >
                    <Form.Item
                      label="Category"
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
                          {
                            label: 'Engineering',
                            value: 'ENGINEERING',
                          },
                          {
                            label: 'Computer Science',
                            value: 'COMPUTER_SCIENCE',
                          },
                          {
                            label: 'Life Sciences',
                            value: 'LIFE_SCIENCES',
                          },
                          {
                            label: 'Data Science and AI',
                            value: 'DATASCIENCE_AND_AI',
                          },
                          {
                            label: 'Physical Science',
                            value: 'PHYSICAL_SCIENCE',
                          },
                          { label: 'Other', value: 'OTHER' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Expertise"
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
                    <Form.Item
                      label="Institution"
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
                    <Form.Item
                      label="Current Position"
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
                    <Form.Item
                      label="Bio"
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
                    <Form.Item
                      label="Number of Mentee Slots"
                      name="slots"
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                    >
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                        className={styles.submitButton}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </Spin>
          </div>
        </Col>
      </Row>
      <div className={styles.push} />
      <HelpButton />
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}

export default MentorApplication;
