import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

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
  { value: "ТОП-3", label: "результат в Яндексе" },
  { value: "100%", label: "продление партнёров" },
];

const SERVICES = [
  {
    icon: "MapPin",
    title: "Яндекс.Бизнес",
    desc: "Полное продвижение и оптимизация карточек компании. Заполнение, оформление, рост в поиске и на картах.",
  },
  {
    icon: "Star",
    title: "Репутация и отзывы",
    desc: "Работа с отзывами, улучшение рейтинга, мониторинг упоминаний. Ваша репутация под контролем.",
  },
  {
    icon: "Megaphone",
    title: "Рекламные кампании",
    desc: "Настройка и ведение рекламы в Яндекс.Директ и РСЯ. Отчёты, аналитика и постоянная оптимизация.",
  },
  {
    icon: "Stethoscope",
    title: "Яндекс.Медицина",
    desc: "Продвижение профилей врачей, оптимизация под голосовой поиск Алисы AI и медицинские агрегаторы.",
  },
  {
    icon: "TrendingUp",
    title: "SEO-оптимизация",
    desc: "Техническая и контентная оптимизация. Отслеживание позиций, семантика, рост органического трафика.",
  },
  {
    icon: "BarChart2",
    title: "Поддержка и отчёты",
    desc: "Регулярные отчёты, персональный менеджер и постоянный контроль результатов продвижения.",
  },
];

const PLANS = [
  {
    name: "Тестовый",
    period: "3 месяца",
    prices: ["120 000 ₽", "150 000 ₽"],
    desc: "Идеально для старта и проверки стратегии",
    features: [
      "Настройка профиля",
      "Базовое SEO",
      "Дизайн карточки",
      "Работа с отзывами",
      "Ежемесячный отчёт",
    ],
    highlight: false,
  },
  {
    name: "Стандартный",
    period: "6 месяцев",
    prices: ["200 000 ₽", "250 000 ₽"],
    desc: "Для активного роста и захвата аудитории",
    features: [
      "Всё из Тестового",
      "Продвижение Яндекс.Медицина",
      "Оптимизация под Алису AI",
      "Рекламные кампании",
      "Еженедельный отчёт",
      "Персональный менеджер",
    ],
    highlight: true,
  },
  {
    name: "Логичный",
    period: "12 месяцев",
    prices: ["350 000 ₽", "400 000 ₽"],
    desc: "Полное долгосрочное партнёрство",
    features: [
      "Всё из Стандартного",
      "Объединение всех стратегий",
      "Приоритетная поддержка 24/7",
      "Квартальная стратсессия",
      "Выделенная команда",
      "Гарантия результата",
    ],
    highlight: false,
  },
];

const gold = "#E8B94F";
const goldDim = "rgba(232,185,79,0.12)";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", company: "" });
  const [submitted, setSubmitted] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const heroRef = useInView(0.05);
  const aboutRef = useInView(0.1);
  const approachRef = useInView(0.1);
  const servicesRef = useInView(0.1);
  const pricingRef = useInView(0.05);
  const contactRef = useInView(0.1);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open("https://t.me/yandex_promotion", "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E8EDF3]" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0D1117]/90 backdrop-blur-md border-b border-white/5" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-[72px]">
          <a href="#">
            <img
              src="https://cdn.poehali.dev/projects/678f7adc-98d6-4171-8f2c-e01ae23f112c/bucket/b0881780-e896-45e3-81e9-485d118b2819.png"
              alt="KeyCard"
              className="h-10 w-auto object-contain"
              style={{ mixBlendMode: "lighten", filter: "brightness(1.1)" }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-xs tracking-widest uppercase text-[#8A95A3] hover:text-[#E8EDF3] transition-colors duration-300">
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-2.5 rounded border transition-all duration-300 hover:opacity-90"
            style={{ borderColor: gold, color: gold }}
          >
            Получить разбор
          </a>

          <button className="md:hidden p-2 text-[#8A95A3]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#111827] border-t border-white/5 px-5 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm tracking-widest uppercase text-[#E8EDF3]" onClick={() => setMenuOpen(false)}>
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section ref={heroRef.ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">

        <div className="absolute left-0 top-1/4 w-px h-1/2 opacity-25" style={{ background: `linear-gradient(to bottom, transparent, ${gold}, transparent)` }} />

        <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-24 w-full">
          <div className={`max-w-3xl transition-all duration-1000 ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 opacity-70" style={{ background: gold }} />
              <span className="text-xs tracking-[0.25em] uppercase" style={{ color: gold }}>Рекламное SEO-агентство для локального бизнеса</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(3rem,7vw,5.5rem)", lineHeight: 1, fontWeight: 600, color: "#E8EDF3" }}>
              Будь первым
              <br />на картах с{" "}
              <span style={{ color: gold, fontStyle: "italic" }}>первыми</span>
              <br />в Яндекс Рекламе
            </h1>
            <p className="mt-6 text-base md:text-lg text-[#8A95A3] leading-relaxed max-w-xl font-light">
              Помогаем салонам красоты, стоматологиям и медицинским центрам стабильно привлекать новых клиентов через локальный поиск.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://t.me/yandex_promotion"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-7 py-4 text-sm font-medium tracking-wide rounded transition-all duration-300 hover:opacity-90"
                style={{ background: gold, color: "#0D1117" }}
              >
                Разбор вашей организации
                <Icon name="ArrowRight" size={16} />
              </a>
              <a
                href="#services"
                className="flex items-center gap-2.5 px-7 py-4 text-sm font-medium tracking-wide rounded border border-white/15 text-[#E8EDF3] hover:border-white/30 transition-all duration-300"
              >
                Наши услуги
              </a>
            </div>
          </div>

          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 transition-all duration-1000 delay-300 ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {STATS.map((s) => (
              <div key={s.value} className="rounded-lg p-5 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: 38, fontWeight: 700, color: gold, lineHeight: 1 }}>{s.value}</div>
                <div className="mt-1 text-xs text-[#8A95A3] tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative border-t border-white/5 py-3 overflow-hidden">
          <div className="ticker-wrap flex gap-14 whitespace-nowrap">
            {Array(6).fill(["Яндекс.Бизнес", "Яндекс.Карты", "SEO", "Репутация", "Алиса AI", "Яндекс.Медицина"]).flat().map((t, i) => (
              <span key={i} className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(232,185,79,0.4)" }}>
                {t}&nbsp;·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef.ref} className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${aboutRef.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: gold }} />
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: gold }}>О компании</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", lineHeight: 1.1, fontWeight: 600, color: "#E8EDF3" }}>
                5 лет выводим бизнес в топ Яндекса
              </h2>
              <p className="mt-5 text-[#8A95A3] leading-relaxed text-sm">
                Компания KeyCard специализируется на продвижении локального бизнеса в поисковых системах Яндекс, Яндекс.Карты и смежных платформах.
              </p>
              <p className="mt-3 text-[#8A95A3] leading-relaxed text-sm">
                Работаем с салонами красоты, косметологическими сетями, стоматологиями и медицинскими центрами — нишами с высокой конкуренцией в локальном поиске.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  "Более 300 доверенных партнёров по всей России",
                  "Команда дизайнеров, маркетологов, SEO- и IT-специалистов",
                  "Постоянно отслеживаем тренды и алгоритмы Яндекса",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center" style={{ background: goldDim, border: `1px solid rgba(232,185,79,0.25)` }}>
                      <Icon name="Check" size={10} style={{ color: gold }} />
                    </div>
                    <span className="text-sm text-[#B0BAC5]">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${aboutRef.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
                {/* SVG lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {[
                    { x: 210, y: 60 },
                    { x: 360, y: 120 },
                    { x: 390, y: 270 },
                    { x: 310, y: 380 },
                    { x: 110, y: 380 },
                    { x: 30, y: 270 },
                    { x: 60, y: 120 },
                  ].map((pt, i) => (
                    <line key={i} x1="210" y1="210" x2={pt.x} y2={pt.y} stroke="rgba(232,185,79,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  <circle cx="210" cy="210" r="80" stroke="rgba(232,185,79,0.08)" strokeWidth="1" />
                  <circle cx="210" cy="210" r="160" stroke="rgba(232,185,79,0.05)" strokeWidth="1" />
                </svg>

                {/* Center logo */}
                <div className="relative z-10 rounded-2xl overflow-hidden flex-shrink-0" style={{ width: 140, height: 140, border: "1px solid rgba(232,185,79,0.2)", background: "rgba(13,17,23,0.9)", boxShadow: "0 0 40px rgba(232,185,79,0.08)" }}>
                  <img
                    src="https://cdn.poehali.dev/projects/678f7adc-98d6-4171-8f2c-e01ae23f112c/bucket/59da3fe4-90c4-484f-9bcb-aaad61c781b7.png"
                    alt="KeyCard"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Orbit tags */}
                {[
                  { label: "Стоматологии", angle: -90, icon: "🦷" },
                  { label: "Косметология", angle: -38, icon: "✨" },
                  { label: "Салоны красоты", angle: 14, icon: "💇" },
                  { label: "Медцентры", angle: 66, icon: "🏥" },
                  { label: "Автосервисы", angle: 118, icon: "🔧" },
                  { label: "Фитнес-клубы", angle: 170, icon: "💪" },
                  { label: "Рестораны", angle: 222, icon: "🍽️" },
                ].map(({ label, angle, icon }) => {
                  const r = 160;
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + ((Math.cos(rad) * r) / 420) * 100;
                  const y = 50 + ((Math.sin(rad) * r) / 420) * 100;
                  return (
                    <div
                      key={label}
                      className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#E8EDF3] whitespace-nowrap"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(232,185,79,0.18)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      <span>{icon}</span>
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" ref={approachRef.ref} className="py-28 md:py-36" style={{ background: "linear-gradient(180deg, #0D1117 0%, #0f1623 50%, #0D1117 100%)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className={`text-center mb-14 transition-all duration-700 ${approachRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: gold }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: gold }}>Наш подход</span>
              <div className="h-px w-8" style={{ background: gold }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 600, color: "#E8EDF3", lineHeight: 1.1 }}>
              Индивидуальная стратегия — проверенный результат
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", icon: "Target", title: "Индивидуальный подход", desc: "Анализируем ваш бизнес, конкурентов и нишу. Разрабатываем стратегию под конкретные цели — без шаблонов." },
              { num: "02", icon: "Zap", title: "Готовые решения", desc: "Используем методики, отработанные на 300+ клиентах. Знаем, что работает в вашей нише и даёт результат быстро." },
              { num: "03", icon: "Users", title: "Новые клиенты", desc: "Цель — не просто позиции, а реальный поток клиентов. Оцениваем эффективность по бизнес-метрикам." },
            ].map((c, i) => (
              <div
                key={c.num}
                className={`card-hover rounded-xl p-8 border border-white/8 transition-all duration-700 ${approachRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ background: "rgba(255,255,255,0.03)", transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: goldDim }}>
                    <Icon name={c.icon} size={22} style={{ color: gold }} />
                  </div>
                  <span style={{ fontFamily: "'Cormorant', serif", fontSize: 44, fontWeight: 700, color: "rgba(232,185,79,0.1)", lineHeight: 1 }}>{c.num}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 22, fontWeight: 600, color: "#E8EDF3", marginBottom: 10 }}>{c.title}</h3>
                <p className="text-sm text-[#8A95A3] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 text-center transition-all duration-700 delay-400 ${approachRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <a
              href="https://t.me/yandex_promotion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-medium rounded transition-all duration-300 hover:opacity-90"
              style={{ background: gold, color: "#0D1117" }}
            >
              Разбор вашей организации
              <Icon name="ArrowUpRight" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={servicesRef.ref} className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className={`mb-14 transition-all duration-700 ${servicesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: gold }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: gold }}>Что мы предлагаем</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 600, color: "#E8EDF3", lineHeight: 1.1 }}>
              Полный арсенал инструментов<br className="hidden md:block" /> для роста в Яндексе
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`card-hover rounded-xl p-7 border border-white/8 transition-all duration-700 ${servicesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ background: "rgba(255,255,255,0.03)", transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ background: goldDim }}>
                  <Icon name={s.icon} size={20} style={{ color: gold }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 20, fontWeight: 600, color: "#E8EDF3", marginBottom: 10 }}>{s.title}</h3>
                <p className="text-sm text-[#8A95A3] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={pricingRef.ref} className="py-28 md:py-36" style={{ background: "linear-gradient(180deg, #0D1117 0%, #0A0F1A 100%)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className={`text-center mb-14 transition-all duration-700 ${pricingRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: gold }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: gold }}>Тарифы</span>
              <div className="h-px w-8" style={{ background: gold }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 600, color: "#E8EDF3", lineHeight: 1.1 }}>
              Прозрачные условия сотрудничества
            </h2>
            <p className="mt-3 text-[#8A95A3] text-sm">Цена зависит от количества продвигаемых точек и объёма работ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p, i) => (
              <div
                key={p.name}
                className={`relative rounded-xl p-8 transition-all duration-700 ${pricingRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{
                  transitionDelay: `${i * 120}ms`,
                  background: p.highlight ? "linear-gradient(145deg, #1A1F2E, #141926)" : "rgba(255,255,255,0.025)",
                  border: p.highlight ? `1px solid rgba(232,185,79,0.4)` : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: p.highlight ? "0 0 60px rgba(232,185,79,0.07)" : undefined,
                }}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full font-medium" style={{ background: gold, color: "#0D1117" }}>
                      Популярный
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#8A95A3] mb-1">{p.name}</p>
                  <p className="text-sm" style={{ color: gold }}>{p.period}</p>
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: 30, fontWeight: 700, color: "#E8EDF3", marginBottom: 2 }}>{p.prices[0]}</div>
                <p className="text-xs text-[#8A95A3] mb-3">Без репутации</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1 border-t border-dashed border-white/10" />
                  <span className="text-xs text-[#8A95A3]">или</span>
                  <div className="h-px flex-1 border-t border-dashed border-white/10" />
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: 30, fontWeight: 700, color: "#E8EDF3", marginBottom: 12 }}>{p.prices[1]}</div>
                <p className="text-xs text-[#8A95A3] mb-7">{p.desc}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center" style={{ background: goldDim }}>
                        <Icon name="Check" size={9} style={{ color: gold }} />
                      </div>
                      <span className="text-sm text-[#B0BAC5]">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="block text-center text-sm font-medium py-3.5 rounded border transition-all duration-300 hover:opacity-90"
                  style={p.highlight
                    ? { background: gold, color: "#0D1117", borderColor: gold }
                    : { background: "transparent", color: "#E8EDF3", borderColor: "rgba(255,255,255,0.15)" }
                  }
                >
                  Выбрать тариф
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[#555E6E]">
            В каждый тариф включено: настройка профиля · SEO · дизайн · работа с отзывами · Яндекс.Медицина · Алиса AI
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef.ref} className="py-28 md:py-36">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className={`text-center mb-12 transition-all duration-700 ${contactRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: gold }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: gold }}>Контакты</span>
              <div className="h-px w-8" style={{ background: gold }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 600, color: "#E8EDF3", lineHeight: 1.1 }}>
              Готовы обсудить ваш проект?
            </h2>
            <p className="mt-3 text-[#8A95A3] text-sm">Оставьте заявку — свяжемся в течение 30 минут в рабочее время</p>
          </div>

          <div
            className={`rounded-2xl p-8 md:p-12 border border-white/8 transition-all duration-700 delay-150 ${contactRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "rgba(255,255,255,0.025)" }}
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: goldDim, border: `1px solid rgba(232,185,79,0.3)` }}>
                  <Icon name="Check" size={28} style={{ color: gold }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 28, fontWeight: 600, color: "#E8EDF3" }}>Заявка отправлена!</h3>
                <p className="mt-3 text-[#8A95A3] text-sm">Мы открыли Telegram — напишите нам там для быстрой связи.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-[#8A95A3] block mb-2">Имя *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#E8EDF3] placeholder-[#555E6E] focus:outline-none focus:border-yellow-400/40 transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-[#8A95A3] block mb-2">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#E8EDF3] placeholder-[#555E6E] focus:outline-none focus:border-yellow-400/40 transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase text-[#8A95A3] block mb-2">Название организации</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#E8EDF3] placeholder-[#555E6E] focus:outline-none focus:border-yellow-400/40 transition-colors"
                    placeholder="Салон красоты «Название»"
                  />
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#555E6E] text-center sm:text-left">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <button
                      type="button"
                      onClick={() => setPrivacyOpen(true)}
                      className="underline underline-offset-2 hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      политикой конфиденциальности
                    </button>
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 hover:opacity-90"
                    style={{ background: gold, color: "#0D1117" }}
                  >
                    Узнать подробнее
                    <Icon name="Send" size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#8A95A3]">Или напишите нам напрямую в Telegram</p>
            <a
              href="https://t.me/yandex_promotion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: gold }}
            >
              <Icon name="Send" size={15} />
              @yandex_promotion
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://cdn.poehali.dev/projects/678f7adc-98d6-4171-8f2c-e01ae23f112c/bucket/b0881780-e896-45e3-81e9-485d118b2819.png"
            alt="KeyCard"
            className="h-8 w-auto object-contain"
            style={{ mixBlendMode: "lighten", filter: "brightness(1.1)" }}
          />
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <p className="text-xs text-[#555E6E]">© 2025 KeyCard. Все права защищены.</p>
            <p className="text-xs text-[#555E6E]">ИНН 772145676128</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <a href="https://t.me/yandex_promotion" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase hover:opacity-80 transition-opacity" style={{ color: gold }}>
              Telegram
            </a>
            <a
              href="https://drive.google.com/file/d/1HLi4Iq_alrceyaNOXONKQddflYvHbtM1/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#555E6E] hover:opacity-80 transition-opacity underline underline-offset-2"
            >
              Договор об оказании услуг
            </a>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl p-8"
            style={{ background: "#0D1117", border: "1px solid rgba(232,185,79,0.15)" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPrivacyOpen(false)}
              className="absolute top-4 right-4 text-[#555E6E] hover:text-white transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
            <h2 className="text-xl font-bold text-[#E8EDF3] mb-6">Политика конфиденциальности</h2>
            <div className="text-sm text-[#8A95A3] space-y-4 leading-relaxed">
              <p>Настоящая Политика конфиденциальности (далее — «Политика») регулирует порядок обработки и защиты персональных данных пользователей сайта, принадлежащего ИП Плотицин Егор Михайлович (далее — «Компания»).</p>
              <div>
                <p className="text-[#E8EDF3] font-semibold mb-2">1. Общие положения</p>
                <p>1.1. Компания заботится о конфиденциальности и безопасности персональных данных своих пользователей. В этой Политике изложены основные принципы обработки персональных данных.</p>
                <p className="mt-2">1.2. Используя наш сайт, вы соглашаетесь с условиями этой Политики и даете согласие на обработку ваших персональных данных в соответствии с настоящей Политикой.</p>
              </div>
              <div>
                <p className="text-[#E8EDF3] font-semibold mb-2">2. Какие персональные данные мы можем собирать</p>
                <p>2.1. При использовании сайта мы можем собирать следующую информацию:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Имя, фамилия, контактные данные (например, телефон, электронная почта);</li>
                  <li>Иные данные, предоставленные вами при обращении или регистрации.</li>
                </ul>
              </div>
              <div>
                <p className="text-[#E8EDF3] font-semibold mb-2">3. Цели обработки персональных данных</p>
                <p>3.1. Обработка персональных данных осуществляется для следующих целей:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Предоставление услуг и выполнения обязательств перед пользователями;</li>
                  <li>Обработка запросов и обращений;</li>
                  <li>Улучшение качества сервиса и работы сайта;</li>
                  <li>Информирование о новых услугах и акциях (при согласии пользователя).</li>
                </ul>
              </div>
              <div>
                <p className="text-[#E8EDF3] font-semibold mb-2">4. Передача персональных данных третьим лицам</p>
                <p>4.1. Персональные данные не передаются третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством Российской Федерации.</p>
              </div>
              <div>
                <p className="text-[#E8EDF3] font-semibold mb-2">5. Меры по обеспечению безопасности</p>
                <p>5.1. Компания принимает все необходимые технические и организационные меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
              </div>
              <div>
                <p className="text-[#E8EDF3] font-semibold mb-2">6. Права пользователей</p>
                <p>6.1. Пользователи имеют право:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Получать информацию о своих персональных данных;</li>
                  <li>Требовать уточнения, обновления или удаления своих персональных данных;</li>
                  <li>Отказаться от получения информационных сообщений.</li>
                </ul>
              </div>
              <div>
                <p className="text-[#E8EDF3] font-semibold mb-2">7. Контактные данные</p>
                <p>7.1. Для вопросов, связанных с обработкой персональных данных, вы можете связаться с нами по следующим реквизитам:</p>
                <div className="mt-2 space-y-1">
                  <p>Наименование: ИП Плотицин Егор Михайлович</p>
                  <p>Юридический адрес: Москва, 111674, 1-я Вольская улица, 13 к2, кв.71</p>
                  <p>Расчетный счет: 40802810300009669624</p>
                  <p>Банк: АО «Тинькофф Банк»</p>
                  <p>Корр. счет: 30101810145250000974</p>
                  <p>ИНН: 7710140679</p>
                  <p>БИК: 044525974</p>
                  <p>Юридический адрес банка: Москва, 127287, ул. Хуторская 2-я, д. 38А, стр. 26</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}