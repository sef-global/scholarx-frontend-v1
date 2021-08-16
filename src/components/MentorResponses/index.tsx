import React, { useEffect, useState } from 'react';

import { Divider, notification, Row, Typography } from 'antd';
import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../../constants';
import { MentorResponse } from '../../types';
import { MentorResponsesProps } from './interfaces';

const { Text } = Typography;

function MentorResponses({ programId, mentorId }: MentorResponsesProps) {
  const [mentorResponse, setMentorResponse] = useState<MentorResponse[]>();

  useEffect(() => {
    getMentorResponses();
  }, []);

  const getMentorResponses = () => {
    axios
      .get(
        `${API_URL}/programs/${programId}/responses/mentor?mentorId=${mentorId}`,
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse<MentorResponse[]>) => {
        if (result.status == 200) {
          setMentorResponse(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching mentor response',
        });
      });
  };

  const replaceLinksWithAnchor = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const response = text.replace(urlRegex, (url) => {
      return '<a target="_blank" href="' + url + '" >' + url + '</a>';
    });
    return <span dangerouslySetInnerHTML={{ __html: response }} />;
  };

  return (
    <>
      {mentorResponse?.map((response: MentorResponse, index: number) => {
        return (
          <div key={response.question.id}>
            <Row>
              <Text strong>
                {index + 1}. {response.question.question}
              </Text>
            </Row>
            <Row>{replaceLinksWithAnchor(response.response)}</Row>
            <Divider />
          </div>
        );
      })}
    </>
  );
}

export default MentorResponses;
