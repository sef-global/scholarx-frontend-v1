import React, { ReactNode, useEffect, useState } from 'react';
import { Typography, List, Avatar, notification, Spin, Empty, Tag } from 'antd';
import { Mentor } from './interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import MentorActions from './components/MentorActions';
import RemoveMentor from './components/RemoveMentor';

const { Title } = Typography;

function ManageMentors() {
  const { programId } = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programState, setProgramState] = useState(String);

  const loadMentors = () => {
    axios
      .get(`http://localhost:8080/api/scholarx/programs/${programId}/mentors`)
      .then((result: AxiosResponse<Mentor[]>) => {
        if (result.status == 200) {
          setIsLoading(false);
          setMentors(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the mentors',
        });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/scholarx/programs/${programId}`)
      .then((result: any) => {
        if (result.status == 200) {
          setProgramState(result.data.state);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description:
            'Something went wrong when fetching the programme detail',
        });
      });
    loadMentors();
  }, []);

  const displayEmpty: ReactNode = (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={<span>You are currently in {programState} state.</span>}
    ></Empty>
  );

  const displayMentors: ReactNode = (
    <List
      itemLayout="horizontal"
      size="large"
      pagination={{
        pageSize: 8,
      }}
      dataSource={mentors}
      renderItem={(mentor: Mentor) => {
        let mentorState: ReactNode;

        switch (mentor.state) {
          case 'PENDING':
            mentorState = <Tag color="blue">PENDING</Tag>;
            break;
          case 'APPROVED':
            mentorState = <Tag color="green">APPROVED</Tag>;
            break;
          case 'REJECTED':
            mentorState = <Tag color="orange">REJECTED</Tag>;
            break;
          case 'REMOVED':
            mentorState = <Tag color="red">REMOVED</Tag>;
            break;
        }

        let actionButton;
        if (programState === 'MENTOR_SELECTION') {
          actionButton = (
            <MentorActions
              id={mentor.id}
              state={mentor.state}
              loadMentors={loadMentors}
            />
          );
        }

        return (
          <List.Item
            key={mentor.id}
            actions={[
              actionButton,
              <RemoveMentor key={mentor.id} id={mentor.id} />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={mentor.profile.imageUrl} />}
              title={
                <div>
                  <a href={mentor.profile.linkedinUrl}>
                    {mentor.profile.firstName} {mentor.profile.lastName}
                  </a>
                  <br />
                  {mentorState}
                </div>
              }
              description={mentor.profile.headline}
            />
          </List.Item>
        );
      }}
    />
  );

  let mentorView: ReactNode;
  if (programState === 'CREATED') {
    mentorView = displayEmpty;
  } else if (programState === 'MENTOR_APPLICATION') {
    mentorView = displayMentors;
  } else if (programState === 'MENTOR_SELECTION') {
    mentorView = displayMentors;
  } else if (programState === 'MENTEE_APPLICATION') {
    mentorView = displayMentors;
  } else if (programState === 'MENTEE_SELECTION') {
    mentorView = displayMentors;
  } else if (programState === 'ONGOING') {
    mentorView = displayMentors;
  } else if (programState === 'COMPLETED') {
    mentorView = displayEmpty;
  } else if (programState === 'REMOVED') {
    mentorView = displayEmpty;
  } else {
    mentorView = null;
  }

  return (
    <div>
      <Title>Manage Mentors</Title>
      <Spin tip="Loading..." spinning={isLoading}>
        {mentorView}
      </Spin>
    </div>
  );
}

export default ManageMentors;
