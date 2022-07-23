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
      title="Update Email"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="yes" onClick={onConfirm}>
          Yes
        </Button>,
        <Button key="no" type="primary" onClick={handleOk}>
          No
        </Button>,
      ]}
    >
      <p>Is {userEmail} the email you are currently using?</p>
    </Modal>
  );
}

export default EmailModal;
