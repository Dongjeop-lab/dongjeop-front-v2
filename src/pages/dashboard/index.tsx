import { useState } from 'react';

import { CreateProjectModal } from './components/create-project-modal';

/**
 * 대시보드 페이지
 * Path: /
 */
const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <h1>프로젝트 목록</h1>
      <CreateProjectModal
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default DashboardPage;
