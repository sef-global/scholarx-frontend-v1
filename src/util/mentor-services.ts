import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../constants';
import { Application, Mentor, UpdateQuestion } from '../types';

/**
 * API call to get the details of a particular mentor
 * @param mentorId : the mentor id of the mentor required
 */
export const getMentor = async (mentorId: string) => {
  let mentor: Mentor;
  try {
    const result: AxiosResponse<Mentor> = await axios.get(
      `${API_URL}/mentors/${mentorId}`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      mentor = result.data;
    } else {
      notification.error({
        message: 'Error!',
        description: 'Something went wrong when fetching the mentor',
      });
    }
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: 'Something went wrong when fetching the mentor',
    });
  }
  return mentor;
};

/**
 * API call to apply as a mentor to a program
 * @param application : form data from application
 * @param programId : id of the program mentor is applying to
 */
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

/**
 * API call to receive responses given by a mentor to a program
 * @param programId : program id of the program selected
 */
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

/**
 * API call to update the mentor application for a program
 * @param programId
 * @param application : form data from the program application
 */
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
