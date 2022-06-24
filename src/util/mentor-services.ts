import { notification } from 'antd';
import axios from 'axios';

import { API_URL } from '../constants';
import { Mentor } from '../types';

export const applyForProgram = async (programId: string, mentor: Mentor) => {
  try {
    const result = await axios.post(
      `${API_URL}/programs/${programId}/mentor`,
      mentor,
      {
        withCredentials: true,
      }
    );
    if (result.status == 201) {
      notification.success({
        message: 'Success!',
        description: 'Successfully applied!',
      });
      return result;
    }
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when fetching the program',
    });
  } catch (e) {
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when applying for the program',
    });
  }
};

export const getMentorApplication = async (programId: string) => {
  try {
    const result = await axios.get(`${API_URL}/programs/${programId}/mentor`, {
      withCredentials: true,
    });
    if (result.status == 200) {
      return result.data;
    }
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when fetching the program',
    });
  } catch (e) {
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when fetching the program',
    });
  }
};

export const updateMentorApplication = async (
  programId: string,
  mentor: {
    institution: string,
    slots: number,
    bio: string,
    position: string,
    category: string,
    expertise: string,
  }
) => {
  try {
    const result = await axios.put(
      `${API_URL}/programs/${programId}/mentor`,
      mentor,
      {
        withCredentials: true,
      }
    );
    if (result.status == 200) {
      notification.success({
        message: 'Success!',
        description: 'Successfully edited!',
      });
      return result;
    }
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when fetching the program',
    });
  } catch (e) {
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when editing the program',
    });
  }
};

export const getApprovedMentors = async (programId: string) => {
  try {
    const result = await axios.get(
      `${API_URL}/programs/${programId}/mentors?states=APPROVED`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      return result;
    }
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when fetching the mentors',
    });
  } catch (e) {
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when fetching the mentors',
    });
  }
};
