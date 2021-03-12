import React, { useEffect, useState } from 'react';
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
import { Mentee, SavedProgram } from '../../../../interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import styles from '../../styles.css';
import MenteeRow from './components/MenteeRow';
import { useHistory } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import NavigationBar from '../../components/NavigationBar';
import { API_URL } from '../../../../constants';

const { Title } = Typography;

function ManageMentees() {
  const { programId } = useParams();
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [program, setProgram] = useState<SavedProgram | null>(null);
  const [shouldLoadMentees, setShouldLoadMentees] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getProgram();
  }, []);

  const getProgram = () => {
    axios
      .get(`${API_URL}/programs/${programId}`)
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
      .get(`${API_URL}/me/programs/${programId}/mentees`)
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
      <NavigationBar />
      <div className={styles.container}>
        <Row>
          <Col md={3} />
          <Col md={15}>
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={() => {
                history.goBack();
              }}
            />
          </Col>
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
    </>
  );
}
export default ManageMentees;
