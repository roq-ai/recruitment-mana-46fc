import queryString from 'query-string';
import { ProjectInterface, ProjectGetQueryInterface } from 'interfaces/project';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProjects = async (query?: ProjectGetQueryInterface): Promise<PaginatedInterface<ProjectInterface>> => {
  return fetcher('/api/projects', {}, query);
};

export const createProject = async (project: ProjectInterface) => {
  return fetcher('/api/projects', { method: 'POST', body: JSON.stringify(project) });
};

export const updateProjectById = async (id: string, project: ProjectInterface) => {
  return fetcher(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) });
};

export const getProjectById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/projects/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteProjectById = async (id: string) => {
  return fetcher(`/api/projects/${id}`, { method: 'DELETE' });
};
