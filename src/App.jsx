import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Image, Link2, Menu, Sparkles, X } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/50230775071?text=Hola%2C%20quiero%20una%20revisi%C3%B3n%20gratis%20de%20mi%20negocio%20en%20Google%20Maps";
const LOGO_SRC = "/kinetic-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function openWhatsApp(event) {
  event.preventDefault();
  const newWindow = window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  if (!newWindow) window.location.href = WHATSAPP_URL;
}

function KineticMark({ className = "" }) {
  return (
    <div aria-label="Kinetic" className={`relative overflow-hidden rounded-xl bg-black ${className}`}>
      <img src={LOGO_SRC} alt="Kinetic" className="h-full w-full object-cover" />
    </div>
  );
}

function CTAButton({ children, className = "", variant = "primary" }) {
  const primary = "bg-cyan-300 text-black shadow-[0_0_34px_rgba(16,216,255,0.28)] hover:bg-white hover:shadow-[0_0_48px_rgba(16,216,255,0.42)]";
  const secondary = "border border-cyan-300/35 bg-cyan-300/5 text-cyan-100 hover:border-cyan-300/70 hover:bg-cyan-300/12";
  return (
    <a href={WHATSAPP_URL} onClick={openWhatsApp} aria-label="Solicitar revisión por WhatsApp" className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${variant === "primary" ? primary : secondary} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function SectionShell({ id, children, className = "", dark = true }) {
  return (
    <section id={id} className={`${dark ? "bg-black text-white" : "bg-[#f5f7f8] text-black"} px-5 py-20 lg:px-8 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicio", href: "#servicio" },
    { label: "Proceso", href: "#proceso" },
    { label: "Inversión", href: "#inversion" },
    { label: "Contacto", href: "#contacto" },
  ];
  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-black/75 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Volver al inicio">
          <KineticMark className="h-10 w-10" />
          <span className="text-sm font-semibold tracking-[0.34em] text-white/90">KINETIC</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-white/58 transition-colors hover:text-cyan-200">{link.label}</a>
          ))}
        </div>
        <button type="button" aria-label="Abrir menú" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-black/95 px-5 py-5 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-sm text-white/70">{link.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function OptimizationCards() {
  const cards = [
    { title: "Información del negocio", text: "Horarios, ubicación, categoría y datos principales organizados con precisión.", icon: FileText },
    { title: "Contacto y enlaces", text: "WhatsApp, teléfono, rutas y links visibles para reducir fricción.", icon: Link2 },
    { title: "Presentación visual", text: "Fotos nuevas o selección de imágenes existentes para proyectar una imagen más cuidada.", icon: Image },
    { title: "Oferta y descripción", text: "Servicios, productos, menú y redacción comercial para comunicar mejor lo que ofrece el negocio.", icon: Sparkles },
  ];
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div key={card.title} variants={fadeUp} className="group rounded-[1.75rem] border border-black/8 bg-white p-7 shadow-[0_18px_70px_rgba(0,0,0,0.075)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/70 hover:shadow-[0_24px_90px_rgba(16,216,255,0.16)]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-cyan-300 transition-all duration-300 group-hover:bg-cyan-300 group-hover:text-black"><Icon className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold text-black">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-black/60">{card.text}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ProcessSteps() {
  const steps = [
    { number: "01", title: "Revisamos", text: "Analizamos cómo aparece actualmente tu negocio en Google." },
    { number: "02", title: "Optimizamos", text: "Ordenamos información, contacto, fotos, descripción y oferta." },
    { number: "03", title: "Entregamos", text: "Presentamos las mejoras aplicadas y realizamos una ronda final de ajustes." },
  ];
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative mt-12 grid gap-6 lg:grid-cols-3">
      <div className="absolute left-8 right-8 top-12 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent lg:block" />
      {steps.map((step) => (
        <motion.div key={step.number} variants={fadeUp} className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-7 transition-all duration-300 hover:border-cyan-300/35">
          <div className="mb-8 text-5xl font-black tracking-[-0.08em] text-cyan-300/90">{step.number}</div>
          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
          <p className="mt-4 text-sm leading-7 text-white/58">{step.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function KineticLandingPage() {
  const businessTypes = useMemo(() => [
    "Restaurantes", "Cafés", "Barberías", "Salones", "Clínicas", "Dentistas", "Talleres", "Gimnasios", "Veterinarias", "Tiendas", "Spas", "Hoteles", "Servicios técnicos",
  ], []);
  return (
    <main className="min-h-screen scroll-smooth bg-black font-sans text-white selection:bg-cyan-300 selection:text-black">
      <Navbar />
      <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden px-5 py-32 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(16,216,255,0.15),transparent_32%),radial-gradient(circle_at_20%_12%,rgba(255,255,255,0.07),transparent_22%),linear-gradient(to_bottom,rgba(255,255,255,0.045),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.h1 variants={fadeUp} className="text-5xl font-black tracking-[-0.065em] sm:text-7xl lg:text-8xl">Haz que te <span className="text-cyan-300 drop-shadow-[0_0_30px_rgba(16,216,255,0.35)]">encuentren.</span></motion.h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-3xl text-lg leading-8 text-white/68 sm:text-xl">Mejoramos la forma en que tu negocio aparece en Google para que más clientes puedan encontrarte, entender lo que ofreces y confiar desde el primer vistazo.</motion.p>
          <motion.div variants={fadeUp} className="mt-10"><CTAButton>Solicitar revisión por WhatsApp</CTAButton></motion.div>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-sm leading-6 text-white/43">Presencia digital para negocios locales que quieren verse más claros, confiables y fáciles de contactar.</motion.p>
        </motion.div>
      </section>
      <SectionShell id="servicio" className="border-y border-white/10 bg-[#050607]">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Antes de visitar, muchos clientes buscan.</motion.h2>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6 text-lg leading-8 text-white/64">
            <p>Fotos, horarios, ubicación, contacto y presentación general influyen en la confianza que transmite un negocio antes de que el cliente llegue, llame o reserve.</p>
            <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-6 text-xl font-semibold leading-snug text-white shadow-[0_0_60px_rgba(16,216,255,0.08)]">Una presencia incompleta puede hacer que un buen negocio parezca menos confiable.</div>
          </motion.div>
        </div>
      </SectionShell>
      <SectionShell dark={false} className="pb-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-4xl">
          <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">Convertimos tu perfil en una presencia digital más clara y confiable.</h2>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-black/64">Kinetic optimiza los elementos clave de tu presencia en Google: información del negocio, contacto, fotos, servicios, productos, descripción comercial y estructura general del perfil.</p>
        </motion.div>
      </SectionShell>
      <SectionShell dark={false} className="pt-0">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Lo que mejoramos</motion.h2>
        <OptimizationCards />
      </SectionShell>
      <SectionShell id="proceso" className="border-y border-white/10 bg-[#050607]">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">Un proceso claro de principio a fin.</motion.h2>
        <ProcessSteps />
      </SectionShell>
      <SectionShell id="inversion" className="relative overflow-hidden bg-black">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.4rem] border border-cyan-300/30 bg-[#080b0e] p-8 shadow-[0_0_100px_rgba(16,216,255,0.12)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Presencia Inicial — desde Q500</h2>
              <p className="mt-6 text-lg leading-8 text-white/64">Una optimización inicial para mejorar cómo se presenta tu negocio en Google, ordenar su información principal, fortalecer su imagen visual y facilitar que los clientes encuentren lo que necesitan.</p>
              <p className="mt-5 text-sm leading-7 text-white/45">La inversión puede variar según el estado actual del perfil y las necesidades específicas del negocio.</p>
              <div className="mt-8"><CTAButton>Solicitar revisión por WhatsApp</CTAButton></div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Incluye</p>
              <p className="text-sm leading-7 text-white/70">Incluye revisión, optimización de información, contacto, fotos o curaduría visual, redacción comercial, organización de servicios o productos y una ronda final de ajustes.</p>
            </div>
          </div>
        </motion.div>
      </SectionShell>
      <SectionShell dark={false}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Para negocios donde la confianza influye antes de la visita.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/62">Especialmente útil para negocios que dependen de búsquedas, reservas, llamadas, visitas o solicitudes de información.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
          {businessTypes.map((type) => (<motion.span key={type} variants={fadeUp} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/68 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:border-cyan-300/70 hover:text-black">{type}</motion.span>))}
        </motion.div>
      </SectionShell>
      <section id="contacto" className="relative overflow-hidden bg-black px-5 py-28 lg:px-8 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,216,255,0.16),transparent_36%)]" />
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl">Cada búsqueda cuenta.</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/65">Haz que tu negocio se vea claro, confiable y fácil de contactar desde Google.</p>
          <div className="mt-10"><CTAButton>Contactar por WhatsApp</CTAButton></div>
        </motion.div>
      </section>
      <footer className="border-t border-white/10 bg-[#030404] px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4"><KineticMark className="h-12 w-12" /><div><p className="font-semibold tracking-[0.28em] text-white">KINETIC</p><p className="mt-1 text-sm text-white/48">Haz que te encuentren.</p></div></div>
          <div className="text-sm text-white/45 sm:text-right"><p>Presencia digital para negocios locales que quieren proyectar más confianza en línea.</p><a href={WHATSAPP_URL} onClick={openWhatsApp} className="mt-2 inline-block font-semibold text-cyan-200 hover:text-white">Contactar por WhatsApp</a></div>
        </div>
      </footer>
    </main>
  );
}
