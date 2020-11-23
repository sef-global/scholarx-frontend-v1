import React, { useEffect, useState } from 'react';
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
import logo from '../../scholarx.png';
import styles from './styles.css';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { Mentor, Application } from '../../../../interfaces';
import mainStyles from '../../styles.css';

const { TextArea } = Input;
const { Title } = Typography;

function EditMentorApplication() {
  const [form] = Form.useForm();
  const { programId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/programs/${programId}/mentor`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          setIsLoading(false);
          form.setFieldsValue({
            application: result.data.application,
            prerequisites: result.data.prerequisites,
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the program',
        });
      });
  }, []);

  const apply = (values: any) => {
    setIsLoading(true);
    const application: Application = {
      application: values.application,
      prerequisites: values.prerequisites,
    };
    axios
      .put(
        `http://localhost:8080/programs/${programId}/application`,
        application,
        { withCredentials: true }
      )
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          setIsLoading(false);
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
  };

  return (
    <div className={mainStyles.container}>
      <Row>
        <Col md={2} />
        <Col md={12}>
          <img src={logo} alt={'ScholarX logo'} className={styles.logo} />
          <Title level={2}>Edit Mentor Application</Title>
        </Col>
      </Row>
      <Spin tip="Loading..." spinning={isLoading}>
        <div className={styles.form}>
          <Form layout="vertical" size="large" onFinish={apply} form={form}>
            <Row>
              <Col md={2} />
              <Col md={12}>
                <Title level={3}>
                  Why do you think you are suitable as a mentor in this program?
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
                <Title level={3}>
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
                <Button htmlType="button" href={'/home'}>
                  Back
                </Button>
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
  );
}

export default EditMentorApplication;
