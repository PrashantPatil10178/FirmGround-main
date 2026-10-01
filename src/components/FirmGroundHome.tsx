import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useTheme, type ThemePreference } from "@/lib/theme";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  CirclePlay,
  Code2,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Menu,
  Monitor,
  Moon,
  MessageCircle,
  MonitorSmartphone,
  PenTool,
  Phone,
  PlaySquare,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Target,
  Users,
  Video,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

const BLOG_URL = "https://blogs.firmgroundtechnologies.com";
const WHATSAPP_URL = "https://wa.me/918329034989";
const LMS_PRODUCT_URL = "";
const CRMASTER_URL = "https://crmaster.in";
const CRMASTER_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.crmmaster.app";
// Hidden until real client videos are ready.
const SHOW_VIDEO_FEEDBACK = false;
const LINKEDIN_URL = "";
const INSTAGRAM_URL = "";
const YOUTUBE_URL = "";

const announcement = { text: "Meet CRMaster — our CRM for managing leads, conversations and follow-ups in one place.", cta: "Visit CRMaster", url: "https://crmaster.in" };

const heroWords = ["technology", "websites", "apps", "software", "content", "growth"];

type ServiceGroup = "build" | "create" | "grow";
type Service = { title: string; need: string; description: string; icon: LucideIcon; group: ServiceGroup };

const serviceGroups: { id: ServiceGroup; label: string; summary: string }[] = [
  { id: "build", label: "Build", summary: "Websites, apps and custom software" },
  { id: "create", label: "Create", summary: "Video, thumbnails and channel management" },
  { id: "grow", label: "Grow", summary: "Ads, automation and digital growth" },
];

const services: Service[] = [
  { title: "Website Development", need: "a website", group: "build", description: "Fast, modern and conversion-focused websites built around your business.", icon: MonitorSmartphone },
  { title: "Android App Development", need: "an Android app", group: "build", description: "Reliable Android applications designed for smooth experiences and scalable growth.", icon: Smartphone },
  { title: "iOS App Development", need: "an iOS app", group: "build", description: "Premium iOS applications built around performance, usability and your business goals.", icon: Sparkles },
  { title: "Custom CRM & Software", need: "a custom CRM or software", group: "build", description: "Custom systems, CRM platforms and business software designed around the way your team actually works.", icon: LayoutDashboard },
  { title: "Video Editing", need: "video editing", group: "create", description: "Professional editing that turns raw footage into polished, engaging content.", icon: Video },
  { title: "Thumbnail Creation", need: "thumbnails", group: "create", description: "Clean, attention-grabbing thumbnails designed to improve the presentation of your content.", icon: PenTool },
  { title: "Video SEO", need: "video SEO", group: "create", description: "Optimize your video content for discoverability, search visibility and sustainable audience growth.", icon: Search },
  { title: "YouTube Channel Management", need: "YouTube channel management", group: "create", description: "End-to-end support across research, scripts, uploads, optimization, SEO and reporting.", icon: PlaySquare },
  { title: "Meta Ads", need: "Meta ads", group: "grow", description: "Performance-focused Facebook and Instagram campaigns built around leads, conversions and growth.", icon: Target },
  { title: "Google Ads", need: "Google Ads", group: "grow", description: "Intent-driven campaigns connecting your business with people actively searching for what you offer.", icon: BarChart3 },
  { title: "Digital Growth & Automation", need: "growth and automation", group: "grow", description: "Connect technology, marketing and workflows to reduce manual work and create scalable growth systems.", icon: Bot },
];

const crmaster = {
  name: "CRMaster",
  label: "CRM SaaS · Web + Android",
  tagline: "All leads, one system.",
  description: "A CRM platform designed to help businesses manage leads, conversations, follow-ups and sales operations from one place.",
  logo: "/products/crmaster/logo.webp",
  logoDark: "/products/crmaster/logo-dark.webp",
  appIcon: "/products/crmaster/app-icon.webp",
  android: "Call leads, record voice notes against calls and mark attendance from your phone.",
};

// Each feature exists in the CRMaster codebase; screenshots are from crmaster.in and use demo data.
const crmasterFeatures = [
  { id: "leads", label: "Leads", title: "Every lead in one list", body: "Capture leads from every source with custom fields, statuses, priorities and owners — then search, filter, import or export them.", image: "/products/crmaster/leads.webp", path: "leads" },
  { id: "work", label: "Work queue", title: "Work leads without switching tabs", body: "Open a lead to call, WhatsApp, email or SMS it, update its status and log the outcome from one screen.", image: "/products/crmaster/pipeline.webp", path: "campaigns / work" },
  { id: "calls", label: "Calls", title: "Click-to-call with full call logs", body: "Call from the CRM, keep logs and recordings, and track connect rate and talk time across the team.", image: "/products/crmaster/calls.webp", path: "calls" },
  { id: "campaigns", label: "Campaigns", title: "Campaigns across every channel", body: "Run email, SMS, WhatsApp and calling campaigns and follow how each one moves its leads.", image: "/products/crmaster/campaigns.webp", path: "campaigns" },
  { id: "leaderboard", label: "Leaderboard", title: "See how every agent is doing", body: "Calls, follow-ups, conversions and revenue per agent — by day, week, month or a custom range.", image: "/products/crmaster/analytics.webp", path: "leaderboard" },
  { id: "auto-assign", label: "Auto-assign", title: "Route new leads automatically", body: "Send leads from Instagram, Facebook, Google Ads and your website to the right agent as they arrive.", image: "/products/crmaster/webhook-automation.webp", path: "auto-assign" },
];

const crmasterExtras = ["Tasks & follow-ups", "Attendance with selfie & location", "Payments: cash, UPI, card, bank", "Team roles & permissions", "Activity timeline", "Global search"];

const lms = { name: "LMS", label: "Learning Management System", path: "lms / courses", description: "A learning management platform designed for education businesses to manage courses, learners, content and digital learning operations.", url: LMS_PRODUCT_URL };

// Logos are sourced from each client's own website and stored in /public/clients.
// `sector` is taken from the client's site title or logo; `tile` matches a logo's own background.
type WorkItem = { name: string; url: string; sector: string; logo: string; logoWidth: number; logoHeight: number; tile?: string };

const work: WorkItem[] = [
  { name: "EasyLearning", url: "https://easylearning.live", sector: "Maharashtra Board coaching", logo: "/clients/easylearning.webp", logoWidth: 520, logoHeight: 119 },
  { name: "TrueBricks", url: "https://truebricks.in", sector: "Real estate", logo: "/clients/truebricks.webp", logoWidth: 546, logoHeight: 112 },
  { name: "GreenSecure", url: "https://greensecure.in", sector: "Energy", logo: "/clients/greensecure.webp", logoWidth: 480, logoHeight: 230 },
  { name: "Sakshar Academy", url: "http://saksharacademy.in", sector: "Educational institute", logo: "/clients/sakshar-academy.webp", logoWidth: 267, logoHeight: 275 },
  { name: "Future Edge Online", url: "https://futureedgeonline.com", sector: "Educational services", logo: "/clients/future-edge.webp", logoWidth: 467, logoHeight: 185 },
  { name: "GBT Wholesale", url: "https://gbtwholesale.in", sector: "Wholesale sarees", logo: "/clients/gbt-wholesale.webp", logoWidth: 520, logoHeight: 87 },
];

const values = [
  ["Long-Term Partnerships", "We're interested in what happens after launch, not just completing another project."],
  ["Reliable Execution", "Clear commitments, practical communication and a focus on delivering what was promised."],
  ["Technology + Growth Together", "Development, automation, content and marketing work together instead of across disconnected vendors."],
  ["Business-First Solutions", "Technology should solve real problems and make your business easier to operate."],
  ["Ongoing Support", "We stay available as your technology and digital needs evolve."],
];

const process = [
  ["Understand", "We learn your business, challenges, audience and what you actually need."],
  ["Plan", "We turn the requirement into a clear strategy, scope and execution plan."],
  ["Build", "We design, develop or execute the solution while keeping communication clear."],
  ["Launch", "We test, refine and launch with attention to the details that matter."],
  ["Grow", "We keep supporting, improving and helping you get more value from what we've built."],
];

const audiences: { title: string; phrase: string; body: string; icon: LucideIcon }[] = [
  { title: "Startups", phrase: "startup", body: "From first website or MVP to custom systems and scalable digital growth.", icon: Zap },
  { title: "Creators", phrase: "creator brand", body: "Systems, content operations and a digital presence built around your audience.", icon: Video },
  { title: "Education Businesses", phrase: "education business", body: "Websites, learning platforms, apps, content and growth support designed for education.", icon: GraduationCap },
];

const insights = [
  ["Technology", "Building digital foundations that can scale"],
  ["Business Automation", "Where automation creates the most business value"],
  ["Digital Growth", "Connecting content, campaigns and conversion"],
];

const faqs = [
  ["What kind of businesses does FirmGround work with?", "FirmGround primarily works with startups, creators and education businesses, while also supporting other businesses that need technology or digital growth solutions."],
  ["Can FirmGround handle both development and marketing?", "Yes. Our model combines technology and digital growth, allowing businesses to work with one partner across development, automation, content and marketing."],
  ["Do you build custom CRM and software?", "Yes. We build custom CRM platforms and software based on the workflow and requirements of the business."],
  ["Do you provide ongoing support after a project launches?", "Yes. Long-term relationships are an important part of how we work. Depending on the engagement, we can continue supporting, maintaining and improving what we build."],
  ["Can you manage a YouTube channel end to end?", "Yes. We can support research, scripts, competitor analysis, video editing, thumbnails, uploads, SEO, optimization and reporting while the creator focuses on creating content."],
  ["Do you work with clients outside India?", "Yes. FirmGround is based in India and is positioned to serve businesses globally."],
  ["How much does a project cost?", "Every requirement is different, so we don't use fixed public pricing. Book a free consultation and tell us what you need. We'll understand the requirement before discussing scope and pricing."],
  ["How does the free consultation work?", "Submit the short consultation form with your requirement. After submission, you can continue the conversation directly with us on WhatsApp."],
];

const nav = [
  ["Home", "#home"], ["Services", "#services"], ["Products", "#products"],
  ["Our Work", "#work"], ["Why FirmGround", "#why"], ["Testimonials", "#testimonials"],
  ["Blog", BLOG_URL], ["Contact", "#contact"],
];

/* ---------- motion helpers ---------- */

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Elements already on screen at mount reveal immediately; the rest fade up as they scroll in.
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) { el.dataset["reveal"] = "in"; return; }
    el.dataset["reveal"] = "out";
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { el.dataset["reveal"] = "in"; io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ className = "", delay = 0, children }: { className?: string; delay?: number; children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</div>;
}

// Field of plus-marks that breathes slowly and parts around the pointer.
function SignalField({ className = "", tone = "text-primary" }: { className?: string; tone?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = prefersReducedMotion();
    let ink = getComputedStyle(canvas).color;
    const gap = 26;
    const radius = 150;
    const pointer = { x: -9999, y: -9999, on: 0, target: 0 };
    let width = 0, height = 0, frame = 0, running = false;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      pointer.on += (pointer.target - pointer.on) * 0.08;
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const wave = Math.sin(x * 0.011 + t * 0.0005) * Math.cos(y * 0.014 - t * 0.0004);
          const dx = x - pointer.x, dy = y - pointer.y, dist = Math.hypot(dx, dy) || 1;
          let push = 0;
          if (dist < radius && pointer.on > 0.01) { const f = 1 - dist / radius; push = f * f * (3 - 2 * f) * pointer.on; }
          const px = x + (dx / dist) * push * 18, py = y + (dy / dist) * push * 18;
          const size = 1.4 + (wave + 1) * 0.9 + push * 2.6;
          ctx.globalAlpha = Math.min(0.1 + (wave + 1) * 0.2 + push * 0.55, 1);
          ctx.fillRect(px - size, py - 0.5, size * 2, 1);
          ctx.fillRect(px - 0.5, py - size, 1, size * 2);
        }
      }
      ctx.globalAlpha = 1;
    };
    const loop = (t: number) => { draw(t); frame = requestAnimationFrame(loop); };
    const start = () => { if (!running && !reduce) { running = true; frame = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(frame); };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(0);
    };
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top;
      pointer.target = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height ? 1 : 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()));
    io.observe(canvas);
    // Re-read the ink colour when the theme class on <html> changes.
    const mo = new MutationObserver(() => { ink = getComputedStyle(canvas).color; if (!running) draw(0); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { stop(); ro.disconnect(); io.disconnect(); mo.disconnect(); window.removeEventListener("pointermove", onMove); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${tone} ${className}`} />;
}

function RotatingWord({ words, className = "inline-grid" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setIndex(i => (i + 1) % words.length), 2400);
    return () => window.clearInterval(id);
  }, [words.length]);
  return <span className={`${className} text-primary`}>{words.map((word, i) => <span key={word} className={`[grid-area:1/1] transition-[opacity,transform] ease-out ${i === index ? "translate-y-0 opacity-100 delay-150 duration-300" : "translate-y-1.5 opacity-0 duration-150"}`}>{word}.</span>)}</span>;
}

/* ---------- primitives ---------- */

function Wordmark({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`flex items-center gap-2 text-[1.3rem] font-medium tracking-[-0.03em] ${light ? "text-primary-foreground" : "text-foreground"}`}><span aria-hidden="true" className="grid size-6 place-items-center bg-primary font-mono text-[11px] font-medium text-primary-foreground">FG</span>FirmGround</a>;
}

function Eyebrow({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "brand" | "light" }) {
  const color = { muted: "text-tertiary", brand: "text-primary", light: "text-dark-muted" }[tone];
  return <span className={`block font-mono text-xs font-medium uppercase tracking-[1.8px] ${color}`}>{children}</span>;
}

const bracketTones = {
  primary: { wrap: "text-primary hover:text-foreground", inner: "border-primary bg-primary text-primary-foreground group-hover:border-navy group-hover:bg-navy dark:group-hover:text-background" },
  outline: { wrap: "text-foreground", inner: "border-border bg-paper text-foreground group-hover:border-navy" },
  light: { wrap: "text-primary-foreground", inner: "border-primary-foreground bg-primary-foreground text-dark group-hover:bg-frost group-hover:border-frost" },
};

function BracketLink({ href, children, tone = "primary", external = false, className = "" }: { href: string; children: ReactNode; tone?: keyof typeof bracketTones; external?: boolean; className?: string }) {
  const t = bracketTones[tone];
  return <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className={`bracket group outline-offset-4 ${t.wrap} ${className}`}>
    <span className={`flex items-center justify-center gap-2 border px-5 py-2.5 text-[15px] leading-[1.4] transition-colors ${t.inner}`}>{children}</span>
    <i /><i /><i /><i />
  </a>;
}

function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <a href={href} className={`inline-flex shrink-0 items-center gap-1 border-b border-current pb-0.5 text-[15px] transition-colors ${light ? "text-primary-foreground hover:text-frost" : "text-foreground hover:text-primary"}`}>{children}<ArrowUpRight className="size-4" /></a>;
}

function Section({ id, className = "", innerClassName = "py-20 md:py-28", children }: { id?: string; className?: string; innerClassName?: string; children: ReactNode }) {
  return <section id={id} className={`scroll-mt-20 border-t border-border ${className}`}>
    <div className={`page-shell frame px-4 sm:px-8 ${innerClassName}`}>{children}</div>
  </section>;
}

function SectionHeading({ eyebrow, title, body, action }: { eyebrow?: string; title: string; body?: string; action?: ReactNode }) {
  return <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-[1.75rem] font-normal leading-[1.15] tracking-[-0.03em] text-foreground md:text-[2.5rem]">{title}</h2>
      {body && <p className="mt-4 max-w-[56ch] text-base leading-[1.6] text-muted-foreground">{body}</p>}
    </div>
    {action}
  </Reveal>;
}

/* ---------- sections ---------- */

function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return <div className="bg-dark text-primary-foreground">
    <div className="page-shell flex min-h-10 items-center justify-between gap-4 px-4 py-2 text-xs leading-[1.4] sm:px-8 sm:text-[13px]">
      <a href={announcement.url} target="_blank" rel="noreferrer" className="hover:text-frost">{announcement.text} <span className="underline underline-offset-2">{announcement.cta}</span></a>
      <button type="button" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-1 text-dark-muted hover:text-primary-foreground">Dismiss <X className="size-3.5" /></button>
    </div>
  </div>;
}

function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  return <Button variant="ghost" size="icon" className="rounded-none" aria-label="Toggle dark mode" title="Toggle dark mode" onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}>
    <Moon className="dark:hidden" /><Sun className="hidden dark:block" />
  </Button>;
}

const themeOptions: { value: ThemePreference; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

function ThemeSwitcher() {
  const { preference, setTheme } = useTheme();
  return <div role="radiogroup" aria-label="Color theme" className="inline-flex border border-dark-border p-0.5">
    {themeOptions.map(({ value, label, icon: Icon }) => {
      const checked = preference === value;
      return <button key={value} type="button" role="radio" aria-checked={checked} onClick={() => setTheme(value)} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${checked ? "bg-dark-card text-primary-foreground" : "text-dark-muted hover:text-primary-foreground"}`}><Icon className="size-3.5" />{label}</button>;
    })}
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur-xl">
    <div className="page-shell frame flex h-[4.5rem] items-center justify-between px-4 sm:px-8">
      <Wordmark />
      <nav className="hidden items-center xl:flex" aria-label="Primary navigation">
        {nav.map(([label, href]) => <a key={label} href={href} className="border border-transparent px-[0.8rem] py-2.5 text-[15px] leading-none text-foreground transition-colors hover:border-border">{label}</a>)}
      </nav>
      <div className="flex items-center gap-1 xl:gap-3"><ThemeToggle /><div className="hidden xl:block"><BracketLink href="#contact">Book a consultation</BracketLink></div>
      <Button variant="ghost" size="icon" className="rounded-none xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </div>
    {open && <nav className="border-t border-border bg-paper xl:hidden" aria-label="Mobile navigation">
      <div className="page-shell frame flex flex-col px-4 py-4 sm:px-8">{nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="border-b border-border py-3.5 text-[15px] text-foreground last:border-b-0 hover:text-primary">{label}</a>)}<div className="mt-4"><BracketLink href="#contact">Book a Free Consultation</BracketLink></div></div>
    </nav>}
  </header>;
}

function Hero() {
  return <section id="home" className="scroll-mt-20">
    <div className="page-shell frame relative overflow-hidden">
      <SignalField className="hero-field absolute inset-0 h-full w-full" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center space-y-8 px-4 py-20 text-center sm:px-8 md:py-28 lg:py-32">
        <Eyebrow tone="brand">Technology + Digital Growth Partner</Eyebrow>
        <h1 className="text-[2.5rem] font-normal leading-[1.08] tracking-[-0.035em] text-foreground sm:text-[3.25rem] lg:text-[4rem]">
          <span className="sr-only">We build technology. You build the business.</span>
          {/* The rotating word sits on its own centred line so shorter words don't pull the headline off-centre. */}
          <span aria-hidden="true">We build<RotatingWord words={heroWords} className="grid justify-items-center" />You build the business.</span>
        </h1>
        <p className="max-w-xl text-lg leading-[1.6] text-muted-foreground">FirmGround helps startups, creators and education businesses build, automate and grow digitally — from websites, apps and custom software to marketing, content and digital growth.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <BracketLink href="#contact">Book a Free Consultation</BracketLink>
          <BracketLink href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi FirmGround, I'd like to discuss a requirement with your team.")}`} tone="outline" external>Chat on WhatsApp</BracketLink>
        </div>
        <p className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[1.2px] text-tertiary"><ShieldCheck className="size-4 text-success" /> From India, serving businesses globally</p>
      </div>
    </div>
  </section>;
}

// Wide wordmarks render shorter and square badges taller, so every logo reads at a similar size.
function markHeight(width: number, height: number) {
  return Math.min(48, Math.round(56 / Math.pow(width / height, 0.45)));
}

function ClientMarquee() {
  const loop = [...work, ...work];
  return <section className="border-t border-border">
    <div className="page-shell frame grid items-center gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[14rem_1fr]">
      <Eyebrow>Trusted by businesses building for what's next</Eyebrow>
      <div className="marquee-mask min-w-0 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-16 hover:[animation-play-state:paused]">
          {loop.map((item, i) => {
            const copy = i >= work.length;
            return <a key={`${item.name}-${i}`} href={item.url} target="_blank" rel="noreferrer" tabIndex={copy ? -1 : undefined} aria-hidden={copy ? true : undefined} className="flex h-14 shrink-0 items-center">
              <img src={item.logo} alt={copy ? "" : item.name} width={item.logoWidth} height={item.logoHeight} style={{ height: markHeight(item.logoWidth, item.logoHeight) }} className="w-auto max-w-none opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-70 dark:invert dark:hover:grayscale" />
            </a>;
          })}
        </div>
      </div>
    </div>
  </section>;
}

function Services() {
  const [active, setActive] = useState<ServiceGroup>("build");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKey(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = (i + step + serviceGroups.length) % serviceGroups.length;
    setActive(serviceGroups[next]!.id);
    tabRefs.current[next]?.focus();
  }
  return <Section id="services">
    <SectionHeading eyebrow="What We Do" title="One partner. Every way you build and grow." body="Technology, content and growth services under one roof — so you don't have to manage multiple partners." />
    <Reveal className="mt-12">
      <div role="tablist" aria-label="Service categories" className="flex flex-wrap border-b border-border">
        {serviceGroups.map((group, i) => {
          const selected = group.id === active;
          return <button key={group.id} ref={el => { tabRefs.current[i] = el; }} id={`tab-${group.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`panel-${group.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(group.id)} onKeyDown={e => onKey(e, i)} className={`-mb-px border-b-2 px-4 py-3 text-left transition-colors sm:px-6 ${selected ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            <span className="block text-[15px] font-medium">{group.label}</span>
            <span className="mt-0.5 hidden font-mono text-[11px] uppercase tracking-[1.2px] text-tertiary sm:block">{group.summary}</span>
          </button>;
        })}
      </div>
      {serviceGroups.map(group => <div key={group.id} id={`panel-${group.id}`} role="tabpanel" aria-labelledby={`tab-${group.id}`} hidden={group.id !== active} className="mt-8">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.filter(s => s.group === group.id).map(({ title, description, icon: Icon }, i) => <article key={title} className="group flex flex-col bg-paper p-7 sm:min-h-64 transition-colors hover:bg-brand-soft">
            <div className="flex items-center justify-between"><span className="font-mono text-xs text-tertiary">{String(i + 1).padStart(2, "0")}</span><Icon className="size-5 text-primary transition-transform group-hover:-translate-y-0.5" /></div>
            <h3 className="mt-auto pt-8 text-lg font-medium tracking-[-0.02em] sm:pt-12">{title}</h3>
            <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">{description}</p>
          </article>)}
        </div>
      </div>)}
    </Reveal>
  </Section>;
}

const selectClass = "[field-sizing:content] appearance-none border-b-2 border-primary bg-transparent pb-0.5 pr-7 text-primary outline-offset-4 cursor-pointer";

function Qualifier({ onStart }: { onStart: (requirement: string) => void }) {
  const [need, setNeed] = useState(services[0]!.need);
  const audienceOptions = [...audiences.map(a => a.phrase), "business"];
  const [audience, setAudience] = useState(audienceOptions[0]!);
  return <Section>
    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <SectionHeading eyebrow="Start here" title="Tell us what you're building." body="Pick the closest match. We'll carry it into the consultation form so you don't have to type it twice." />
      <Reveal className="border border-border bg-paper p-6 sm:p-10">
        <p className="text-2xl font-light leading-[1.7] tracking-[-0.02em] text-foreground sm:text-[2rem]">
          I need{" "}
          <span className="relative inline-flex items-center"><select aria-label="What you need" value={need} onChange={e => setNeed(e.target.value)} className={selectClass}>{services.map(s => <option key={s.title} value={s.need}>{s.need}</option>)}</select><ChevronDown className="pointer-events-none absolute right-0 size-5 text-primary" /></span>
          {" "}for my{" "}
          <span className="relative inline-flex items-center"><select aria-label="Your business type" value={audience} onChange={e => setAudience(e.target.value)} className={selectClass}>{audienceOptions.map(a => <option key={a} value={a}>{a}</option>)}</select><ChevronDown className="pointer-events-none absolute right-0 size-5 text-primary" /></span>.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-border pt-6">
          <button type="button" onClick={() => onStart(`I need ${need} for my ${audience}. `)} className="bracket group text-primary outline-offset-4 hover:text-foreground">
            <span className="flex items-center gap-2 border border-primary bg-primary px-5 py-2.5 text-[15px] leading-[1.4] text-primary-foreground transition-colors group-hover:border-navy group-hover:bg-navy dark:group-hover:text-background">Continue to consultation</span>
            <i /><i /><i /><i />
          </button>
          <span className="font-mono text-xs uppercase tracking-[1.2px] text-tertiary">No fixed packages</span>
        </div>
      </Reveal>
    </div>
  </Section>;
}

function LmsMock() {
  const rows = [78, 52, 34];
  return <div className="space-y-3 p-4 text-[11px]">
    <p className="font-mono uppercase tracking-[1.2px] text-tertiary">Courses</p>
    {rows.map((w, i) => <div key={i} className="grid grid-cols-[2.25rem_1fr] items-center gap-3 border border-border bg-paper p-2.5">
      <span className="grid size-9 place-items-center bg-brand-soft font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
      <div><div className="flex justify-between text-muted-foreground"><span>Course {String(i + 1).padStart(2, "0")}</span><span className="flex -space-x-1">{[0, 1, 2].map(d => <span key={d} className="size-3 rounded-full border border-paper bg-frost" />)}</span></div><div className="mt-2 h-1.5 bg-surface"><div className="grow-bar-x h-full bg-primary" style={{ width: `${w}%`, animationDelay: `${i * 140}ms` }} /></div></div>
    </div>)}
  </div>;
}

function PlayBadge({ href }: { href: string }) {
  const gradient = useId();
  return <a href={href} target="_blank" rel="noreferrer" aria-label="Get CRM Master on Google Play" className="inline-flex shrink-0 items-center gap-2.5 rounded-md border border-dark bg-dark px-4 py-2 text-primary-foreground transition-opacity hover:opacity-85 dark:border-border">
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
      <defs><linearGradient id={gradient} x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#00D7FE" /><stop offset=".4" stopColor="#00F076" /><stop offset=".7" stopColor="#FFD500" /><stop offset="1" stopColor="#FF3E30" /></linearGradient></defs>
      <path fill={`url(#${gradient})`} d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.335 12l2.363-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
    </svg>
    <span className="flex flex-col leading-none"><span className="text-[10px] uppercase tracking-[0.8px] opacity-70">Get it on</span><span className="mt-0.5 text-base font-medium">Google Play</span></span>
  </a>;
}

function CrmasterShowcase() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const feature = crmasterFeatures[active]!;

  useEffect(() => {
    if (prefersReducedMotion()) { setAuto(false); return; }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Jumping to a feature restarts its timer; the rotation keeps going from there.
  function choose(i: number) { setActive(i); setCycle(c => c + 1); }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (i + step + crmasterFeatures.length) % crmasterFeatures.length;
    choose(next);
    tabRefs.current[next]?.focus();
  }

  return <Reveal className="mt-12 border border-border bg-paper">
    <div ref={rootRef} data-paused={!inView} className="showcase grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr]">
      <div className="p-6 sm:p-8 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-border">
        <a href={CRMASTER_URL} target="_blank" rel="noreferrer" className="inline-block"><img src={crmaster.logo} alt="CRMaster — All Leads, one system!" width={720} height={149} className="h-10 w-auto sm:h-11 dark:hidden" /><img src={crmaster.logoDark} alt="CRMaster — All Leads, one system!" width={720} height={149} className="hidden h-10 w-auto sm:h-11 dark:block" /></a>
        <div className="mt-8"><Eyebrow tone="brand">{crmaster.label}</Eyebrow></div>
        <h3 className="mt-3 text-[1.75rem] font-normal leading-[1.15] tracking-[-0.03em] md:text-[2.25rem]">{crmaster.tagline}</h3>
        <p className="mt-3 leading-[1.6] text-muted-foreground">{crmaster.description}</p>
      </div>

      <div className="flex flex-col border-y border-border bg-surface p-4 sm:p-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-y-0 lg:p-8">
        <div className="shot-frame overflow-hidden border border-border bg-paper shadow-soft">
          <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2 font-mono text-[11px] text-tertiary">
            <span className="flex min-w-0 items-center gap-2"><span className="flex shrink-0 gap-1">{[0, 1, 2].map(d => <span key={d} className="size-2 rounded-full bg-border" />)}</span><span className="truncate">crmaster.in / {feature.path}</span></span>
            <span className="shrink-0">{String(active + 1).padStart(2, "0")} / {String(crmasterFeatures.length).padStart(2, "0")}</span>
          </div>
          <div className="relative aspect-[1440/820] bg-background">
            {crmasterFeatures.map((f, i) => <img key={f.id} id={`crm-panel-${f.id}`} src={f.image} alt={`CRMaster ${f.label.toLowerCase()} screen`} width={1440} height={820} loading="lazy" decoding="async" aria-hidden={i !== active} className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`} />)}
          </div>
        </div>
        <p className="mt-3 font-mono text-[11px] text-tertiary">Screens from CRMaster, shown with demo data.</p>
        <div className="mb-6 mt-6 hidden grid-cols-3 gap-3 sm:grid" aria-hidden="true">
          {crmasterFeatures.map((f, i) => <button key={f.id} type="button" tabIndex={-1} onClick={() => choose(i)} className="group text-left">
            <span className={`block overflow-hidden border bg-paper transition-colors ${i === active ? "border-primary ring-2 ring-primary/15" : "border-border group-hover:border-tertiary"}`}>
              <img src={f.image} alt="" width={1440} height={820} loading="lazy" decoding="async" className={`aspect-[1440/820] w-full object-cover object-top transition-opacity ${i === active ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`} />
            </span>
            <span className={`mt-1.5 block font-mono text-[10px] uppercase tracking-[1.2px] ${i === active ? "text-primary" : "text-tertiary"}`}>{String(i + 1).padStart(2, "0")} · {f.label}</span>
          </button>)}
        </div>
        <div className="mt-6 flex flex-col gap-4 border border-border bg-paper p-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-between lg:mt-auto">
          <div className="flex items-center gap-4">
            <img src={crmaster.appIcon} alt="" width={160} height={160} className="size-12 shrink-0 rounded-xl" />
            <div><p className="font-medium">CRM Master for Android</p><p className="mt-0.5 text-sm leading-[1.5] text-muted-foreground">{crmaster.android}</p></div>
          </div>
          <PlayBadge href={CRMASTER_PLAY_STORE_URL} />
        </div>
      </div>

      <div className="flex flex-col p-6 pt-2 sm:p-8 sm:pt-2 lg:col-start-1 lg:row-start-2 lg:border-r lg:border-border">
        <div role="tablist" aria-orientation="vertical" aria-label="CRMaster features" className="border-t border-border">
          {crmasterFeatures.map((f, i) => {
            const selected = i === active;
            return <button key={f.id} ref={el => { tabRefs.current[i] = el; }} role="tab" type="button" aria-selected={selected} aria-controls={`crm-panel-${f.id}`} tabIndex={selected ? 0 : -1} onClick={() => choose(i)} onKeyDown={e => onKey(e, i)} className="relative block w-full border-b border-border py-3.5 text-left outline-offset-2">
              <span className="flex items-center gap-3">
                <span className={`font-mono text-[11px] ${selected ? "text-primary" : "text-tertiary"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-[15px] transition-colors ${selected ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{selected ? f.title : f.label}</span>
              </span>
              {selected && <span className="mt-1.5 block pl-7 text-sm leading-[1.55] text-muted-foreground">{f.body}</span>}
              {selected && auto && <span key={`${active}-${cycle}`} onAnimationEnd={() => setActive((active + 1) % crmasterFeatures.length)} className="tab-progress absolute -bottom-px left-0 h-px w-full bg-primary" />}
            </button>;
          })}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
          <BracketLink href={CRMASTER_URL} external>Visit CRMaster <ArrowUpRight className="size-4" /></BracketLink>
          <TextLink href="#contact">Ask about a demo</TextLink>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-3 border-t border-border px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:gap-8">
      <Eyebrow>Also included</Eyebrow>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">{crmasterExtras.map(item => <li key={item} className="flex items-center gap-1.5"><Check className="size-3.5 text-primary" />{item}</li>)}</ul>
    </div>
  </Reveal>;
}

function Products() {
  return <Section id="products">
    <SectionHeading eyebrow="Products by FirmGround" title="Technology we've built to make businesses work better." body="Along with custom client solutions, we build our own software products for business and education." />
    <CrmasterShowcase />
    <Reveal className="mt-6 grid border border-border bg-paper md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="flex flex-col p-6 sm:p-8 md:border-r md:border-border">
        <Eyebrow tone="brand">{lms.label}</Eyebrow>
        <h3 className="mt-3 text-[1.75rem] font-normal tracking-[-0.03em]">{lms.name}</h3>
        <p className="mt-2 leading-[1.6] text-muted-foreground">{lms.description}</p>
        <div className="mt-auto pt-6">{lms.url ? <TextLink href={lms.url}>Visit product</TextLink> : <span className="font-mono text-xs uppercase tracking-[1.2px] text-tertiary">Website coming soon</span>}</div>
      </div>
      <div className="border-t border-border bg-surface p-4 sm:p-6 md:border-t-0" aria-hidden="true">
        <div className="overflow-hidden border border-border bg-background">
          <div className="flex items-center justify-between border-b border-border bg-paper px-3 py-2 font-mono text-[11px] text-tertiary">
            <span className="flex items-center gap-2"><span className="flex gap-1">{[0, 1, 2].map(d => <span key={d} className="size-2 rounded-full bg-border" />)}</span>{lms.path}</span>
            <GraduationCap className="size-3.5 text-primary" />
          </div>
          <LmsMock />
        </div>
      </div>
    </Reveal>
  </Section>;
}

function Why() {
  return <Section id="why">
    <SectionHeading eyebrow="Why FirmGround" title="More than a vendor. A technology partner." action={<TextLink href="#contact">Talk to us</TextLink>} />
    <Reveal className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      <blockquote className="flex flex-col justify-between bg-primary p-8 text-primary-foreground">
        <Code2 className="size-5 opacity-70" />
        <p className="mt-12 text-xl font-light leading-[1.45] tracking-[-0.02em]">We don't just deliver projects. We build long-term partnerships and make technology easier for your business.</p>
      </blockquote>
      {values.map(([title, body], i) => <article key={title} className="bg-paper p-8 transition-colors hover:bg-brand-soft">
        <p className="font-mono text-xs uppercase tracking-[1.8px] text-tertiary">{String(i + 1).padStart(2, "0")} · {title!.split(" ")[0]}</p>
        <h3 className="mt-10 text-lg font-medium tracking-[-0.02em]">{title}</h3>
        <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">{body}</p>
      </article>)}
    </Reveal>
  </Section>;
}

function Process() {
  return <Section>
    <SectionHeading eyebrow="How We Work" title="From an idea to something that works." body="A clear five-step path, with communication at every stage." />
    <Reveal className="mt-12 grid gap-px border border-border bg-border md:grid-cols-5">
      {process.map(([title, body], i) => <article key={title} className="flex flex-col bg-paper p-6">
        <p className="font-mono text-xs uppercase tracking-[1.8px] text-tertiary">Step {String(i + 1).padStart(2, "0")}</p>
        <h3 className="mt-8 text-xl font-medium tracking-[-0.02em] text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">{body}</p>
        <svg viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true" className="mt-auto hidden h-12 w-full pt-4 md:block">
          {Array.from({ length: 8 }, (_, k) => { const h = 6 + ((k * 7 + i * 11) % 22) + i * 2; return <rect key={k} className="grow-bar" x={4 + k * 14.5} y={40 - h} width="7" height={h} rx="1" fill="var(--primary)" opacity={0.35 + (k / 8) * 0.65} style={{ animationDelay: `${i * 120 + k * 50}ms` }} />; })}
        </svg>
      </article>)}
    </Reveal>
  </Section>;
}

function Work() {
  return <Section id="work">
    <SectionHeading eyebrow="Our Work" title="Built for real businesses." body="Explore some of the businesses and platforms we've worked with." />
    <Reveal className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {work.map((item, i) => <a key={item.name} href={item.url} target="_blank" rel="noreferrer" className="group flex flex-col bg-paper transition-colors hover:bg-brand-soft">
        <div className={`tile-ticks relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border p-8 ${item.tile ? "text-primary-foreground/40" : "bg-logo-tile text-tertiary"}`} style={item.tile ? { backgroundColor: item.tile } : undefined}>
          <span className="absolute left-7 top-5 font-mono text-[11px] tracking-[1.2px]">{String(i + 1).padStart(2, "0")}</span>
          <img src={item.logo} alt={`${item.name} logo`} width={item.logoWidth} height={item.logoHeight} loading="lazy" decoding="async" className="max-h-28 w-auto max-w-[72%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
          <i /><i /><i /><i />
        </div>
        <div className="flex flex-1 items-end justify-between gap-4 p-5">
          <div>
            <Eyebrow tone="brand">{item.sector}</Eyebrow>
            <h3 className="mt-2 text-lg font-medium tracking-[-0.02em]">{item.name}</h3>
            <p className="mt-0.5 font-mono text-[11px] text-tertiary">{item.url.replace(/^https?:\/\//, "")}</p>
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </a>)}
    </Reveal>
  </Section>;
}

function Testimonials() {
  return <Section id="testimonials">
    <SectionHeading eyebrow="Client Words" title="What it's like working with FirmGround." />
    <Reveal className="mt-12 grid gap-5 md:grid-cols-3">{[1, 2, 3].map(i => <article key={i} className="border border-dashed border-border bg-paper p-7">
      <div className="mb-8 grid size-10 place-items-center bg-secondary"><Users className="size-5 text-muted-foreground" /></div>
      <p className="leading-[1.6] text-muted-foreground">“Testimonial placeholder — replace with verified client feedback.”</p>
      <div className="mt-7 border-t border-border pt-5"><p className="font-medium">Client name</p><p className="text-sm text-muted-foreground">Designation · Company</p></div>
    </article>)}</Reveal>
    {SHOW_VIDEO_FEEDBACK && <>
      <div className="mt-24"><SectionHeading eyebrow="Video Feedback" title="Hear it directly from our clients." /></div>
      <Reveal className="mt-12 grid gap-5 md:grid-cols-3">{[1, 2, 3].map(i => <article key={i} className="overflow-hidden border border-dashed border-border bg-paper">
        <div className="blueprint flex aspect-video items-center justify-center"><CirclePlay className="size-12 text-tertiary" /></div>
        <div className="p-5"><p className="font-medium">Video feedback placeholder</p><p className="mt-1 text-sm text-muted-foreground">Client name · Company</p></div>
      </article>)}</Reveal>
    </>}
  </Section>;
}

function Audiences() {
  return <Section>
    <SectionHeading eyebrow="Who We Serve" title="Built around ambitious businesses and creators." />
    <Reveal className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">{audiences.map(({ title, body, icon: Icon }) => <article key={title} className="bg-paper p-8">
      <Icon className="size-5 text-primary" />
      <h3 className="mt-10 text-xl font-medium tracking-[-0.02em]">{title}</h3>
      <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">{body}</p>
    </article>)}</Reveal>
  </Section>;
}

function Insights() {
  return <Section>
    <SectionHeading eyebrow="Insights" title="Ideas to help you build, automate and grow." action={<TextLink href={BLOG_URL}>View all insights</TextLink>} />
    <Reveal className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">{insights.map(([category, title]) => <a key={category} href={BLOG_URL} className="group flex flex-col bg-paper p-7 transition-colors hover:bg-brand-soft">
      <Eyebrow tone="brand">{category}</Eyebrow>
      <h3 className="mt-14 text-xl font-normal leading-[1.35] tracking-[-0.02em]">{title}</h3>
      <span className="mt-6 flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary">Read on the FirmGround blog <ArrowUpRight className="size-4" /></span>
    </a>)}</Reveal>
  </Section>;
}

function Faq() {
  return <Section>
    <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <div className="lg:sticky lg:top-28"><SectionHeading eyebrow="FAQ" title="Questions? We've got answers." /></div>
      <Reveal><Accordion type="single" collapsible className="border-t border-border">{faqs.map(([q, a], i) => <AccordionItem key={q} value={`faq-${i}`}>
        <AccordionTrigger className="py-6 text-left text-[17px] font-normal tracking-[-0.01em] hover:no-underline hover:text-primary">{q}</AccordionTrigger>
        <AccordionContent className="max-w-2xl pb-6 text-[15px] leading-[1.6] text-muted-foreground">{a}</AccordionContent>
      </AccordionItem>)}</Accordion></Reveal>
    </div>
  </Section>;
}

function FinalCta() {
  return <section className="border-t border-border bg-dark">
    <div className="page-shell relative overflow-hidden border-x border-dark-border px-4 py-20 sm:px-8 md:py-28">
      <SignalField tone="text-frost" className="absolute inset-0 h-full w-full opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
      <Reveal className="relative z-10 max-w-2xl">
        <Eyebrow tone="light">Let's talk</Eyebrow>
        <h2 className="mt-4 text-[2rem] font-normal leading-[1.12] tracking-[-0.03em] text-primary-foreground md:text-[3rem]">Have something you want to build or grow?</h2>
        <p className="mt-5 text-lg leading-[1.6] text-dark-muted">Tell us what you're working on. We'll help you understand the technology, execution and next steps you actually need.</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[1.2px] text-dark-muted">No fixed packages. No unnecessary complexity.</p>
        <div className="mt-8 flex flex-wrap gap-3"><BracketLink href="#contact" tone="light">Book a Free Consultation</BracketLink></div>
      </Reveal>
    </div>
  </section>;
}

function ConsultationForm({ requirement, onRequirementChange }: { requirement: string; onRequirementChange: (value: string) => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries()) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!values["name"]?.trim()) next["name"] = "Please enter your full name.";
    if (!values["company"]?.trim()) next["company"] = "Please enter your business or company name.";
    if (!/^\+?[0-9\s()-]{8,18}$/.test(values["phone"] || "")) next["phone"] = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values["email"] || "")) next["email"] = "Please enter a valid email address.";
    if (!values["requirement"]?.trim()) next["requirement"] = "Please tell us what you need.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const message = `Hi FirmGround,\n\nI just submitted a free consultation request through your website.\n\nName: ${values["name"]}\nCompany: ${values["company"]}\nEmail: ${values["email"]}\nWhatsApp: ${values["phone"]}\n\nMy requirement:\n${values["requirement"]}\n\nI'd like to discuss this further with your team.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }
  const fields = [
    { name: "name", label: "Full Name", placeholder: "Your name", type: "text" },
    { name: "company", label: "Business / Company Name", placeholder: "Your business", type: "text" },
    { name: "phone", label: "WhatsApp Number", placeholder: "+91", type: "tel" },
    { name: "email", label: "Email Address", placeholder: "you@company.com", type: "email" },
  ];
  const inputClass = "border border-input bg-paper font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";
  return <form onSubmit={submit} noValidate className="grid gap-5 border border-border bg-paper p-6 sm:grid-cols-2 sm:p-8">
    {fields.map(({ name, label, placeholder, type }) => <label key={name} className="grid gap-2 text-sm font-medium text-foreground">{label}<input name={name} type={type} placeholder={placeholder} aria-invalid={Boolean(errors[name])} className={`h-12 px-4 ${inputClass}`} />{errors[name] && <span className="text-xs font-medium text-destructive">{errors[name]}</span>}</label>)}
    <label className="grid gap-2 text-sm font-medium text-foreground sm:col-span-2">Tell us what you need<textarea id="requirement" name="requirement" rows={6} value={requirement} onChange={e => onRequirementChange(e.target.value)} placeholder="Tell us about your business, what you're trying to build, and where you need help..." aria-invalid={Boolean(errors["requirement"])} className={`resize-none p-4 ${inputClass}`} />{errors["requirement"] && <span className="text-xs font-medium text-destructive">{errors["requirement"]}</span>}</label>
    <button type="submit" className="bracket group text-primary outline-offset-4 hover:text-foreground sm:col-span-2">
      <span className="flex h-12 items-center justify-center gap-2 border border-primary bg-primary px-5 text-[15px] text-primary-foreground transition-colors group-hover:border-navy group-hover:bg-navy dark:group-hover:text-background">Continue on WhatsApp <MessageCircle className="size-4" /></span>
      <i /><i /><i /><i />
    </button>
    <p className="text-xs leading-5 text-muted-foreground sm:col-span-2">Your details are used only to prepare your WhatsApp message. They are not stored on this website.</p>
  </form>;
}

function Contact({ requirement, onRequirementChange }: { requirement: string; onRequirementChange: (value: string) => void }) {
  return <Section id="contact">
    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <SectionHeading eyebrow="Free Consultation" title="Tell us what you're working on." body="Share the basics below. Your details will be prepared as a WhatsApp message so you can continue directly with our team." />
        <div className="mt-8 grid gap-px border border-border bg-border text-sm">
          <a href="tel:+918329034989" className="flex items-center gap-3 bg-paper p-4 hover:text-primary"><Phone className="size-4 text-primary" /> +91 8329034989</a>
          <a href="mailto:shubhamjha@crmaster.in" className="flex items-center gap-3 bg-paper p-4 hover:text-primary"><Mail className="size-4 text-primary" /> shubhamjha@crmaster.in</a>
        </div>
      </div>
      <Reveal><ConsultationForm requirement={requirement} onRequirementChange={onRequirementChange} /></Reveal>
    </div>
  </Section>;
}

function Footer() {
  return <footer className="border-t border-dark-border bg-dark text-primary-foreground">
    <div className="page-shell border-x border-dark-border px-4 py-16 sm:px-8">
      <div className="grid gap-12 border-b border-dark-border pb-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div><Wordmark light /><p className="mt-5 max-w-sm leading-[1.6] text-dark-muted">Technology + Digital Growth Partner from India, serving businesses globally.</p><p className="mt-4 font-mono text-xs uppercase tracking-[1.8px] text-frost">Build · Automate · Grow</p></div>
        <div><Eyebrow tone="light">Explore</Eyebrow><div className="mt-5 grid grid-cols-2 gap-3">{nav.map(([label, href]) => <a key={label} href={href} className="text-sm text-dark-muted hover:text-primary-foreground">{label}</a>)}</div></div>
        <div><Eyebrow tone="light">Contact</Eyebrow><div className="mt-5 grid gap-3 text-sm text-dark-muted"><a href="tel:+918329034989" className="hover:text-primary-foreground">+91 8329034989</a><a href="mailto:shubhamjha@crmaster.in" className="break-all hover:text-primary-foreground">shubhamjha@crmaster.in</a></div><div className="mt-7 flex gap-5 text-sm text-dark-muted">{[["LinkedIn", LINKEDIN_URL], ["Instagram", INSTAGRAM_URL], ["YouTube", YOUTUBE_URL]].map(([label, url]) => url ? <a key={label} href={url}>{label}</a> : <span key={label} aria-hidden="true" className="cursor-not-allowed opacity-45">{label}</span>)}</div></div>
      </div>
      <div className="flex flex-col gap-4 pt-7 text-xs text-dark-muted lg:flex-row lg:items-center lg:justify-between"><p>© {new Date().getFullYear()} FirmGround Technologies Private Limited. All rights reserved.</p><div className="flex flex-wrap items-center gap-5"><span className="opacity-50">Privacy Policy</span><span className="opacity-50">Terms & Conditions</span><ThemeSwitcher /></div></div>
    </div>
  </footer>;
}

export function FirmGroundHome() {
  const [requirement, setRequirement] = useState("");
  function startConsultation(text: string) {
    setRequirement(text);
    document.getElementById("contact")?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    window.setTimeout(() => document.getElementById("requirement")?.focus({ preventScroll: true }), 600);
  }
  return <div className="min-h-screen overflow-x-clip bg-background text-foreground">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "FirmGround Technologies Private Limited",
      url: "https://firmgroundtechnologies.com",
      email: "shubhamjha@crmaster.in",
      telephone: "+91 8329034989",
      description: "Technology and digital growth partner from India, serving businesses globally.",
    }) }} />
    <AnnouncementBar />
    <Header />
    <main>
      <Hero />
      <ClientMarquee />
      <Services />
      <Qualifier onStart={startConsultation} />
      <Products />
      <Why />
      <Process />
      <Work />
      <Testimonials />
      <Audiences />
      <Insights />
      <Faq />
      <FinalCta />
      <Contact requirement={requirement} onRequirementChange={setRequirement} />
    </main>
    <Footer />

    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6"><Button asChild size="icon" className="size-12 rounded-full bg-success text-primary-foreground shadow-lg hover:bg-success/90"><a href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi FirmGround, I'd like to discuss a requirement with your team.")}`} target="_blank" rel="noreferrer" aria-label="Chat with FirmGround on WhatsApp"><MessageCircle /></a></Button><Button asChild size="icon" variant="secondary" className="size-12 rounded-full border border-border shadow-lg"><a href="tel:+918329034989" aria-label="Call FirmGround"><Phone /></a></Button></div>
  </div>;
}
