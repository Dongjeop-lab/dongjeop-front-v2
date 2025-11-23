import { css } from 'styled-system/css';

import { QueryProvider } from './lib/query-provider';

const App = () => {
  return (
    <QueryProvider>
      <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
        Hello 🐼!
      </div>
    </QueryProvider>
  );
};

export default App;
