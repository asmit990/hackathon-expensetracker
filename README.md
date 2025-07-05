# finance-app (Stage 1)

A simple personal finance tracker built with React, Express.js, MongoDB, and Recharts.

> Stage 1: Basic Transaction Tracking

---

## Features

* Add / Edit / Delete transactions
* Transaction list view
* Monthly expenses bar chart
* Form validation using `react-hook-form` and `zod`

---

## Tech Stack

| Layer    | Technology               |
| -------- | ------------------------ |
| Frontend | React + Vite             |
| Styling  | Tailwind CSS + shadcn/ui |
| Charting | Recharts                 |
| Form     | React Hook Form + Zod    |
| Backend  | Express.js (Node.js)     |
| Database | MongoDB + Mongoose       |

---

## Folder Structure

```
.
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── src
│   ├── App.tsx
│   ├── components
│   ├── index.css
│   ├── main.tsx
│   ├── types
│   ├── utils
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/finance-app.git
cd finance-app
```

---

## Setup

### Backend Setup (`server/`)

```bash
cd server
npm install
```

**Create `.env` file:**

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/finance-app
PORT=5000
```

**Run Backend:**

```bash
npm run dev
```

### Frontend Setup

```bash
npm install
npm run dev
```

---

## Chart

The **MonthlyBarChart** component groups transactions by month and visualizes total spending using `Recharts`.

---


## To Do (Next Stages)

* [ ] Stage 2: Add category tags + pie chart
* [ ] Stage 3: Budget planner & dashboard
* [ ] User authentication

---

## License

MIT

---

## Author

**Asmit Pandey**
