import { notification } from 'antd';
import axios from 'axios';

import { API_URL } from '../constants';
import { Mentee } from '../types';

export const applyAsMentee = async (mentorId: number, mentee: Mentee) => {
  try {
    const result = await axios.post(
      `${API_URL}/mentors/${mentorId}/mentee`,
      mentee,
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
      description: 'Something went wrong when fetching the mentor',
    });
  } catch (e) {
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when applying for the program',
    });
  }
};

export const updateMenteeApplication = async (
  programId: string,
  mentee: Mentee
) => {
  try {
    const result = await axios.put(
      `${API_URL}/programs/${programId}/mentee`,
      mentee,
      {
        withCredentials: true,
      }
    );
    if (result.status == 200) {
      notification.success({
        message: 'Success!',
        description: 'Successfully updated!',
      });
      return result;
    }
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when fetching the mentor',
    });
  } catch (e) {
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when updating the mentee application',
    });
  }
};

export const getMenteeApplication = async (programId: string) => {
  try {
    const result = await axios.get(`${API_URL}/programs/${programId}/mentee`, {
      withCredentials: true,
    });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 204) {
      return null;
    }
  } catch (error) {
    if (error.response.status != 401) {
      notification.warning({
        message: 'Warning!',
        description: 'Something went wrong when fetching the program',
      });
    }
  }
};
