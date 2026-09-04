import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Education } from "@/components/site/Education";
import { Skills } from "@/components/site/Skills";
import { Projects } from "@/components/site/Projects";
import { Certifications } from "@/components/site/Certifications";
import { Brand } from "@/components/site/Brand";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const TITLE = "Tharak Gumpu — AI & ML Portfolio";
const DESCRIPTION =
  "Portfolio of Tharak Gumpu, a 3rd-year B.Tech student in Artificial Intelligence & Machine Learning based in Hyderabad, India — projects, skills and certifications.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Tharak Gumpu",
          jobTitle: "B.Tech Student | Artificial Intelligence Enthusiast",
          email: "mailto:tharakvarma8@gmail.com",
          telephone: "9063125997",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            addressCountry: "IN",
          },
          alumniOf: "Scient Institute of Technology",
          sameAs: [
            "https://linkedin.com/in/tharak-varma-3a04bb326",
            "https://github.com/Tharakvarma",
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="glass sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-xl focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Brand />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
