import React, { useEffect, useState } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { List, Input, Typography, Button } from 'antd';

import MentorProfileCard from '../../../../components/MentorProfileCard';
import { Mentor } from '../../../../types';
import styles from '../../styles.css';

const { Search } = Input;
const { Link, Text } = Typography;

function MentorList({ mentors }: { mentors: Mentor[] }) {
  const [selectedMentor, setSelectedMentor] = useState<Mentor>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    filterMentors(searchKeyword.toLowerCase());
  }, [mentors]);

  function showMentorProfile(mentor: Mentor) {
    setSelectedMentor(mentor);
  }

  function hideMentorProfile() {
    setSelectedMentor(null);
  }

  function handleSearch(input: string) {
    setSearchKeyword(input);
    filterMentors(input.toLowerCase());
  }

  function filterMentors(keyword: string) {
    setFilteredMentors(
      mentors.filter((mentor) => {
        const mentorName = `${mentor.profile.firstName} ${mentor.profile.lastName}`;
        return mentorName.toLowerCase().includes(keyword);
      })
    );
  }

  return (
    <div className={styles.mentorSearch}>
      <h2>Mentors</h2>
      {selectedMentor == null ? (
        <div>
          <Search
            placeholder="Search for Mentor"
            onChange={(input) => {
              handleSearch(input.target.value);
            }}
            value={searchKeyword}
            allowClear
          />
          <List
            pagination={{ pageSize: 14 }}
            dataSource={filteredMentors}
            renderItem={(mentor: Mentor) => {
              const mentorName = `${mentor.profile.firstName} ${mentor.profile.lastName}`;
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
