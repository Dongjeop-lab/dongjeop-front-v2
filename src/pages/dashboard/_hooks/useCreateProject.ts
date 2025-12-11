import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createProject } from '../_apis/project';
import { projectKeys } from '../_queries/project';

export const useCreateProject = ({
  onSuccess,
}: {
  onSuccess: VoidFunction;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.all,
      });
      onSuccess();
    },
  });
};
