# 📰 Article Hub  

A full-stack blogging application built with **Next.js** (frontend) and **NestJS** (backend). Supports article posting, comments, authentication, and user profiles.

Live Demo at http://207.244.238.96:3000

## ✨ Features  
- User authentication (Register/Login)  
- Create, edit, and delete articles  
- Comment system  
- User profiles  
- Responsive design  


## 🛠️ Tech Stack  
**Frontend:**  
- Next.js · TypeScript · Tailwind CSS  
- React Hook  

**Backend:**  
- NestJS · PostgreSQL · Prisma ORM  
- JWT Authentication · Class Validator  

## 🚀 Quick Start  

### 1. Clone & Setup  

```
git clone https://github.com/TesfalemNigussie/article_hub
cd article_hub
```

### 2. Postman Collection  

https://github.com/TesfalemNigussie/article_hub/blob/main/Article%20Hub.postman_collection.json


### 3. Project structure 

#### Backend 

```
src/
│
├── app.module.ts
├── main.ts
│
├── article/
│   ├── article.module.ts
│   ├── article.controller.ts
│   ├── article.service.ts
│   ├── article.entity.ts
│   ├── dto/
│   └── interfaces/
│
├── comment/
│   ├── comment.module.ts
│   ├── comment.controller.ts
│   ├── comment.service.ts
│   ├── comment.entity.ts
│   ├── dto/
│   └── interfaces/
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── jwt.strategy.ts
│   ├── auth.guard.ts
│   └── dto/
│
├── common/
│   ├── guards/
│   ├── decorators/
│   ├── interceptors/
│   ├── filters/
│   └── utils/
│
├── config/
│
└── database/
    └── prisma.service.ts
```


#### Key Modules
article/: Handles article CRUD logic.

comment/: Manages comments per article.

auth/: Authentication module using JWT.

common/: Shared decorators, guards, filters, and interceptors.

database/: Prisma integration to access PostgreSQL.

####  Design Decisions
Prisma ORM provides type-safe database queries and migration support.

Clean separation of concerns using modules, controllers, services, and DTOs.

Global exception filters and guards improve security and developer experience.

#### Frontend 

```
article_hub_frontend/
├── api/
├── app/
│   ├── article/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── profile/
│   │   ├── create-article/
│   │   └── update-article/
│   └── register/
├── assets/
├── components/
├── config/
├── hooks/
└── modal/
```

#### Folder Structure
app/: Uses the App Router (introduced in Next.js 13+) to manage pages and layouts.

api/: Handles client-side API utilities and fetch logic.

components/: Reusable UI components like Navbar, cards, and modals.

config/: Environment and base URL settings.

hooks/: Custom React hooks (e.g., for user profile, authentication).

models/: Objects that are used in the app.

#### Design Decisions
Modular structure keeps the codebase clean and maintainable.

All dynamic pages (like article/[id]) follow the file-based routing.


### 4. Third Party Packages used 

 date-fns -> For format date 
 react-toastify -> For showing toast message
 bcrypt -> For hasing 
 class-validator -> For validating Dtos
 uuid -> Generate UUID


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TesfalemNigussie/article_hub
cd article-hub
```

### 2. Backend Setup

#### 1. Install Dependencies

```bash
cd article_hub_backend
npm install
```

#### 2. Environment File

```bash
DATABASE_URL="postgresql://${password}$:${user}$@{host}/articleHub"
JWT_SECRET=
```

#### 3. Prisma Migration

```bash
npx prisma generate
npx prisma migrate dev --name init

```

#### 4. Run the Server

```bash
npm run start:dev
```

**Server will run on: http://localhost:3020**


### 3. Frontend  Setup

#### 1. Install Dependencies

```bash
cd article_hub_frontend
npm install
```

#### 2. Environment File

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3020

```

#### 4. Run the Frontend

```
npm run dev

```
