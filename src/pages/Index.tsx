import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "@/components/ui/icon";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { label: "О нас", href: "#about" },
  { label: "Подход", href: "#approach" },
  { label: "Услуги", href: "#services" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contact" },
];

const STATS = [
  { value: "5+", label: "лет на рынке" },
  { value: "300+", label: "партнёров" },
  { value: "ТОП-3", label: "в Яндексе" },
  { value: "100%", label: "продление" },
];

const SERVICES = [
  { icon: "MapPin", title: "Яндекс.Бизнес", desc: "Полное продвижение и оптимизация карточек компании. Заполнение, оформление, рост в поиске и на картах.", num: "01" },
  { icon: "Star", title: "Репутация и отзывы", desc: "Работа с отзывами, улучшение рейтинга, мониторинг упоминаний. Ваша репутация под контролем.", num: "02" },
  { icon: "Megaphone", title: "Рекламные кампании", desc: "Настройка и ведение рекламы в Яндекс.Директ и РСЯ. Отчёты, аналитика и постоянная оптимизация.", num: "03" },
  { icon: "Stethoscope", title: "Яндекс.Медицина", desc: "Продвижение профилей врачей, оптимизация под голосовой поиск Алисы AI и медицинские агрегаторы.", num: "04" },
  { icon: "TrendingUp", title: "SEO-оптимизация", desc: "Техническая и контентная оптимизация. Отслеживание позиций, семантика, рост органического трафика.", num: "05" },
  { icon: "BarChart2", title: "Поддержка и отчёты", desc: "Регулярные отчёты, персональный менеджер и постоянный контроль результатов продвижения.", num: "06" },
];

const PLANS = [
  {
    name: "Тестовый", period: "3 месяца",
    prices: ["120 000 ₽", "150 000 ₽"],
    desc: "Идеально для старта и проверки стратегии",
    features: ["Настройка профиля", "Базовое SEO", "Дизайн карточки", "Работа с отзывами", "Ежемесячный отчёт"],
    highlight: false,
  },
  {
    name: "Стандартный", period: "6 месяцев",
    prices: ["200 000 ₽", "250 000 ₽"],
    desc: "Для активного роста и захвата аудитории",
    features: ["Всё из Тестового", "Продвижение Яндекс.Медицина", "Оптимизация под Алису AI", "Еженедельный отчёт", "Персональный менеджер"],
    highlight: true,
  },
  {
    name: "Логичный", period: "12 месяцев",
    prices: ["350 000 ₽", "400 000 ₽"],
    desc: "Полное долгосрочное партнёрство",
    features: ["Всё из Стандартного", "Объединение всех стратегий", "Приоритетная поддержка 24/7", "Квартальная стратсессия", "Выделенная команда", "Гарантия результата"],
    highlight: false,
  },
];

const STORY_STEPS = [
  {
    label: "Проблема",
    heading: "Вас не видят\nновые клиенты",
    sub: "Конкуренты занимают ТОП в Яндекс Картах, пока ваша карточка теряется на третьей странице. Каждый день — это упущенные звонки и заявки.",
    accent: "#3B82F6",
    icon: "EyeOff",
    stat: { value: "87%", label: "клиентов выбирают бизнес из ТОП-3 карт" },
  },
  {
    label: "Решение",
    heading: "KeyCard выводит\nвас в ТОП",
    sub: "Мы берём полный контроль над вашей карточкой: оформление, SEO, отзывы, реклама. Результат заметен уже в первый месяц.",
    accent: "#8B5CF6",
    icon: "Rocket",
    stat: { value: "30 дней", label: "до первых результатов в поиске" },
  },
  {
    label: "Результат",
    heading: "Рост клиентов\nкаждый месяц",
    sub: "300+ партнёров уже получают стабильный поток клиентов из Яндекса. 100% наших клиентов продлевают контракт — потому что видят реальные цифры.",
    accent: "#10B981",
    icon: "TrendingUp",
    stat: { value: "300+", label: "компаний доверяют KeyCard" },
  },
];

const APPROACH = [
  { icon: "Target", title: "Индивидуальный подход", desc: "Глубокий аудит ниши и конкурентов перед стартом. Стратегия строится под ваш бизнес." },
  { icon: "Zap", title: "Готовые решения", desc: "5 лет опыта в вашей нише. Проверенные схемы, которые дают результат уже в первый месяц." },
  { icon: "Users", title: "Новые клиенты", desc: "Цель одна — увеличить ваш поток клиентов через Яндекс. Всё остальное — инструменты." },
];

const LOGO_URL = "https://cdn.poehali.dev/projects/678f7adc-98d6-4171-8f2c-e01ae23f112c/files/90906752-e64f-4802-a583-b5a46b90cd9f.jpg";
const SUBMIT_REVIEW_URL = "https://functions.poehali.dev/afbbb854-a4da-457c-8a63-421bef083447";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [activePlan, setActivePlan] = useState(1);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", card_url: "" });
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const storyPinRef = useRef<HTMLDivElement>(null);
  const servicesPinRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP PIN: Story section
  useEffect(() => {
    if (!storyRef.current || !storyPinRef.current) return;

    const totalSteps = STORY_STEPS.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: "top top",
        end: `+=${totalSteps * 100}vh`,
        pin: storyPinRef.current,
        pinSpacing: true,
        scrub: false,
        onUpdate: (self) => {
          const step = Math.min(
            totalSteps - 1,
            Math.floor(self.progress * totalSteps)
          );
          setActiveStep(step);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // GSAP PIN: Services section
  useEffect(() => {
    if (!servicesRef.current || !servicesPinRef.current) return;

    const totalServices = SERVICES.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top top",
        end: `+=${totalServices * 80}vh`,
        pin: servicesPinRef.current,
        pinSpacing: true,
        scrub: false,
        onUpdate: (self) => {
          const idx = Math.min(
            totalServices - 1,
            Math.floor(self.progress * totalServices)
          );
          setActiveService(idx);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Hero entrance animation
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 0.2,
      });
      gsap.from(".hero-stat", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 0.8,
      });
    }, heroRef.current);
    return () => ctx.revert();
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError("");
    setLeadLoading(true);
    try {
      const res = await fetch("https://functions.poehali.dev/9161593e-c262-48b1-946d-04c5d9dbb4c5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm),
      });
      if (!res.ok) throw new Error();
      setLeadSent(true);
    } catch {
      setLeadError("Не удалось отправить. Попробуйте ещё раз.");
    } finally {
      setLeadLoading(false);
    }
  };

  const step = STORY_STEPS[activeStep];
  const service = SERVICES[activeService];

  return (
    <div className="w-full" style={{ background: "#060d1f", color: "#E8EDF3", fontFamily: "Inter, sans-serif" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: scrolled ? "rgba(6,13,31,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(59,130,246,0.12)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="KeyCard" className="h-9 w-9 object-cover rounded-lg" style={{ border: "1px solid rgba(59,130,246,0.3)" }} />
            <span className="font-black text-sm tracking-widest uppercase" style={{ color: "#E8EDF3" }}>
              Key<span style={{ color: "#3B82F6" }}>Card</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium transition-colors hover:opacity-100" style={{ color: "rgba(180,200,230,0.65)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(180,200,230,0.65)")}>
                {n.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }}>
            Получить аудит <Icon name="ArrowUpRight" size={14} />
          </a>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "#E8EDF3" }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4" style={{ background: "rgba(6,13,31,0.98)", borderTop: "1px solid rgba(59,130,246,0.1)" }}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium py-2" style={{ color: "rgba(180,200,230,0.8)" }} onClick={() => setMenuOpen(false)}>{n.label}</a>
            ))}
            <a href="#contact" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold mt-2"
              style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }} onClick={() => setMenuOpen(false)}>
              Получить аудит <Icon name="ArrowUpRight" size={14} />
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)" }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-28 pb-20 w-full">
          <div className="max-w-4xl">
            <div className="hero-line inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60A5FA" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Продвижение в Яндекс Картах
            </div>
            <h1 className="hero-line font-black leading-[0.95] mb-6" style={{ fontSize: "clamp(3rem,8vw,7rem)", letterSpacing: "-0.02em" }}>
              Будь первым<br />
              <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                на картах
              </span>
            </h1>
            <p className="hero-line text-lg md:text-xl mb-10 max-w-xl leading-relaxed" style={{ color: "rgba(180,200,230,0.7)" }}>
              Выводим компании в ТОП-3 Яндекс Карт. Больше звонков, больше клиентов — уже в первый месяц.
            </p>
            <div className="hero-line flex flex-col sm:flex-row gap-4 mb-20">
              <a href="#contact" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:opacity-90 hover:scale-105"
                style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }}>
                Бесплатный аудит <Icon name="ArrowUpRight" size={18} />
              </a>
              <a href="#vacancy" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:opacity-80"
                style={{ border: "1px solid rgba(59,130,246,0.3)", color: "#E8EDF3" }}>
                Записаться на разбор
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {STATS.map((s, i) => (
                <div key={i} className="hero-stat rounded-2xl px-5 py-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.12)" }}>
                  <p className="font-black text-3xl mb-1" style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "rgba(180,200,230,0.55)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(180,200,230,0.3)" }}>Прокрути вниз</p>
          <Icon name="ChevronDown" size={16} style={{ color: "rgba(59,130,246,0.5)" }} />
        </div>
      </section>

      {/* ── STORY PIN ── */}
      <div ref={storyRef} id="about" style={{ height: `${STORY_STEPS.length * 100 + 100}vh` }}>
        <div ref={storyPinRef} className="h-screen w-full flex items-center justify-center overflow-hidden relative"
          style={{ background: "#060d1f" }}>
          {/* Progress dots */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
            {STORY_STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="rounded-full transition-all duration-500"
                  style={{
                    width: i === activeStep ? 10 : 6,
                    height: i === activeStep ? 10 : 6,
                    background: i === activeStep ? s.accent : "rgba(180,200,230,0.2)",
                    boxShadow: i === activeStep ? `0 0 12px ${s.accent}` : "none"
                  }} />
                <span className="text-xs hidden lg:block transition-all duration-300"
                  style={{ color: i === activeStep ? "rgba(180,200,230,0.8)" : "rgba(180,200,230,0.25)", fontWeight: i === activeStep ? 600 : 400 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Step counter */}
          <div className="absolute top-8 right-8 text-right z-10">
            <p className="font-black text-6xl leading-none" style={{ color: "rgba(59,130,246,0.08)", fontVariantNumeric: "tabular-nums" }}>
              0{activeStep + 1}
            </p>
            <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(180,200,230,0.3)" }}>/ 0{STORY_STEPS.length}</p>
          </div>

          {/* Main content */}
          <div className="max-w-5xl mx-auto px-10 md:px-20 w-full grid md:grid-cols-2 gap-16 items-center">
            <div key={activeStep} style={{ animation: "storyIn 0.5s ease forwards" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
                style={{ background: `${step.accent}18`, border: `1px solid ${step.accent}40`, color: step.accent }}>
                <Icon name={step.icon} size={12} />
                {step.label}
              </div>
              <h2 className="font-black leading-[1.05] mb-6 whitespace-pre-line"
                style={{ fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.02em" }}>
                {step.heading}
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(180,200,230,0.65)" }}>
                {step.sub}
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg,${step.accent},#8B5CF6)`, color: "#fff" }}>
                Узнать подробнее <Icon name="ArrowRight" size={14} />
              </a>
            </div>
            <div key={`stat-${activeStep}`} className="flex flex-col items-center" style={{ animation: "storyIn 0.5s 0.1s ease forwards", opacity: 0 }}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(circle at center, ${step.accent}22 0%, transparent 70%)`, transform: "scale(1.5)" }} />
                <div className="relative rounded-3xl p-12 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${step.accent}30` }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ background: `${step.accent}18`, border: `1px solid ${step.accent}30` }}>
                    <Icon name={step.icon} size={28} style={{ color: step.accent }} />
                  </div>
                  <p className="font-black mb-2" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", background: `linear-gradient(135deg,${step.accent},#fff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.03em" }}>
                    {step.stat.value}
                  </p>
                  <p className="text-sm" style={{ color: "rgba(180,200,230,0.5)" }}>{step.stat.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── APPROACH ── */}
      <section id="approach" className="py-28 relative overflow-hidden" style={{ background: "#060d1f" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#8B5CF6" }}>Наш подход</p>
            <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", letterSpacing: "-0.02em" }}>
              Индивидуальная стратегия —<br />
              <span style={{ background: "linear-gradient(90deg,#8B5CF6,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                проверенный результат
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {APPROACH.map((a, i) => (
              <div key={i} className="group relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(139,92,246,0.12)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"; e.currentTarget.style.background = "rgba(139,92,246,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}>
                  <Icon name={a.icon} size={22} style={{ color: "#8B5CF6" }} />
                </div>
                <p className="text-4xl font-black mb-3" style={{ color: "rgba(139,92,246,0.12)", fontVariantNumeric: "tabular-nums" }}>0{i + 1}</p>
                <h3 className="font-bold text-lg mb-3" style={{ color: "#E8EDF3" }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(180,200,230,0.6)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PIN ── */}
      <div ref={servicesRef} id="services" style={{ height: `${SERVICES.length * 80 + 100}vh` }}>
        <div ref={servicesPinRef} className="h-screen w-full flex items-center overflow-hidden"
          style={{ background: "linear-gradient(180deg,#06101f 0%,#060d1f 100%)" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-10 w-full grid md:grid-cols-2 gap-16 items-center">

            {/* Left: list */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#3B82F6" }}>Инструменты</p>
              <h2 className="font-black mb-10 leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
                Полный арсенал<br />для роста в Яндексе
              </h2>
              <div className="flex flex-col gap-3">
                {SERVICES.map((s, i) => (
                  <button key={i} className="flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 w-full"
                    style={{
                      background: i === activeService ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${i === activeService ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.08)"}`,
                    }}
                    onClick={() => setActiveService(i)}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: i === activeService ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)" }}>
                      <Icon name={s.icon} size={16} style={{ color: i === activeService ? "#60A5FA" : "rgba(180,200,230,0.4)" }} />
                    </div>
                    <span className="font-semibold text-sm transition-colors"
                      style={{ color: i === activeService ? "#E8EDF3" : "rgba(180,200,230,0.5)" }}>
                      {s.title}
                    </span>
                    <span className="ml-auto text-xs font-mono" style={{ color: i === activeService ? "#3B82F6" : "rgba(180,200,230,0.2)" }}>{s.num}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: detail */}
            <div key={activeService} style={{ animation: "storyIn 0.4s ease forwards" }}>
              <div className="rounded-3xl p-10 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.2)", minHeight: 340 }}>
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle,#3B82F6,transparent)" }} />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)" }}>
                    <Icon name={service.icon} size={28} style={{ color: "#60A5FA" }} />
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(59,130,246,0.6)" }}>{service.num}</p>
                  <h3 className="font-black text-3xl mb-4" style={{ letterSpacing: "-0.02em" }}>{service.title}</h3>
                  <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(180,200,230,0.65)" }}>{service.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }}>
                    Узнать стоимость <Icon name="ArrowRight" size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 relative" style={{ background: "#060d1f" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#3B82F6" }}>Тарифы</p>
            <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", letterSpacing: "-0.02em" }}>
              Прозрачные условия<br />
              <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                сотрудничества
              </span>
            </h2>
          </div>

          {/* Tab selector */}
          <div className="flex justify-center mb-10">
            <div className="flex rounded-2xl p-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.12)" }}>
              {PLANS.map((p, i) => (
                <button key={i} onClick={() => setActivePlan(i)}
                  className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300"
                  style={{
                    background: i === activePlan ? "linear-gradient(135deg,#3B82F6,#8B5CF6)" : "transparent",
                    color: i === activePlan ? "#fff" : "rgba(180,200,230,0.5)",
                  }}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active plan detail */}
          <div key={activePlan} className="max-w-2xl mx-auto" style={{ animation: "storyIn 0.4s ease forwards" }}>
            <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(59,130,246,0.25)", background: "rgba(255,255,255,0.02)" }}>
              <div className="px-8 py-6" style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.12),rgba(139,92,246,0.08))", borderBottom: "1px solid rgba(59,130,246,0.15)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#60A5FA" }}>{PLANS[activePlan].period}</p>
                    <h3 className="font-black text-3xl">{PLANS[activePlan].name}</h3>
                    <p className="text-sm mt-1" style={{ color: "rgba(180,200,230,0.6)" }}>{PLANS[activePlan].desc}</p>
                  </div>
                  {PLANS[activePlan].highlight && (
                    <div className="px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }}>
                      Популярный
                    </div>
                  )}
                </div>
              </div>
              <div className="px-8 py-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}>
                    <p className="text-xs mb-1" style={{ color: "rgba(180,200,230,0.5)" }}>Без репутации</p>
                    <p className="font-black text-xl" style={{ color: "#60A5FA" }}>{PLANS[activePlan].prices[0]}</p>
                  </div>
                  <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
                    <p className="text-xs mb-1" style={{ color: "rgba(180,200,230,0.5)" }}>С репутацией</p>
                    <p className="font-black text-xl" style={{ color: "#A78BFA" }}>{PLANS[activePlan].prices[1]}</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {PLANS[activePlan].features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(180,200,230,0.8)" }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
                        <Icon name="Check" size={11} style={{ color: "#60A5FA" }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }}>
                  Выбрать тариф <Icon name="ArrowRight" size={14} />
                </a>
              </div>
            </div>
            {/* Plan switcher cards below */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {PLANS.map((p, i) => (
                <button key={i} onClick={() => setActivePlan(i)}
                  className="rounded-2xl p-4 text-left transition-all duration-300"
                  style={{
                    background: i === activePlan ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${i === activePlan ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.08)"}`,
                  }}>
                  <p className="font-bold text-xs mb-1" style={{ color: i === activePlan ? "#E8EDF3" : "rgba(180,200,230,0.4)" }}>{p.name}</p>
                  <p className="text-[10px]" style={{ color: i === activePlan ? "rgba(96,165,250,0.8)" : "rgba(180,200,230,0.25)" }}>{p.period}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD FORM (разбор) ── */}
      <section id="vacancy" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#060d1f 0%,#08101e 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)"
        }} />
        <div className="max-w-2xl mx-auto px-5 md:px-10 relative">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#3B82F6" }}>Бесплатно</p>
            <h2 className="font-black leading-tight mb-3" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", letterSpacing: "-0.02em" }}>
              Записаться на разбор
            </h2>
            <p className="text-sm" style={{ color: "rgba(180,200,230,0.55)" }}>Оставьте заявку — свяжемся и разберём вашу карточку</p>
          </div>

          {/* What's included */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { icon: "📊", title: "Анализ текущего положения", desc: "Разберём где вы сейчас и что мешает росту" },
              { icon: "🔍", title: "Разбор ошибок", desc: "Найдём слабые места в карточке и стратегии" },
              { icon: "✅", title: "Решение", desc: "Дадим конкретный план действий" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-4 text-center flex flex-col items-center gap-2"
                style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}>
                <div style={{ fontSize: 26 }}>{item.icon}</div>
                <p className="text-xs font-bold leading-snug" style={{ color: "#E8EDF3" }}>{item.title}</p>
                <p className="text-[11px] leading-snug" style={{ color: "rgba(180,200,230,0.45)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.2)" }}>
            {leadSent ? (
              <div className="px-8 py-16 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-black text-2xl mb-2">Заявка отправлена!</h3>
                <p className="text-sm" style={{ color: "rgba(180,200,230,0.55)" }}>Свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="px-8 py-10 space-y-5">
                {[
                  { key: "name", label: "Ваше имя *", type: "text", placeholder: "Иван Иванов", required: true },
                  { key: "phone", label: "Телефон *", type: "tel", placeholder: "+7 (999) 000-00-00", required: true },
                  { key: "card_url", label: "Ссылка на карточку", type: "url", placeholder: "https://yandex.ru/maps/...", required: false },
                ].map(({ key, label, type, placeholder, required }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "rgba(180,200,230,0.5)" }}>{label}</label>
                    <input type={type} value={leadForm[key as keyof typeof leadForm]}
                      onChange={e => setLeadForm(f => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder} required={required}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.2)", color: "#E8EDF3" }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(59,130,246,0.6)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)"} />
                  </div>
                ))}
                {leadError && <p className="text-xs text-red-400">{leadError}</p>}
                <button type="submit" disabled={leadLoading}
                  className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }}>
                  {leadLoading ? "Отправляем..." : "Отправить заявку"}
                </button>
                <p className="text-center text-[11px]" style={{ color: "rgba(180,200,230,0.3)" }}>
                  Нажимая, вы соглашаетесь с{" "}
                  <button type="button" onClick={() => setPrivacyOpen(true)} className="underline hover:opacity-80">политикой конфиденциальности</button>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 relative" style={{ background: "#060d1f" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#8B5CF6" }}>Контакты</p>
            <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", letterSpacing: "-0.02em" }}>
              Готовы обсудить<br />
              <span style={{ background: "linear-gradient(90deg,#8B5CF6,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ваш проект?
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(139,92,246,0.15)" }}>
              <h3 className="font-bold text-lg mb-6" style={{ color: "#E8EDF3" }}>Свяжитесь с нами</h3>
              <div className="space-y-4">
                <a href="tel:+79119944122" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                    <Icon name="Phone" size={18} style={{ color: "#60A5FA" }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "rgba(180,200,230,0.4)" }}>Телефон</p>
                    <p className="font-semibold text-sm" style={{ color: "#E8EDF3" }}>+7 (911) 994-41-22</p>
                  </div>
                </a>
                <a href="mailto:info@keycard-promotion.ru" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                    <Icon name="Mail" size={18} style={{ color: "#A78BFA" }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "rgba(180,200,230,0.4)" }}>Почта</p>
                    <p className="font-semibold text-sm" style={{ color: "#E8EDF3" }}>info@keycard-promotion.ru</p>
                  </div>
                </a>
                <a href="https://t.me/yandex_promotion" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                    <Icon name="Send" size={18} style={{ color: "#60A5FA" }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "rgba(180,200,230,0.4)" }}>Telegram</p>
                    <p className="font-semibold text-sm" style={{ color: "#E8EDF3" }}>@yandex_promotion</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="rounded-3xl p-8 flex flex-col justify-center items-center text-center"
              style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.08))", border: "1px solid rgba(59,130,246,0.2)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
                <Icon name="Rocket" size={28} style={{ color: "#60A5FA" }} />
              </div>
              <h3 className="font-black text-2xl mb-3" style={{ letterSpacing: "-0.02em" }}>Начнём прямо сейчас</h3>
              <p className="text-sm mb-6" style={{ color: "rgba(180,200,230,0.55)" }}>
                Бесплатный аудит карточки — без обязательств. Узнайте, почему вас не находят клиенты.
              </p>
              <a href="https://t.me/yandex_promotion" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:opacity-90 hover:scale-105"
                style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }}>
                Написать в Telegram <Icon name="ArrowUpRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10" style={{ borderTop: "1px solid rgba(59,130,246,0.1)", background: "#040a18" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="KeyCard" className="h-8 w-8 object-cover rounded-lg" style={{ border: "1px solid rgba(59,130,246,0.2)" }} />
            <span className="text-sm font-black tracking-widest uppercase" style={{ color: "#E8EDF3" }}>
              Key<span style={{ color: "#3B82F6" }}>Card</span> Promotion
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgba(180,200,230,0.3)" }}>© 2025 KeyCard Promotion. Все права защищены.</p>
          <button onClick={() => setPrivacyOpen(true)} className="text-xs hover:opacity-80 transition-opacity" style={{ color: "rgba(180,200,230,0.4)" }}>
            Политика конфиденциальности
          </button>
        </div>
      </footer>

      {/* Privacy modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)" }} onClick={() => setPrivacyOpen(false)}>
          <div className="rounded-3xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto" style={{ background: "#0d1f3c", border: "1px solid rgba(59,130,246,0.2)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl">Политика конфиденциальности</h3>
              <button onClick={() => setPrivacyOpen(false)} className="p-2 rounded-lg hover:opacity-70" style={{ background: "rgba(255,255,255,0.05)" }}>
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "rgba(180,200,230,0.7)" }}>
              <p>ИП Кузьмин Максим Александрович обрабатывает персональные данные пользователей в соответствии с ФЗ-152 «О персональных данных».</p>
              <p>Собираемые данные: имя, телефон, email — используются исключительно для обратной связи и не передаются третьим лицам.</p>
              <p>Отправляя форму, вы даёте согласие на обработку персональных данных.</p>
              <p>По вопросам: <a href="mailto:info@keycard-promotion.ru" style={{ color: "#60A5FA" }}>info@keycard-promotion.ru</a></p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes storyIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
