import { useEffect, useState } from "react";
import "./App.css";
import me from "./assets/me.png";

type Page = "about" | "experience" | "skills" | "products" | "contact" | "more";
type Lang = "ru" | "en";
const ids: Page[] = [
  "about",
  "experience",
  "skills",
  "products",
  "contact",
  "more",
];
const nums = ["01", "02", "03", "04", "05", "06"];

const copy = {
  ru: {
    nav: ["Обо мне", "Опыт", "Навыки", "Продукты", "Контакты", "Больше"],
    hello: ["ПРИВЕТ.", "Я СОЗДАЮ", "СИСТЕМЫ."],
    lead: "Middle Fullstack-разработчик с 3+ годами коммерческого опыта. Создаю сложные интерфейсы и backend-сервисы — от архитектуры до стабильного релиза.",
    cta: "СМОТРЕТЬ ПРОЕКТЫ",
    metrics: ["года опыта", "основных стека", "фокус на качестве"],
    titles: [
      [
        "ОПЫТ РАБОТЫ",
        "Продуктовая разработка, AI-инструменты и веб-приложения полного цикла.",
      ],
      [
        "НАВЫКИ",
        "Основной стек — React, TypeScript и Node.js. Go использую для производительных сервисов.",
      ],
      [
        "ПРОДУКТЫ",
        "Системы и инструменты, над которыми я работал в продуктовых командах.",
      ],
      [
        "НА СВЯЗИ",
        "Открыт к сильным продуктовым командам и интересным инженерным задачам.",
      ],
      [
        "БОЛЬШЕ / SETUP",
        "Рабочее окружение и модели, которые помогают проектировать, проверять и выпускать продукты.",
      ],
    ],
    reply: "Обычно отвечаю в течение одного рабочего дня.",
    jobs: [
      "Разрабатываю интерфейсы внутренних AI-продуктов на React и TypeScript. Создал собственную UI-библиотеку, платформы для исследований и AI-бенчмарков, Review Engine и backend API на NestJS. Настраиваю Docker, CI/CD, unit-тесты и code review.",
      "Разрабатывал Telegram-ботов на Python, лендинги и корпоративные сайты. Создавал переиспользуемые React-компоненты, проектировал новые функции, оптимизировал производительность и сопровождал релизы.",
      "Создавал многостраничные приложения и корпоративные сайты с нуля. Проектировал frontend и backend, разрабатывал интерфейсы на React и TypeScript, серверную часть на Node.js и PHP.",
    ],
    products: [
      "Собственная библиотека компонентов для унификации интерфейсов и ускорения запуска новых внутренних продуктов.",
      "Интерактивный AI-продукт, где пользователь задавал героев, настроение и сюжет, а генеративные модели превращали идею в уникальную нейросказку — цельную, живую и созданную специально для него.",
      "Система автоматизированного ревью на основе AI-агентов для анализа и оценки результатов работы моделей.",
    ],
  },
  en: {
    nav: ["About", "Experience", "Skills", "Products", "Contact", "More"],
    hello: ["HELLO.", "I BUILD", "SYSTEMS."],
    lead: "Middle Fullstack Developer with 3+ years of commercial experience. I build complex interfaces and backend services — from architecture to reliable releases.",
    cta: "VIEW PROJECTS",
    metrics: ["years of experience", "core technologies", "quality focused"],
    titles: [
      [
        "WORK EXPERIENCE",
        "Product development, AI tooling and full-cycle web applications.",
      ],
      [
        "SKILLS",
        "My core stack is React, TypeScript and Node.js. I use Go for performance-oriented services.",
      ],
      ["PRODUCTS", "Systems and tools I have built with product teams."],
      [
        "GET IN TOUCH",
        "Open to strong product teams and meaningful engineering challenges.",
      ],
      [
        "MORE / SETUP",
        "The environment and models I use to design, verify and ship products.",
      ],
    ],
    reply: "I usually reply within one business day.",
    jobs: [
      "Building internal AI product interfaces with React and TypeScript. Created a custom UI library, research and AI benchmark platforms, a Review Engine and NestJS APIs. Working with Docker, CI/CD, unit tests and code review.",
      "Developed Python Telegram bots, landing pages and corporate websites. Built reusable React components, designed new features, improved performance and supported production releases.",
      "Built multi-page web applications and corporate websites from scratch. Designed frontend and backend architecture, React and TypeScript interfaces, plus Node.js and PHP services.",
    ],
    products: [
      "A custom component library that standardizes interfaces and speeds up delivery of new internal products.",
      "An interactive AI product where users chose the characters, mood and plot, while generative models turned each idea into a unique, coherent fairy tale made especially for them.",
      "An automated review system using AI agents to analyze and evaluate model outputs.",
    ],
  },
} as const;

const jobs = [
  ["NOV 2024—NOW", "FULLSTACK DEVELOPER", "SBER / AI PRODUCTS"],
  ["JAN—JUL 2024", "FULLSTACK DEVELOPER", "FINION"],
  ["JAN 2023—JAN 2024", "FULLSTACK DEVELOPER", "CRONTAB"],
];
const skills = [
  ["REACT / TYPESCRIPT", 94, "React · TypeScript · Redux · Zustand · MobX"],
  ["NODE.JS / NESTJS", 87, "Node.js · NestJS · REST · Apollo · SQL"],
  ["FRONTEND SYSTEMS", 90, "UI Kit · Vite · Webpack · HTML · CSS"],
  ["GOLANG", 72, "Go · Services · API · Concurrency"],
  ["DELIVERY / QUALITY", 84, "Docker · Git · CI/CD · Unit tests · Code review"],
  ["DATA / TOOLING", 76, "PostgreSQL · MongoDB · Python · Linux · MCP"],
] as const;
const products = [
  ["UI KIT", "DESIGN SYSTEM", "PRODUCTION", "REACT / TYPESCRIPT / VITE"],
  [
    "СОЧИНИ СКАЗКУ",
    "GENERATIVE STORY PLATFORM",
    "RELEASED",
    "REACT / AI / STORYTELLING",
  ],
  ["REVIEW ENGINE", "AI AGENT TOOL", "INTERNAL", "AI AGENTS / NESTJS / DOCKER"],
];

function Boot({ done }: { done: () => void }) {
  const [p, setP] = useState(0),
    [closing, setClosing] = useState(false);
  useEffect(() => {
    const started = performance.now(),
      i = setInterval(
        () =>
          setP(Math.min(100, Math.round((performance.now() - started) / 30))),
        40,
      ),
      fade = setTimeout(() => setClosing(true), 3000),
      finish = setTimeout(done, 3750);
    return () => {
      clearInterval(i);
      clearTimeout(fade);
      clearTimeout(finish);
    };
  }, [done]);
  const row = (limit: number, label: string, ready: string) => (
    <>
      <span className={p > limit ? "ready" : ""}>
        {label}........ {p > limit ? ready : "WAIT"}
      </span>
      <br />
    </>
  );
  return (
    <div className={"boot " + (closing ? "boot-exit" : "")}>
      <div>
        <div className="boot-kicker">SECURE BOOT / PORTFOLIO NODE</div>
        <h1>
          VD<span>_</span>
        </h1>
        <p>
          INITIALIZING PORTFOLIO_OS <b>{p}%</b>
        </p>
        <i>
          <em style={{ width: p + "%" }} />
        </i>
        <small>
          {row(12, "MEMORY CHECK", "OK")}
          {row(38, "LOADING MODULES", "OK")}
          {row(67, "VIDEO INTERFACE", "READY")}
          {row(91, "HANDSHAKE", "COMPLETE")}
        </small>
      </div>
    </div>
  );
}
const Title = ({ n, x }: { n: string; x: readonly [string, string] }) => (
  <div className="page-title">
    <span>{n} / 06</span>
    <h1>{x[0]}</h1>
    <p>{x[1]}</p>
  </div>
);
const Spec = ({ a, b }: { a: string; b: string }) => (
  <div className="spec">
    <span>{a}</span>
    <b>{b}</b>
  </div>
);

export default function App() {
  const initial = (location.hash.slice(2) || "about") as Page;
  const [page, setPage] = useState<Page>(
      ids.includes(initial) ? initial : "about",
    ),
    [boot, setBoot] = useState(!sessionStorage.booted),
    [menu, setMenu] = useState(false),
    [lang, setLang] = useState<Lang>(
      (localStorage.getItem("portfolio-lang") as Lang) || "ru",
    );
  const t = copy[lang];
  useEffect(() => {
    const f = () => setPage((location.hash.slice(2) || "about") as Page);
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("portfolio-lang", lang);
    document.title =
      lang === "ru"
        ? "Middle Fullstack-разработчик / Portfolio"
        : "Middle Fullstack Developer / Portfolio";
  }, [lang]);
  const go = (p: Page) => {
      location.hash = "/" + p;
      setPage(p);
      setMenu(false);
      scrollTo(0, 0);
    },
    done = () => {
      sessionStorage.booted = "1";
      setBoot(false);
    };
  return (
    <>
      {boot && <Boot done={done} />}
      <div className="scanlines" />
      <div className="shell">
        <header>
          <button className="logo" onClick={() => go("about")}>
            <b>VD</b>
            <span>/PORTFOLIO</span>
          </button>
          <div className="sys">
            <span>● ONLINE</span>
            <button
              className="lang"
              onClick={() => setLang((x) => (x === "ru" ? "en" : "ru"))}
            >
              <b>{lang.toUpperCase()}</b> / {lang === "ru" ? "EN" : "RU"}
            </button>
          </div>
          <button className="menu" onClick={() => setMenu(!menu)}>
            MENU <i />
            <i />
          </button>
        </header>
        <nav className={menu ? "open" : ""}>
          {ids.map((id, i) => (
            <button
              className={page === id ? "active" : ""}
              onClick={() => go(id)}
              key={id}
            >
              <small>{nums[i]}</small>
              {t.nav[i]}
            </button>
          ))}
        </nav>
        <main key={page + lang}>
          {page === "about" && (
            <section className="about">
              <div className="hero-copy">
                <p className="eyebrow">MIDDLE FULLSTACK / FRONTEND DEVELOPER</p>
                <h1>
                  {t.hello[0]}
                  <br />
                  {t.hello[1]}
                  <br />
                  <em>{t.hello[2]}</em>
                </h1>
                <p className="lead">{t.lead}</p>
                <button className="primary" onClick={() => go("products")}>
                  {t.cta} <span>[ENTER]</span>
                </button>
              </div>
              <div className="portrait">
                <div className="orb" />
                <img
                  className="portrait-photo"
                  src={me}
                  alt={
                    lang === "ru"
                      ? "Фотография разработчика"
                      : "Developer portrait"
                  }
                />
                <span className="tag t1">STATUS: AVAILABLE</span>
                <span className="tag t2">FOCUS: PRODUCT</span>
                <span className="tag t3">LEVEL: MIDDLE</span>
              </div>
              <div className="metrics">
                <div>
                  <strong>3+</strong>
                  <span>{t.metrics[0]}</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>{t.metrics[1]}</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>{t.metrics[2]}</span>
                </div>
              </div>
            </section>
          )}
          {page === "experience" && (
            <section>
              <Title n="02" x={t.titles[0]} />
              <div className="timeline">
                {jobs.map((x, i) => (
                  <article key={x[0]}>
                    <span>{x[0]}</span>
                    <b>0{i + 1}</b>
                    <div>
                      <p className="eyebrow">{x[2]}</p>
                      <h2>{x[1]}</h2>
                      <p>{t.jobs[i]}</p>
                      {i === 0 && (
                        <a
                          className="inline-link"
                          href="https://habr.com/ru/companies/sberbank/articles/923372/"
                          target="_blank"
                        >
                          HABR / CASE STUDY ↗
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
          {page === "skills" && (
            <section>
              <Title n="03" x={t.titles[1]} />
              <div className="skill-grid">
                {skills.map((x) => (
                  <article key={x[0]}>
                    <div>
                      <h2>{x[0]}</h2>
                      <b>{x[1]}%</b>
                    </div>
                    <i>
                      <em style={{ width: x[1] + "%" }} />
                    </i>
                    <p>{x[2]}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {page === "products" && (
            <section>
              <Title n="04" x={t.titles[2]} />
              <div className="products">
                {products.map((p, i) => (
                  <article key={p[0]}>
                    <div>
                      <span>0{i + 1}</span>
                      <b>{p[2]}</b>
                    </div>
                    <p className="eyebrow">{p[1]}</p>
                    <h2>{p[0]}</h2>
                    <p>{t.products[i]}</p>
                    <footer>
                      <code>{p[3]}</code>
                      {i === 0 ? (
                        <a
                          href="https://www.npmjs.com/package/@ai-sber/uikit"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open UI Kit on npm"
                        >
                          ↗
                        </a>
                      ) : i === 1 ? (
                        <a
                          href="https://habr.com/ru/companies/sberdevices/articles/841878/"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open Habr article"
                        >
                          ↗
                        </a>
                      ) : (
                        <span>+</span>
                      )}
                    </footer>
                  </article>
                ))}
              </div>
            </section>
          )}
          {page === "contact" && (
            <section>
              <Title n="05" x={t.titles[3]} />
              <div className="contact">
                <div>
                  <p className="eyebrow">DIRECT CHANNEL</p>
                  <a href="mailto:benjamin.sokolov19@gmail.com">BENJAMIN.SOKOLOV19@GMAIL.COM</a>
                  <p>{t.reply}</p>
                </div>
                <div>
                  <a href="https://github.com/SOftRunner" target="_blank">
                    GITHUB <span>↗</span>
                  </a>
                  <a href="https://t.me/SoftRunner" target="_blank" rel="noreferrer">
                    TELEGRAM <span>↗</span>
                  </a>
                  <a
                    href="https://habr.com/ru/companies/sberbank/articles/923372/"
                    target="_blank"
                  >
                    HABR <span>↗</span>
                  </a>
                </div>
              </div>
            </section>
          )}
          {page === "more" && (
            <section>
              <Title n="06" x={t.titles[4]} />
              <div className="setup">
                <article>
                  <p className="eyebrow">PRIMARY_STACK</p>
                  <h2>WEB PLATFORM</h2>
                  <Spec a="FRONT" b="REACT / TYPESCRIPT" />
                  <Spec a="BACK" b="NODE.JS / NESTJS" />
                  <Spec a="SYSTEMS" b="GOLANG" />
                  <Spec a="RUNTIME" b="DOCKER / LINUX" />
                </article>
                <article>
                  <p className="eyebrow">DEV_ENVIRONMENT</p>
                  <h2>TOOLCHAIN</h2>
                  <Spec a="BUILD" b="VITE / WEBPACK" />
                  <Spec a="STATE" b="REDUX / ZUSTAND" />
                  <Spec a="DATA" b="POSTGRES / MONGO" />
                  <Spec a="DELIVERY" b="GIT / CI/CD" />
                </article>
                <article className="models">
                  <p className="eyebrow">AI MODEL ROUTER</p>
                  <h2>ACTIVE MODELS</h2>
                  {[
                    ["GPT / CODE", "ARCHITECTURE · IMPLEMENTATION"],
                    ["CLAUDE", "REVIEW · LONG CONTEXT"],
                    ["MCP", "TOOLS · INTEGRATIONS"],
                  ].map((x) => (
                    <div key={x[0]}>
                      <b>{x[0]}</b>
                      <span>{x[1]}</span>
                    </div>
                  ))}
                </article>
              </div>
            </section>
          )}
        </main>
        <footer className="site-footer">
          <span>© 2026 / MIDDLE FULLSTACK</span>
          <span>REACT → TYPESCRIPT → NODE → GO</span>
          <span>SYS.OK</span>
        </footer>
      </div>
    </>
  );
}
