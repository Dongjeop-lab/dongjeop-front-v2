import { http, HttpResponse } from 'msw';

import type { ProjectListResponse } from '@/pages/dashboard/_types/project';

const mockProjects: ProjectListResponse = {
  page_info: {
    total_pages: 1,
    current_page: 1,
    size: 10,
  },
  projects: [
    {
      id: '1',
      name: '강남구 맛집 분석',
      reviewer: '김철수',
      csv_file_name: 'gangnam_food.csv',
      created_at: '2024-06-27T11:41:32.311141Z',
      status: 'ANALYZING',
      progress_info: {
        images_total_count: 40,
        images_finished_count: 10,
        ai_analyzing_duration: 120,
        stores_total_count: 50,
        stores_completed_count: 10,
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
        images_total_count: 100,
        images_finished_count: 80,
        ai_analyzing_duration: 120,
        stores_total_count: 50,
        stores_completed_count: 10,
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
        images_total_count: 100,
        images_finished_count: 100,
        ai_analyzing_duration: 90,
        stores_total_count: 30,
        stores_completed_count: 30,
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
        images_total_count: 100,
        images_finished_count: 10,
        ai_analyzing_duration: 120,
        stores_total_count: 50,
        stores_completed_count: 10,
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
        images_total_count: 100,
        images_finished_count: 80,
        ai_analyzing_duration: 150,
        stores_total_count: 80,
        stores_completed_count: 45,
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
        images_total_count: 100,
        images_finished_count: 100,
        ai_analyzing_duration: 110,
        stores_total_count: 40,
        stores_completed_count: 40,
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
        images_total_count: 100,
        images_finished_count: 80,
        ai_analyzing_duration: 130,
        stores_total_count: 60,
        stores_completed_count: 5,
      },
    },
  ],
};

export const dashboardHandlers = [
  http.get('/api/v1/projects', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const size = parseInt(url.searchParams.get('size') || '10');

    // 페이지네이션
    const start = (page - 1) * size;
    const end = start + size;
    const projects = mockProjects.projects.slice(start, end);

    const response: ProjectListResponse = {
      projects,
      page_info: {
        total_pages: Math.ceil(mockProjects.projects.length / size),
        current_page: page,
        size,
      },
    };

    return HttpResponse.json(response);
  }),

  http.put('/api/v1/projects/:projectId', async ({ request, params }) => {
    const { projectId } = params;
    const body = (await request.json()) as { name?: string; reviewer?: string };

    const project = mockProjects.projects.find(
      project => project.id === projectId
    );

    if (!project) {
      return HttpResponse.json(
        { detail: 'Project not found' },
        { status: 404 }
      );
    }

    if (body.name) project.name = body.name;
    if (body.reviewer) project.reviewer = body.reviewer;

    return HttpResponse.json({ id: project.id });
  }),
];
