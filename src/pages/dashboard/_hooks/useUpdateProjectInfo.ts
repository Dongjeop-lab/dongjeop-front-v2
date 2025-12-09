import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProjectInfo } from '../_apis/project';
import { projectKeys } from '../_queries/project';

export const useUpdateProjectInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.all,
      });
    },
  });
};
