import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const FR_CA = 'fr-ca';
export const EN_US = 'en-us';
export const EN_UK = 'en-uk';
export const ES_MX = 'es-mx';

export type Locale = typeof EN_US | typeof FR_CA | typeof EN_UK | typeof ES_MX;
export const DEFAULT_LOCALE: Locale = EN_US;

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: [EN_US, FR_CA, EN_UK, ES_MX],

    // Used when no locale matches
    defaultLocale: DEFAULT_LOCALE,
    localeDetection: true,
    localePrefix: 'always',
    domains: [
        {
          domain: 'localhost:3000',
          defaultLocale: EN_UK as Locale,
          // Optionally restrict the locales available on this domain
          locales: [EN_UK, ES_MX] as Locale[]
        },
        {
          domain: 'localhost:3001',
          defaultLocale: FR_CA as Locale,
          locales: [FR_CA, ES_MX] as Locale[]
          // If there are no `locales` specified on a domain,
          // all available locales will be supported here
        }
      ]
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
