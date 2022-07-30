import React from 'react';

import { Modal, Button } from 'antd';
import { useHistory } from 'react-router';

import { EmailModalProps } from './interfaces';

function EmailModal({
  isModalVisible,
  userEmail,
  onCancel,
  onConfirm,
}: EmailModalProps) {
  const history = useHistory();

  const handleOk = () => {
    history.push('/settings');
  };

  return (
    <Modal
      title="Email Verification"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="yes" type="primary" onClick={onConfirm}>
          Yes
        </Button>,
        <Button key="no" type="primary" danger onClick={handleOk}>
          No
        </Button>,
      ]}
    >
      <p>{userEmail}</p>
      <p>Is this the email you are currently using?</p>
    </Modal>
  );
}

export default EmailModal;
