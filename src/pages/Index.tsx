import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Кейсы", href: "#cases" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contact" },
];

const SERVICES = [
  {
    number: "01",
    title: "Стратегия и брендинг",
    desc: "Разрабатываем позиционирование, фирменный стиль и коммуникационную стратегию для устойчивого роста бизнеса.",
  },
  {
    number: "02",
    title: "Digital-маркетинг",
    desc: "SEO, контекстная реклама, таргет и аналитика — выстраиваем системный поток клиентов из интернета.",
  },
  {
    number: "03",
    title: "Веб-разработка",
    desc: "Создаём сайты и лендинги с фокусом на конверсию, скорость и безупречный пользовательский опыт.",
  },
  {
    number: "04",
    title: "Контент и SMM",
    desc: "Производим контент, который работает: тексты, визуал, видео и ведение социальных сетей.",
  },
];

const CASES = [
  {
    category: "Ритейл",
    title: "Рост конверсии на 340%",
    desc: "Редизайн интернет-магазина и SEO-оптимизация для федеральной сети.",
    metric: "+340%",
  },
  {
    category: "B2B",
    title: "Лидогенерация с нуля",
    desc: "Комплексный запуск digital-канала для промышленного предприятия.",
    metric: "×12",
  },
  {
    category: "Недвижимость",
    title: "Снижение стоимости лида",
    desc: "Оптимизация рекламных кампаний и посадочных страниц застройщика.",
    metric: "−62%",
  },
];

const PLANS = [
  {
    name: "Старт",
    price: "45 000 ₽",
    period: "/ месяц",
    desc: "Для малого бизнеса и стартапов",
    features: [
      "Аудит и стратегия",
      "Ведение 2 каналов",
      "Ежемесячный отчёт",
      "Поддержка по email",
    ],
    highlight: false,
  },
  {
    name: "Рост",
    price: "95 000 ₽",
    period: "/ месяц",
    desc: "Для компаний в активной фазе роста",
    features: [
      "Всё из тарифа Старт",
      "Полный digital-маркетинг",
      "Контент-план + производство",
      "Персональный менеджер",
      "Еженедельные встречи",
    ],
    highlight: true,
  },
  {
    name: "Партнёрство",
    price: "от 180 000 ₽",
    period: "/ месяц",
    desc: "Для крупного бизнеса и холдингов",
    features: [
      "Всё из тарифа Рост",
      "Выделенная команда",
      "Индивидуальная стратегия",
      "Приоритетная поддержка 24/7",
      "Ежеквартальная стратсессия",
    ],
    highlight: false,
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const heroSection = useInView(0.1);
  const aboutSection = useInView(0.1);
  const servicesSection = useInView(0.1);
  const casesSection = useInView(0.1);
  const pricingSection = useInView(0.1);
  const contactSection = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8F7F5] min-h-screen font-body text-[#141414]">

      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#F8F7F5]/95 backdrop-blur-sm border-b border-[#E0DDD9]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="font-display text-xl tracking-widest uppercase text-[#141414]">
            Агентство
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs tracking-[0.15em] uppercase text-[#666] hover:text-[#141414] transition-colors duration-300 link-line"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:block text-xs tracking-[0.15em] uppercase border border-[#141414] px-5 py-2.5 hover:bg-[#141414] hover:text-[#F8F7F5] transition-all duration-300"
          >
            Оставить заявку
          </a>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#F8F7F5] border-t border-[#E0DDD9] px-6 py-8 flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-[0.12em] uppercase text-[#141414]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm tracking-[0.12em] uppercase border border-[#141414] px-5 py-3 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Оставить заявку
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section ref={heroSection.ref} className="min-h-screen flex flex-col justify-end pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-16 md:pb-24 grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p
              className={`text-xs tracking-[0.25em] uppercase text-[#999] mb-8 transition-all duration-700 ${
                heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Маркетинговое агентство — Москва
            </p>
            <h1
              className={`font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] font-light text-[#141414] transition-all duration-700 delay-100 ${
                heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Мы строим
              <br />
              <em className="not-italic text-[#888]">бизнес</em>
              <br />
              через digital
            </h1>
          </div>

          <div
            className={`flex flex-col gap-8 transition-all duration-700 delay-200 ${
              heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <img
              src="https://cdn.poehali.dev/projects/678f7adc-98d6-4171-8f2c-e01ae23f112c/files/6a6b463a-739b-4917-a3a7-c195b6d50454.jpg"
              alt="Рабочее пространство агентства"
              className="w-full aspect-[4/3] object-cover"
            />
            <p className="text-sm text-[#666] leading-relaxed max-w-xs font-light">
              Системный подход к росту: от стратегии до результата. Работаем с бизнесом любого масштаба.
            </p>
          </div>
        </div>

        <div className="border-t border-[#E0DDD9] py-4 overflow-hidden">
          <div
            className="flex gap-16 whitespace-nowrap"
            style={{ animation: "ticker 20s linear infinite" }}
          >
            {Array(4).fill(["Стратегия", "Брендинг", "SEO", "Реклама", "Контент", "Аналитика"]).flat().map((t, i) => (
              <span key={i} className="text-xs tracking-[0.2em] uppercase text-[#AAA]">
                {t} &nbsp;·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutSection.ref} className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#999]">О нас</p>
            </div>
            <div className="md:col-span-9">
              <h2
                className={`font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-light mb-12 transition-all duration-700 ${
                  aboutSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Десять лет мы помогаем компаниям расти через осмысленный маркетинг
              </h2>
              <div
                className={`grid md:grid-cols-3 gap-10 transition-all duration-700 delay-150 ${
                  aboutSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {[
                  { n: "200+", label: "Реализованных проектов" },
                  { n: "40+", label: "Специалистов в команде" },
                  { n: "94%", label: "Клиентов возвращаются" },
                ].map((s) => (
                  <div key={s.n} className="border-t border-[#E0DDD9] pt-6">
                    <div className="font-display text-5xl font-light text-[#141414] mb-2">{s.n}</div>
                    <div className="text-xs tracking-[0.1em] uppercase text-[#888]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={servicesSection.ref} className="py-28 md:py-40 bg-[#141414] text-[#F8F7F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#666]">Что предлагаем</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-light text-[#F8F7F5]">
                Полный спектр digital-услуг
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {SERVICES.map((s, i) => (
              <div
                key={s.number}
                className={`border-t border-[#333] p-8 md:p-10 group hover:bg-[#1E1E1E] transition-all duration-300 ${
                  i % 2 === 1 ? "md:border-l md:border-l-[#333]" : ""
                } ${
                  servicesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-xs tracking-[0.2em] text-[#555] mb-6">{s.number}</div>
                <h3 className="font-display text-2xl md:text-3xl font-light text-[#F8F7F5] mb-4">
                  {s.title}
                </h3>
                <p className="text-sm text-[#888] leading-relaxed font-light">{s.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-[#555] group-hover:text-[#F8F7F5] transition-colors duration-300">
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" ref={casesSection.ref} className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#999]">Кейсы</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-light">
                Результаты, которые говорят сами за себя
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-[#E0DDD9]">
            {CASES.map((c, i) => (
              <div
                key={c.title}
                className={`p-8 md:p-10 border-b border-[#E0DDD9] md:border-b-0 ${
                  i !== 0 ? "md:border-l md:border-[#E0DDD9]" : ""
                } hover:bg-[#F0EDE8] transition-all duration-300 ${
                  casesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <p className="text-xs tracking-[0.15em] uppercase text-[#999] mb-6">{c.category}</p>
                <div className="font-display text-6xl font-light text-[#141414] mb-6">{c.metric}</div>
                <h3 className="font-display text-xl font-light text-[#141414] mb-3">{c.title}</h3>
                <p className="text-sm text-[#777] leading-relaxed font-light">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={pricingSection.ref} className="py-28 md:py-40 bg-[#F0EDE8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#999]">Тарифы</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-light">
                Прозрачное ценообразование
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p, i) => (
              <div
                key={p.name}
                className={`p-8 md:p-10 transition-all duration-700 ${
                  p.highlight
                    ? "bg-[#141414] text-[#F8F7F5]"
                    : "bg-[#F8F7F5] text-[#141414]"
                } ${
                  pricingSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {p.highlight && (
                  <span className="text-[10px] tracking-[0.2em] uppercase bg-[#F8F7F5] text-[#141414] px-3 py-1 mb-6 inline-block">
                    Популярный
                  </span>
                )}
                <p className="text-xs tracking-[0.15em] uppercase opacity-50 mb-4">{p.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-4xl font-light">{p.price}</span>
                  <span className="text-xs opacity-50">{p.period}</span>
                </div>
                <p className={`text-xs mb-8 ${p.highlight ? "text-[#AAA]" : "text-[#888]"}`}>{p.desc}</p>
                <ul className="space-y-3 mb-10">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-light">
                      <Icon
                        name="Check"
                        size={14}
                        className={`mt-0.5 flex-shrink-0 ${p.highlight ? "text-[#F8F7F5]" : "text-[#141414]"}`}
                      />
                      <span className={p.highlight ? "text-[#CCC]" : "text-[#555]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center text-xs tracking-[0.15em] uppercase py-3.5 border transition-all duration-300 ${
                    p.highlight
                      ? "border-[#F8F7F5] text-[#F8F7F5] hover:bg-[#F8F7F5] hover:text-[#141414]"
                      : "border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-[#F8F7F5]"
                  }`}
                >
                  Выбрать тариф
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactSection.ref} className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-6">Контакты</p>
              <h2
                className={`font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] font-light mb-10 transition-all duration-700 ${
                  contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Давайте обсудим ваш проект
              </h2>
              <div className="space-y-6 text-sm text-[#666] font-light">
                <div>
                  <p className="text-xs tracking-[0.1em] uppercase text-[#AAA] mb-1">Email</p>
                  <a href="mailto:hello@agency.ru" className="hover:text-[#141414] transition-colors link-line">
                    hello@agency.ru
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-[0.1em] uppercase text-[#AAA] mb-1">Телефон</p>
                  <a href="tel:+74951234567" className="hover:text-[#141414] transition-colors link-line">
                    +7 (495) 123-45-67
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-[0.1em] uppercase text-[#AAA] mb-1">Адрес</p>
                  <p>Москва, ул. Пречистенка, 27</p>
                </div>
              </div>
            </div>

            <div
              className={`md:col-span-8 transition-all duration-700 delay-150 ${
                contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {submitted ? (
                <div className="h-full flex flex-col items-start justify-center py-20">
                  <div className="w-12 h-12 border border-[#141414] flex items-center justify-center mb-6">
                    <Icon name="Check" size={20} />
                  </div>
                  <h3 className="font-display text-3xl font-light mb-3">Заявка принята</h3>
                  <p className="text-sm text-[#888] font-light">
                    Мы свяжемся с вами в течение одного рабочего дня.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-[#999] block mb-2">
                        Имя
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border-b border-[#D0CCC7] bg-transparent py-3 text-sm font-light text-[#141414] placeholder-[#CCC] focus:outline-none focus:border-[#141414] transition-colors"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-[#999] block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border-b border-[#D0CCC7] bg-transparent py-3 text-sm font-light text-[#141414] placeholder-[#CCC] focus:outline-none focus:border-[#141414] transition-colors"
                        placeholder="email@company.ru"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#999] block mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border-b border-[#D0CCC7] bg-transparent py-3 text-sm font-light text-[#141414] placeholder-[#CCC] focus:outline-none focus:border-[#141414] transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#999] block mb-2">
                      Расскажите о задаче
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full border-b border-[#D0CCC7] bg-transparent py-3 text-sm font-light text-[#141414] placeholder-[#CCC] focus:outline-none focus:border-[#141414] transition-colors resize-none"
                      placeholder="Опишите ваш проект или вопрос..."
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-[#AAA] font-light max-w-xs">
                      Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности
                    </p>
                    <button
                      type="submit"
                      className="text-xs tracking-[0.15em] uppercase border border-[#141414] text-[#141414] px-8 py-4 hover:bg-[#141414] hover:text-[#F8F7F5] transition-all duration-300 flex items-center gap-3 whitespace-nowrap"
                    >
                      Отправить
                      <Icon name="ArrowRight" size={12} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E0DDD9] py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-sm tracking-widest uppercase text-[#888]">Агентство</span>
          <p className="text-xs text-[#BBB] font-light">© 2024 Все права защищены</p>
          <div className="flex items-center gap-6">
            {["Telegram", "VK", "Behance"].map((s) => (
              <a key={s} href="#" className="text-xs tracking-[0.1em] uppercase text-[#BBB] hover:text-[#141414] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
