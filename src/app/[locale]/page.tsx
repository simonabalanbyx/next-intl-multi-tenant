import styles from "./page.module.css";
import LocaleSelect from "@/i18n/LocaleSelect";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LocaleSelect />
        <h1 className={styles.title}>{t("title")}</h1>
      </main>
    </div>
  );
}
