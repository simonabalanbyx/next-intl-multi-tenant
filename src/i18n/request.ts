import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";
import { headers } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  const domainData = await getDomainData();
  
  console.log('getRequestConfig', locale, domainData);

  if (domainData) {
    if (!locale || !domainData.locales.includes(locale as Locale)) {
      locale = domainData.defaultLocale;
    }
  }

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../dictionaries/${locale}.json`)).default,
  };
});

export const getDomainData = async () => {
  const headersList = await headers();
  const domain = headersList.get("x-forwarded-host");

  const domainData = routing?.domains?.find(
    (routeDomain) => routeDomain.domain === domain
  );
  return domainData;
};
