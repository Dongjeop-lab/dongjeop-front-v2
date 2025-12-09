export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (page: number = 1, size: number = 10) =>
    [...projectKeys.lists(), { page, size }] as const,
};
