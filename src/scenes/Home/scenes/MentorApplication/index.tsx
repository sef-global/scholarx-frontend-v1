import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  notification,
  Spin,
  Typography,
} from 'antd';
import styles from './styles.css';
import { useHistory, useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import {
  Mentor,
  Application,
  SavedProgram,
  Profile,
} from '../../../../interfaces';
import mainStyles from '../../styles.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { API_URL } from '../../../../constants';
import { UserContext } from '../../../../index';
import LogInModal from '../../../../components/LogInModal';

const { TextArea } = Input;
const { Title } = Typography;

function MentorApplication() {
  const [form] = Form.useForm();
  const { programId } = useParams();
  const [programTitle, setProgramTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
          setIsLoading(false);
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

  const apply = (values: any) => {
    setIsLoading(true);
    const application: Application = {
      application: values.application,
      prerequisites: values.prerequisites,
    };
    axios
      .post(`${API_URL}/programs/${programId}/mentor`, application, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 201) {
          setIsLoading(false);
          notification.success({
            message: 'Success!',
            description: 'Successfully applied!',
          });
          history.push('/home');
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
        <Row>
          <Col md={2} />
          <Col md={12}>
            <Title level={1}>{programTitle}</Title>
            <Title level={2}>Apply as Mentor</Title>
          </Col>
        </Row>
        <Spin tip="Loading..." spinning={isLoading}>
          <div className={styles.form}>
            <Form layout="vertical" size="large" onFinish={apply} form={form}>
              <Row>
                <Col md={2} />
                <Col md={12}>
                  <Title level={4}>
                    Why do you think you are suitable as a mentor in this
                    program?
                  </Title>
                  <Form.Item name="application" rules={[{ required: true }]}>
                    <TextArea rows={5} />
                  </Form.Item>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={2} />
                <Col md={12}>
                  <Title level={4}>
                    Include the Pre requisites you expect from mentees
                    <i>(This will be displayed in public)</i>
                  </Title>
                  <Form.Item name="prerequisites" rules={[{ required: true }]}>
                    <TextArea rows={8} />
                  </Form.Item>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={2} />
                <Col md={12}>
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
          </div>
        </Spin>
      </div>
      <Footer />
    </>
  );
}

export default MentorApplication;
