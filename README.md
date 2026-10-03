# Retro-futuristic portfolio

Персональное портфолио Middle Fullstack / Frontend Developer. Стек: React, TypeScript, Node.js, NestJS и Go. 

## Локальный запуск

```bash
npm ci
npm run dev
```

Production-сборка:

```bash
npm run build
npm run preview
```

## Публикация на GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` автоматически собирает и публикует сайт после каждого push в ветку `main`. Его также можно запустить вручную на вкладке **Actions**.

Перед первой публикацией откройте **Settings → Pages** репозитория и в разделе **Build and deployment → Source** выберите **GitHub Actions**.

Путь `base` определяется автоматически: конфигурация поддерживает как обычный репозиторий (`username.github.io/repository/`), так и пользовательский Pages-репозиторий (`username.github.io`).
