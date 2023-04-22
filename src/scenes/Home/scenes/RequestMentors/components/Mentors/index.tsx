import React, { useContext, useEffect, useState } from 'react';

import { notification, Spin, Table, Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import LogInModal from '../../../../../../components/LogInModal';
import { API_URL } from '../../../../../../constants';
import { UserContext } from '../../../../../../index';
import { Mentor, Profile } from '../../../../../../types';
import { getMenteeApplication } from '../../../../../../util/mentee-services';
import styles from '../styles.css';

const { Column } = Table;

function Mentors() {
  const { programId } = useParams<{ programId: string }>();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const user: Partial<Profile | null> = useContext(UserContext);
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

    getLoggedInMentee();
  }, []);

  const getLoggedInMentee = async () => {
    setIsLoading(true);
    const mentee = await getMenteeApplication(programId);
    if (mentee) {
      setIsApplied(true);
    }
    setIsLoading(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const onApply = () => {
    if (user === null) {
      setIsModalVisible(true);
    } else {
      history.push(`/program/${programId}/mentee/apply`);
    }
  };

  return (
    <div className={styles.container}>
      <LogInModal
        isModalVisible={isModalVisible}
        onCancel={handleModalCancel}
      />
      <Spin tip="Loading..." spinning={isLoading}>
        <Table dataSource={mentors} rowKey="id" pagination={false}>
          <Column
            title="Mentor"
            dataIndex={''}
            render={(mentor: Mentor) => (
              <Link to={`/program/${programId}/mentor/${mentor.id}/view`}>
                {mentor.name}
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
            render={(category: string) => category.replace(/_/g, ' ')}
          />
          <Column title="Expertise" dataIndex={'expertise'} />
          <Column title="Institution" dataIndex={'institution'} />
          <Column title="Expectations" dataIndex={'expectations'} />
        </Table>
        <hr className={styles.horizontalLine} />
        {!isApplied && (
          <Button
            type="primary"
            size="large"
            className={styles.applyButton}
            onClick={onApply}
          >
            Apply
          </Button>
        )}
      </Spin>
    </div>
  );
}

export default Mentors;
