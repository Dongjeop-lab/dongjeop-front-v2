export interface Project {
  id: string;
  name: string;
  reviewer: string;
  csv_file_name: string;
  created_at: string; // TODO: string인지 Date인지 확인 필요
  status: 'ANALYZING' | 'REVIEWING' | 'COMPLETED';
  progress_info: {
    ai_analyzing_progress: number;
    ai_analyzing_duration: number;
    eviewing_store_total_count: number;
    reviewing_store_completed_count: number;
  };
}
