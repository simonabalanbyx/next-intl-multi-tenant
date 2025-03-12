import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
// Import the Queue-it connector
import { NextRequest } from "next/server";

// export default createMiddleware(routing);
const handleI18nRouting = createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export const middleware = async (request: NextRequest) => {
  console.log("middleware", request.nextUrl.href);
  // Create the response
  const response = handleI18nRouting(request);

  // Other custom logic goes here
  return response;
};
