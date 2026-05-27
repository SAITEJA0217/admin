export const APP_CONFIG = {
  APP_NAME: 'Venture Launcher Admin OS',
  APP_VERSION: '0.1.0',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.venturelauncher.in/api/v1',
  SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'https://api.venturelauncher.in',
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },
  THEME: {
    DEFAULT: 'dark',
  },
  DATE_FORMAT: 'MMM dd, yyyy',
  TIME_FORMAT: 'h:mm a',
  DATETIME_FORMAT: 'MMM dd, yyyy h:mm a',
} as const;
