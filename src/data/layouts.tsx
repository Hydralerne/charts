import React from 'react';

export type LayoutType = 'grid' | 'list' | 'compact' | 'masonry';

export const layouts: Array<{ id: LayoutType; label: string; icon: React.ReactNode }> = [
  {
    id: 'grid',
    label: 'Grid',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 'list',
    label: 'List',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'compact',
    label: 'Compact',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM14 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM2 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zM8 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2zM14 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM2 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zM8 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2zM14 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
      </svg>
    ),
  },
  {
    id: 'masonry',
    label: 'Masonry',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h5a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM11 2a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V3a1 1 0 011-1h5zM11 10a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1h-5zM2 15a1 1 0 011-1h5a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
      </svg>
    ),
  },
];
