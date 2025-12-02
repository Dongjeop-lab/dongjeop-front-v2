import { Link, useLocation, useMatches } from 'react-router';
import { css } from 'styled-system/css';

/**
 * Breadcrumb Item 타입
 */
export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface RouteHandle {
  breadcrumb?: (
    match: unknown,
    location: ReturnType<typeof useLocation>
  ) => BreadcrumbItem | BreadcrumbItem[];
}

/**
 * Breadcrumb 컴포넌트
 * Figma 디자인 기반
 */
const Breadcrumb = () => {
  const matches = useMatches();
  const location = useLocation();

  const breadcrumbs = matches
    .filter(match => {
      const handle = match.handle as RouteHandle | undefined;
      return handle?.breadcrumb;
    })
    .flatMap(match => {
      const handle = match.handle as RouteHandle;
      const result = handle.breadcrumb?.(match, location);
      return result ? (Array.isArray(result) ? result : [result]) : [];
    })
    .filter(Boolean) as BreadcrumbItem[];

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '3',
        height: '70px',
        paddingX: '6',
        paddingY: '24px',
        backgroundColor: 'white',
        fontSize: '16px',
      })}
    >
      {breadcrumbs.map((item, index) => (
        <div
          key={index}
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '3',
          })}
        >
          {index > 0 && (
            <span
              className={css({
                color: '#9CA3AF',
                fontSize: '16px',
              })}
            >
              /
            </span>
          )}
          {item.path ? (
            <Link
              to={item.path}
              state={location.state}
              className={css({
                color: '#697077',
                textDecoration: 'none',
                fontWeight: '500',
                _hover: {
                  color: 'button.primary',
                },
              })}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={css({
                color: '#374151',
                fontWeight: '700',
              })}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
