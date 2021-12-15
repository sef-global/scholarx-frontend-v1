import React, { useContext, useEffect, useState } from 'react';

import { notification, Spin, Table, Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams, useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import LogInModal from '../../../../../../components/LogInModal';
import { API_URL } from '../../../../../../constants';
import { UserContext } from '../../../../../../index';
import { Mentor, Profile } from '../../../../../../types';
import styles from '../styles.css';

const mentorDetails = [
  {
    mentor: 'Ted Mosbey',
    category: 'Architecture',
    expertise: 'Colonial Classic',
    industry: 'Industry A',
    id: 1,
  },
  {
    mentor: 'Marshal Erikson',
    category: 'Law',
    expertise: 'Enviromental Law',
    industry: 'Industry B',
    id: 2,
  },
];

const columns = [
  {
    title: 'Mentor',
    dataIndex: 'mentor',
    sorter: {
      compare: (a: any, b: any) => sort(a.mentor, b.mentor),
      multiple: 1,
    },
    render: (text: string) => (
      <a href="http://localhost:3000/program/2/mentor/4/view">{text}</a>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: {
      compare: (a: any, b: any) => sort(a.category, b.category),
      multiple: 1,
    },
  },
  {
    title: 'Expertise',
    dataIndex: 'expertise',
    sorter: {
      compare: (a: any, b: any) => sort(a.expertise, b.expertise),
      multiple: 1,
    },
  },
  {
    title: 'Industry',
    dataIndex: 'industry',
    sorter: {
      compare: (a: any, b: any) => sort(a.industry, b.industry),
      multiple: 1,
    },
  },
];

const sort = (a: string, b: string) => b.localeCompare(a);

function Mentors() {
  const { programId } = useParams<{ programId: string }>();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const user: Partial<Profile> = useContext(UserContext);
  const match = useRouteMatch();
  const history = useHistory();

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

  const onApply = () => {
    history.push('/home'); // @TODO: Update this to the correct route
  };

  return (
    <div className={styles.container}>
      <LogInModal
        isModalVisible={isModalVisible}
        onCancel={handleModalCancel}
      />
      <Spin tip="Loading..." spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={mentorDetails}
          rowKey="id"
          pagination={false}
        />
        <hr className={styles.horizontalLine} />
        <Button
          type="primary"
          size="large"
          className={styles.rightAlign}
          onClick={onApply}
        >
          Apply
        </Button>
      </Spin>
    </div>
  );
}

export default Mentors;
