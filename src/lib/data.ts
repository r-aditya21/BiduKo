export interface WorkItem {
  id: string;
  index: string;
  name: string;
  category: string;
  description: string;
  gradient: string;
  image?: string;
  link?: string;
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: "Trisha Enterprises",
    image: "/images/projects/trisha.png",
    index: "01",
    link: "https://trisha-enterprises-omega.vercel.app/",
    name: "Trisha Enterprises",
    category: "Brand Experience / Web Design — 2026",
    description: "A full identity and site rebuild for a fintech startup going from pitch deck to public launch.",
    gradient: "linear-gradient(135deg, #DCE4FF, #EEF0F2)",
  },
  {
    id: "fieldnote",
    index: "02",
    name: "Fieldnote",
    category: "Travel Platform / Product Development — 2025",
    description: "Trip-planning software for small tour operators, built to work offline in the field.",
    gradient: "linear-gradient(135deg, #FFE3D8, #EEF0F2)",
  },
  {
    id: "halcyon",
    index: "03",
    name: "Halcyon",
    category: "Branding / Digital Experience — 2025",
    description: "A calm, editorial identity for a wellness studio expanding into three new cities.",
    gradient: "linear-gradient(135deg, #E6E1FF, #EEF0F2)",
  },
  {
    id: "vantage",
    index: "04",
    name: "Vantage",
    category: "AI Product / Web Development — 2026",
    description: "Dashboard and marketing site for an AI forecasting tool used by retail buyers.",
    gradient: "linear-gradient(135deg, #D8F5E8, #EEF0F2)",
  },
];

export interface ServiceItem {
  index: string;
  name: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    index: "01",
    name: "Strategy",
    description: "Figuring out what to build before anyone touches a keyboard.",
  },
  {
    index: "02",
    name: "Branding",
    description: "Names, marks and systems that hold together across every surface.",
  },
  {
    index: "03",
    name: "UI / UX Design",
    description: "Interfaces that make sense on the first try, not the fifth.",
  },
  {
    index: "04",
    name: "Web Development",
    description: "Fast, accessible, production-grade builds — no dead-end demos.",
  },
  {
    index: "05",
    name: "Creative Development",
    description: "The animation, motion and detail work that makes a site feel alive.",
  },
  {
    index: "06",
    name: "AI & Automation",
    description: "Wiring the boring parts of the business so they run themselves.",
  },
];

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export const STATS: StatItem[] = [
  { target: 15, suffix: "+", label: "Projects Shipped" },
  { target: 8, suffix: "+", label: "Brands Built" },
  { target: 3, suffix: "+", label: "Years Creating" },
  { target: 100, suffix: "%", label: "Obsessed With Details" },
];

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    description: "Understand the idea, the audience and the actual problem underneath the request.",
  },
  {
    index: "02",
    title: "Define",
    description: "Set the strategy and creative direction everything else gets measured against.",
  },
  {
    index: "03",
    title: "Design",
    description: "Build the visual and interaction system — not just screens, but how they behave.",
  },
  {
    index: "04",
    title: "Develop",
    description: "Turn the design into a fast, responsive, production-ready build.",
  },
  {
    index: "05",
    title: "Launch",
    description: "Ship it, watch how it performs, and keep improving it after go-live.",
  },
];

export interface WhyItem {
  title: string;
  subtitle?: string;
  description: string;
}

export const WHY_ITEMS: WhyItem[] = [
  {
    title: "Small team.",
    subtitle: "Big ideas.",
    description: "No layers of account managers. You talk to the people building your project.",
  },
  {
    title: "Design + Technology.",
    description: "The same team shapes how it looks and how it runs — nothing gets lost in translation.",
  },
  {
    title: "Fast execution.",
    description: "Weeks, not quarters. We scope tight so we can move quickly without cutting corners.",
  },
  {
    title: "Human-centered.",
    description: "We design for the person using it, not for the awards jury.",
  },
];
