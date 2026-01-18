import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/hooks/use-toast';

import { getExportJSONData } from '../_apis/store';

export const useExportJSON = (projectId: number, projectName: string) => {
  const { openToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => getExportJSONData(projectId),
    onSuccess: exportData => {
      const jsonString = JSON.stringify(exportData, null, 2);

      const blob = new Blob([jsonString], { type: 'application/json' });

      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName} export.json`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    onError: () => {
      openToast('JSON 데이터를 가지고 오는데 실패했어요. 다시 시도해주세요.');
    },
  });
  return { handleExportJSON: () => mutate(), isLoading: isPending };
};
