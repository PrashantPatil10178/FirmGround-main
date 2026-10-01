import { createFileRoute } from "@tanstack/react-router";
import { FirmGroundHome } from "@/components/FirmGroundHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FirmGround | Technology & Digital Growth Partner" },
      { name: "description", content: "FirmGround helps startups, creators and education businesses build, automate and grow with websites, apps, custom software, CRM, content and digital marketing solutions." },
      { property: "og:title", content: "FirmGround | Technology & Digital Growth Partner" },
      { property: "og:description", content: "Build, automate and grow with one trusted technology and digital growth partner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://firmgroundtechnologies.com" }],
  }),
  component: Index,
});

function Index() {
  return <FirmGroundHome />;
}
