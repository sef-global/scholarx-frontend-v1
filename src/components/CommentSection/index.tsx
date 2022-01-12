import React, { useEffect, useState } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Typography,
  Input,
  List,
  notification,
  Tag,
} from 'antd';
import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../../constants';
import { Mentee } from '../../types';
import { Comment } from './interfaces';

const { Title, Text } = Typography;
const { TextArea } = Input;

function CommentSection({ mentee }: { mentee: Mentee }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');

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
          const date = new Date(comment.updatedAt);
          const isAdmin = comment.commented_by.type === 'ADMIN';
          return (
            <List.Item
              actions={[
                <DeleteOutlined
                  key={comment.id}
                  style={{ color: 'red' }}
                  onClick={() => deleteComment(comment.id)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={comment.commented_by.imageUrl} />}
                title={
                  <a href={comment.commented_by.linkedinUrl}>
                    {comment.commented_by.firstName}{' '}
                    {comment.commented_by.lastName}
                  </a>
                }
                description={comment.comment}
              />
              <Tag color="green">{isAdmin ? 'ADMIN' : 'MENTOR'}</Tag>
              <Text>{date.toLocaleDateString('en-US')}</Text>
            </List.Item>
          );
        }}
      />
      <br />
      <TextArea
        maxLength={100}
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
