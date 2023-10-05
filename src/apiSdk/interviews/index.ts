import queryString from 'query-string';
import { InterviewInterface, InterviewGetQueryInterface } from 'interfaces/interview';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInterviews = async (
  query?: InterviewGetQueryInterface,
): Promise<PaginatedInterface<InterviewInterface>> => {
  return fetcher('/api/interviews', {}, query);
};

export const createInterview = async (interview: InterviewInterface) => {
  return fetcher('/api/interviews', { method: 'POST', body: JSON.stringify(interview) });
};

export const updateInterviewById = async (id: string, interview: InterviewInterface) => {
  return fetcher(`/api/interviews/${id}`, { method: 'PUT', body: JSON.stringify(interview) });
};

export const getInterviewById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/interviews/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteInterviewById = async (id: string) => {
  return fetcher(`/api/interviews/${id}`, { method: 'DELETE' });
};
