import * as RadixTabs from '@radix-ui/react-tabs';
import { styled } from 'styled-system/jsx';

const Root = styled(RadixTabs.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const List = styled(RadixTabs.List, {
  base: {
    display: 'flex',
    gap: '1.25rem',
  },
});

const Trigger = styled(RadixTabs.Trigger, {
  base: {
    paddingY: '.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: 'text.sub',
    bg: 'transparent',
    border: 'none',
    borderBottom: '2.4px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',

    _hover: {
      color: '#121619',
    },

    '&[data-state="active"]': {
      color: 'text.dashboard.secondary',
      borderBottomColor: 'text.dashboard.secondary',
    },
  },
});

const Content = styled(RadixTabs.Content, {
  base: {
    paddingTop: '1.5rem',
    outline: 'none',
  },
});

const Tabs = {
  Root,
  List,
  Trigger,
  Content,
};

export default Tabs;
