<div align="center">

# 🏋️ FitLog

**A dark, no-nonsense gym companion.** Pick a lift, lock it into today's plan, and watch the week's work add up.

[Live Demo](https://your-live-link.vercel.app) · [Report a Bug](https://github.com/your-username/fitlog/issues)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## 📖 About

FitLog is a workout library and daily planner built with the Next.js App Router. It pulls twelve lifts from the FitLog API, lets you open any lift for its full specs and step-by-step instructions, and builds a focused plan for the day with a cap of five lifts. Totals for exercises, minutes and calories update live as you add, finish or remove lifts, and everything is saved in your browser so it survives a reload.

## ✨ Key Features

1. **Workout library** loaded from the FitLog API on the server, with a responsive 3 × 4 grid, category tags, equipment and a duration / calories / rating stats row for every lift.
2. **Detailed workout pages** with a key specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered instructions, served by dynamic routes (`/workouts/[id]`).
3. **Today's Plan with a five-lift cap.** "Add to today's plan" updates the navbar badge, shows a toast and disables itself once five lifts are planned.
4. **Save for later** list with its own navbar badge, tab and toast feedback.
5. **Live metrics** on the My Plan page: exercises, minutes and calories recalculate instantly.
6. **Sort by** duration, calories or rating on the My Plan lists.
7. **Mark as Done and Remove** actions on every planned lift, each confirmed with a toast.
8. **Persistent data** with `localStorage`, synced across open tabs.
9. **Loading, empty, error and 404 states** that tell you what happened and where to go next.
10. **Fully responsive** from 320px phones to wide desktops.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org/) (App Router) | Framework, routing, server-rendered detail pages |
| [React 19](https://react.dev/) | UI and state (Context API) |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling and responsive layout |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [Lucide React](https://lucide.dev/) | Icons |
| [Fontsource](https://fontsource.org/) | Self-hosted Oswald and Inter fonts |

## 🗂️ Project Structure

```
fitlog/
├── app/
│   ├── layout.jsx            # Root layout: fonts, navbar, footer, providers
│   ├── page.jsx              # Home: hero + library
│   ├── my-plan/page.jsx      # My Plan page
│   ├── workouts/[id]/        # Workout details (page + loading skeleton)
│   ├── not-found.jsx         # 404 page
│   ├── error.jsx             # Error boundary
│   └── globals.css           # Tailwind + theme tokens
├── components/               # Navbar, Hero, Library, WorkoutCard, MyPlan, PlanRow ...
├── context/PlanContext.jsx   # Plan / saved / done state + localStorage
└── lib/api.js                # API helpers and sorting
```

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/fitlog.git
cd fitlog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## 🔌 API

| Endpoint | Description |
| --- | --- |
| `GET https://api.api-store.workers.dev/api/fitlog` | All workouts |
| `GET https://api.api-store.workers.dev/api/fitlog/:id` | A single workout |

## ☁️ Deployment

Deployed on **Vercel**: import the repository, keep the default Next.js settings and deploy. Because every route is handled by Next.js, reloading any page (including `/my-plan` and `/workouts/3`) works without errors.

## 📄 License

Made for learning purposes. Workout illustrations are served by the FitLog API.
