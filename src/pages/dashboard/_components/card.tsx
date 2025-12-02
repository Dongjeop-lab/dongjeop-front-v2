import type { PropsWithChildren } from 'react';
import { css, cx } from 'styled-system/css';

interface CardProps extends PropsWithChildren {
  as?: React.ElementType;
  className?: string;
  onClick?: VoidFunction;
}

export const Card = ({ children, className, as, onClick }: CardProps) => {
  const Component = as || 'section';
  return (
    <Component
      className={cx(
        css({
          padding: '1.5rem',
          backgroundColor: 'white',
          border: '1px solid #6B728012',
          borderRadius: '1.5rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          _hover: {
            border: '1px solid #6B728040',
          },
        }),
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
