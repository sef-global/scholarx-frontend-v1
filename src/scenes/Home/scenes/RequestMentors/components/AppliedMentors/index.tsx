import React, { useEffect, useState } from 'react';

import { List, notification, Spin } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';

import { API_URL } from '../../../../../../constants';
import { Mentor } from '../../../../../../types';
import MentorCard from '../MentorCard';
import styles from '../styles.css';

function AppliedMentors() {
  const { programId } = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const match = useRouteMatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs/${programId}/mentee/mentors`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentor[]>) => {
        if (result.status == 200 || result.status == 204) {
          setIsLoading(false);
          setMentors(result.data);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        notification.error({
          message: error.toString(),
          description: 'Something went wrong when fetching the applied mentors',
        });
      });
  }, []);

  return (
    <div className={styles.container}>
      <Spin tip="Loading..." spinning={isLoading}>
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          itemLayout="horizontal"
          size="large"
          pagination={{
            pageSize: 8,
          }}
          dataSource={mentors}
          renderItem={(item: Mentor) => (
            <List.Item key={item.id}>
              <Link to={`${match.url}/mentor/${item.id}/application`}>
                <MentorCard item={item} />
              </Link>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
}

export default AppliedMentors;
