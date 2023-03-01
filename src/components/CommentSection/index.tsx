import React, { useEffect, useState } from 'react';

import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Popover,
  Divider,
  Typography,
  Input,
  List,
  Menu,
  Dropdown,
  notification,
} from 'antd';
import axios, { AxiosResponse } from 'axios';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import { API_URL } from '../../constants';
import { Mentee } from '../../types';
import { Comment } from './interfaces';
import styles from './style.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

TimeAgo.addDefaultLocale(en);

function CommentSection({ mentee }: { mentee: Mentee }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const timeAgo = new TimeAgo('en-US');

  useEffect(() => {
    getComments();
  }, [mentee]);

  function handleCommentChange(e: any) {
    setComment(e.target.value);
  }

  function deleteComment(id: number) {
    axios
      .delete(`${API_URL}/mentees/comment/${id}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse) => {
        if (result.status == 204) {
          getComments();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when deleting the comment',
        });
      });
  }
  function addComment() {
    axios
      .post(
        `${API_URL}/mentees/${mentee.id}/comments`,
        { comment: comment },
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse<Comment>) => {
        if (result.status == 201) {
          getComments();
          setComment('');
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when adding the comments',
        });
      });
  }

  function getComments() {
    axios
      .get(`${API_URL}/mentees/${mentee.id}/comments`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Comment[]>) => {
        if (result.status == 200) {
          setComments(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong fetching the comments',
        });
      });
  }

  return (
    <>
      <Divider />
      <Title level={4}>Comments</Title>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment: Comment) => {
          const date = new Date(comment.createdAt);
          const isAdmin = comment.commented_by.type === 'ADMIN';
          return (
            <List.Item
              key={comment.id}
              actions={[
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <Popover
                          placement="top"
                          content={
                            <div>
                              <a
                                className={styles.popoverButton}
                                onClick={() => deleteComment(comment.id)}
                              >
                                Yes
                              </a>
                              <a
                                className={styles.popoverButton}
                                onClick={window.close}
                              >
                                No
                              </a>
                            </div>
                          }
                          title="Are you sure you want to delete this comment?"
                        >
                          <Button type="text">
                            <DeleteOutlined className={styles.deleteBtn} />
                            Delete
                          </Button>
                        </Popover>
                      </Menu.Item>
                    </Menu>
                  }
                  key={comment.id}
                >
                  <MoreOutlined key={comment.id} />
                </Dropdown>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={comment.commented_by.imageUrl} />}
                title={
                  <a href={comment.commented_by.linkedinUrl}>
                    {comment.commented_by.firstName}{' '}
                    {comment.commented_by.lastName}{' '}
                    <Text className={styles.commenterType}>
                      {isAdmin ? '(Admin)' : '(Mentor)'}
                    </Text>
                  </a>
                }
                description={timeAgo.format(date)}
                className={styles.buttonMargin}
              />
              {comment.comment}
            </List.Item>
          );
        }}
      />
      <br />
      <TextArea
        maxLength={250}
        style={{ height: 120 }}
        onChange={handleCommentChange}
        value={comment}
        placeholder={'Add your comments here'}
      />
      <br />
      <br />
      <Button type="primary" onClick={addComment}>
        Comment
      </Button>
    </>
  );
}

export default CommentSection;
