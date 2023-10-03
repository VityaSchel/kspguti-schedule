# Schedule for колледж связи пгути 

Reskin of https://lk.ks.psuti.ru/ since it lacks mobile support and is generally ugly.

[![Screenshot](https://github.com/VityaSchel/kspguti-schedule/assets/59040542/07cc1f67-ccb0-4522-a59d-16387fa11987#gh-dark-mode-only)](https://kspsuti.ru#gh-dark-mode-only)

[![Screenshot](https://github.com/VityaSchel/kspguti-schedule/assets/59040542/7bd26798-5ec1-4033-a9ca-84ffa0c44f52#gh-light-mode-only)](https://kspsuti.ru#gh-light-mode-only)

[Visit website](https://kspsuti.ru)

## Tech stack & features

- React with Next.js v13.5 (pages router)
- Tailwind CSS. This is my first project using it, after using SCSS Modules for many years
- @shadcn/ui components (built with Radix UI)
- JSDOM for parsing scraped pages, rehydration strategy for cache
- TypeScript with types for each package
- Telegram Bot API (via [node-telegram-bot-api]) for parsing failure notifications
- Custom [js parser for teachers' photos](https://gist.github.com/VityaSchel/28f1a360ee7798511765910b39c6086c)
- Accessability & tab navigation support
- Dark theme with automatic switching based on system settings

Built under 1 day. Tools used: pnpm, eslint, react-icons. Deployed with Netlify and supported by Cloudflare.

## Hire me!

I'm available for hire if you can provide me with a work visa in Canada. Check out my resume: [cv.hloth.dev](https://cv.hloth.dev).
