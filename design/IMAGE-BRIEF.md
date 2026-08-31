# ТЗ на генерацию изображений — Авторазборка23

Нужно 13 изображений: 8 для каталога и 5 для галереи на странице товара.
Ниже — общий стиль, технические требования и готовые промпты на английском.

---

## 1. Общий стиль (добавлять к каждому промпту)

Главное — чтобы все 13 картинок выглядели снятыми в одной студии в один день.
Этот блок нужно подставлять **в каждый** промпт без изменений:

```
Professional e-commerce product photograph of a genuine USED automotive part
salvaged from a vehicle. Isolated on a seamless very light blue-grey studio
background, hex #eef3fb, flat and even. Soft diffused studio lighting from
above-front, gentle contact shadow directly beneath the part. Part is centered
with generous empty margin on all sides. Realistic used condition: faint
surface scuffs, slight dust in recesses, minor wear — clean but clearly
second-hand, not brand new, not damaged or broken. Straight-on catalogue angle.
Sharp focus, high detail, neutral white balance, no colour cast.
NO text, NO watermark, NO logos, NO brand names, NO people, NO hands,
NO price tags, NO packaging, NO background clutter.
```

**Негативный промпт** (если модель его поддерживает):

```
text, letters, numbers, watermark, logo, brand name, signature, people, hands,
packaging, box, price tag, cluttered background, gradient background, dark
background, studio equipment, reflections of a room, multiple objects,
collage, split frame, new pristine part, showroom car, full car
```

---

## 2. Технические требования

| Параметр | Значение | Почему |
|---|---|---|
| Пропорции | **16:9** | На сайте кадрируется в 2:1 через `object-fit: cover` — 16:9 даёт небольшой запас сверху и снизу |
| Разрешение (каталог) | от 1024×576 | Отрисовывается 342×172, с запасом под retina |
| Разрешение (галерея) | от 1920×1080 | Главное фото товара — 914×468, нужен 2× |
| Формат от модели | PNG или JPG | Я сам пережму в WebP |
| Фон | сплошной `#eef3fb` | Совпадает с фоном-заглушкой, край картинки не будет заметен |

**Важно про кадрирование.** Сайт обрезает картинку до 2:1 по центру. Держи деталь
в центре с полями — если она упирается в края, у неё срежет верх и низ.

---

## 3. Каталог — 8 изображений

Одна картинка на группу запчастей, покрывает все 24 карточки каталога.

| # | Файл | Группа на сайте | Промпт (после общего блока) |
|---|---|---|---|
| 1 | `optics.png` | Оптика | `A single used car headlight assembly, clear polycarbonate lens with faint polishing haze, black plastic housing, visible mounting tabs and electrical connector, three-quarter front view` |
| 2 | `engine.png` | Двигатель | `A used four-cylinder petrol car engine block removed from a vehicle, aluminium and cast iron, visible cylinder head, intake manifold and bolt bosses, light oil staining, side view` |
| 3 | `glass.png` | Стёкла | `A used car windshield glass panel standing at a slight angle, laminated safety glass with faint green tint, dark ceramic frit border dot pattern along the edges, clean and unbroken` |
| 4 | `interior.png` | Салон | `A used car front seat removed from a vehicle, dark grey fabric upholstery, visible headrest, seat rails and adjustment lever underneath, slight fabric creasing from use, three-quarter view` |
| 5 | `body.png` | Кузовные | `A used car bonnet hood panel lying flat at a slight angle, silver metallic paint, visible underside reinforcement ribs along one edge, tiny stone chips near the front lip` |
| 6 | `fuel.png` | Топливная | `A used automotive in-tank fuel pump module, black plastic housing with metal strainer, hose barbs and an electrical connector on top, slight fuel staining, upright view` |
| 7 | `wheels.png` | Шины и диски | `A single used alloy car wheel rim, five-spoke silver finish, five lug bolt holes and centre bore visible, faint brake dust in the spoke recesses and light kerb rash on one rim edge, face-on view` |
| 8 | `transmission.png` | Трансмиссия | `A used automatic car gearbox transmission unit removed from a vehicle, cast aluminium housing with ribbed casting texture, bellhousing on one side, output shaft and selector lever visible, side view` |

---

## 4. Галерея товара — 5 изображений

Одна и та же деталь: **капот Toyota RAV4 2019, серебристый металлик, отличное
состояние** — с пяти ракурсов. Это карточка товара, ракурсы должны читаться
как съёмка одного предмета.

Добавь в каждый промпт этой группы для единства:
`the same silver metallic car bonnet hood panel throughout, consistent paint colour and lighting`

| # | Файл | Ракурс | Промпт (после общего блока) |
|---|---|---|---|
| 1 | `hood-1.png` | Общий план | `A used silver metallic car bonnet hood panel, complete, lying at a three-quarter angle showing the full painted outer surface, gentle reflection of soft studio light across the paint` |
| 2 | `hood-2.png` | Лицевая сторона | `The same silver metallic car bonnet hood panel seen flat from directly above, entire outer surface filling the frame evenly, uniform paint finish` |
| 3 | `hood-3.png` | Изнанка | `The underside of the same silver metallic car bonnet, showing bare grey primer, stamped reinforcement ribs, hinge mounting points and a latch bracket` |
| 4 | `hood-4.png` | Кромка крупно | `Close-up of the front edge of the same silver metallic car bonnet, showing the folded seam, rubber buffer seat and a few small stone chips in the paint` |
| 5 | `hood-5.png` | Петли и замок | `Close-up of the hinge mounting area on the same silver metallic car bonnet, showing bolt holes, hinge bracket and the edge transition from painted surface to primer underside` |

---

## 5. Что делать с готовыми файлами

Положи их в `/Users/akram/projects/auto/images/parts/` — имена файлов ровно
как в таблицах выше. Дальше я:

1. Пережму в WebP (обычно даёт 10–20× экономии — так уже сделано с фото на главной)
2. Пропишу маппинг: каждой карточке каталога — картинка по её группе
3. Подключу галерею на странице товара, чтобы миниатюры переключали главное фото
4. Добавлю `loading="lazy"` и `width`/`height`, чтобы не было скачков вёрстки
5. Оставлю SVG-заглушку как запасной вариант, если файл не найден

---

## 6. Если бюджет позволит больше

8 картинок по группам — это минимум, при котором каталог перестаёт выглядеть
пустым. Но соседние карточки одной группы будут с одинаковым фото.

Чтобы все 24 карточки были разными, нужно ещё 16 изображений. Список конкретных
деталей — в `js/catalog.js`, массивы `PRODUCTS` и `PRODUCTS_MORE`: там у каждой
позиции есть название, донор и артикул. Скажи — распишу промпты и на них.
