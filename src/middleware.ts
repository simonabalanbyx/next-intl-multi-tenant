import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
// Import the Queue-it connector
import { NextRequest } from 'next/server';

// export default createMiddleware(routing);
const handleI18nRouting = createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', `/(en-us|fr-ca|en-uk|es-mx)/:path*`],
};

export const middleware = async (request: NextRequest) => {
    console.log('middleware');
    // Create the response
    const response = handleI18nRouting(request);

    // Other custom logic goes here
    return response;
};
