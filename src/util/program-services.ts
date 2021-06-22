import { notification } from 'antd';
import axios from 'axios';

import { API_URL } from '../constants';

export const getProgramDetails = async (programId: string) => {
  try {
    const response = await axios.get(`${API_URL}/programs/${programId}`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }

    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when applying for the program',
    });
  } catch (e) {
    notification.warning({
      message: 'Warning!',
      description: 'Something went wrong when applying for the program',
    });
  }
};

export const getQuestions = async (programId: string, category: string) => {
  try {
    const result = await axios.get(
      `${API_URL}/programs/${programId}/questions/${category}`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      return result.data;
    }

    notification.error({
      description: 'Something went wrong while fetching the questions',
      message: 'Error!',
    });
  } catch (e) {
    notification.error({
      description: 'Something went wrong while fetching the questions',
      message: 'Error!',
    });
  }
};
