import { useState } from 'react';
import { Link } from 'react-router';

import { CreateProjectModal } from './_components/create-project-modal';

/**
 * 대시보드 페이지 (프로젝트 목록)
 * Path: /
 */
const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  // TODO: API에서 프로젝트 목록 가져오기
  const projects = [
    { id: '1', name: '프로젝트이름공백포함15차' },
    { id: '2', name: '동집LAB_성수동' },
  ];

  return (
    <div>
      <h1>프로젝트 목록</h1>

      {/* 프로젝트 카드 목록 */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
        {projects.map(project => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            state={{ projectName: project.name }} // 👈 프로젝트 이름 전달
            style={{
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h3>{project.name}</h3>
            <p>프로젝트 ID: {project.id}</p>
          </Link>
        ))}
      </div>

      <CreateProjectModal
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default DashboardPage;
