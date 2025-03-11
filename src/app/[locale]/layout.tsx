import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { DEFAULT_LOCALE, Locale, routing } from "@/i18n/routing";
import './globals.css';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  console.log("locale", locale);
  const localeFound = routing.locales.includes(locale as Locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({
    locale: localeFound ? locale : DEFAULT_LOCALE,
  });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
