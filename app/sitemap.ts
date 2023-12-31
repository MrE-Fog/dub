import prisma from "#/lib/prisma";
import { headers } from "next/headers";
import { allChangelogPosts, allLegalPosts } from "contentlayer/generated";
import { isHomeHostname } from "#/lib/utils";

export default async function Sitemap() {
  const headersList = headers();
  let domain = headersList.get("host") as string;
  if (isHomeHostname(domain)) domain = "dub.sh";

  const links = await prisma.link.findMany({
    where: {
      domain,
      publicStats: true,
    },
    select: {
      domain: true,
      key: true,
    },
    orderBy: {
      clicks: "desc",
    },
    take: 100,
  });

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...(domain === "dub.sh"
      ? [
          {
            url: `https://${domain}/pricing`,
            lastModified: new Date(),
          },
          {
            url: `https://${domain}/changelog`,
            lastModified: new Date(),
          },
          ...allChangelogPosts.map((post) => ({
            url: `https://${domain}/changelog/${post.slug}`,
            lastModified: new Date(),
          })),
          {
            url: `https://${domain}/metatags`,
            lastModified: new Date(),
          },
          ...allLegalPosts.map((post) => ({
            url: `https://${domain}/${post.slug}`,
            lastModified: new Date(),
          })),
        ]
      : []),
    ...links.map(({ key }) => ({
      url: `https://${domain}/stats/${key}`,
      lastModified: new Date(),
    })),
  ];
}
