import { styled } from '../../styled-system/jsx';

const Root = styled('table', {
  base: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
});

const Head = styled('thead', {
  base: {
    fontSize: '0.875rem',
    fontWeight: 'semibold',
    bg: '#F2F4F8',
  },
});

const Body = styled('tbody', {
  base: {
    fontSize: '0.875rem',
    fontWeight: 'medium',
  },
});

const Row = styled('tr', {
  base: {
    borderBottom: '1px solid #DDE1E6',
    _last: {
      borderBottom: 'none',
    },
  },
});

const HeaderCell = styled('th', {
  base: {
    padding: '10px 12px',
    color: '#121619',
    fontWeight: '600',
    lineHeight: '1.25rem',
    whiteSpace: 'nowrap',
  },
  variants: {
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    borderLeft: {
      true: { borderLeft: '1px solid #DDE1E6' },
    },
    borderRight: {
      true: { borderRight: '1px solid #DDE1E6' },
    },
  },
});

const Cell = styled('td', {
  base: {
    padding: '12px',
    height: '84px',
    // maxHeight: '84px',
    color: '#121619',
    verticalAlign: 'middle',
  },
  variants: {
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    borderLeft: {
      true: { borderLeft: '1px solid #DDE1E6' },
    },
    borderRight: {
      true: { borderRight: '1px solid #DDE1E6' },
    },
  },
});

const Table = {
  Root,
  Head,
  Body,
  Row,
  HeaderCell,
  Cell,
};

export default Table;
