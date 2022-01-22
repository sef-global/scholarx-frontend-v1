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
