import { notification } from 'antd';
import axios, { AxiosResponse, Method } from 'axios';

import { API_URL } from '../constants';
import { Mentee } from '../types';

/**
 * API call to get details if a mentee has requested for a mentor
 * @param mentorId : mentor id that the mentee has requested for
 */
export const getMenteeApplication = async (mentorId: string) => {
  let mentee: Mentee;
  try {
    const result: AxiosResponse<Mentee> = await axios.get(
      `${API_URL}/mentors/${mentorId}/mentee`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      mentee = result.data;
    }
  } catch (e) {
    notification.error({
      message: 'Warning!',
      description: 'Failed to fetch mentee',
    });
  }
  return mentee;
};

/**
 * API call to request for a mentor
 * @param mentorId: id of the mentor being requested
 * @param method: axios method to be called
 * @param submissionUrl: application url
 */
export const requestForAMentor = async (
  mentorId: string,
  method: Method,
  submissionUrl: string
) => {
  let result: AxiosResponse<Mentee>;
  try {
    const response = await axios({
      method: method,
      url: `${API_URL}/mentors/${mentorId}/mentee`,
      data: { submissionUrl },
      withCredentials: true,
    });
    result = response;
  } catch (e) {
    console.error(e);
    notification.error({
      message: 'Error',
      description: 'Something went wrong when requesting the mentor',
    });
  }
  return result;
};

/**
 * API call to update the state of a mentee application
 * @param menteeId: the id of the mentee whose status is updated
 * @param isApproved: if the application was approved previously
 * @param errorMessage: error message to be displayed
 */
export const updateStateOfMenteeApplication = async (
  menteeId: number,
  isApproved: boolean,
  errorMessage: string
) => {
  let result: AxiosResponse<Mentee>;
  try {
    const response: AxiosResponse<Mentee> = await axios.put(
      `${API_URL}/mentees/${menteeId}/state`,
      {
        isApproved,
      },
      { withCredentials: true }
    );
    result = response;
  } catch (e) {
    notification.error({
      message: 'Error!',
      description: errorMessage,
    });
  }
  return result;
};
