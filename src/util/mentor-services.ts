import { notification } from 'antd';
import axios from 'axios';

import { API_URL } from '../constants';
import { Application, UpdateQuestion } from '../types';

export const applyForProgram = async (
  application: Application[],
  programId: string
) => {
  try {
    const result = await axios.post(
      `${API_URL}/programs/${programId}/mentor`,
      application,
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

export const getResponses = async (programId: string) => {
  try {
    const result = await axios.get(
      `${API_URL}/programs/${programId}/responses/mentor`,
      {
        withCredentials: true,
      }
    );
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

export const updateApplication = async (
  programId: string,
  application: UpdateQuestion[]
) => {
  try {
    const result = await axios.put(
      `${API_URL}/programs/${programId}/responses/mentor`,
      application,
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
