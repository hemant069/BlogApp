import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/profile/", "/create-post/"],
    },
    sitemap: "https://mindverse.vercel.app/sitemap.xml",
  };
}
