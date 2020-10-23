import React, { useState } from 'react';
import { Button } from 'antd';
import { Modal, Form, Input, notification, Spin, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MainStyles from '../../styles.css';
import axios, { AxiosResponse } from 'axios';
import { Program } from './interfaces';
import styles from './styles.css';
import { useHistory } from 'react-router';

function AddProgram() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const addProgram = (values: any) => {
    const program = {
      title: values.title,
      headline: values.heading,
      imageUrl: values.imgURL,
      landingPageUrl: values.landingURL,
      state: 'CREATED',
    };
    setIsLoading(true);
    axios
      .post('http://localhost:8080/api/scholarx/admin/programs/', program)
      .then((res: AxiosResponse<Program>) => {
        if (res.status == 201) {
          setIsLoading(false);
          notification.success({
            message: 'Success!',
            description: 'Program saved!',
          });
          // Updates the home component with the added program
          history.push('/');
          hideModal();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when creating the program',
        });
      });
  };

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    form.resetFields();
  };

  const resetFormfields = () => {
    hideModal();
  };

  return (
    <>
      <Button
        type="dashed"
        className={MainStyles.programAddButton}
        onClick={showModal}
        block
      >
        <PlusOutlined /> Add Program
      </Button>
      <Modal
        title="Add Program"
        visible={isVisible}
        closable={true}
        footer={null}
      >
        <Spin tip="Loading..." spinning={isLoading}>
          <Form
            layout="vertical"
            size="large"
            onFinish={addProgram}
            form={form}
          >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="heading"
              label="Heading"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="imgURL"
              label="Image URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="landingURL"
              label="Landing Page URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Col span={10} offset={14}>
              <Row justify-end>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.modalFooterbtn}
                >
                  Save
                </Button>
                <Button htmlType="button" onClick={resetFormfields}>
                  Cancel
                </Button>
              </Row>
            </Col>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default AddProgram;
