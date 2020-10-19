import React, { useState } from 'react';
import { Button } from 'antd';
import { Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../../styles.css';

function AddProgram() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const addProgram = () => {
    // Add program logic here. Everything saved in state, just call it
  };

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Button
        type="dashed"
        className={styles.programAddButton}
        onClick={showModal}
        block
      >
        <PlusOutlined /> Add Program
      </Button>
      <Modal
        title="Add Program"
        visible={isVisible}
        onOk={addProgram}
        onCancel={hideModal}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical" size="large">
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
          <Form.Item name="imgURL" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item name="landingURL" label="Landing Page URL">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddProgram;
