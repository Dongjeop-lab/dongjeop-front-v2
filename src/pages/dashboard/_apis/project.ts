import { api } from '@/lib/api-client';

import type { ProjectListResponse } from '../_types/project';

export const createProject = (body: {
  name: string;
  reviewer: string;
  csv_file: File;
}) => {
  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('reviewer', body.reviewer);
  formData.append('csv_file', body.csv_file);
  return api.post<{ project_id: string }>(`/projects`, formData);
};

export const getProjects = ({
  page = 1,
  size = 10,
}: {
  page?: number;
  size?: number;
}) => {
  return api.get<ProjectListResponse>('/projects', { params: { page, size } });
};

export const updateProjectInfo = ({
  projectId,
  body,
}: {
  projectId: string;
  body: {
    name: string;
    reviewer: string;
  };
}) => {
  return api.put<{ id: string }>(`/projects/${projectId}`, body);
};
