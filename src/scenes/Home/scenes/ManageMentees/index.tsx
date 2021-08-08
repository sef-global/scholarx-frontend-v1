import React, { useContext, useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Typography,
  List,
  notification,
  Spin,
  Empty,
  Row,
  Col,
  Button,
} from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams, useHistory } from 'react-router';

import LogInModal from '../../../../components/LogInModal';
import { API_URL } from '../../../../constants';
import { UserContext } from '../../../../index';
import { Mentee, Profile, SavedProgram } from '../../../../types';
import Footer from '../../components/Footer';
import HelpButton from '../../components/HelpButton';
import NavigationBar from '../../components/NavigationBar';
import styles from '../../styles.css';
import MenteeRow from './components/MenteeRow';

const { Title } = Typography;

function ManageMentees() {
  const { programId } = useParams();
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [program, setProgram] = useState<SavedProgram | null>(null);
  const [shouldLoadMentees, setShouldLoadMentees] = useState<boolean>(false);
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getProgram();
  }, []);

  const getProgram = () => {
    axios
      .get(`${API_URL}/programs/${programId}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<SavedProgram>) => {
        if (result.status == 200) {
          setProgram(result.data);
          const shouldLoadMentees =
            result.data.state == 'MENTEE_APPLICATION' ||
            result.data.state == 'MENTEE_SELECTION' ||
            result.data.state == 'ONGOING';
          setShouldLoadMentees(shouldLoadMentees);
          if (shouldLoadMentees) {
            getMentees();
          } else {
            setIsLoading(false);
          }
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching the program detail',
        });
      });
  };

  const getMentees = () => {
    axios
      .get(`${API_URL}/me/programs/${programId}/mentees`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentee[]>) => {
        if (result.status == 200 || result.status == 204) {
          setMentees(result.data);
          setIsLoading(false);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching the mentees',
        });
      });
  };

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={null} />
      <NavigationBar />
      <div className={styles.container}>
        <Row>
          <Col md={3} className={styles.backButtonColumn}>
            <Button
              className={styles.backButton}
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={() => {
                history.push('/');
              }}
            />
          </Col>
          <Col md={15} />
        </Row>
        <Spin tip="Loading..." spinning={isLoading}>
          <Row>
            <Col md={3} />
            <Col md={15}>
              <Title>Manage Mentees</Title>
              {!shouldLoadMentees && program != null && (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                  description={
                    <span>You are currently in {program.state} state.</span>
                  }
                />
              )}
              {shouldLoadMentees && (
                <List
                  itemLayout="horizontal"
                  size="large"
                  pagination={{
                    pageSize: 8,
                  }}
                  dataSource={mentees}
                  renderItem={(mentee: Mentee) => (
                    <MenteeRow
                      key={mentee.id}
                      mentee={mentee}
                      programState={program.state}
                    />
                  )}
                />
              )}
            </Col>
          </Row>
        </Spin>
      </div>
      <HelpButton />
      <Footer />
    </>
  );
}
export default ManageMentees;
