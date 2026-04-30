import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Logos & Legacy",
    short_name: "LogosLegacy",
    description:
      "An installable Bible study and church history app for Scripture, theology, and church history.",
    start_url: "/",
    display: "standalone",
    background_color: "#041126",
    theme_color: "#081a39",
    orientation: "portrait",
    icons: [
      {
        src: "/assets/art/catholic-icon.png",
        sizes: "1248x1248",
        type: "image/png",
      },
    ],
  };
}
