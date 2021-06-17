import React, { ReactNode, useState } from 'react';

import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  List,
  Modal,
  notification,
  Row,
  Typography,
} from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

import StatusTag from '../StatusTag';
import { Mentor, MentorResponse } from '../../../../../../types';
import { Props } from './interfaces';
import { API_URL } from '../../../../../../constants';

import styles from './style.css';

const { Title, Text } = Typography;

function MentorRow({ mentor, programState }: Props) {
  const actions: ReactNode[] = [];
  const { programId } = useParams();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [mentorState, setMentorState] = useState<string>(mentor.state);
  const [mentorResponse, setMentorResponse] = useState<MentorResponse[]>([]);

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

  const getMentorResponse = () => {
    axios
      .get(
        `${API_URL}/programs/${programId}/responses/mentor?mentorId=${mentor.id}`,
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse<MentorResponse[]>) => {
        if (result.status == 200) {
          setMentorResponse(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching mentor response',
        });
      });
  };

  if (programState === 'MENTOR_SELECTION') {
    const isApproveDisabled: boolean =
      mentorState == 'APPROVED' || mentorState == 'REMOVED';
    const isRejectDisabled: boolean =
      mentorState == 'REJECTED' || mentorState == 'REMOVED';

    actions.push(
      <Button
        type="link"
        className={styles.buttonMargin}
        onClick={() => {
          setIsDrawerVisible(true);
          getMentorResponse();
        }}
      >
        View Application
      </Button>
    );

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
    <>
      <List.Item key={mentor.id} actions={[actions]}>
        <List.Item.Meta
          avatar={<Avatar src={mentor.profile.imageUrl} />}
          title={
            <div>
              <a
                href={mentor.profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                {mentor.profile.firstName} {mentor.profile.lastName}
                <br />
                <StatusTag state={mentorState} />
              </a>
            </div>
          }
          description={mentor.profile.headline}
        />
      </List.Item>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
      >
        <Row className={styles.mentorProfile}>
          <Col>
            <Avatar size={64} src={mentor.profile.imageUrl} />
          </Col>
          <Col>
            <Row>
              <Title level={3} style={{ alignSelf: 'center', marginLeft: 16 }}>
                {mentor.profile.firstName} {mentor.profile.lastName}
              </Title>
            </Row>
            <Row>
              <a
                href={`mailto:${mentor.profile.email}`}
                style={{ alignSelf: 'center', marginLeft: 16 }}
              >
                {mentor.profile.email}
              </a>
            </Row>
          </Col>
        </Row>
        {mentorResponse.map((response: MentorResponse, index: number) => {
          return (
            <div key={response.id.mentorId}>
              <Row>
                <Text strong>
                  {index + 1}. {response.question.question}
                </Text>
              </Row>
              <Row>
                <Text>{response.response}</Text>
              </Row>
              <Divider />
            </div>
          );
        })}
      </Drawer>
    </>
  );
}

export default MentorRow;
