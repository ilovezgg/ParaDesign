// Весь текстовый и структурный контент сайта — правь здесь, компоненты трогать не нужно.

export const siteConfig = {
  name: "PARA",
  legalName: "PARA Web Design",
  url: "https://example.com",
  email: "antonpara90@gmail.com",
  phone: "+7 (921) 199-23-03",
  phoneHref: "tel:+79211992303",
  telegramHref: "https://t.me/your_telegram",
  whatsappHref: "https://wa.me/79211992303",
  vkHref: "https://vk.com/your_vk",
  ogImage: "/img/og-cover.svg",
};

export const nav = [
  { label: "Кейсы", href: "#cases" },
  { label: "Услуги", href: "#services" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Как мы работаем", href: "#process" },
  { label: "Контакты", href: "#contacts" },
];

export type HeroSegment = { text: string; chip?: undefined } | { chip: string; text?: undefined };

export const hero = {
  // Каждая строка — самостоятельный блок (гарантирует переносы как в макете).
  // Внутри строки: текстовые сегменты и чипы (chip скрывается на мобиле).
  titleLines: [
    [{ text: "Делаем" }, { chip: "/img/hero-chip-1.png" }, { text: "сайты," }],
    [{ text: "которые приносят" }, { chip: "/img/hero-chip-2.png" }, { text: "заявки" }],
    [{ text: "бизнесу" }],
  ] as HeroSegment[][],
  subtitle: "Доверьте создание сайта профессионалам",
  cta: "Рассказать о проекте",
  ctaHref: "#contacts",
  metrics: [
    { value: "120+", label: "проектов" },
    { value: "от 2 дней", label: "срок запуска" },
    { value: "навсегда", label: "техподдержка" },
  ],
};

export const promoBanner = {
  percent: "15%",
  title: "скидка на первый проект",
  text: "Расскажите о вашем проекте и начните получать заказы уже через неделю",
  cta: "Рассказать про проект",
  ctaHref: "#contacts",
};

export const niches = {
  title: "Запустили более 120+ проектов — попробуй и ты!",
  rows: [
    [
      "Кафе и рестораны",
      "Строительство и сфера услуг",
      "Ремонт",
      "Оптовая продажа",
      "Недвижимость",
      "Производство",
      "Розничная продажа",
      "Туризм и путешествия",
    ],
    [
      "Обучение",
      "Медицина",
      "Безопасность",
      "Спорт",
      "Автотематика",
      "IT-сфера",
      "Онлайн школы",
      "Автовыкупы",
    ],
    [
      "Кухни и шкафы",
      "Психология и терапии",
      "Сетевой бизнес",
      "Инфобизнес",
      "Работа с B2B",
      "Отделочные работы",
      "Стоматология",
    ],
  ],
};

export const process = {
  title: "Как мы работаем",
  steps: [
    { n: "01", title: "Анализируем конкурентов" },
    { n: "02", title: "Составляем портрет вашего покупателя" },
    { n: "03", title: "Рисуем крутой дизайн" },
    { n: "04", title: "Пишем продающие тексты" },
    { n: "05", title: "Вёрстка сайта" },
    { n: "06", title: "Программирование" },
    { n: "07", title: "Вы становитесь лучшим!", accent: true },
  ],
};

export type Service = {
  title: string;
  description: string;
  price: string;
  duration: string;
  cta: string;
  image: string;
};

export const services = {
  title: "Мы знаем, чем вам помочь",
  items: [
    {
      title: "Landing Page",
      description: "Одностраничный сайт",
      price: "от 20 000 ₽",
      duration: "от 2 дней",
      cta: "Создать Landing Page",
      image: "/img/service-landing.svg",
    },
    {
      title: "Web-сайт",
      description: "Многостраничный сайт",
      price: "от 35 000 ₽",
      duration: "от 4 дней",
      cta: "Создать Web-сайт",
      image: "/img/service-website.svg",
    },
    {
      title: "Интернет-магазин",
      description: "Сайт с каталогом товаров",
      price: "от 50 000 ₽",
      duration: "от 7 дней",
      cta: "Создать Интернет-магазин",
      image: "/img/service-shop.svg",
    },
    {
      title: "Квиз-лендинг",
      description: "Сайт с квиз-опросом",
      price: "от 20 000 ₽",
      duration: "от 2 дней",
      cta: "Создать Квиз-лендинг",
      image: "/img/service-quiz.svg",
    },
    {
      title: "Ребрендинг",
      description: "Редизайн или доработка сайта",
      price: "от 25 000 ₽",
      duration: "от 3 дней",
      cta: "Доработать сайт",
      image: "/img/service-rebrand.svg",
    },
    {
      title: "Вёрстка",
      description: "Сборка с Figma / ТЗ",
      price: "от 17 000 ₽",
      duration: "от 2 дней",
      cta: "Отправить файл",
      image: "/img/service-layout.svg",
    },
  ] satisfies Service[],
};

export type CaseItem = {
  tags: string[];
  title: string;
  text: string;
  link: string;
  linkHref: string;
  image: string;
};

// Чтобы добавить новый кейс — просто добавь объект в этот массив.
export const cases: CaseItem[] = [
  {
    tags: ["#лидогенерация", "#редизайн"],
    title:
      "Более 80 лидов за первый месяц работы с нового сайта по комплексной эксплуатации газифицированных объектов",
    text: "Разработали уникальный дизайн, проработали концепцию в сравнении с конкурентами и помогли компании организовать новый источник заказов.",
    link: "teploserviskazan.ru",
    linkHref: "https://teploserviskazan.ru",
    image: "/img/case-1.svg",
  },
  {
    tags: ["#лидогенерация"],
    title: "Разработали web-сайт, дающий более 50 заявок в месяц",
    text: "Полностью переделали старый сайт, перешли на платформу Creatium. Организовали стабильный поток заказов через контекстную рекламу.",
    link: "",
    linkHref: "",
    image: "/img/case-2.svg",
  },
];

export const advantages = {
  bullets: [
    "Разрабатываем для вас индивидуальный дизайн",
    "Полная адаптивность вашего сайта",
    "Годовое обслуживание вашего сайта в подарок",
  ],
  cards: [
    {
      n: "01",
      title: "Поэтапная оплата за разработку",
      text: "Разработка сайта делится на 4 этапа. После каждого этапа идёт утверждение проекта, и только после вы вносите оплату за сделанный этап.",
    },
    {
      n: "02",
      title: "Реализую проект точно в срок и даже раньше",
      text: "99% моих клиентов получают проект точно в срок благодаря чёткой поэтапной работе и ежедневной обратной связи.",
    },
    {
      n: "03",
      title: "Бесплатная техподдержка сайта навсегда",
      text: "Никаких технических проблем с сайтом. Я сопровождаю проекты клиентов на бесплатной основе. Ваш сайт всегда будет в сети.",
    },
  ],
};

export const techSubscription = {
  price: "от 20 000 ₽",
  title: "Техническая подписка",
  text: "Будем вести ваш проект и закрывать все технические вопросы, наши специалисты готовы быть на связи 24/7!",
  points: [
    "Удобнее, чем сотрудник в штат",
    "Берём полную ответственность, а не пропадаем как подрядчик",
    "Предоставляем услуги маркетинговой поддержки",
  ],
  cta: "Получить расчёт",
  ctaHref: "#contacts",
  notification: {
    title: "Новый заказ на сайте",
    time: "сейчас",
  },
};

export const finalCta = {
  title: "Стартуем?)",
  subtitle: "Отлично, расскажите о вашем проекте",
  contactButtons: [
    { label: "Получить КП", href: "#contact-form", icon: "doc" as const },
    { label: "Telegram", href: siteConfig.telegramHref, icon: "telegram" as const },
    { label: "WhatsApp", href: siteConfig.whatsappHref, icon: "whatsapp" as const },
    { label: "Позвонить", href: siteConfig.phoneHref, icon: "phone" as const },
    { label: "Вконтакте", href: siteConfig.vkHref, icon: "vk" as const },
  ],
  form: {
    messengers: ["Telegram", "WhatsApp", "Звонок"],
    // Заглушка отправки — см. src/lib/formAction.ts. Подключите реальный бэкенд/CRM там.
  },
};

export const footer = {
  tagline: "Доверьте создание сайта профессионалам",
  copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Все права защищены.`,
  privacyLabel: "Политика конфиденциальности",
  privacyHref: "/privacy",
};

export const seo = {
  title: "PARA — сайты, которые приносят заявки",
  description:
    "Веб-студия PARA: разработка лендингов, многостраничных сайтов и интернет-магазинов под ключ. 120+ проектов, срок от 2 дней, бесплатная техподдержка навсегда.",
  keywords: [
    "разработка сайтов",
    "веб-студия",
    "лендинг под ключ",
    "интернет-магазин на заказ",
    "сайт с заявками",
  ],
};
