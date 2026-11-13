# Arquitetura inicial

## Estrutura

- `apps/web`: aplicação Next.js (App Router), porta 3000.
- `apps/api`: API NestJS com prefixo `/api/v1`, porta 3001.
- `packages/database`: schema e cliente Prisma compartilháveis.
- `docker-compose.yml`: PostgreSQL para desenvolvimento.
- `ecosystem.config.cjs`: exemplo PM2 para deploy sem orquestrador.

## Domínio

- `User`: perfis e papéis (`SYSTEM_ADMIN`, `MODERATOR`, `USER`).
- `Post`: devocionais, reflexões e pensamentos; rascunho/publicado/arquivado.
- `Follow`: relação entre contas. O feed Amigos será composto por autores seguidos.
- `Like`, `Comment`, `Repost`: interações sociais.
- `Report`: denúncia com possibilidade de revisão por moderadores.

## Autorização pretendida

- `USER`: edita seus textos e comentários, interage e denuncia.
- `MODERATOR`: permissões de usuário e análise de denúncias/conteúdo.
- `SYSTEM_ADMIN`: administração de papéis, usuários e moderação.
- Todas as regras serão aplicadas na API; esconder botões no front-end não é autorização.
- Contas admin não serão concedidas por cadastro público.

## Privacidade e segurança

- Hash de senha com algoritmo apropriado e gestão de sessões seguras ainda serão implementados.
- Aplicar validação de entrada, rate limiting, paginação, sanitização de texto, auditoria de moderação e prevenção de abuso.
- Exibir apenas posts `PUBLISHED` em feeds públicos; rascunhos pertencem ao autor.
- Garantir que o autor não possa seguir a si próprio e impedir acesso indevido a dados privados na camada de serviço.

## Escopo atual

O projeto é um **scaffold inicial**, não uma rede social operacional. A web é uma landing page; a API fornece somente `GET /api/v1/health`. O schema Prisma ainda precisa de migração e implementação dos serviços. Não há autenticação ou moderação funcional nesta etapa.
