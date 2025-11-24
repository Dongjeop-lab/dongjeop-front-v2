import { useState } from 'react';
import { css } from 'styled-system/css';

import Modal from './components/modal';
import { QueryProvider } from './lib/query-provider';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QueryProvider>
      <div
        className={css({ fontSize: '2xl', fontWeight: 'bold' })}
        onClick={() => setIsOpen(true)}
      >
        Hello 🐼!
      </div>
      <Modal
        open={isOpen}
        title='Modal'
        onOpenChange={setIsOpen}
      >
        <p>Modal content</p>
      </Modal>
    </QueryProvider>
  );
};

export default App;
