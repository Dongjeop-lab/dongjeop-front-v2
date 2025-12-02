import { css } from 'styled-system/css';

import type { Project } from '@/pages/dashboard/_types/project';

import { CreateProjectButton } from './_components/create-project-button';
import { ProjectCard } from './_components/project-card';

const DUMMY_PROJECTS: Project[] = [];

/**
 * 대시보드 페이지 (프로젝트 목록)
 * Path: /
 */
const DashboardPage = () => {
  return (
    <div
      className={css({
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
    </div>
  );
};

export default DashboardPage;
