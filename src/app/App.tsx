import { useState, useEffect, useCallback, type ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import gattudLogo from "@/imports/Gattud_Design_Logo.svg";

const creativeImages = [
  "https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/image%201.webp",
  "https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/image%202.webp",
  "https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/image%203.webp",
  "https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/image%204.webp",
  "https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/image%205.webp",
  "https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/image%206.webp",
  "https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/image%207.webp",
];

const navItems = [
  { number: "01", label: "Cover", href: "#cover" },
  { number: "02", label: "Our Purpose", href: "#purpose" },
  { number: "03", label: "Our Evolution", href: "#evolution" },
  { number: "04", label: "Our Pillars", href: "#pillars" },
  { number: "05", label: "Our Spirit", href: "#spirit" },
  { number: "06", label: "Our Focus", href: "#focus" },
  { number: "07", label: "Creative Direction", href: "#creative-direction" },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const revealProps = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.75, ease: smoothEase },
};

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.75, delay, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}

function TopRule({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <div className="flex items-center justify-between text-[10px] font-normal uppercase tracking-[0.22em] text-current/55">
      <span>Brand Strategy</span>
      <span className="hidden md:inline">Mangia Catering Services</span>
      <span className="hidden md:inline">Stage 2 Strategy</span>
      <button type="button" aria-label="Open navigation" onClick={onMenuClick} className="inline-flex h-9 w-9 items-center justify-center border border-current/20 text-current/70 md:hidden">
        <Menu className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + creativeImages.length) % creativeImages.length : null), []);
  const nextImage = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % creativeImages.length : null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  return (
    <main className="min-h-screen scroll-smooth bg-background font-['Work_Sans'] text-foreground">
      <aside className="group fixed left-0 top-0 z-30 hidden h-screen w-[88px] overflow-hidden border-r border-white/10 bg-[#200F07] py-7 text-[#fff7ed] transition-[width] duration-500 ease-out hover:w-[286px] lg:flex lg:flex-col lg:justify-center">
        <nav className="flex flex-col gap-2 px-5">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="flex h-11 w-[246px] items-center gap-4 rounded-sm px-3 text-white/48 transition duration-300 hover:bg-white/[0.06] hover:text-primary">
              <span className="w-7 shrink-0 text-[10px] font-normal tracking-[0.18em]">{item.number}</span>
              <span className="whitespace-nowrap text-sm font-normal uppercase tracking-[0.18em] opacity-0 transition duration-300 group-hover:opacity-100">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="absolute bottom-7 px-8">
          <ArrowDown className="h-4 w-4 text-primary" />
        </div>
      </aside>

      {isMobileNavOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[#200F07] px-6 py-7 text-[#fff7ed] md:hidden"
        >
          <div className="flex items-center justify-between text-[10px] font-normal uppercase tracking-[0.22em] text-white/55">
            <span>Brand Strategy</span>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setIsMobileNavOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center border border-white/20 text-white/70"
            >
              ×
            </button>
          </div>
          <nav className="mt-20 grid gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: smoothEase }}
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-baseline gap-5 border-b border-white/10 py-5 text-[#fff7ed]"
              >
                <span className="text-xs font-normal tracking-[0.22em] text-primary">{item.number}</span>
                <span className="font-['Quattrocento'] text-3xl leading-none tracking-[-0.03em]">{item.label}</span>
              </motion.a>
            ))}
          </nav>
        </motion.div>
      ) : null}

      <div className="lg:pl-[88px]">
        <section id="cover" className="relative min-h-[92vh] overflow-hidden bg-[#200F07] px-6 py-7 text-[#fff7ed] md:px-12 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_72%,rgba(232,81,2,0.30),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(255,247,237,0.07),transparent_30%)]" />
          <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl flex-col">
            <TopRule onMenuClick={() => setIsMobileNavOpen(true)} />
            <div className="absolute left-0 top-[20%]">
              <ImageWithFallback src={gattudLogo} alt="Gattud Design Studios logo" className="h-auto w-36 object-contain md:w-44" />
            </div>
            <div className="flex flex-1 items-center">
              <Reveal>
                <h1 className="max-w-6xl font-['Quattrocento'] text-[clamp(4rem,10vw,10.5rem)] font-bold leading-[0.86] tracking-[-0.07em]">
                  The Soul of <span className="italic text-primary">Service</span>
                </h1>
                <p className="mt-7 max-w-xl font-['Quattrocento'] text-xl font-normal leading-tight text-[#d9c8b8] md:text-2xl">
                  A Strategic Evolution for Mangia Catering Services
                </p>
              </Reveal>
            </div>
            <div className="flex items-end justify-between text-[10px] font-normal uppercase tracking-[0.18em] text-white/45">
              <span>01</span>
              <span>Prepared by Gattud Design Studios</span>
            </div>
          </div>
        </section>

        <section id="purpose" className="grid bg-[#fffaf2] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-6 py-10 md:px-12 lg:px-16 lg:py-12">
            <TopRule onMenuClick={() => setIsMobileNavOpen(true)} />
            <Reveal className="mt-28 max-w-2xl lg:mt-44">
              <p className="mb-5 text-xs font-normal uppercase tracking-[0.24em] text-primary">Our Purpose</p>
              <h2 className="font-['Quattrocento'] text-5xl font-bold tracking-[-0.04em] text-primary md:text-7xl">The Brand Purpose</h2>
              <p className="mt-6 font-['Quattrocento'] text-xl font-normal leading-tight text-[#200F07]">
                Every brand has a heartbeat. For years, Mangia’s heart has been your presence, your faith, and your roots.
              </p>
              <p className="mt-7 max-w-xl font-['Quattrocento'] text-base font-normal leading-relaxed text-[#4f3a2f]">
                But as we look toward the future, toward bigger rooms, government halls, and executive boardrooms, we aren't here to change that heart. We’re here to give it a more powerful voice. Today, we’re presenting a strategy to evolve Mangia from a 'family caterer' into a 'Trusted Executive Partner'—without losing the soul that made people fall in love with you in the first place.
              </p>
            </Reveal>
          </div>
          <motion.div initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: smoothEase }} className="relative min-h-[520px] overflow-hidden bg-muted lg:min-h-0">
            <ImageWithFallback src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=1500&fit=crop&auto=format" alt="Executive catering table set beside city windows" className="h-full w-full object-cover transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#200F07]/35 via-transparent to-transparent" />
          </motion.div>
        </section>

        <section id="evolution" className="relative overflow-hidden bg-[#fffaf2] px-6 py-10 md:px-12 lg:px-16 lg:py-14">
          <TopRule onMenuClick={() => setIsMobileNavOpen(true)} />
          <div className="relative z-10 mt-20 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <Reveal>
              <p className="mb-5 text-xs font-normal uppercase tracking-[0.24em] text-primary">Our Evolution</p>
              <h2 className="font-['Quattrocento'] text-5xl font-bold leading-none tracking-[-0.04em] text-primary md:text-7xl">Generosity<br />By Design.</h2>
              <p className="mt-8 max-w-md font-['Quattrocento'] text-lg font-normal leading-tight">
                Mangia exists to transform the burden of hosting into the joy of connection. We prove that professional excellence and sincere warmth are not mutually exclusive—they are the essential ingredients for a successful event.
              </p>
            </Reveal>
            <Reveal className="pt-3" delay={0.12}>
              <h3 className="font-['Quattrocento'] text-4xl font-bold text-primary md:text-5xl">The Mantra Evolution</h3>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="border border-[#200F07]/25 bg-white/45 p-6 transition-shadow hover:shadow-[10px_10px_0_rgba(32,15,7,0.16)]">
                  <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-primary">The Heritage</p>
                  <h4 className="mt-5 font-['Quattrocento'] text-xl font-medium">“More Than Your Money’s Worth”</h4>
                  <p className="mt-3 font-['Quattrocento'] text-sm font-normal leading-relaxed text-[#6d5548]">A promise of quantity and community.</p>
                </motion.article>
                <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="border-2 border-primary bg-primary p-6 text-primary-foreground shadow-[12px_12px_0_#200F07] transition-shadow hover:shadow-[16px_16px_0_#200F07]">
                  <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/75">The Evolution</p>
                  <h4 className="mt-5 font-['Quattrocento'] text-xl font-medium">"Generosity By Design"</h4>
                  <p className="mt-3 font-['Quattrocento'] text-sm font-normal leading-relaxed text-white/85">A promise of stewardship and intentionality.</p>
                </motion.article>
              </div>
              <p className="mt-10 max-w-3xl font-['Quattrocento'] text-base font-normal leading-relaxed text-[#4f3a2f]">
                We are intentionally shifting our brand’s gravitational pull. While our roots remain in the community, our future lies in high-stakes Corporate and Government sectors. We are moving away from the 'theatre' of catering toward the Substance of Service.
              </p>
            </Reveal>
          </div>
          <div className="relative z-10 mt-14 grid gap-3 md:grid-cols-3">
            {[
              ["https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&h=560&fit=crop&auto=format", "Chef preparing a refined catered plate"],
              ["https://images.unsplash.com/photo-1555244162-803834f70033?w=900&h=560&fit=crop&auto=format", "Corporate catering table beside city windows"],
              ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=560&fit=crop&auto=format", "Professional service in a refined dining room"],
            ].map(([src, alt]) => (
              <motion.div key={src} {...revealProps} className="overflow-hidden border border-[#200F07]/18 bg-muted">
                <ImageWithFallback src={src} alt={alt} className="h-64 w-full object-cover transition duration-500" />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="pillars" className="relative overflow-hidden border-t border-[#200F07]/15 bg-[#faf4eb] px-6 py-10 md:px-12 lg:px-16 lg:py-16">
          <TopRule onMenuClick={() => setIsMobileNavOpen(true)} />
          <div className="relative z-10 mt-20 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-16 lg:self-start">
              <p className="mb-5 text-xs font-normal uppercase tracking-[0.24em] text-primary">Our Pillars</p>
              <h2 className="max-w-xl font-['Quattrocento'] text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-primary md:text-7xl">The foundation of the Mangia Experience</h2>
              <p className="mt-8 max-w-lg font-['Quattrocento'] text-xl font-medium leading-tight text-[#200F07]">
                A brand is only as strong as the values it stands upon. We have codified the 'Mangia Magic' into three non-negotiable pillars that ensure excellence in every room we enter.
              </p>
              <motion.div className="mt-12 max-w-lg overflow-hidden border border-[#200F07]/18 bg-muted">
                <ImageWithFallback src="https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/Our%20Pillars.webp" alt="Hands arranging ingredients in a professional kitchen" className="h-96 w-full object-cover transition duration-500 lg:h-[430px]" />
              </motion.div>
            </Reveal>
            <div className="grid gap-5">
              {[
                {
                  title: "I. HEART-LED INTENTIONALITY",
                  sub: "The Philosophy: We don't just \"feed\" guests; we nourish them. Every menu choice and floor plan is designed with the individual human experience in mind.",
                  body: "In Practice: Anticipating a guest’s needs before they are voiced—whether it’s a silent water refill or ensuring servings are generous enough to satisfy both the body and the spirit.",
                },
                {
                  title: "II. PROFESSIONAL STEWARDSHIP",
                  sub: "The Philosophy: We are the Host’s Expert Guide. We carry the weight of the logistics so our clients don't have to.",
                  body: "In Practice: Providing high-end, reliable counsel on event flow and menu pairing. When the client is unsure, Mangia leads with authority and grace.",
                },
                {
                  title: "III. SERVICE WITH SOUL",
                  sub: "The Philosophy: The \"Tita Rose Effect.\" Creating a premium environment that remains profoundly safe and welcoming.",
                  body: "In Practice: A team trained in the \"quiet efficiency\" of a professional, delivered with the authentic warmth of a true host.",
                },
              ].map((pillar) => (
                <motion.article key={pillar.title} {...revealProps} whileHover={{ y: -8 }} className="grid gap-6 border border-[#200F07]/18 bg-[#fffaf2] p-6 transition-all hover:border-primary hover:shadow-[12px_12px_0_rgba(232,81,2,0.18)] md:grid-cols-[0.42fr_0.58fr] md:p-8">
                  <h3 className="font-['Quattrocento'] text-2xl font-bold leading-tight text-primary md:text-3xl">{pillar.title}</h3>
                  <div>
                    <p className="font-['Quattrocento'] text-lg font-medium leading-snug text-[#200F07]">{pillar.sub}</p>
                    <p className="mt-5 font-['Quattrocento'] text-base font-normal leading-relaxed text-[#5b4539]">{pillar.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="spirit" className="relative overflow-hidden bg-[#200F07] px-6 py-10 text-[#fff7ed] md:px-12 lg:px-16 lg:py-16">
          <TopRule onMenuClick={() => setIsMobileNavOpen(true)} />
          <Reveal className="relative z-10 mt-20 max-w-5xl">
            <p className="mb-5 text-xs font-normal uppercase tracking-[0.24em] text-primary">Our Spirit</p>
            <h2 className="font-['Quattrocento'] text-5xl font-bold leading-none tracking-[-0.04em] md:text-7xl">The Spirit of the Brand.</h2>
            <p className="mt-8 max-w-3xl font-['Quattrocento'] text-xl font-medium leading-tight text-[#e4d4c3]">
              A brand’s voice is the echo of its founder. Even when Tita Rose is not in the room, her spirit must be felt in every email, every proposal, and every guest interaction.
            </p>
          </Reveal>
          <div className="relative z-10 mt-16 grid gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-2">
            {[
              {
                title: "I. WARM BUT AUTHORITATIVE",
                sub: "The Tone: We speak with the kindness of a host and the confidence of an expert.",
                body: "The Mangia Rule: We are never \"stiff,\" but we are never \"casual.\" We occupy the space of a Trusted Advisor.",
              },
              {
                title: "II. REASSURING",
                sub: "The Tone: \"We have it handled.\"",
                body: "The Mangia Rule: Our voice is the antidote to the client's stress. We speak in solutions, not problems. We provide the \"Calm\" in the middle of their event chaos.",
              },
              {
                title: "III. GENEROUS",
                sub: "The Tone: Abundant in spirit and in portion.",
                body: "The Mangia Rule: We never sound \"stingy.\" Whether it’s the information we share in a proposal or the food on the plate, our voice reflects a legacy of over-delivering.",
              },
              {
                title: "IV. UNPRETENTIOUS",
                sub: "The Tone: High-end quality without the \"snobbish\" attitude.",
                body: "The Mangia Rule: We are elite, but we are approachable. We move away from the cold, clinical language of luxury and stay rooted in Sincere Hospitality.",
              },
            ].map((spirit) => (
              <motion.article key={spirit.title} {...revealProps} whileHover={{ y: -8, backgroundColor: "#2b140a" }} className="bg-[#200F07] p-6 transition-colors md:p-9">
                <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-primary">{spirit.title}</p>
                <p className="mt-8 font-['Quattrocento'] text-xl font-medium leading-tight text-[#fff7ed]">{spirit.sub}</p>
                <p className="mt-5 font-['Quattrocento'] text-base font-normal leading-relaxed text-[#d3bdaa]">{spirit.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="focus" className="relative overflow-hidden bg-[#fffaf2] px-6 py-10 md:px-12 lg:px-16 lg:py-16">
          <TopRule onMenuClick={() => setIsMobileNavOpen(true)} />
          <div className="relative z-10 mt-20 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal>
              <p className="mb-5 text-xs font-normal uppercase tracking-[0.24em] text-primary">Our Focus</p>
              <h2 className="font-['Quattrocento'] text-5xl font-bold leading-none tracking-[-0.04em] text-primary md:text-8xl">Substance Over Spectacle.</h2>
            </Reveal>
            <Reveal className="max-w-2xl lg:pt-20" delay={0.12}>
            <p className="font-['Quattrocento'] text-xl font-medium leading-tight text-[#200F07]">
              To elevate the brand, we must be brave enough to define our focus. We are choosing to trade the 'theater' of event styling for the Substance of Service. By becoming a Selective Specialist, we protect the kitchen, the team, and the soul of the experience.
            </p>
            </Reveal>
          </div>
          <motion.div {...revealProps} className="relative z-10 mt-16 overflow-hidden border border-[#200F07]/18 bg-muted">
            <ImageWithFallback src="https://pub-c90ad98f4e0a47e0adc56b1c9b55420a.r2.dev/Our%20Focus.webp" alt="Refined table setting with warm natural details" className="h-[360px] w-full object-cover transition duration-500" />
          </motion.div>
          <div className="relative z-10 mt-12 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "THE SHIFT: FROM THEATER TO HOSPITALITY",
                sub: "The Boundary: We are intentionally moving away from \"Heavy Theatrical Styling\" and decor-heavy church or wedding functions.",
                body: "The Reasoning: In the world of high-end events, excessive styling is often a distraction. We believe that Hospitality is the Mission.",
              },
              {
                title: "THE INVESTMENT: HIGH-FUNCTION EXCELLENCE",
                sub: "Primary Focus: Corporate & Government Sectors.",
                body: "The Priority: We invest our resources into the quality of the plate and the seamlessness of the guest experience.",
              },
              {
                title: "THE AESTHETIC: ORGANIC ELEGANCE",
                sub: "The Philosophy: We focus on the plate and the person, not the props.",
                body: "The Look: Clean, professional, and refined setups. We use \"Organic Elegance\" to ensure that our environments look premium and \"executive-ready\" without feeling cluttered or artificial.",
              },
            ].map((focus, index) => (
              <motion.article key={focus.title} {...revealProps} whileHover={{ y: -10 }} className={`min-h-[430px] border p-7 transition-all hover:shadow-[12px_12px_0_rgba(32,15,7,0.16)] md:p-8 ${index === 1 ? "border-primary bg-primary text-primary-foreground hover:shadow-[12px_12px_0_#200F07]" : "border-[#200F07]/18 bg-[#faf4eb] text-[#200F07] hover:border-primary"}`}>
                <div className="mb-16 h-px w-28 bg-current/30" />
                <h3 className="font-['Quattrocento'] text-2xl font-bold leading-tight md:text-3xl">{focus.title}</h3>
                <p className="mt-8 font-['Quattrocento'] text-lg font-medium leading-snug">{focus.sub}</p>
                <p className={`mt-5 font-['Quattrocento'] text-base font-normal leading-relaxed ${index === 1 ? "text-white/85" : "text-[#5b4539]"}`}>{focus.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="creative-direction" className="bg-[#200F07] px-6 py-10 text-[#fff7ed] md:px-12 lg:px-16 lg:py-14">
          <TopRule onMenuClick={() => setIsMobileNavOpen(true)} />
          <Reveal className="mt-16 max-w-4xl">
            <p className="mb-5 text-xs font-normal uppercase tracking-[0.24em] text-primary">Creative Direction</p>
            <h2 className="font-['Quattrocento'] text-5xl font-bold leading-none tracking-[-0.04em] md:text-8xl">VISUALIZING WARM PRECISION.</h2>
            <p className="mt-8 max-w-2xl font-['Quattrocento'] text-xl font-medium leading-tight text-[#e4d4c3]">
              <span className="text-primary">The Core Concept:</span> Blending modern executive minimalism with the rich, tactile warmth of Tita Rose's roots. Clean but never cold; elite but profoundly welcoming.
            </p>
          </Reveal>
          <div className="mt-16 flex flex-col gap-[10px]">
            {/* Top section: col 1 = two stacked, cols 2 & 3 = single tall */}
            <div className="grid grid-cols-3 gap-[10px]" style={{ height: "clamp(320px, 45vw, 640px)" }}>
              <div className="flex h-full flex-col gap-[10px]">
                <div className="group flex-[0.45] cursor-pointer overflow-hidden" onClick={() => openLightbox(0)}>
                  <ImageWithFallback src={creativeImages[0]} alt="Creative direction 1" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="group flex-[0.55] cursor-pointer overflow-hidden" onClick={() => openLightbox(3)}>
                  <ImageWithFallback src={creativeImages[3]} alt="Creative direction 4" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
              </div>
              <div className="group cursor-pointer overflow-hidden" onClick={() => openLightbox(1)}>
                <ImageWithFallback src={creativeImages[1]} alt="Creative direction 2" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="group cursor-pointer overflow-hidden" onClick={() => openLightbox(2)}>
                <ImageWithFallback src={creativeImages[2]} alt="Creative direction 3" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
            </div>
            {/* Bottom section: three equal columns */}
            <div className="grid grid-cols-3 gap-[10px]" style={{ height: "clamp(200px, 28vw, 400px)" }}>
              <div className="group cursor-pointer overflow-hidden" onClick={() => openLightbox(6)}>
                <ImageWithFallback src={creativeImages[6]} alt="Creative direction 7" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="group cursor-pointer overflow-hidden" onClick={() => openLightbox(5)}>
                <ImageWithFallback src={creativeImages[5]} alt="Creative direction 6" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="group cursor-pointer overflow-hidden" onClick={() => openLightbox(4)}>
                <ImageWithFallback src={creativeImages[4]} alt="Creative direction 5" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:left-8"
            aria-label="Previous image"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Image */}
          <motion.img
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            src={creativeImages[lightboxIndex]}
            alt={`Creative direction ${lightboxIndex + 1}`}
            className="h-[90vh] w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:right-8"
            aria-label="Next image"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-normal tracking-[0.2em] text-white/50">
            {lightboxIndex + 1} / {creativeImages.length}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
            {creativeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === lightboxIndex ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </main>
  );
}
