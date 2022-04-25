import React, { ReactNode, useEffect, useState } from 'react';

import { WarningOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Empty,
  List,
  Modal,
  notification,
  Typography,
} from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import MentorProfileCard from '../../../../../../components/MentorProfileCard';
import { API_URL } from '../../../../../../constants';
import { Mentee, Mentor } from '../../../../../../types';
import StatusTag from '../StatusTag';
import { Props } from './interfaces';
import styles from './style.css';

const { Text, Title } = Typography;

function MentorRow({ mentor, programState }: Props) {
  const actions: ReactNode[] = [];
  const { programId } = useParams();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [assignedMentees, setAssignedMentees] = useState<Mentee[]>([]);
  const [mentorState, setMentorState] = useState<string>(mentor.state);

  useEffect(() => {
    if (mentorState !== 'PENDING') {
      getAssignedMentees();
    }
  }, []);

  function getAssignedMentees() {
    axios
      .get(`${API_URL}/mentors/${mentor.id}/mentees`, { withCredentials: true })
      .then((result: AxiosResponse<Mentee[]>) => {
        if (result.status == 200) {
          setAssignedMentees(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        // Removed the unwanted popup message from here
      });
  }

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
        `${API_URL}/admin/mentors/${mentor.id}/state`,
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

  if (programState === 'MENTOR_SELECTION') {
    const isApproveDisabled: boolean =
      mentorState == 'APPROVED' || mentorState == 'REMOVED';
    const isRejectDisabled: boolean =
      mentorState == 'REJECTED' || mentorState == 'REMOVED';

    actions.push(
      <Button
        className={styles.buttonMargin}
        disabled={isApproveDisabled}
        onClick={confirmApproval}
      >
        Approve
      </Button>
    );

    actions.push(
      <Button
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
    <Button danger disabled={isRemoveDisabled} onClick={confirmRemoval}>
      Remove
    </Button>
  );

  return (
    <>
      <List.Item key={mentor.id} actions={[actions]}>
        <List.Item.Meta
          avatar={<Avatar src={mentor.profile.imageUrl} />}
          title={
            <div>
              <Button
                onClick={() => {
                  setIsDrawerVisible(true);
                }}
                type={'link'}
              >
                {mentor.profile.firstName} {mentor.profile.lastName}
                <br />
              </Button>
              <StatusTag state={mentorState} />
            </div>
          }
          description={mentor.profile.headline}
        />
        <Text className={styles.mentorNameSpan} copyable>
          {mentor.profile.email}
        </Text>
      </List.Item>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
      >
        <Title level={3}>Mentor Application</Title>
        <MentorProfileCard mentor={mentor} />
        <Divider />
        <Title level={4}>Assigned Mentees</Title>
        {mentor.noOfAssignedMentees == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
            <Link to={`/dashboard/${programId}/manage-mentees`}>
              <Button type={'primary'}>Assign Mentees</Button>
            </Link>
          </Empty>
        ) : (
          <List>
            {assignedMentees.map((mentee: Mentee) => {
              return (
                <List.Item key={mentee.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={mentee.profile.imageUrl} />}
                    title={
                      mentee.profile.firstName + ' ' + mentee.profile.lastName
                    }
                    description={mentee.course + ', ' + mentee.university}
                  />
                </List.Item>
              );
            })}
          </List>
        )}
      </Drawer>
    </>
  );
}

export default MentorRow;
