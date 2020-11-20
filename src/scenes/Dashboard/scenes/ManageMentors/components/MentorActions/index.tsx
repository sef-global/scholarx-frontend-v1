import React, { ReactNode } from 'react';
import { notification, Button, Modal, Divider } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { WarningOutlined } from '@ant-design/icons';
import { Mentor } from '../../interfaces';
import styles from './styles.css';

const { confirm } = Modal;

type Props = { id: number, state: string, loadMentors: () => void };

function MentorActions(props: Props) {
  const updateMentorState = (state: number) => {
    let mentorState: string;
    if (state === 1) {
      mentorState = 'APPROVED';
    } else if (state === 0) {
      mentorState = 'REJECTED';
    }
    axios
      .put(
        `http://localhost:8080/api/scholarx/admin/mentors/${props.id}/state`,
        `"${mentorState}"`,
        { headers: { 'Content-Type': 'application/json', Accept: '*/*' } }
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

  const rejectMentor = () => {
    confirm({
      title: 'Do you want to reject this mentor?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        updateMentorState(0);
      },
    });
  };

  const approveMentor = () => {
    confirm({
      title: 'Do you want to approve this mentor?',
      icon: <WarningOutlined />,
      content: 'This action can be changed later. Please confirm below.',
      onOk() {
        updateMentorState(1);
      },
    });
  };

  let actions: ReactNode;
  if (props.state === 'PENDING') {
    actions = (
      <>
        <Button
          key="approve"
          onClick={approveMentor}
          className={styles.approveBtn}
        >
          Approve
        </Button>
        <Divider type="vertical" />
        <Button
          key="reject"
          type="primary"
          onClick={rejectMentor}
          className={styles.rejectBtn}
        >
          Reject
        </Button>
      </>
    );
  } else if (props.state === 'APPROVED') {
    actions = (
      <>
        <Button
          key="approve"
          onClick={approveMentor}
          className={styles.approveBtn}
          disabled
        >
          Approve
        </Button>
        <Divider type="vertical" />
        <Button
          key="reject"
          type="primary"
          onClick={rejectMentor}
          className={styles.rejectBtn}
        >
          Reject
        </Button>
      </>
    );
  } else if (props.state === 'REJECTED') {
    actions = (
      <>
        <Button
          key="approve"
          onClick={approveMentor}
          className={styles.approveBtn}
          disabled
        >
          Approve
        </Button>
        <Divider type="vertical" />
        <Button
          key="reject"
          type="primary"
          onClick={rejectMentor}
          className={styles.rejectBtn}
          disabled
        >
          Reject
        </Button>
      </>
    );
  } else if (props.state === 'REMOVED') {
    actions = (
      <>
        <Button
          key="approve"
          onClick={approveMentor}
          className={styles.approveBtn}
          disabled
        >
          Approve
        </Button>
        <Divider type="vertical" />
        <Button
          key="reject"
          type="primary"
          onClick={rejectMentor}
          className={styles.rejectBtn}
          disabled
        >
          Reject
        </Button>
      </>
    );
  } else {
    actions = null;
  }

  return <>{actions}</>;
}

export default MentorActions;
