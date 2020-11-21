import React from 'react';
import { notification, Button, Modal, Divider } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { WarningOutlined } from '@ant-design/icons';
import { Mentor } from '../../interfaces';
import styles from './styles.css';

const { confirm } = Modal;

type Props = { id: number, state: string, onChange: () => void };

function MentorActions(props: Props) {
  const updateMentorState = (state: string) => {
    let mentorState: string;
    if (state === 'APPROVED') {
      mentorState = state;
    } else if (state === 'REJECTED') {
      mentorState = state;
    }
    axios
      .put(`http://localhost:8080/admin/mentors/${props.id}/state`, {
        enrolmentState: `${mentorState}`,
      })
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          notification.success({
            message: 'Updated!',
            description: 'Successfully updated the mentor state',
          });
          props.onChange();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when updating mentor state',
        });
      });
  };

  const rejectMentor = () => {
    confirm({
      title: 'Do you want to reject this mentor?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        updateMentorState('REJECTED');
      },
    });
  };

  const approveMentor = () => {
    confirm({
      title: 'Do you want to approve this mentor?',
      icon: <WarningOutlined />,
      content: 'This action can be changed later. Please confirm below.',
      onOk() {
        updateMentorState('APPROVED');
      },
    });
  };

  let isApproveDisabled: boolean;
  let isRejectDisabled: boolean;
  if (props.state === 'PENDING') {
    isApproveDisabled = false;
    isRejectDisabled = false;
  } else if (props.state === 'APPROVED') {
    isApproveDisabled = true;
    isRejectDisabled = false;
  } else if (props.state === 'REJECTED' || props.state === 'REMOVED') {
    isApproveDisabled = true;
    isRejectDisabled = true;
  }

  return (
    <>
      <Button
        key="approve"
        onClick={approveMentor}
        className={styles.approveBtn}
        disabled={isApproveDisabled}
      >
        Approve
      </Button>
      <Divider type="vertical" />
      <Button
        key="reject"
        type="primary"
        onClick={rejectMentor}
        className={styles.rejectBtn}
        disabled={isRejectDisabled}
      >
        Reject
      </Button>
    </>
  );
}

export default MentorActions;
