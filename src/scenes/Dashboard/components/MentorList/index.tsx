import React, { useState } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { List, Input, Typography, Button } from 'antd';

import MentorProfileCard from '../../../../components/MentorProfileCard';
import { Mentor } from '../../../../types';
import styles from '../../styles.css';

const { Search } = Input;
const { Link, Text } = Typography;

function MentorList({ mentors }: { mentors: Mentor[] }) {
  const [selectedMentor, setSelectedMentor] = useState<Mentor>(null);
  const [keyword, setKeyword] = useState<string>('');

  function showMentorProfile(mentor: Mentor) {
    setSelectedMentor(mentor);
  }

  function hideMentorProfile() {
    setSelectedMentor(null);
  }

  function searchKeyword(input: string) {
    setKeyword(input);
  }

  return (
    <div className={styles.mentorSearch}>
      <h2>Mentors</h2>
      {selectedMentor == null ? (
        <div>
          <Search
            placeholder="Search for Mentor"
            onChange={(input) => {
              searchKeyword(input.target.value);
            }}
            allowClear
          />
          <List
            pagination={{ pageSize: 14 }}
            dataSource={mentors}
            renderItem={(mentor: Mentor) => {
              const mentorName = `${mentor.profile.firstName} ${mentor.profile.lastName}`;
              if (mentorName.toLowerCase().includes(keyword.toLowerCase())) {
                return (
                  <List.Item key={mentor.id}>
                    <Link onClick={() => showMentorProfile(mentor)}>
                      {mentorName}
                    </Link>
                    <span>
                      <Text
                        key={mentor.id}
                        type={
                          mentor.noOfAssignedMentees > mentor.slots
                            ? 'danger'
                            : 'secondary'
                        }
                      >
                        {mentor.noOfAssignedMentees}/{mentor.slots}
                      </Text>
                    </span>
                  </List.Item>
                );
              }
            }}
          />
        </div>
      ) : (
        <div>
          <Button
            type={'text'}
            onClick={() => {
              hideMentorProfile();
            }}
          >
            <LeftOutlined />
          </Button>
          <MentorProfileCard mentor={selectedMentor} />
        </div>
      )}
    </div>
  );
}

export default MentorList;
