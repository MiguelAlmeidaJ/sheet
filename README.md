# Sheet 🐑

**Um lugar para compartilhar a Palavra, cultivar a fé e caminhar em comunidade.**

O **Sheet** é uma plataforma de devocionais e reflexões cristãs. Pessoas podem escrever textos, registrar pensamentos sobre as Escrituras, acompanhar outros autores e interagir com publicações.

> “O Senhor é o meu pastor; nada me faltará.” — Salmos 23:1

## Visão do produto

- Publicar **devocionais**, **reflexões** e **pensamentos**.
- Curtir, comentar e repostar publicações.
- Seguir pessoas e descobrir novos autores.
- Navegar entre **Feed**, **Amigos** (pessoas seguidas) e **Meus textos**.
- Escrever rascunhos e gerenciar as próprias publicações.
- Manter a comunidade segura com moderação e denúncias.

## Papéis

| Papel | Responsabilidades |
| --- | --- |
| `SYSTEM_ADMIN` | Administração da plataforma, atribuição de papéis e supervisão da moderação |
| `MODERATOR` | Revisão de denúncias e moderação de conteúdos |
| `USER` | Criação e interação com publicações, comentários e perfis |

## Stack

Monorepo **TypeScript** com **Next.js** (web), **NestJS** (API), **Prisma** (ORM), **PostgreSQL** (banco de dados), **Docker** (infraestrutura e deploy) e **PM2** (processos em ambientes que não usam orquestração Docker). Gerenciamento de workspaces com **pnpm**.

## Identidade visual

Uma estética clean, acolhedora e leve, inspirada em pastos e no cuidado do Pastor:

| Tom | Cor | Hex |
| --- | --- | --- |
| Branco gelo | Fundo | `#F8FAF7` |
| Palha | Superfícies quentes | `#EDE3CC` |
| Verde pasto | Ações e destaque | `#547A55` |
| Marrom escuro | Texto e contraste | `#352B24` |

Acessibilidade e contraste devem ser verificados nos componentes reais.

## Organização do trabalho

- **`main`**: documentação institucional e versões estáveis.
- **`beta`**: desenvolvimento inicial e integração de funcionalidades.

A base técnica e os primeiros arquivos do monorepo ficam na branch [`beta`](https://github.com/MiguelAlmeidaJ/sheet/tree/beta).

## Roadmap inicial

1. Fundamentos do monorepo, banco, ambiente de desenvolvimento e lint/typecheck.
2. Autenticação, perfis e autorização por papéis.
3. Editor, rascunhos e publicação de textos.
4. Feeds, seguidores, curtidas, comentários e repostagens.
5. Denúncias, moderação, testes e preparação para deploy.

## Princípios

- Liberdade para compartilhar reflexões, com respeito e segurança.
- Devocionais pessoais não substituem necessariamente o contexto bíblico nem aconselhamento pastoral.
- Privacidade, segurança, acessibilidade e moderação desde a primeira versão.

---

**Status:** início do projeto. Consulte a branch `beta` para acompanhar o desenvolvimento.
