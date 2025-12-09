import type { PROJECT_STATUS } from '@/constants/project';

export interface Project {
  id: string;
  name: string;
  reviewer: string;
  csv_file_name: string;
  created_at: string;
  status: ProjectStatus;
  progress_info: {
    ai_analyzing_duration: number; //TODO: 해당 필드 재확인 필요
    images_total_count: number; // 총 이미지 수
    images_finished_count: number; // 분석 완료 이미지 수
    stores_total_count: number; // 총 상점 수
    stores_completed_count: number; // 검수 완료 상점 수
  };
}

export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export type PageInfo = {
  total_pages: number;
  current_page: number;
  size: number;
};

export type ProjectListResponse = {
  projects: Project[];
  page_info: PageInfo;
};
