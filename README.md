# Dala — туристический сайт о Казахстане

React 18 + TypeScript + Vite. 5 страниц, переключатель языка RU / ҚАЗ.

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # проверка типов + сборка в dist/
```

## Страницы

| Путь | Страница |
|---|---|
| `/` | Главная (по макету: hero, карточки, слайдер, бронь, FAQ, галерея) |
| `/destinations` | Направления — 12 мест, фильтр по регионам, карточка-модалка (`?open=charyn`) |
| `/tours` | Туры — 8 туров, фильтр по сезону, форма брони с живой карточкой |
| `/gallery` | Галерея — 32 фото, категории, лайтбокс (← → Esc) |
| `/contacts` | Контакты — форма, карта OpenStreetMap, FAQ |

## Где что лежит

- `src/i18n/ru.ts`, `src/i18n/kz.ts` — все тексты интерфейса
- `src/data/*.ts` — направления, туры, галерея, FAQ (тексты на двух языках)
- `src/styles/tokens.css` — цвета, шрифты, радиусы
- `public/images/` — фото (сжатые), `public/images/CREDITS.md` — авторы и лицензии

## Фото

Все фото — Wikimedia Commons (CC BY-SA / CC BY / CC0 / Public domain). Оригиналы лежат в `assets-src/raw/`
(не попадают в сборку). Чтобы заменить фото: положите `slug.jpg` в `assets-src/raw/`, добавьте запись в
`assets-src/raw/credits.json` и выполните `npm run images`.

Формы — демо: данные никуда не отправляются.
