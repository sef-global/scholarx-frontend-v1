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
  Select,
  InputNumber,
} from 'antd';
import { AxiosResponse } from 'axios';
import { useHistory, useParams } from 'react-router';

import LogInModal from '../../../../components/LogInModal';
import { UserContext } from '../../../../index';
import { Profile, Mentor } from '../../../../types';
import {
  getMentorApplication,
  updateMentorApplication,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApplySuccess, setIsApplySuccess] = useState(false);
  const user: Partial<Profile | null> = useContext(UserContext);
  const [isPastMentor, setIsPastMentor] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getProgram();
  }, []);

  const getProgram = async () => {
    const program = await getProgramDetails(programId);
    if (program) {
      setProgramTitle(program.title);
      const mentor = await getMentorApplication(programId);
      if (mentor) {
        form.setFieldsValue({
          category: mentor.category,
          expertise: mentor.expertise,
          institution: mentor.institution,
          position: mentor.position,
          name: mentor.name,
          country: mentor.country,
          link: mentor.link,
          bio: mentor.bio,
          slots: mentor.slots,
          expectations: mentor.expectations,
          philosophy: mentor.philosophy,
          isCommitted: mentor.isCommitted,
          isPastMentor: mentor.isPastMentor,
          year: mentor.year,
          motivation: mentor.motivation,
          changedMotivation: mentor.changedMotivation,
          reasonForApplying: mentor.reasonForApplying,
          cvUrl: mentor.cvUrl,
          referee1Name: mentor.referee1Name,
          referee1Email: mentor.referee1Email,
          referee2Name: mentor.referee2Name,
          referee2Email: mentor.referee2Email,
        });
        setIsPastMentor(mentor.isPastMentor);
      }
    }
    setIsLoading(false);
  };

  const apply = async (values: Mentor) => {
    setIsLoading(true);
    const mentor: Mentor = {
      category: values.category,
      expertise: values.expertise,
      institution: values.institution,
      position: values.position,
      name: values.name,
      country: values.country,
      link: values.link,
      bio: values.bio,
      slots: values.slots,
      expectations: values.expectations,
      philosophy: values.philosophy,
      isCommitted: values.isCommitted,
      isPastMentor: values.isPastMentor,
      year: values.year,
      motivation: values.motivation,
      changedMotivation: values.changedMotivation,
      reasonForApplying: values.reasonForApplying,
      cvUrl: values.cvUrl,
      referee1Name: values.referee1Name,
      referee1Email: values.referee1Email,
      referee2Name: values.referee2Name,
      referee2Email: values.referee2Email,
    };
    const response: AxiosResponse<Mentor> = await updateMentorApplication(
      programId,
      mentor
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
                    <Result programId={programId} type="edit" />
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
                      label="Name"
                      name="name"
                      extra={'Will be visible to the public'}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                    >
                      <Input maxLength={255} showCount />
                    </Form.Item>
                    <Form.Item
                      label="Country of Residence"
                      name="country"
                      extra={'Will be visible to the public'}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                    >
                      <Input maxLength={255} showCount />
                    </Form.Item>
                    <Form.Item
                      label="Institution"
                      name="institution"
                      extra={'Will be visible to the public'}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                    >
                      <Input maxLength={255} showCount />
                    </Form.Item>
                    <Form.Item
                      label="Current Position"
                      name="position"
                      extra={'Will be visible to the public'}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                    >
                      <Input maxLength={255} showCount />
                    </Form.Item>
                    <Form.Item
                      label="Category"
                      name="category"
                      extra={'Will be visible to the public'}
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
                      label="What are your areas of expertise ?"
                      name="expertise"
                      extra={'Will be visible to the public'}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                    >
                      <Input maxLength={255} showCount />
                    </Form.Item>
                    <Form.Item
                      label="Please provide a brief bio about yourself"
                      name="bio"
                      extra={'Will be visible to the public'}
                    >
                      <TextArea rows={5} maxLength={200} showCount />
                    </Form.Item>
                    <Form.Item
                      label="Please add your LinkedIn URL"
                      name="link"
                      extra={'Will be visible to the public'}
                    >
                      <Input type="url" />
                    </Form.Item>
                    <Form.Item
                      label="What do you expect from your mentees?"
                      name="expectations"
                      extra={'Will be visible to the public'}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                    >
                      <TextArea rows={5} maxLength={200} showCount />
                    </Form.Item>
                    <Form.Item
                      label="What is your mentoring philosophy?"
                      name="philosophy"
                    >
                      <Input maxLength={255} showCount />
                    </Form.Item>
                    <Form.Item
                      label="How many mentees can you accommodate?"
                      name="slots"
                      extra={'Will be visible to the public'}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                    >
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item
                      label="Are you able to commit to a period of 6 months for the program?"
                      name="isCommitted"
                      extra="We expect a minimum of 6 calls with a mentee in a span of 6 month period"
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
                            label: 'Yes',
                            value: true,
                          },
                          {
                            label: 'No',
                            value: false,
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Have you been a ScholarX mentor before?"
                      name="isPastMentor"
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
                            label: 'Yes',
                            value: true,
                          },
                          {
                            label: 'No',
                            value: false,
                          },
                        ]}
                        onSelect={(event) => {
                          setIsPastMentor(event);
                        }}
                      />
                    </Form.Item>
                    {isPastMentor ? (
                      <>
                        <Form.Item
                          label="Which year?"
                          name="year"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                        <Form.Item
                          label="What was your motivation for joining the program?"
                          name="motivation"
                        >
                          <Input maxLength={255} showCount />
                        </Form.Item>
                        <Form.Item
                          label="Has it changed, if yes, how?"
                          name="changedMotivation"
                        >
                          <Input maxLength={255} showCount />
                        </Form.Item>
                      </>
                    ) : (
                      <>
                        <Form.Item
                          label="Why would like to be a ScholarX mentor?"
                          name="reasonForApplying"
                        >
                          <Input maxLength={255} showCount />
                        </Form.Item>
                        <Form.Item label="Link to your CV" name="cvUrl">
                          <Input type="url" />
                        </Form.Item>
                        <h4>Referee 1</h4>
                        <Form.Item
                          label="Name"
                          name="referee1Name"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input maxLength={255} showCount />
                        </Form.Item>
                        <Form.Item
                          label="Email"
                          name="referee1Email"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input maxLength={255} showCount />
                        </Form.Item>
                        <h4>Referee 2</h4>
                        <Form.Item
                          label="Name"
                          name="referee2Name"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input maxLength={255} showCount />
                        </Form.Item>
                        <Form.Item
                          label="Email"
                          name="referee2Email"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input maxLength={255} showCount />
                        </Form.Item>
                      </>
                    )}
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
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}

export default MentorApplication;
