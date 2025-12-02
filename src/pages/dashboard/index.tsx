import { css } from 'styled-system/css';

import type { Project } from '@/types/project';

import { CreateProjectButton } from './_components/create-project-button';
import { ProjectCard } from './_components/project-card';

const DUMMY_PROJECTS: Project[] = [
  {
    id: '1',
    name: '강남구 맛집 분석',
    reviewer: '김철수',
    csv_file_name: 'gangnam_food.csv',
    created_at: '2024-06-27T11:41:32.311141Z',
    status: 'ANALYZING',
    progress_info: {
      ai_analyzing_progress: 40,
      ai_analyzing_duration: 120,
      reviewing_store_total_count: 50,
      reviewing_store_completed_count: 10,
    },
  },
  {
    id: '2',
    name: '서초구 카페 리스트',
    reviewer: '이영희',
    csv_file_name: 'seocho_cafe.csv',
    created_at: '2024-06-27T11:41:32.311141Z',
    status: 'REVIEWING',
    progress_info: {
      ai_analyzing_progress: 100,
      ai_analyzing_duration: 120,
      reviewing_store_total_count: 50,
      reviewing_store_completed_count: 10,
    },
  },
  {
    id: '3',
    name: '송파구 편의점 현황',
    reviewer: '박지성',
    csv_file_name: 'songpa_cvs.csv',
    created_at: '2024-06-27T11:41:32.311141Z',
    status: 'COMPLETED',
    progress_info: {
      ai_analyzing_progress: 100,
      ai_analyzing_duration: 90,
      reviewing_store_total_count: 30,
      reviewing_store_completed_count: 30,
    },
  },
  {
    id: '4',
    name: '마포구 식당 데이터',
    reviewer: '손흥민',
    csv_file_name: 'mapo_restaurant.csv',
    created_at: '2024-06-27T11:41:32.311141Z',
    status: 'ANALYZING',
    progress_info: {
      ai_analyzing_progress: 100,
      ai_analyzing_duration: 120,
      reviewing_store_total_count: 50,
      reviewing_store_completed_count: 10,
    },
  },
  {
    id: '5',
    name: '용산구 핫플레이스',
    reviewer: '아이유',
    csv_file_name: 'yongsan_hotplace.csv',
    created_at: '2024-06-27T11:41:32.311141Z',
    status: 'REVIEWING',
    progress_info: {
      ai_analyzing_progress: 100,
      ai_analyzing_duration: 150,
      reviewing_store_total_count: 80,
      reviewing_store_completed_count: 45,
    },
  },
  {
    id: '6',
    name: '성동구 카페 거리',
    reviewer: '유재석',
    csv_file_name: 'seongdong_cafe.csv',
    created_at: '2024-06-27T11:41:32.311141Z',
    status: 'COMPLETED',
    progress_info: {
      ai_analyzing_progress: 100,
      ai_analyzing_duration: 110,
      reviewing_store_total_count: 40,
      reviewing_store_completed_count: 40,
    },
  },
  {
    id: '7',
    name: '종로구 노포 식당',
    reviewer: '강호동',
    csv_file_name: 'jongno_nopo.csv',
    created_at: '2024-06-27T11:41:32.311141Z',
    status: 'REVIEWING',
    progress_info: {
      ai_analyzing_progress: 100,
      ai_analyzing_duration: 130,
      reviewing_store_total_count: 60,
      reviewing_store_completed_count: 5,
    },
  },
];

/**
 * 대시보드 페이지 (프로젝트 목록)
 * Path: /
 */
const DashboardPage = () => {
  return (
    <>
      <div>
        {/* TODO: 헤더 컴포넌트 확정 시 반영 */}
        <header
          className={css({
            width: '100%',
            padding: '1.5rem 7.5rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
          })}
        >
          <h1
            className={css({
              fontWeight: 'bold',
            })}
          >
            프로젝트 목록
          </h1>
        </header>
        <main
          className={css({
            padding: '3.75rem 7.5rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          })}
        >
          <CreateProjectButton />
          {DUMMY_PROJECTS.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
