"use client";

import { useState } from "react";
import { usePathname, useRouter } from "./routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useDomainData } from "./hooks";

export default function LocaleSelect() {
  const currentLocale = useLocale();
  const [locale, setLocale] = useState(currentLocale);
  const domainData = useDomainData();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const changeHandler = (event: { target: { value: string } }) => {
    const newLocale = event.target.value as string;

    setLocale(newLocale);
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: newLocale }
    );
  };

  return (
    <select id="demo-simple-select" value={locale} onChange={changeHandler}>
      {domainData?.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}
