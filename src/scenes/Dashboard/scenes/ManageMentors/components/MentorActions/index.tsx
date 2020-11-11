import React from 'react';
import { notification, Button, Modal, Divider } from 'antd';
import axios from 'axios';
import { WarningOutlined } from '@ant-design/icons';
import styles from './styles.css';

const { confirm } = Modal;

function MentorActions(props) {
  const rejectMentor = (id) => {
    confirm({
      title: 'Do you want to reject this mentor?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        axios
          .put(
            `http://localhost:8080/api/scholarx/admin/mentors/${props.id}/state`,
            {
              enrolmentState: 'REJECTED',
            }
          )
          .then((result: any) => {
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
        console.log(`Rejected ${props.id}`);
      },
    });
  };

  const approveMentor = (id) => {
    confirm({
      title: 'Do you want to approve this mentor?',
      icon: <WarningOutlined />,
      content: 'This action can be changed later. Please confirm below.',
      onOk() {
        axios
          .put(
            `http://localhost:8080/api/scholarx/admin/mentors/${props.id}/state`,
            {
              enrolmentState: 'APPROVED',
            }
          )
          .then((result: any) => {
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
        console.log(`Approved ${props.id}`);
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
