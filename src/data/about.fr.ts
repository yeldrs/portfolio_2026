// src/data/about.fr.ts
// [FR TODO] placeholder copy — replace every marked field with the user's
// already-translated CV/about content. Structure must stay in sync with about.en.ts.

import type { AboutData } from "./about.types";

export const about: AboutData = {
  introHeading: "[FR TODO] My name is Yassine and I'm a Product designer.",
  introBody: "[FR TODO] intro body",
  introCta: "[FR TODO] Let's connect",

  experienceHeading: "[FR TODO] Experience",
  professionalExperience: [
    {
      title: "[FR TODO] UX Product Designer",
      company: "900.care - D2C Startup",
      duration: "Sept. 2024 - Sept. 2025 (Paris)",
      highlights: ["[FR TODO] highlight"],
      trackingSlug: "900-care",
      cvLink: "/documents/Resume_UXDESIGNEROPS_EL_IDRISSI_YASSINE.pdf",
      cvLinkLabel: "[FR TODO] Download my resume to see more",
    },
    {
      title: "[FR TODO] Web Designer",
      company: "Freelance",
      duration: "2023 - 2024 (Remote)",
      highlights: ["[FR TODO] highlight"],
      trackingSlug: "freelance-web",
    },
    {
      title: "[FR TODO] Art Director",
      company: "Freelance",
      duration: "June. 2022 - Jan. 2023 (Paris)",
      highlights: ["[FR TODO] highlight"],
      trackingSlug: "freelance-da",
    },
    {
      title: "[FR TODO] Art Director",
      company: "Maison Le Roux - Food Industry",
      duration: "March 2021 - July 2022 (Paris)",
      highlights: ["[FR TODO] highlight"],
      trackingSlug: "maison-le-roux",
    },
  ],

  toolkitHeading: "[FR TODO] My toolkit for impact",
  skillSections: [
    {
      title: "[FR TODO] Core Design & Tools",
      skills: [
        { title: "[FR TODO] End-to-end design", description: "[FR TODO] description" },
        { title: "[FR TODO] Figma / Loveable / Framer", description: "[FR TODO] description" },
        { title: "[FR TODO] Adobe Suite / Affinity", description: "[FR TODO] description" },
        { title: "[FR TODO] Web coding", description: "[FR TODO] description" },
      ],
    },
    {
      title: "[FR TODO] Methodology & Business",
      skills: [
        { title: "[FR TODO] Data & UX analytics", description: "[FR TODO] description" },
        { title: "[FR TODO] Data-driven design", description: "[FR TODO] description" },
        { title: "[FR TODO] Agile & autonomy", description: "[FR TODO] description" },
        { title: "[FR TODO] Communication & collaboration", description: "[FR TODO] description" },
      ],
    },
    {
      title: "[FR TODO] Tech Imperatives",
      skills: [
        { title: "[FR TODO] Accessibility", description: "[FR TODO] description" },
        { title: "[FR TODO] AI & automation", description: "[FR TODO] description" },
        { title: "[FR TODO] Sustainable & responsible design", description: "[FR TODO] description" },
        { title: "[FR TODO] Care-design & health-tech", description: "[FR TODO] description" },
      ],
    },
  ],

  significantWorkHeading: "[FR TODO] Significant Work",
  significantWork: [
    { title: "[FR TODO] FoodTech - Batchcooking plateform", description: "[FR TODO] description" },
    { title: "[FR TODO] Sustainable agile toolkit - Caisse des Dépôts", description: "[FR TODO] description" },
    { title: "[FR TODO] Animal Health - Digital Support Service", description: "[FR TODO] description" },
  ],

  educationHeading: "[FR TODO] Education",
  educationExperience: [
    {
      year: "2024-2025",
      title: "[FR TODO] Master in Project Management and UX Design",
      school: "ISCOD, France (Intensive 12-month program under an apprenticeship contract)",
    },
    {
      year: "2020-2022",
      title: "[FR TODO] Master in Digital Design",
      school: "École de Design Nantes Atlantique, France",
    },
    {
      year: "2016-2019",
      title: "[FR TODO] Bachelor in Graphic Design",
      school: "Quasar Institute for Advanced Design, Rome, Italy",
    },
  ],
};
