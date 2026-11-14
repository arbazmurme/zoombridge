import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZoomBridge Research — B2B Demand Generation & Market Intelligence",
    short_name: "ZoomBridge",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#080F20",
    theme_color: "#1E5EFF",
    icons: [
      {
        src: "/assets/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/assets/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
