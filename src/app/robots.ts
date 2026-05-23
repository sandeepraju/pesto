import type { MetadataRoute } from "next";
import config from "../data/config.json";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = config.siteUrl.replace(/\/+$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
