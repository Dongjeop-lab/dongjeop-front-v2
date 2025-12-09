import { css } from 'styled-system/css';

import { CreateProjectButton } from './_components/create-project-button';
import { ProjectCard } from './_components/project-card';
import { useSuspenseProjects } from './_hooks/useSuspenseProjects';

/**
 * 대시보드 페이지 (프로젝트 목록)
 * Path: /
 */
const DashboardPage = () => {
  const { data } = useSuspenseProjects();

  const projects = data.projects;

  return (
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
  );
};

export default DashboardPage;
