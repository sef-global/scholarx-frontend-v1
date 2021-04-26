import React, { useContext, useEffect, useState } from 'react';
import { List, notification, Spin } from 'antd';
import { Mentor, Profile } from '../../../../../../interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from '../styles.css';
import { API_URL } from '../../../../../../constants';
import LogInModal from '../../../../../../components/LogInModal';
import { UserContext } from '../../../../../../index';
import MentorCard from '../MentorCard';

function Mentors() {
  const { programId } = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const user: Partial<Profile> = useContext(UserContext);
  const match = useRouteMatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs/${programId}/mentors?states=APPROVED`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentor[]>) => {
        if (result.status == 200) {
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
          description: 'Something went wrong when fetching the mentors',
        });
      });
  }, []);

  const handleModalPopUp = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <LogInModal
        isModalVisible={isModalVisible}
        onCancel={handleModalCancel}
      />
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
              {user !== null ? (
                <Link to={`${match.url}/mentor/${item.id}/application`}>
                  <MentorCard item={item} />
                </Link>
              ) : (
                <div onClick={handleModalPopUp}>
                  <MentorCard item={item} />
                </div>
              )}
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
}

export default Mentors;
