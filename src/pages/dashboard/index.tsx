import { useState } from 'react';
import { css } from 'styled-system/css';

import Pagination from '@/components/pagination';

import { CreateProjectButton } from './_components/create-project-button';
import { ProjectCard } from './_components/project-card';
import { useSuspenseProjects } from './_hooks/useSuspenseProjects';

/**
 * 대시보드 페이지 (프로젝트 목록)
 * Path: /
 */
const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useSuspenseProjects(page);

  const projects = data.projects;
  const pageInfo = data.page_info;

  const handleUpdatePage = (newPage: number) => {
    setPage(newPage);
  };

  if (!projects) return null;

  return (
    <>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5rem',
        })}
      >
        <div
          className={css({
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          })}
        >
          <CreateProjectButton />
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
        <Pagination
          totalItems={pageInfo.size * pageInfo.total_pages}
          currentPage={page}
          itemsPerPage={pageInfo.size}
          onPageChange={handleUpdatePage}
        />
      </div>
    </>
  );
};

export default DashboardPage;
