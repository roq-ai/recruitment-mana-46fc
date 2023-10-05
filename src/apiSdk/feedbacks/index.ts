import queryString from 'query-string';
import { FeedbackInterface, FeedbackGetQueryInterface } from 'interfaces/feedback';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFeedbacks = async (
  query?: FeedbackGetQueryInterface,
): Promise<PaginatedInterface<FeedbackInterface>> => {
  return fetcher('/api/feedbacks', {}, query);
};

export const createFeedback = async (feedback: FeedbackInterface) => {
  return fetcher('/api/feedbacks', { method: 'POST', body: JSON.stringify(feedback) });
};

export const updateFeedbackById = async (id: string, feedback: FeedbackInterface) => {
  return fetcher(`/api/feedbacks/${id}`, { method: 'PUT', body: JSON.stringify(feedback) });
};

export const getFeedbackById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/feedbacks/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteFeedbackById = async (id: string) => {
  return fetcher(`/api/feedbacks/${id}`, { method: 'DELETE' });
};
