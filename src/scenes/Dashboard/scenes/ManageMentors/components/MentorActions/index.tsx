import React from 'react';
import { notification, Button, Modal, Divider } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { WarningOutlined } from '@ant-design/icons';
import { Mentor } from '../../interfaces';
import styles from './styles.css';

const { confirm } = Modal;

function MentorActions(props: { id: number, state: string }) {
  const postRejectMentor = () => {
    axios
      .put(
        `http://localhost:8080/api/scholarx/admin/mentors/${props.id}/state`,
        {
          enrolmentState: 'REJECTED',
        }
      )
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          notification.success({
            message: 'Updated!',
            description: 'Successfully updated the mentor state',
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when updating state',
        });
      });
  };

  const postApproveMentor = () => {
    axios
      .put(
        `http://localhost:8080/api/scholarx/admin/mentors/${props.id}/state`,
        {
          enrolmentState: 'APPROVED',
        }
      )
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          notification.success({
            message: 'Updated!',
            description: 'Successfully updated the mentor state',
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when updating state',
        });
      });
  };

  const rejectMentor = (id: number) => {
    confirm({
      title: 'Do you want to reject this mentor?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        postRejectMentor();
      },
    });
  };

  const approveMentor = (id: number) => {
    confirm({
      title: 'Do you want to approve this mentor?',
      icon: <WarningOutlined />,
      content: 'This action can be changed later. Please confirm below.',
      onOk() {
        postApproveMentor();
      },
    });
  };

  let actions;
  switch (props.state) {
    case 'PENDING':
      actions = (
        <>
          <Button
            key="approve"
            onClick={() => approveMentor(props.id)}
            className={styles.approveBtn}
          >
            Approve
          </Button>
          <Divider type="vertical" />
          <Button
            key="reject"
            type="primary"
            onClick={() => rejectMentor(props.id)}
            className={styles.rejectBtn}
          >
            Reject
          </Button>
        </>
      );
      break;
    case 'APPROVED':
      actions = (
        <Button
          key="reject"
          type="primary"
          onClick={() => rejectMentor(props.id)}
          className={styles.rejectBtn}
        >
          Reject
        </Button>
      );
      break;
    case 'REJECTED':
    case 'REMOVED':
      break;
  }

  return <>{actions}</>;
}

export default MentorActions;
