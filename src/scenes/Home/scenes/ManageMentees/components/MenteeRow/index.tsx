import React, { ReactNode, useState } from 'react';

import { WarningOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Modal, notification } from 'antd';
import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../../../../../../constants';
import { Mentee } from '../../../../../../types';
import StatusTag from './components/StatusTag';
import { StatusTagProps } from './interfaces';
import styles from './style.css';

function MenteeRow({ mentee, programState }: StatusTagProps) {
  const actions: ReactNode[] = [];
  const [menteeState, setMenteeState] = useState(mentee.state);

  const updateMenteeState = (isApproved: boolean) => {
    let successMessage = '';
    let errorMessage = '';

    if (isApproved) {
      successMessage = 'Mentee has been approved';
      errorMessage = "Couldn't approve the mentee";
    } else {
      successMessage = 'Mentee has been rejected';
      errorMessage = "Couldn't reject the mentee";
    }

    axios
      .put(
        `${API_URL}/mentees/${mentee.id}/state`,
        {
          isApproved: isApproved,
        },
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse<Mentee>) => {
        if (result.status == 200) {
          setMenteeState(result.data.state);
          notification.success({
            message: 'Success!',
            description: successMessage,
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.error({
          message: 'Error!',
          description: errorMessage,
        });
      });
  };

  const confirmRejection = () => {
    Modal.confirm({
      title: 'Do you want to reject this mentee?',
      icon: <WarningOutlined />,
      content: 'Please confirm below, This action can be changed later.',
      onOk() {
        updateMenteeState(false);
      },
    });
  };

  const confirmApproval = () => {
    Modal.confirm({
      title: 'Do you want to approve this mentee?',
      icon: <WarningOutlined />,
      content: 'Please confirm below, This action can be changed later.',
      onOk() {
        updateMenteeState(true);
      },
    });
  };

  if (programState === 'MENTEE_SELECTION') {
    const isApproveDisabled: boolean = menteeState == 'APPROVED';
    const isRejectDisabled: boolean = menteeState == 'REJECTED';

    actions.push(
      <a
        className={styles.buttonMargin}
        href={mentee.submissionUrl}
        target={'_blank'}
        rel="noopener noreferrer"
      >
        View Application
      </a>
    );

    actions.push(
      <Button
        className={styles.buttonMargin}
        key="approve"
        type="primary"
        disabled={isApproveDisabled}
        onClick={confirmApproval}
      >
        Approve
      </Button>
    );

    actions.push(
      <Button
        key="reject"
        type="primary"
        danger
        disabled={isRejectDisabled}
        onClick={confirmRejection}
      >
        Reject
      </Button>
    );
  }

  return (
    <List.Item key={mentee.id} actions={[actions]}>
      <List.Item.Meta
        avatar={<Avatar src={mentee.profile.imageUrl} />}
        title={
          <div>
            <a
              href={mentee.profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              {mentee.profile.firstName} {mentee.profile.lastName}
            </a>
            <br />
            <StatusTag state={menteeState} />
          </div>
        }
        description={mentee.profile.headline}
      />
      <span>{mentee.profile.email}</span>
    </List.Item>
  );
}

export default MenteeRow;
