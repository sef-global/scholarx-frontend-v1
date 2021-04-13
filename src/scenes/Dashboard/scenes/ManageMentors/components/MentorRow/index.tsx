import { Mentor } from '../../../../../../interfaces';
import React, { ReactNode, useState } from 'react';
import { Avatar, Button, List, Modal, notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios';
import StatusTag from '../StatusTag';
import styles from './style.css';
import { API_URL } from '../../../../../../constants';

function MentorRow(props: { mentor: Mentor, programState: string }) {
  const actions: ReactNode[] = [];
  const [mentorState, setMentorState] = useState<string>(props.mentor.state);

  const updateMentorState = (mentorState: string) => {
    let successMessage: string;
    let errorMessage: string;
    if (mentorState == 'APPROVED') {
      successMessage = 'Mentor has been approved';
      errorMessage = "Couldn't approve the mentor";
    } else if (mentorState == 'REJECTED') {
      successMessage = 'Mentor has been rejected';
      errorMessage = "Couldn't reject the mentor";
    } else if (mentorState == 'REMOVED') {
      successMessage = 'Mentor has been removed';
      errorMessage = "Couldn't remove the mentor";
    }

    axios
      .put(
        `${API_URL}/admin/mentors/${props.mentor.id}/state`,
        {
          state: mentorState,
        },
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          setMentorState(result.data.state);
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
      title: 'Do you want to reject this mentor?',
      icon: <WarningOutlined />,
      content: 'Please confirm below, This action can be changed later.',
      onOk() {
        updateMentorState('REJECTED');
      },
    });
  };

  const confirmApproval = () => {
    Modal.confirm({
      title: 'Do you want to approve this mentor?',
      icon: <WarningOutlined />,
      content: 'Please confirm below, This action can be changed later.',
      onOk() {
        updateMentorState('APPROVED');
      },
    });
  };

  const confirmRemoval = () => {
    Modal.confirm({
      title: 'Do you want to remove this mentor?',
      icon: <WarningOutlined />,
      content: 'Please confirm below, This action can not be changed later.',
      onOk() {
        updateMentorState('REMOVED');
      },
    });
  };

  if (props.programState === 'MENTOR_SELECTION') {
    const isApproveDisabled: boolean =
      mentorState == 'APPROVED' || mentorState == 'REMOVED';
    const isRejectDisabled: boolean =
      mentorState == 'REJECTED' || mentorState == 'REMOVED';

    actions.push(
      <Button
        type="primary"
        className={styles.buttonMargin}
        disabled={isApproveDisabled}
        onClick={confirmApproval}
      >
        Approve
      </Button>
    );

    actions.push(
      <Button
        type="primary"
        className={styles.buttonMargin}
        danger
        disabled={isRejectDisabled}
        onClick={confirmRejection}
      >
        Reject
      </Button>
    );
  }

  // TODO: Add a new button to un remove mentors
  const isRemoveDisabled = mentorState == 'REMOVED';
  actions.push(
    <Button
      type="primary"
      danger
      disabled={isRemoveDisabled}
      onClick={confirmRemoval}
    >
      Remove
    </Button>
  );

  return (
    <List.Item key={props.mentor.id} actions={[actions]}>
      <List.Item.Meta
        avatar={<Avatar src={props.mentor.profile.imageUrl} />}
        title={
          <div>
            <a
              href={props.mentor.profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              {props.mentor.profile.firstName} {props.mentor.profile.lastName}
              <br />
              <StatusTag state={mentorState} />
            </a>
          </div>
        }
        description={props.mentor.profile.headline}
      />
    </List.Item>
  );
}

export default MentorRow;
