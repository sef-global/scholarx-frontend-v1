import React, { useEffect, useState } from 'react';
import { Typography, List, Avatar, notification, Spin, Empty, Tag } from 'antd';
import { Mentor } from './interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import MentorActions from './components/MentorActions';
import RemoveMentor from './components/RemoveMentor';

const { Title } = Typography;

function ManageMentors() {
  const {programId} = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programState, setProgramState] = useState(String);

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
  }, []);

  let dynamicComponent;

  switch (programState) {
    case 'CREATED':
    case 'COMPLETED':
    case 'REMOVED':
      dynamicComponent = (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>You are currently in {programState} state.</span>}
        ></Empty>
      );
      break;
    case 'MENTOR_APPLICATION':
    case 'MENTOR_SELECTION':
    case 'MENTEE_APPLICATION':
    case 'MENTEE_SELECTION':
    case 'ONGOING':
      dynamicComponent = (
        <List
          itemLayout="horizontal"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 8,
          }}
          dataSource={mentors}
          renderItem={(item: Mentor) => {
            let tagComponent;
            switch (item.state) {
              case 'PENDING':
                tagComponent = <Tag color="blue">PENDING</Tag>;
                break;
              case 'APPROVED':
                tagComponent = <Tag color="green">APPROVED</Tag>;
                break;
              case 'REJECTED':
                tagComponent = <Tag color="orange">REJECTED</Tag>;
                break;
              case 'REMOVED':
                tagComponent = <Tag color="red">REMOVED</Tag>;
                break;
            }
            let actionButton;
            if (programState === 'MENTOR_SELECTION') {
              actionButton = <MentorActions id={item.id} state={item.state} />;
            }

            return (
              <List.Item
                key={item.id}
                actions={[actionButton, <RemoveMentor id={item.id} />]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.profile.imageUrl} />}
                  title={
                    <div>
                      <a href={item.profile.linkedinUrl}>
                        {item.profile.firstName} {item.profile.lastName}
                      </a>
                      <br />
                      {tagComponent}
                    </div>
                  }
                  description={item.profile.headline}
                />
              </List.Item>
            );
          }}
        />
      );
      break;
  }

  return (
    <div>
      <Title>Manage Mentors</Title>
      <Spin tip="Loading..." spinning={isLoading}>
        {dynamicComponent}
      </Spin>
    </div>
  );
}

export default ManageMentors;
