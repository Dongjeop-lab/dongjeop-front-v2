import { Link, useMatches } from 'react-router';

import { css } from 'styled-system/css';

/**
 * Breadcrumb Item 타입
 */
export interface BreadcrumbItem {
  label: string;
  path?: string;
}

/**
 * Breadcrumb 컴포넌트
 * 현재 경로를 기반으로 네비게이션 경로 표시
 *
 * @example
 * ```tsx
 * <Breadcrumb />
 * ```
 */
export function Breadcrumb() {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match) => {
      const breadcrumb = match.handle?.breadcrumb(match);
      return breadcrumb;
    })
    .filter(Boolean) as BreadcrumbItem[];

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '2',
        padding: '4',
        fontSize: '14px',
        color: 'gray.600',
      })}
    >
      {breadcrumbs.map((item, index) => (
        <div
          key={index}
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
          })}
        >
          {index > 0 && (
            <span
              className={css({
                color: 'gray.400',
              })}
            >
              /
            </span>
          )}
          {item.path ? (
            <Link
              to={item.path}
              className={css({
                color: 'gray.600',
                textDecoration: 'none',
                _hover: {
                  color: 'button.primary',
                  textDecoration: 'underline',
                },
              })}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={css({
                color: 'gray.900',
                fontWeight: '500',
              })}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

