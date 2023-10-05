import queryString from 'query-string';
import { CandidateInterface, CandidateGetQueryInterface } from 'interfaces/candidate';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCandidates = async (
  query?: CandidateGetQueryInterface,
): Promise<PaginatedInterface<CandidateInterface>> => {
  return fetcher('/api/candidates', {}, query);
};

export const createCandidate = async (candidate: CandidateInterface) => {
  return fetcher('/api/candidates', { method: 'POST', body: JSON.stringify(candidate) });
};

export const updateCandidateById = async (id: string, candidate: CandidateInterface) => {
  return fetcher(`/api/candidates/${id}`, { method: 'PUT', body: JSON.stringify(candidate) });
};

export const getCandidateById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/candidates/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteCandidateById = async (id: string) => {
  return fetcher(`/api/candidates/${id}`, { method: 'DELETE' });
};
