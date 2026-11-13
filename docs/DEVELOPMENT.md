# Desenvolvimento local

Requisitos: Node.js 22, pnpm 9 e Docker com Compose.

```bash
pnpm install
cp .env.example .env
# Disponibilize DATABASE_URL para os comandos Prisma (por exemplo: exportando as variáveis do .env).
docker compose up -d postgres
pnpm db:generate
pnpm db:migrate
pnpm dev
```

Endereços: web em `http://localhost:3000` e API em `http://localhost:3001/api/v1/health`.

O banco inicial de desenvolvimento usa credenciais exemplificativas; altere-as fora do ambiente local. Não comite arquivos `.env`.

**Nota:** `prisma migrate dev` gera a migração inicial localmente; ela deverá ser revisada e versionada antes de deploy. PM2 não é necessário durante `pnpm dev` e não deve competir com um supervisor de contêiner.
