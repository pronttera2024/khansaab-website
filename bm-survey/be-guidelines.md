# Survey Panel - Project Setup & Guidelines

---

| Field      | Details                                 |
| ---------- | --------------------------------------- |
| Project    | Survey Panel - Backend Server           |
| Tech Stack | NestJS + Prisma + PostgreSQL (Supabase) |
| Version    | 1.0                                     |
| Date       | May 2026                                |

---

## Table of Contents

1. [Git Commit Rules (Husky)](#1-git-commit-rules-husky)
2. [Logging (Winston)](#2-logging-winston)
3. [Rate Limiting](#3-rate-limiting)
4. [CORS Configuration](#4-cors-configuration)
5. [Prisma with Supabase](#5-prisma-with-supabase)
6. [Health Check Endpoint](#6-health-check-endpoint)
7. [Testing (Jest)](#7-testing-jest)
8. [Documentation Requirements](#8-documentation-requirements)
9. [Security Headers (Helmet)](#9-security-headers-helmet)

---

## 1. Git Commit Rules (Husky)

### Setup Husky + Commitlint

```bash
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional

# Initialize Husky
npx husky init

# Add commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

### Commit Message Format

**Required format:**

```
<type>(<scope>): <message>
```

**Examples:**

```
feat(auth): add Google OAuth login
fix(surveys): resolve quota calculation bug
docs(readme): update setup instructions
refactor(wallet): optimize payout cron logic
test(onboarding): add user details step tests
chore(deps): update prisma to 5.12.0
```

### Commit Types

| Type       | Description                | Example                                       |
| ---------- | -------------------------- | --------------------------------------------- |
| `feat`     | New feature                | `feat(surveys): add survey export CSV`        |
| `fix`      | Bug fix                    | `fix(auth): resolve JWT expiry issue`         |
| `docs`     | Documentation              | `docs(api): update swagger descriptions`      |
| `style`    | Formatting, no code change | `style(controllers): format with prettier`    |
| `refactor` | Code refactor              | `refactor(users): simplify onboarding flow`   |
| `test`     | Add/update tests           | `test(wallet): add payout cron tests`         |
| `chore`    | Maintenance                | `chore(deps): upgrade nestjs to v10`          |
| `perf`     | Performance improvement    | `perf(analytics): optimize query performance` |

### Scope Examples

- `auth` - Authentication module
- `users` - User management
- `admins` - Admin management
- `surveys` - Survey module
- `departments` - Department management
- `rewards` - Reward units
- `wallet` - Wallet & payments
- `analytics` - Analytics module
- `tickets` - Support tickets
- `onboarding` - User onboarding
- `cron` - Scheduled jobs
- `db` - Database/Prisma
- `config` - Configuration
- `deps` - Dependencies

### commitlint.config.js

Create `commitlint.config.js` in project root:

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "perf"],
    ],
    "scope-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [2, "always", "lower-case"],
  },
};
```

---

## 2. Logging (Winston)

### Setup Winston

```bash
npm install winston winston-daily-rotate-file nest-winston
```

### Winston Configuration

Create `src/config/winston.config.ts`:

```typescript
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import "winston-daily-rotate-file";

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(
        ({ timestamp, level, message, context, ...meta }) => {
          return `${timestamp} [${context || "Application"}] ${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
          }`;
        },
      ),
    ),
  }),

  // Error logs - daily rotate
  new winston.transports.DailyRotateFile({
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: "error",
    maxSize: "20m",
    maxFiles: "14d",
    format: logFormat,
  }),

  // Combined logs - daily rotate
  new winston.transports.DailyRotateFile({
    filename: "logs/combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    format: logFormat,
  }),
];

export const winstonConfig = WinstonModule.createLogger({
  transports,
});
```

### Usage in main.ts

```typescript
import { winstonConfig } from "./config/winston.config";

const app = await NestFactory.create(AppModule, {
  logger: winstonConfig,
});
```

### Logging Best Practices

```typescript
// In controllers/services
constructor(
  @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
) {}

// Log levels
this.logger.log('User logged in', { userId, email }); // info
this.logger.error('Failed to process payout', { error, userId }); // error
this.logger.warn('Razorpay API slow response', { duration }); // warning
this.logger.debug('Survey token generated', { token, surveyId }); // debug
```

### Log Directory Structure

```
logs/
  ├── error-2026-05-09.log
  ├── error-2026-05-10.log
  ├── combined-2026-05-09.log
  └── combined-2026-05-10.log
```

Add `logs/` to `.gitignore`.

---

## 3. Rate Limiting

### Setup Throttler

```bash
npm install @nestjs/throttler
```

### Configuration

In `app.module.ts`:

```typescript
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute per IP
      },
    ]),
  ],
})
```

### Per-Route Rate Limiting

```typescript
import { Throttle } from '@nestjs/throttler';

// OTP endpoints - strict rate limit
@Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 per minute
@Post('onboarding/company-details/send-otp')
async sendOtp() {}

// External callback APIs - moderate rate limit
@Throttle({ default: { limit: 50, ttl: 60000 } }) // 50 per minute
@Post('external/survey/completed')
async surveyCompleted() {}

// Public endpoints - relaxed
@Throttle({ default: { limit: 200, ttl: 60000 } }) // 200 per minute
@Get('departments')
async getDepartments() {}
```

---

## 4. CORS Configuration

### Setup (Allow All Origins for Now)

In `main.ts`:

```typescript
app.enableCors({
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Accept, Authorization",
});
```

### Future Production Setup

```typescript
// When deploying to production, update to:
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type, Accept, Authorization',
});

// .env.prod
ALLOWED_ORIGINS=https://admin.surveypanel.com,https://app.surveypanel.com
```

---

## 5. Prisma with Supabase

### Connection Configuration

In `schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### Supabase Connection String Format

```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

### Connection Pooling

Supabase uses PgBouncer for connection pooling. Configure in Prisma:

```typescript
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: ["query", "error", "warn"],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### Migration Commands

```bash
# Development
npm run migrate:dev

# UAT
npm run migrate:uat

# Production
npm run migrate:prod
```

---

## 6. Health Check Endpoint

### Enhanced Health Check

```typescript
// src/health/health.controller.ts
import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from "@nestjs/terminus";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Database check
      () => this.prismaHealth.pingCheck("database", this.prisma),

      // Custom checks
      async () => {
        const isHealthy = await this.checkExternalServices();
        return { external_services: { status: isHealthy ? "up" : "down" } };
      },
    ]);
  }

  private async checkExternalServices(): Promise<boolean> {
    // Check if critical external services are reachable
    // Razorpay, SMTP, Google OAuth, etc.
    return true;
  }
}
```

### Install Dependencies

```bash
npm install @nestjs/terminus
```

### Response Format

```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    },
    "external_services": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    },
    "external_services": {
      "status": "up"
    }
  }
}
```

---

## 7. Testing (Jest)

### Jest Configuration

Already included in NestJS. Ensure `jest.config.js` exists:

```javascript
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
```

### Test Structure

```
src/
  auth/
    auth.service.ts
    auth.service.spec.ts
    auth.controller.ts
    auth.controller.spec.ts
  surveys/
    surveys.service.ts
    surveys.service.spec.ts
  ...
test/
  e2e/
    auth.e2e-spec.ts
    surveys.e2e-spec.ts
```

### Critical Test Cases

Must have tests for:

1. **Payout Cron Logic**
   - Correct calculation
   - Retry mechanism
   - Bank details update handling
   - Min threshold check

2. **Token Validation**
   - Single-use enforcement
   - Expiry check
   - Signature validation

3. **Survey Auto-closure**
   - Quota reached
   - Expiry date passed

4. **Onboarding Progress**
   - Step persistence
   - Resume from correct step

5. **Role-based Access**
   - Super Admin permissions
   - Admin restrictions
   - User isolation

### Test Commands

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

---

## 8. Documentation Requirements

### README.md

Must include:

````markdown
# Survey Panel - Backend Server

## Overview

[Brief description]

## Tech Stack

- NestJS
- Prisma
- PostgreSQL (Supabase)
- JWT Authentication
- Razorpay
- NodeMailer

## Prerequisites

- Node.js 18+
- PostgreSQL (Supabase account)
- Razorpay account
- Google OAuth credentials
- SMTP credentials

## Installation

[Step by step setup]

## Environment Setup

[.env configuration guide]

## Database Setup

[Prisma migration steps]

## Running the Application

```bash
npm run start:dev
npm run start:uat
npm run start:prod
```
````

## API Documentation

Swagger UI: http://localhost:3000/api/docs

## Testing

[Test commands]

## Deployment

[Deployment guide]

## Contributing

[Commit message format]

## License

[License info]

````

### CHANGELOG.md

**Daily update format:**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.3.0] - 2026-05-12
### Added
- feat(surveys): survey export to CSV functionality
- feat(analytics): leaderboard for top users
- test(wallet): payout cron job unit tests

### Fixed
- fix(auth): JWT refresh token expiry issue
- fix(surveys): quota calculation race condition

### Changed
- refactor(onboarding): optimized step validation

## [0.2.0] - 2026-05-11
### Added
- feat(wallet): payout cron job implementation
- feat(analytics): all 15 analytics endpoints

### Fixed
- fix(onboarding): OTP resend timer not working

## [0.1.0] - 2026-05-10
### Added
- Initial project setup
- feat(auth): JWT authentication
- feat(auth): Google OAuth
- feat(users): user onboarding flow (5 steps)
- feat(admins): admin management APIs
- feat(departments): department CRUD
- feat(surveys): survey creation and management

[Unreleased]: https://github.com/org/repo/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/org/repo/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/org/repo/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/org/repo/releases/tag/v0.1.0
````

**Update daily at end of work.**

---

## 9. Security Headers (Helmet)

### Setup Helmet

```bash
npm install helmet
```

### Configuration in main.ts

```typescript
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      crossOriginEmbedderPolicy: false, // For Swagger UI
    }),
  );

  await app.listen(3000);
}
```

### What Helmet Provides

- **X-DNS-Prefetch-Control** - Controls browser DNS prefetching
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME type sniffing
- **Strict-Transport-Security** - Enforces HTTPS
- **X-Download-Options** - Prevents downloads from opening in context
- **X-Permitted-Cross-Domain-Policies** - Controls cross-domain policies
- **Referrer-Policy** - Controls referrer information
- **Content-Security-Policy** - Prevents XSS attacks

---

## Summary Checklist

- [ ] Husky + Commitlint configured
- [ ] Winston logging with daily rotation
- [ ] Rate limiting on all endpoints
- [ ] CORS enabled (allow all for now)
- [ ] Prisma configured for Supabase
- [ ] Health check with DB ping
- [ ] Jest test structure ready
- [ ] README.md created
- [ ] CHANGELOG.md initialized
- [ ] Helmet security headers applied

---

_Survey Panel Setup Guidelines v1.0 — Prepared by Pronttera — May 2026_
