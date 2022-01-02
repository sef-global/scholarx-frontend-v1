import React, { ReactNode, useState } from 'react';

import { WarningOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Drawer,
  List,
  Modal,
  notification,
  Tooltip,
  Typography,
} from 'antd';
import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../../../../../../constants';
import { Mentee } from '../../../../../../types';
import StatusTag from './components/StatusTag';
import { StatusTagProps } from './interfaces';
import styles from './style.css';

const { Text, Link, Title } = Typography;
const { Meta } = Card;

function MenteeRow({ mentee, programState }: StatusTagProps) {
  const actions: ReactNode[] = [];
  const [menteeState, setMenteeState] = useState(mentee.state);
  const [isDrawerVisible, setIsDraweVisible] = useState<boolean>(false);

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
      <Button
        className={styles.buttonMargin}
        key="approve"
        disabled={isApproveDisabled}
        onClick={confirmApproval}
      >
        Approve
      </Button>
    );

    actions.push(
      <Button
        key="reject"
        danger
        disabled={isRejectDisabled}
        onClick={confirmRejection}
      >
        Reject
      </Button>
    );
  }

  function showMenteeDrawer() {
    setIsDraweVisible(true);
  }

  function hideMenteeDrawer() {
    setIsDraweVisible(false);
  }

  return (
    <div>
      <List.Item key={mentee.id} actions={[actions]}>
        <List.Item.Meta
          avatar={<Avatar src={mentee.profile.imageUrl} />}
          title={
            <div>
              <Button type={'link'} onClick={showMenteeDrawer}>
                {mentee.profile.firstName} {mentee.profile.lastName}
              </Button>
            </div>
          }
          description={mentee.profile.headline}
        />
        <StatusTag state={menteeState} />
        <Text copyable>{mentee.profile.email}</Text>
      </List.Item>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={hideMenteeDrawer}
        visible={isDrawerVisible}
      >
        <Title level={3}>Mentee Application</Title>
        <Divider />
        <Meta
          title={
            <>
              <Tooltip title={'linkedin'}>
                <Link href={mentee?.profile.linkedinUrl} target={'_blank'}>
                  {mentee?.profile.firstName + ' ' + mentee?.profile.lastName}
                </Link>
              </Tooltip>
            </>
          }
          description={
            <>
              {' '}
              <Text copyable>{mentee?.profile.email}</Text>
            </>
          }
          avatar={<Avatar size={64} src={mentee?.profile.imageUrl} />}
        />
        <Divider />
        <Text strong>University and Course</Text>
        <br />
        <br />
        <Text>
          {mentee?.year}, {mentee?.course}
        </Text>
        <br />
        <Text>{mentee?.university}</Text>
        <br />
        <br />
        <Text strong>Future Ambitions and Intentions</Text>
        <br />
        <br />
        <Text>{mentee?.intent}</Text>
        <Divider />
      </Drawer>
    </div>
  );
}

export default MenteeRow;
