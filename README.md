# CV для ИТМО

## Запуск

```bash
corepack enable
pnpm install
pnpm dev
```

## Сборка

```bash
pnpm build
pnpm preview
```

Готовая статическая сборка создаётся в каталоге `dist` и подходит для размещения на Netlify, Vercel, GitHub Pages или любом статическом хостинге.

## Размещение

- команда сборки: `pnpm build`
- каталог публикации: `dist`
- для проверки готовой сборки локально: `pnpm preview`
