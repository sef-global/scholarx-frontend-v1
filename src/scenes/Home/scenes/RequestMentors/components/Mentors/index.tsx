import React, { useEffect, useState } from 'react';

import { notification, Spin, Table, Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import LogInModal from '../../../../../../components/LogInModal';
import { API_URL } from '../../../../../../constants';
import { Mentor } from '../../../../../../types';
import styles from '../styles.css';

const { Column } = Table;

function Mentors() {
  const { programId } = useParams<{ programId: string }>();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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
        <Table dataSource={mentors} rowKey="id">
          <Column
            title="Mentor"
            dataIndex={''}
            render={(mentor: Mentor) => (
              <Link to={`/program/${programId}/mentor/${mentor.id}/view`}>
                {mentor.profile.firstName} {mentor.profile.lastName}
              </Link>
            )}
          />
          <Column
            title="Category"
            dataIndex={'category'}
            filters={[
              { text: 'ENGINEERING', value: 'ENGINEERING' },
              { text: 'LIFE SCIENCES', value: 'LIFE_SCIENCES' },
              { text: 'COMPUTER SCIENCE', value: 'COMPUTER_SCIENCE' },
              { text: 'DATASCIENCE AND AI', value: 'DATASCIENCE_AND_AI' },
              { text: 'PHYSICAL SCIENCE', value: 'PHYSICAL_SCIENCE' },
              { text: 'OTHER', value: 'OTHER' },
            ]}
            onFilter={(value: string, record: Mentor) =>
              record.category.indexOf(value) === 0
            }
            render={(category: string) => category.replace('_', ' ')}
          />
          <Column title="Expertise" dataIndex={'expertise'} />
          <Column title="Institution" dataIndex={'institution'} />
        </Table>
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
