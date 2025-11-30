import { useState } from 'react';

import { CreateProjectModal } from './_components/create-project-modal';

/**
 * 대시보드 페이지 (프로젝트 목록)
 * Path: /
 */
export default function DashboardPage() {
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
}
