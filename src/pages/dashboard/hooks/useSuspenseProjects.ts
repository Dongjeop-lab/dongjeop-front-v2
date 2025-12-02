import { useSuspenseApiQuery } from '@/lib/query-hooks';

import { getProjects } from '../_apis/project';
import { projectKeys } from '../_queries/project';

export const useSuspenseProjects = (page?: number, size?: number) => {
  return useSuspenseApiQuery({
    queryKey: projectKeys.list(page, size),
    queryFn: () => getProjects({ page, size }),
  });
};
