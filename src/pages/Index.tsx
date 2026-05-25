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

const REVIEWS = [
  {
    org: "Стоматология «Здоровая улыбка»",
    text: "Благодарим команду KeyCard за профессиональную помощь в улучшении нашей репутации! Благодаря их поддержке мы смогли обойти конкурентов и привлечь больше новых клиентов. Особенно радует, что наши акции и предложения стали привлекать больше внимания. Также хочется отметить, что все материалы оформлены очень красиво и стильно. Очень ценим работу с вашей командой и надеемся на дальнейшее сотрудничество!",
    icon: "🦷",
    rating: 5,
  },
  {
    org: "Стоматология «Академия стоматологии»",
    text: "Выражаем глубокую благодарность за эффективную работу по улучшению нашей онлайн-репутации! Благодаря KeyCard мы заметно повысили узнаваемость и привлекли новых пациентов. Особенно радует, что наши рекламные материалы и оформление стали выглядеть очень профессионально. Всё выполнено красиво и аккуратно, что очень важно для нас. Спасибо за внимательное отношение и качественную работу!",
    icon: "🏥",
    rating: 5,
  },
  {
    org: "Стоматология «Улыбка Мира»",
    text: "Спасибо команде KeyCard за отличную работу! Ваша помощь помогла нам обойти конкурентов и привлекла больше клиентов. Все наши акции и предложения теперь выглядят очень привлекательно благодаря красивому оформлению. Работа с вами — настоящее удовольствие, и мы очень ценим ваше профессиональное отношение.",
    icon: "😊",
    rating: 5,
  },
  {
    org: "Стоматология «Эстетика улыбки»",
    text: "Большое спасибо за поддержку! Благодаря KeyCard мы смогли улучшить свою репутацию и привлечь больше пациентов. Всё оформление материалов выполнено очень красиво и аккуратно. Очень довольны сотрудничеством и надеемся на дальнейшие успехи!",
    icon: "✨",
    rating: 5,
  },
  {
    org: "Косметология «Красота и гармония»",
    text: "Огромное спасибо команде KeyCard! Ваша помощь позволила нам обойти конкурентов и значительно увеличить поток клиентов. Все рекламные материалы и оформление выполнены очень красиво и элегантно. Очень ценим ваше профессиональное отношение и работу с нашей репутацией.",
    icon: "💅",
    rating: 5,
  },
  {
    org: "Косметология «Элеганс-класс»",
    text: "Спасибо за отличную работу! Благодаря вам мы смогли повысить узнаваемость и привлечь больше клиентов. Всё оформление материалов выполнено очень красиво и стильно. Работа с вами — настоящее удовольствие, и мы рады продолжать сотрудничество!",
    icon: "💎",
    rating: 5,
  },
];

const SUBMIT_REVIEW_URL = "https://functions.poehali.dev/afbbb854-a4da-457c-8a63-421bef083447";

const blue = "#3B82F6";
const blueDim = "rgba(59,130,246,0.12)";
const purple = "#8B5CF6";
const purpleDim = "rgba(139,92,246,0.12)";
const LOGO_URL = "https://cdn.poehali.dev/projects/678f7adc-98d6-4171-8f2c-e01ae23f112c/files/90906752-e64f-4802-a583-b5a46b90cd9f.jpg";

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


const MAP_QUERY = "стоматологии в спб";

const MAP_ORGS = [
  { name: "Time to Smile", rating: "4,9", reviews: "99", type: "Стоматологическая клиника", hours: "Открыто до 21:00", metro: "Фрунзенская (закрыта)", dist: "750 м", address: "Заозёрная ул., 3, корп. 2, Санкт-Петер...", promo: "Скидка до 20% - Проф. гигиена в День рождения!", hasBook: true, phone: "+7 (911) 926-XX-XX", imgColor: "#E8F0E8" },
  { name: "Стоматология Credus", rating: "5,0", reviews: "710", type: "Стоматологическая клиника", hours: "Открыто до 21:00", metro: "Лесная", dist: "1,66 км", address: "Кушелевская дорога, 3, корп. 2, Санкт-Петербург (м...", promo: "Акция Всё за 1 день в стоматологии Credus в Санкт-Петербурге!", hasTelegram: true, phone: "+7 (812) 720-XX-XX", imgColor: "#2D2D2D" },
  { name: "АРС Дентал Клиник", rating: "5,0", reviews: "148", type: "Стоматологическая клиника", hours: "Открыто до 21:00", metro: "Лесная", dist: "990 м", address: "ул. Грибалёвой, 7, корп. 4, Санкт-Петербург", promo: "Скидка 1000 ₽ на первый приём в клинике!", phone: "+7 (812) 319-XX-XX", imgColor: "#D0D8C8" },
];


function YandexMapsAnimation() {
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [visibleResults, setVisibleResults] = useState(0);

  useEffect(() => {
    function run() {
      let i = 0;
      setTyped(""); setShowResults(false); setShowMap(false); setVisibleResults(0);
      const ti = setInterval(() => {
        i++;
        setTyped(MAP_QUERY.slice(0, i));
        if (i >= MAP_QUERY.length) {
          clearInterval(ti);
          setTimeout(() => {
            setShowMap(true);
            setTimeout(() => {
              setShowResults(true);
              let r = 0;
              const si = setInterval(() => { r++; setVisibleResults(r); if (r >= MAP_ORGS.length) clearInterval(si); }, 450);
            }, 400);
          }, 400);
        }
      }, 70);
    }
    run();
    const cycle = setInterval(run, 12000);
    return () => clearInterval(cycle);
  }, []);

  const mapPins = [
    { x: "38%", y: "38%", label: "Доктор Дент", rating: "5", price: "1000 ₽ Консультация детс..." },
    { x: "52%", y: "48%", label: "Time to Smile", rating: "4.9", price: "4100 ₽ Сканирование з..." },
    { x: "44%", y: "44%", label: null, rating: null, price: null },
  ];

  return (
    <div className="w-full max-w-sm mx-auto select-none" style={{ fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif" }}>
      <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.45)", border: "1px solid rgba(59,130,246,0.2)" }}>
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#DEE1E6" }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="flex-1 mx-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] truncate" style={{ background: "#fff", color: "#4a4a4a", border: "1px solid #C8CBD0" }}>
            <Icon name="Lock" size={9} style={{ color: "#888", flexShrink: 0 }} />
            <span className="truncate">yandex.ru — Яндекс: нашлось...</span>
          </div>
        </div>

        <div style={{ background: "#fff" }}>
          <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: "1px solid #E5E5E5" }}>
            <div className="flex items-center gap-0.5 shrink-0">
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 900, color: "#FC3F1D", letterSpacing: -1 }}>Я</span>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, fontWeight: 400, color: "#000" }}>ндекс</span>
            </div>
            <div className="flex-1 flex items-center rounded-2xl px-3 py-1.5" style={{ background: "#F5F5F5", border: "1px solid #E0E0E0", gap: 6 }}>
              <span className="text-[12px] flex-1 min-h-[16px]" style={{ color: "#1a1a1a" }}>
                {typed}
                <span className="inline-block w-px h-3.5 ml-0.5 align-middle" style={{ background: "#000", opacity: typed.length < MAP_QUERY.length ? 1 : 0, animation: "blink 1s step-end infinite" }} />
              </span>
              {typed.length >= MAP_QUERY.length && <Icon name="X" size={12} style={{ color: "#888", flexShrink: 0 }} />}
              <div className="w-6 h-6 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FC3F1D" }}>
                <Icon name="Search" size={11} style={{ color: "#fff" }} />
              </div>
            </div>
          </div>

          {showMap && (
            <div style={{ animation: "fadeSlideUp 0.3s ease" }}>
              <div className="flex gap-0 px-3 pt-1 pb-0 overflow-x-hidden" style={{ borderBottom: "1px solid #EFEFEF" }}>
                {["Поиск","Алиса AI","Медицина","Картинки","Карты"].map((tab, i) => (
                  <span key={tab} className="text-[10px] pb-1.5 pr-3 whitespace-nowrap shrink-0" style={{ color: i === 0 ? "#FC3F1D" : "#555", borderBottom: i === 0 ? "2px solid #FC3F1D" : "2px solid transparent", fontWeight: i === 0 ? 500 : 400 }}>{tab}</span>
                ))}
              </div>

              <div className="px-3 pt-2 pb-1">
                <p className="text-[13px] font-bold mb-2" style={{ color: "#1a1a1a" }}>Стоматологии в Санкт-Петербурге</p>
                <div className="rounded-xl overflow-hidden relative" style={{ height: 130, border: "1px solid #DDD" }}>
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130">
                    <rect width="340" height="130" fill="#C8D8C0" />
                    <rect x="0" y="55" width="340" height="18" fill="#D4CCA8" opacity="0.6" />
                    <rect x="80" y="0" width="12" height="130" fill="#D4CCA8" opacity="0.5" />
                    <rect x="170" y="0" width="10" height="130" fill="#D4CCA8" opacity="0.4" />
                    <rect x="240" y="0" width="8" height="130" fill="#D4CCA8" opacity="0.4" />
                    <ellipse cx="60" cy="75" rx="35" ry="20" fill="#A8C4E0" opacity="0.7" />
                    <rect x="100" y="20" width="45" height="30" rx="3" fill="#E8E0D0" opacity="0.8" />
                    <rect x="155" y="10" width="55" height="35" rx="3" fill="#E8E0D0" opacity="0.8" />
                    <rect x="220" y="25" width="40" height="28" rx="3" fill="#E8E0D0" opacity="0.8" />
                    <rect x="105" y="75" width="35" height="25" rx="2" fill="#E8E0D0" opacity="0.8" />
                    <rect x="150" y="80" width="50" height="22" rx="2" fill="#E8E0D0" opacity="0.8" />
                    <rect x="210" y="70" width="40" height="30" rx="2" fill="#E8E0D0" opacity="0.8" />
                    <text x="25" y="50" fontSize="8" fill="#666" fontFamily="Arial">губа</text>
                    <text x="115" y="48" fontSize="9" fill="#444" fontFamily="Arial" fontWeight="500">Санкт-П...</text>
                    <rect x="270" y="95" width="25" height="25" rx="4" fill="#fff" opacity="0.85" />
                    <text x="279" y="112" fontSize="14" fill="#555">➤</text>
                  </svg>
                  {mapPins.map((pin, idx) => (
                    <div key={idx} className="absolute" style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -50%)", zIndex: pin.label ? 5 : 3, animation: "fadeSlideUp 0.3s ease" }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#1A73E8", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>
                        <span style={{ fontSize: 11 }}>🦷</span>
                      </div>
                      {pin.label && (
                        <div className="absolute left-6 top-0 rounded-lg px-1.5 py-1 whitespace-nowrap" style={{ background: "rgba(0,0,0,0.82)", minWidth: 100, zIndex: 10 }}>
                          <p style={{ fontSize: 9, fontWeight: 600, color: "#fff" }}>{pin.label}</p>
                          <p style={{ fontSize: 8, color: "#ccc" }}>★ {pin.rating} {pin.price}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "rgba(0,0,0,0.78)" }}>
                    <Icon name="Maximize2" size={9} style={{ color: "#fff" }} />
                    <span style={{ fontSize: 9, color: "#fff", fontWeight: 500 }}>Смотреть на карте</span>
                  </div>
                </div>

                <div className="flex gap-1.5 mt-2 overflow-x-hidden pb-1">
                  {["Рядом со мной","Высокий рейтинг","Хорошее место","Открыто"].map((tag, i) => (
                    <span key={tag} className="text-[9px] whitespace-nowrap px-2 py-1 rounded-full shrink-0" style={{ background: "#F0F0F0", color: "#333", border: "1px solid #E0E0E0" }}>{tag}</span>
                  ))}
                </div>
              </div>

              {showResults && (
                <div>
                  {MAP_ORGS.slice(0, visibleResults).map((org, idx) => (
                    <div key={idx} style={{ borderTop: "1px solid #F0F0F0", background: "#fff", animation: "fadeSlideUp 0.3s ease", padding: "10px 12px" }}>
                      <div className="flex items-start gap-2.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-[13px] font-bold" style={{ color: "#1a1a1a" }}>{org.name}</span>
                            <span style={{ color: "#1A73E8", fontSize: 12 }}>✓</span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded" style={{ background: "#4CAF50", color: "#fff" }}>{org.rating}</span>
                            <span className="text-[10px]" style={{ color: "#70757a" }}>{org.reviews} отзывов</span>
                            <span className="text-[10px]" style={{ color: "#70757a" }}>{org.type}</span>
                            <span className="text-[10px]" style={{ color: "#0D8043" }}>{org.hours}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-0.5">
                            <span style={{ fontSize: 8, color: "#FC3F1D" }}>●</span>
                            <span className="text-[10px]" style={{ color: "#70757a" }}>{org.metro}, {org.dist} · {org.address}</span>
                          </div>
                          {org.promo && (
                            <p className="text-[10px] mb-1.5" style={{ color: "#70757a" }}>
                              {org.promo} <span style={{ color: "#888" }}>Промо</span>
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {org.hasBook && (
                              <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: "#fff", border: "1px solid #DDD", color: "#333" }}>Записаться онлайн</span>
                            )}
                            {org.hasTelegram && (
                              <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: "#fff", border: "1px solid #DDD", color: "#333" }}>Написать в Telegram</span>
                            )}
                            <span className="text-[10px] px-2 py-1 rounded-full flex items-center gap-1" style={{ background: "#fff", border: "1px solid #DDD", color: "#333" }}>
                              <Icon name="Phone" size={9} />
                              {org.phone}
                            </span>
                            <span className="px-1.5 py-1 rounded-full" style={{ background: "#fff", border: "1px solid #DDD" }}>
                              <Icon name="Globe" size={10} style={{ color: "#555" }} />
                            </span>
                            <span className="px-1.5 py-1 rounded-full" style={{ background: "#fff", border: "1px solid #DDD" }}>
                              <Icon name="Share2" size={10} style={{ color: "#555" }} />
                            </span>
                          </div>
                        </div>
                        <div className="w-14 h-14 rounded-xl shrink-0 overflow-hidden" style={{ background: org.imgColor, border: "1px solid #E8E8E8" }}>
                          <div className="w-full h-full flex items-center justify-center">
                            <span style={{ fontSize: 22 }}>🏥</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <a
        href="https://t.me/yandex_promotion"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center mt-3 tracking-wide transition-opacity duration-200 hover:opacity-80"
        style={{ color: "rgba(59,130,246,0.9)", textDecoration: "none" }}
      >
        <span className="text-[12px] font-medium">Вы ещё не лидеры рынка?</span>
        <span className="text-[11px] ml-1" style={{ color: "rgba(59,130,246,0.65)" }}>Ждём вас на разбор →</span>
      </a>
    </div>
  );
}

function HexagonDecor({ size = 200, color = "rgba(59,130,246,0.15)", strokeWidth = 1, rotate = 0 }: { size?: number; color?: string; strokeWidth?: number; rotate?: number }) {
  const cx = size / 2;
  const r = size / 2 - strokeWidth;
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    return `${cx + r * Math.cos(a)},${cx + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} style={{ transform: `rotate(${rotate}deg)` }} viewBox={`0 0 ${size} ${size}`} fill="none">
      <polygon points={pts} stroke={color} strokeWidth={strokeWidth} fill="none" />
    </svg>
  );
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
  const reviewsRef = useInView(0.05);
  const pricingRef = useInView(0.05);
  const contactRef = useInView(0.1);

  const [reviewForm, setReviewForm] = useState({ full_name: "", email: "", organization: "", phone: "", text: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      await fetch(SUBMIT_REVIEW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      setReviewSubmitted(true);
    } finally {
      setReviewLoading(false);
    }
  };

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
    <div className="min-h-screen text-[#E8EDF3]" style={{ fontFamily: "'Golos Text', sans-serif", background: "#060d1f" }}>

      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md border-b" : ""}`}
        style={scrolled ? { background: "rgba(6,13,31,0.92)", borderColor: "rgba(59,130,246,0.15)" } : {}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-[72px]">
          <a href="#" className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="KeyCard" className="h-10 w-10 object-cover rounded-lg" style={{ border: "1px solid rgba(59,130,246,0.3)" }} />
            <span className="hidden sm:block text-sm font-bold tracking-widest uppercase" style={{ color: "#E8EDF3", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.15em" }}>
              KeyCard <span style={{ color: blue }}>Promotion</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-xs tracking-widest uppercase transition-colors duration-300 hover:text-white" style={{ color: "rgba(180,200,230,0.65)" }}>
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-2.5 rounded-lg transition-all duration-300 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff" }}
          >
            Получить разбор
          </a>

          <button className="md:hidden p-2" style={{ color: "rgba(180,200,230,0.65)" }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-5 py-6 flex flex-col gap-5" style={{ background: "#0a1428", borderColor: "rgba(59,130,246,0.15)" }}>
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
        {/* BG glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)", top: "10%", left: "-10%" }} />
          <div className="absolute" style={{ width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", top: "30%", right: "-5%" }} />
          <div className="absolute" style={{ width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", bottom: "5%", left: "40%" }} />
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Hexagon decorations */}
          <div className="absolute opacity-20" style={{ top: "8%", right: "5%", animation: "rotate-slow 30s linear infinite" }}>
            <HexagonDecor size={300} color="#3B82F6" strokeWidth={1} />
          </div>
          <div className="absolute opacity-10" style={{ top: "5%", right: "3%", animation: "rotate-slow 20s linear infinite reverse" }}>
            <HexagonDecor size={380} color="#8B5CF6" strokeWidth={0.5} />
          </div>
          <div className="absolute opacity-15" style={{ bottom: "10%", left: "3%", animation: "rotate-slow 25s linear infinite" }}>
            <HexagonDecor size={200} color="#3B82F6" strokeWidth={1} />
          </div>
          {/* Floating circuit dots */}
          {[
            { x: "15%", y: "20%", s: 4 },
            { x: "80%", y: "15%", s: 3 },
            { x: "90%", y: "70%", s: 5 },
            { x: "5%", y: "65%", s: 3 },
            { x: "50%", y: "90%", s: 4 },
          ].map((d, i) => (
            <div key={i} className="absolute rounded-full" style={{ width: d.s, height: d.s, left: d.x, top: d.y, background: "#3B82F6", boxShadow: `0 0 ${d.s * 3}px rgba(59,130,246,0.8)`, animation: `float ${3 + i}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }} />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className={`flex-1 transition-all duration-1000 ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-10" style={{ background: `linear-gradient(90deg, ${blue}, ${purple})` }} />
                <span className="text-xs tracking-[0.25em] uppercase" style={{ color: blue }}>Рекламное SEO-агентство</span>
              </div>
              <h1 style={{ fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.05, fontWeight: 700, color: "#E8EDF3", fontFamily: "Rajdhani, sans-serif", letterSpacing: "-0.01em" }}>
                Будь первым{" "}
                <span style={{ background: "linear-gradient(90deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  на картах
                </span>
                <br />
                с первыми в{" "}
                <span style={{ background: "linear-gradient(90deg, #8B5CF6, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Яндекс Рекламе
                </span>
              </h1>
              <p className="mt-6 text-base md:text-lg leading-relaxed max-w-xl font-light" style={{ color: "rgba(180,200,230,0.75)" }}>
                Помогаем салонам красоты, стоматологиям и медицинским центрам стабильно привлекать новых клиентов через локальный поиск.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://t.me/yandex_promotion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-7 py-4 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 hover:opacity-90 glow-blue"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)", color: "#fff" }}
                >
                  Разбор вашей организации
                  <Icon name="ArrowRight" size={16} />
                </a>
                <a
                  href="#services"
                  className="flex items-center gap-2.5 px-7 py-4 text-sm font-medium tracking-wide rounded-lg border transition-all duration-300 hover:border-blue-400/40"
                  style={{ borderColor: "rgba(59,130,246,0.25)", color: "#E8EDF3", background: "rgba(59,130,246,0.05)" }}
                >
                  Наши услуги
                </a>
              </div>
            </div>

            <div className={`flex-1 hidden lg:flex flex-col gap-8 transition-all duration-1000 delay-300 pt-16 ${heroRef.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <YandexMapsAnimation />
            </div>
          </div>

          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 transition-all duration-1000 delay-300 ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {STATS.map((s) => (
              <div key={s.value} className="rounded-xl p-5 border tech-border" style={{ background: "rgba(59,130,246,0.05)", borderColor: "rgba(59,130,246,0.15)" }}>
                <div style={{ fontSize: 38, fontWeight: 700, color: blue, lineHeight: 1, fontFamily: "Rajdhani, sans-serif" }}>{s.value}</div>
                <div className="mt-1 text-xs tracking-wide" style={{ color: "rgba(180,200,230,0.6)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative border-t py-3 overflow-hidden" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
          <div className="ticker-wrap flex gap-14 whitespace-nowrap">
            {Array(6).fill(["Яндекс.Бизнес", "Яндекс.Карты", "SEO", "Репутация", "Алиса AI", "Яндекс.Медицина"]).flat().map((t, i) => (
              <span key={i} className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(59,130,246,0.5)" }}>
                {t}&nbsp;·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef.ref} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{ width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", top: "20%", right: "-5%" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${aboutRef.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${blue}, ${purple})` }} />
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: blue }}>О компании</span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.1, fontWeight: 700, color: "#E8EDF3", fontFamily: "Rajdhani, sans-serif" }}>
                5 лет выводим бизнес в топ Яндекса
              </h2>
              <p className="mt-5 leading-relaxed text-sm" style={{ color: "rgba(180,200,230,0.7)" }}>
                Компания KeyCard специализируется на продвижении локального бизнеса в поисковых системах Яндекс, Яндекс.Карты и смежных платформах.
              </p>
              <p className="mt-3 leading-relaxed text-sm" style={{ color: "rgba(180,200,230,0.7)" }}>
                Работаем с салонами красоты, косметологическими сетями, стоматологиями и медицинскими центрами — нишами с высокой конкуренцией в локальном поиске.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  "Более 300 доверенных партнёров по всей России",
                  "Команда дизайнеров, маркетологов, SEO- и IT-специалистов",
                  "Постоянно отслеживаем тренды и алгоритмы Яндекса",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ background: blueDim, border: `1px solid rgba(59,130,246,0.3)` }}>
                      <Icon name="Check" size={10} style={{ color: blue }} />
                    </div>
                    <span className="text-sm" style={{ color: "rgba(180,200,230,0.85)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${aboutRef.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420" fill="none">
                  {[{ x: 210, y: 60 }, { x: 360, y: 120 }, { x: 390, y: 270 }, { x: 310, y: 380 }, { x: 110, y: 380 }, { x: 30, y: 270 }, { x: 60, y: 120 }].map((pt, i) => (
                    <line key={i} x1="210" y1="210" x2={pt.x} y2={pt.y} stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  <circle cx="210" cy="210" r="80" stroke="rgba(59,130,246,0.1)" strokeWidth="1" />
                  <circle cx="210" cy="210" r="160" stroke="rgba(139,92,246,0.07)" strokeWidth="1" />
                </svg>

                <div className="relative z-10 rounded-2xl overflow-hidden flex-shrink-0 animate-float" style={{ width: 140, height: 140, border: "1px solid rgba(59,130,246,0.3)", background: "#0a1428", boxShadow: "0 0 40px rgba(59,130,246,0.2)" }}>
                  <img src={LOGO_URL} alt="KeyCard" className="w-full h-full object-cover" />
                </div>

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
                    <div key={label} className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#E8EDF3] whitespace-nowrap" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
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
      <section id="approach" ref={approachRef.ref} className="py-28 md:py-36 relative" style={{ background: "linear-gradient(180deg, #060d1f 0%, #0a1428 50%, #060d1f 100%)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className={`text-center mb-14 transition-all duration-700 ${approachRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${blue})` }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: blue }}>Наш подход</span>
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${purple}, transparent)` }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#E8EDF3", lineHeight: 1.1, fontFamily: "Rajdhani, sans-serif" }}>
              Индивидуальная стратегия — проверенный результат
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", icon: "Target", title: "Индивидуальный подход", desc: "Анализируем ваш бизнес, конкурентов и нишу. Разрабатываем стратегию под конкретные цели — без шаблонов." },
              { num: "02", icon: "Zap", title: "Готовые решения", desc: "Используем методики, отработанные на 300+ клиентах. Знаем, что работает в вашей нише и даёт результат быстро." },
              { num: "03", icon: "Users", title: "Новые клиенты", desc: "Цель — не просто позиции, а реальный поток клиентов. Оцениваем эффективность по бизнес-метрикам." },
            ].map((c, i) => (
              <div key={c.num} className={`card-hover rounded-xl p-8 border transition-all duration-700 tech-border ${approachRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ background: "rgba(59,130,246,0.04)", borderColor: "rgba(59,130,246,0.12)", transitionDelay: `${i * 120}ms` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: blueDim, border: "1px solid rgba(59,130,246,0.2)" }}>
                    <Icon name={c.icon} size={22} style={{ color: blue }} />
                  </div>
                  <span style={{ fontSize: 44, fontWeight: 700, color: "rgba(59,130,246,0.12)", lineHeight: 1, fontFamily: "Rajdhani, sans-serif" }}>{c.num}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#E8EDF3", marginBottom: 10, fontFamily: "Rajdhani, sans-serif" }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(180,200,230,0.65)" }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 text-center transition-all duration-700 delay-400 ${approachRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <a href="https://t.me/yandex_promotion" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-medium rounded-lg transition-all duration-300 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)", color: "#fff" }}>
              Разбор вашей организации
              <Icon name="ArrowUpRight" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={servicesRef.ref} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{ width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", bottom: 0, right: "10%" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
          <div className={`mb-14 transition-all duration-700 ${servicesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${blue}, ${purple})` }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: blue }}>Что мы предлагаем</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#E8EDF3", lineHeight: 1.1, fontFamily: "Rajdhani, sans-serif" }}>
              Полный арсенал инструментов<br className="hidden md:block" /> для роста в Яндексе
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={s.title}
                className={`card-hover rounded-xl p-7 border transition-all duration-700 tech-border ${servicesRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ background: "rgba(59,130,246,0.04)", borderColor: "rgba(59,130,246,0.12)", transitionDelay: `${i * 80}ms` }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ background: i % 2 === 0 ? blueDim : purpleDim, border: `1px solid ${i % 2 === 0 ? "rgba(59,130,246,0.2)" : "rgba(139,92,246,0.2)"}` }}>
                  <Icon name={s.icon} size={20} style={{ color: i % 2 === 0 ? blue : purple }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#E8EDF3", marginBottom: 10, fontFamily: "Rajdhani, sans-serif" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(180,200,230,0.65)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS_START */}
      <section id="reviews" style={{display:"none"}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative">

          <div className={`text-center mb-14 transition-all duration-700 ${reviewsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${blue})` }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: blue }}>Отзывы клиентов</span>
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${purple}, transparent)` }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#E8EDF3", lineHeight: 1.1, fontFamily: "Rajdhani, sans-serif" }}>
              Нам доверяют лидеры рынка
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(180,200,230,0.6)" }}>Реальные результаты наших партнёров</p>
          </div>

          {/* Reviews carousel */}
          <div className={`transition-all duration-700 ${reviewsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative rounded-2xl p-8 md:p-10 border" style={{ background: "linear-gradient(145deg, rgba(59,130,246,0.08), rgba(139,92,246,0.06))", borderColor: "rgba(59,130,246,0.2)" }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>
                  {REVIEWS[activeReview].icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: "#E8EDF3", fontFamily: "Rajdhani, sans-serif" }}>{REVIEWS[activeReview].org}</h3>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#F5A623", fontSize: 14 }}>★</span>)}
                  </div>
                </div>
                <div className="ml-auto text-5xl leading-none opacity-20 font-serif" style={{ color: blue }}>"</div>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "rgba(180,200,230,0.85)" }}>
                {REVIEWS[activeReview].text}
              </p>
              <div className="flex items-center justify-between mt-8">
                <div className="flex gap-2">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveReview(i)}
                      className="rounded-full transition-all duration-300"
                      style={{ width: i === activeReview ? 24 : 8, height: 8, background: i === activeReview ? blue : "rgba(59,130,246,0.25)" }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveReview((activeReview - 1 + REVIEWS.length) % REVIEWS.length)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:opacity-80"
                    style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    <Icon name="ChevronLeft" size={18} style={{ color: blue }} />
                  </button>
                  <button
                    onClick={() => setActiveReview((activeReview + 1) % REVIEWS.length)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:opacity-80"
                    style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    <Icon name="ChevronRight" size={18} style={{ color: blue }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mini grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {REVIEWS.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReview(i)}
                  className="text-left rounded-xl p-4 border transition-all duration-200"
                  style={{
                    background: i === activeReview ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.04)",
                    borderColor: i === activeReview ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.1)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 16 }}>{r.icon}</span>
                    <span className="text-[11px] font-semibold truncate" style={{ color: i === activeReview ? blue : "rgba(180,200,230,0.7)" }}>{r.org}</span>
                  </div>
                  <div className="flex gap-px">
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#F5A623", fontSize: 10 }}>★</span>)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Review form */}
          <div className={`mt-16 transition-all duration-700 delay-200 ${reviewsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="rounded-2xl p-8 md:p-10 border" style={{ background: "rgba(59,130,246,0.04)", borderColor: "rgba(59,130,246,0.15)" }}>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1" style={{ color: "#E8EDF3", fontFamily: "Rajdhani, sans-serif" }}>Оставить отзыв</h3>
                <p className="text-sm" style={{ color: "rgba(180,200,230,0.55)" }}>Мы опубликуем его после проверки</p>
              </div>

              {reviewSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)" }}>
                    <Icon name="CheckCircle" size={32} style={{ color: blue }} />
                  </div>
                  <p className="text-lg font-semibold" style={{ color: "#E8EDF3" }}>Спасибо за отзыв!</p>
                  <p className="text-sm text-center" style={{ color: "rgba(180,200,230,0.6)" }}>Мы рассмотрим его в течение 1–2 рабочих дней и опубликуем.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {[
                      { key: "full_name", label: "ФИО", placeholder: "Иванова Мария Сергеевна", type: "text" },
                      { key: "organization", label: "Название организации", placeholder: "Клиника «Здоровая улыбка»", type: "text" },
                      { key: "phone", label: "Телефон", placeholder: "+7 (999) 000-00-00", type: "tel" },
                      { key: "email", label: "Почта", placeholder: "mail@clinic.ru", type: "email" },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label className="block text-xs mb-1.5 tracking-wide" style={{ color: "rgba(180,200,230,0.55)" }}>{label}</label>
                        <input
                          type={type}
                          required
                          placeholder={placeholder}
                          value={reviewForm[key as keyof typeof reviewForm]}
                          onChange={e => setReviewForm(f => ({ ...f, [key]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.2)", color: "#E8EDF3" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-5">
                    <label className="block text-xs mb-1.5 tracking-wide" style={{ color: "rgba(180,200,230,0.55)" }}>Ваш отзыв</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Расскажите о вашем опыте работы с KeyCard..."
                      value={reviewForm.text}
                      onChange={e => setReviewForm(f => ({ ...f, text: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.2)", color: "#E8EDF3" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={reviewLoading}
                    className="flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium rounded-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)", color: "#fff" }}
                  >
                    {reviewLoading ? "Отправляем..." : "Отправить отзыв"}
                    {!reviewLoading && <Icon name="Send" size={15} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={pricingRef.ref} className="py-28 md:py-36 relative" style={{ background: "linear-gradient(180deg, #060d1f 0%, #080f22 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute opacity-30" style={{ top: "15%", left: "50%", transform: "translateX(-50%)", animation: "rotate-slow 40s linear infinite" }}>
            <HexagonDecor size={700} color="#3B82F6" strokeWidth={0.5} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
          <div className={`text-center mb-14 transition-all duration-700 ${pricingRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${blue})` }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: blue }}>Тарифы</span>
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${purple}, transparent)` }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#E8EDF3", lineHeight: 1.1, fontFamily: "Rajdhani, sans-serif" }}>
              Прозрачные условия сотрудничества
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(180,200,230,0.6)" }}>Цена зависит от количества продвигаемых точек и объёма работ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p, i) => (
              <div key={p.name}
                className={`relative rounded-xl p-8 border transition-all duration-700 ${p.highlight ? "glow-blue" : ""} ${pricingRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{
                  transitionDelay: `${i * 120}ms`,
                  background: p.highlight
                    ? "linear-gradient(145deg, rgba(59,130,246,0.15), rgba(99,102,241,0.1))"
                    : "rgba(59,130,246,0.04)",
                  borderColor: p.highlight ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.12)",
                }}>
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full font-medium" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff" }}>
                      Популярный
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(180,200,230,0.5)" }}>{p.name}</p>
                  <p className="text-sm" style={{ color: blue }}>{p.period}</p>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#E8EDF3", marginBottom: 2, fontFamily: "Rajdhani, sans-serif" }}>{p.prices[0]}</div>
                <p className="text-xs mb-3" style={{ color: "rgba(180,200,230,0.5)" }}>Без репутации</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: "rgba(59,130,246,0.15)" }} />
                  <span className="text-xs" style={{ color: "rgba(180,200,230,0.4)" }}>или</span>
                  <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: "rgba(59,130,246,0.15)" }} />
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#E8EDF3", marginBottom: 12, fontFamily: "Rajdhani, sans-serif" }}>{p.prices[1]}</div>
                <p className="text-xs mb-7" style={{ color: "rgba(180,200,230,0.5)" }}>{p.desc}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ background: blueDim }}>
                        <Icon name="Check" size={9} style={{ color: blue }} />
                      </div>
                      <span className="text-sm" style={{ color: "rgba(180,200,230,0.8)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://t.me/yandex_promotion" target="_blank" rel="noopener noreferrer"
                  className="block text-center text-sm font-medium py-3.5 rounded-lg border transition-all duration-300 hover:opacity-90"
                  style={p.highlight
                    ? { background: "linear-gradient(135deg, #3B82F6, #6366F1)", color: "#fff", borderColor: "transparent" }
                    : { background: "transparent", color: "#E8EDF3", borderColor: "rgba(59,130,246,0.25)" }}>
                  Выбрать тариф
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs" style={{ color: "rgba(180,200,230,0.35)" }}>
            В каждый тариф включено: настройка профиля · SEO · дизайн · работа с отзывами · Яндекс.Медицина · Алиса AI
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef.ref} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", top: "10%", left: "-10%" }} />
          <div className="absolute" style={{ width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", bottom: "5%", right: "-5%" }} />
        </div>
        <div className="max-w-4xl mx-auto px-5 md:px-10 relative">
          <div className={`text-center mb-12 transition-all duration-700 ${contactRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${blue})` }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: blue }}>Контакты</span>
              <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${purple}, transparent)` }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#E8EDF3", lineHeight: 1.1, fontFamily: "Rajdhani, sans-serif" }}>
              Готовы обсудить ваш проект?
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(180,200,230,0.6)" }}>Оставьте заявку — свяжемся в течение 30 минут в рабочее время</p>
          </div>

          <div className={`rounded-2xl p-8 md:p-12 border transition-all duration-700 delay-150 tech-border ${contactRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "rgba(59,130,246,0.04)", borderColor: "rgba(59,130,246,0.15)" }}>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Phone + email */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: "rgba(180,200,230,0.45)" }}>Телефон</p>
                  <a href="tel:+79935904964" className="flex items-center gap-3 text-lg font-semibold hover:opacity-80 transition-opacity" style={{ color: "#E8EDF3" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: blueDim, border: "1px solid rgba(59,130,246,0.2)" }}>
                      <Icon name="Phone" size={16} style={{ color: blue }} />
                    </div>
                    +7 993-590-49-64
                  </a>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: "rgba(180,200,230,0.45)" }}>Почта</p>
                  <a href="mailto:yandex_promotion@mail.ru" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: "#E8EDF3" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: blueDim, border: "1px solid rgba(59,130,246,0.2)" }}>
                      <Icon name="Mail" size={16} style={{ color: blue }} />
                    </div>
                    yandex_promotion@mail.ru
                  </a>
                </div>
              </div>

              {/* Messengers */}
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase mb-4" style={{ color: "rgba(180,200,230,0.45)" }}>Мессенджеры</p>
                <div className="flex flex-col gap-3">
                  <a href="https://t.me/yandex_promotion" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:opacity-80"
                    style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#229ED9" }}>
                      <Icon name="Send" size={15} style={{ color: "#fff" }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#E8EDF3" }}>Telegram</p>
                      <p className="text-xs" style={{ color: "rgba(180,200,230,0.5)" }}>@yandex_promotion</p>
                    </div>
                  </a>
                  <a href="https://wa.me/79935904964" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:opacity-80"
                    style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#25D366" }}>
                      <Icon name="MessageCircle" size={15} style={{ color: "#fff" }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#E8EDF3" }}>WhatsApp</p>
                      <p className="text-xs" style={{ color: "rgba(180,200,230,0.5)" }}>+7 993-590-49-64</p>
                    </div>
                  </a>
                  <a href="https://max.ru/yandex_promotion" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:opacity-80"
                    style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                      <img src="https://cdn.poehali.dev/projects/678f7adc-98d6-4171-8f2c-e01ae23f112c/bucket/cece604d-e954-48aa-81df-e9bbf691da88.png" alt="Макс" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#E8EDF3" }}>Макс</p>
                      <p className="text-xs" style={{ color: "rgba(180,200,230,0.5)" }}>Написать в Макс</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VACANCY */}
      <section id="vacancy" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute opacity-10" style={{ top: "5%", right: "3%", animation: "rotate-slow 30s linear infinite" }}>
            <HexagonDecor size={280} color="#3B82F6" strokeWidth={1} />
          </div>
          <div className="absolute opacity-5" style={{ bottom: "5%", left: "2%", animation: "rotate-slow 25s linear infinite reverse" }}>
            <HexagonDecor size={200} color="#60A5FA" strokeWidth={1} />
          </div>
          {[{x:"8%",y:"15%"},{x:"92%",y:"25%"},{x:"5%",y:"70%"},{x:"95%",y:"65%"},{x:"50%",y:"5%"}].map((d,i) => (
            <div key={i} className="absolute rounded-full" style={{ width: 3, height: 3, left: d.x, top: d.y, background: "#60A5FA", boxShadow: "0 0 8px rgba(96,165,250,0.8)", animation: `float ${3+i}s ease-in-out infinite`, animationDelay: `${i*0.6}s` }} />
          ))}
        </div>

        <div className="max-w-2xl mx-auto px-5 md:px-10 relative">
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, #0f2147 0%, #0a1833 100%)", border: "1px solid rgba(59,130,246,0.25)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>

            {/* Header */}
            <div className="px-8 pt-10 pb-6 text-center">
              <h2 className="font-black leading-tight uppercase" style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", color: "#fff", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.02em" }}>
                Ищете работу, где ваш талант<br />оценят по достоинству?
              </h2>
            </div>

            {/* Subtitle */}
            <div className="text-center pb-4">
              <p className="text-sm font-medium tracking-[0.25em] uppercase" style={{ color: "rgba(180,200,230,0.7)" }}>
                Мы ищем менеджера по продажам
              </p>
            </div>

            {/* Salary block */}
            <div className="mx-6 my-5">
              <div className="flex items-center justify-center gap-4 px-6 py-4 rounded-2xl" style={{ border: "2px solid #3B82F6", background: "rgba(59,130,246,0.08)", boxShadow: "0 0 30px rgba(59,130,246,0.15)" }}>
                <div style={{ fontSize: 32 }}>📈</div>
                <div className="text-center">
                  <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(180,200,230,0.6)" }}>Средняя з/п от</p>
                  <p className="font-black" style={{ fontSize: "clamp(2rem,6vw,3rem)", color: "#60A5FA", fontFamily: "Rajdhani, sans-serif", lineHeight: 1 }}>250 000 <span style={{ fontSize: "0.6em" }}>РУБ</span></p>
                </div>
                <div style={{ fontSize: 32 }}>🪙</div>
              </div>
            </div>

            {/* Requirements */}
            <div className="px-8 py-5">
              <p className="text-sm font-bold tracking-[0.15em] uppercase mb-4" style={{ color: "#fff" }}>Чего мы ждём от вас:</p>
              <ul className="space-y-2.5">
                {[
                  "Опыт в продажах (желательно в сфере IT/Digital).",
                  "Навыки ведения переговоров и заключения сделок.",
                  "Желание много зарабатывать и развиваться.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span style={{ color: "#60A5FA", marginTop: 2, flexShrink: 0 }}>•</span>
                    <span className="text-sm" style={{ color: "rgba(180,200,230,0.85)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Offer */}
            <div className="px-8 py-5">
              <p className="text-sm font-bold tracking-[0.15em] uppercase mb-4" style={{ color: "#fff" }}>Что мы предлагаем:</p>
              <ul className="space-y-2.5">
                {[
                  "Оформление ИП / Самозанятый.",
                  "Высокий доход с первого месяца работы.",
                  "Дружный коллектив.",
                  "100% удалённая работа.",
                  "Поддержка на всех этапах.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span style={{ color: "#60A5FA", marginTop: 2, flexShrink: 0 }}>•</span>
                    <span className="text-sm" style={{ color: "rgba(180,200,230,0.85)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-2 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(59,130,246,0.2)", background: "rgba(0,0,0,0.2)" }}>
              <div className="flex items-center gap-3">
                <img src={LOGO_URL} alt="KeyCard" className="h-10 w-10 object-cover rounded-lg" style={{ border: "1px solid rgba(59,130,246,0.4)" }} />
                <div>
                  <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "#fff", fontFamily: "Rajdhani, sans-serif" }}>KeyCard <span style={{ color: "#60A5FA" }}>Promotion</span></p>
                  <p className="text-[10px]" style={{ color: "rgba(180,200,230,0.45)" }}>keycard-promotion.ru</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(180,200,230,0.8)" }}>Готовы стать частью нашей команды?</p>
                <a href="https://t.me/yandex_promotion" target="_blank" rel="noopener noreferrer" className="text-xs hover:opacity-80 transition-opacity" style={{ color: "#60A5FA" }}>
                  Отправляйте резюме в Telegram: @yandex_promotion
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10" style={{ borderColor: "rgba(59,130,246,0.1)", background: "#040a18" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="KeyCard" className="h-8 w-8 object-cover rounded-lg" style={{ border: "1px solid rgba(59,130,246,0.2)" }} />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#E8EDF3", fontFamily: "Rajdhani, sans-serif" }}>
              KeyCard <span style={{ color: blue }}>Promotion</span>
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <p className="text-xs" style={{ color: "rgba(180,200,230,0.35)" }}>© 2025 KeyCard. Все права защищены.</p>
            <p className="text-xs" style={{ color: "rgba(180,200,230,0.35)" }}>ИНН 772145676128</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <a href="https://t.me/yandex_promotion" target="_blank" rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase hover:opacity-80 transition-opacity" style={{ color: blue }}>
              Telegram
            </a>
            <a href="https://drive.google.com/file/d/1HLi4Iq_alrceyaNOXONKQddflYvHbtM1/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="text-xs hover:opacity-80 transition-opacity underline underline-offset-2" style={{ color: "rgba(180,200,230,0.35)" }}>
              Договор на оказание услуг
            </a>
            <button onClick={() => setPrivacyOpen(true)}
              className="text-xs hover:opacity-80 transition-opacity underline underline-offset-2 cursor-pointer" style={{ color: "rgba(180,200,230,0.35)", background: "none", border: "none" }}>
              Политика конфиденциальности
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,10,24,0.85)", backdropFilter: "blur(8px)" }} onClick={() => setPrivacyOpen(false)}>
          <div className="rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto border" style={{ background: "#0a1428", borderColor: "rgba(59,130,246,0.2)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#E8EDF3", fontFamily: "Rajdhani, sans-serif" }}>Политика конфиденциальности</h3>
              <button onClick={() => setPrivacyOpen(false)} style={{ color: "rgba(180,200,230,0.5)" }}><Icon name="X" size={20} /></button>
            </div>
            <div className="text-sm leading-relaxed space-y-3" style={{ color: "rgba(180,200,230,0.65)" }}>
              <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта KeyCard.</p>
              <p>Мы собираем имя, номер телефона и название организации исключительно для обратной связи и не передаём их третьим лицам.</p>
              <p>Данные хранятся в защищённом виде и используются только для выполнения услуг, описанных на сайте.</p>
              <p>Вы вправе в любой момент отозвать согласие на обработку персональных данных, направив запрос через Telegram.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
        @keyframes rotate-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
      `}</style>
    </div>
  );
}