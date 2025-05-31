# Student Financing API

A RESTful API for student financing system built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Server Configuration
   PORT=3000

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=student_financing
   DB_USER=postgres
   DB_PASSWORD=postgres

   # JWT Configuration
   JWT_SECRET=your-super-secret-key-change-in-production
   JWT_EXPIRES_IN=5m
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the project
- `npm start`: Start production server

## 📁 Project Structure

```
student-financing-api/
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── config/
│   ├── core/
│   ├── modules/
│   └── routes/
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 Security

- JWT authentication with 5-minute expiration
- Password encryption with bcrypt
- Input validation with Zod
- Helmet for security headers
- CORS enabled

## 📝 License

This project is licensed under the MIT License. 