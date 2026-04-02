# FastE - Ecommerce Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

FastE is a high-performance, scalable E-commerce backend built with the **NestJS** framework. It leverages modern technologies like **Prisma ORM**, **Elasticsearch**, **Redis**, **RabbitMQ**, and **AWS S3** to provide a robust foundation for a full-featured e-commerce platform.

## 🚀 Features

- **Authentication & Authorization**:
  - Global Guard for route protection.
  - JWT based authentication (Access & Refresh tokens).
  - Google OAuth2 social login integration.
  - Role-based Access Control (RBAC) and Permissions.
  - OTP verification system via email.

- **Product Management**:
  - Comprehensive Product, Category, and Brand modules.
  - Advanced search powered by **Elasticsearch**.
  - Dynamic widgets and templates for homepage customization.
  - Flash sale management.

- **Order & Cart**:
  - Real-time cart management.
  - Order processing workflow.
  - Multiple delivery types and address shipping management.
  - Payment integration.

- **Real-time & Communication**:
  - Real-time notifications and updates via **Socket.io**.
  - Background tasks and email processing using **BullMQ** (Redis-backed).
  - Microservices communication via **RabbitMQ** (AMQP).

- **Media & Infrastructure**:
  - File uploads and storage using **AWS S3**.
  - Multi-language support (I18n).
  - Database management with **Prisma (PostgreSQL)**.
  - Security headers with **Helmet**.
  - Health checks and system monitoring (Terminus).

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL (via [Prisma](https://www.prisma.io/))
- **Cache & Queues**: [Redis](https://redis.io/), [BullMQ](https://docs.bullmq.io/)
- **Message Broker**: [RabbitMQ](https://www.rabbitmq.com/)
- **Search Engine**: [Elasticsearch](https://www.elastic.co/)
- **Storage**: [AWS S3](https://aws.amazon.com/s3/)
- **Validation**: [Zod](https://zod.dev/) & [nestjs-zod](https://github.com/risen7/nestjs-zod)
- **Documentation**: [Swagger (OpenAPI)](https://swagger.io/)

## 📋 Prerequisites

Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [RabbitMQ](https://www.rabbitmq.com/) (optional, if using microservices)
- [Elasticsearch](https://www.elastic.co/) (optional, for search features)

## ⚙️ Project Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd faste-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Migration**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## 🏃 Running the App

```bash
# development
$ npm run start

# watch mode (recommended for development)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 📖 API Documentation

Once the server is running, you can access the Swagger documentation at:
- **Local**: [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

## 🧪 Running Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 🔒 License

This project is licensed under the **UNLICENSED** terms. 
© Copyright belongs to the account [ahkiet lekiett2201@gmail.com]. Unauthorized copying, selling, distribution, or modification is prohibited.
