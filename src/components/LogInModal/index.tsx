import React from 'react';

import { Modal } from 'antd';

import { AUTH_URL } from '../../constants';
import { LogInModalProps } from './interfaces';

function LogInModal({ isModalVisible, onCancel }: LogInModalProps) {
  const handleOk = () => {
    window.location.href = AUTH_URL;
  };

  return (
    <Modal
      title="Sign in to continue"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <p>
        You have to be registered as a user to continue, click ok to login or
        register as a new user
      </p>
    </Modal>
  );
}

export default LogInModal;
