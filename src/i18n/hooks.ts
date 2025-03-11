import { useEffect, useState } from "react";
import { routing } from "./routing";

export const useDomainData = () => {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    setDomain(window.location.host);
  }, []);

  const domainData = routing.domains!.find(
    (routeDomain) => routeDomain.domain === domain
  );

  return domainData;
};
