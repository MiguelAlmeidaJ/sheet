# Autenticação (beta)

## Recursos implementados

- `POST /api/v1/auth/register`: cadastro público, sempre com papel `USER`.
- `POST /api/v1/auth/login`: login por e-mail.
- `GET /api/v1/auth/me`: retorna o usuário autenticado, sem hash de senha.
- `POST /api/v1/auth/logout`: encerra sessões anteriores por incremento de `sessionVersion`.
- `GET /api/v1/moderation/access`: permite `MODERATOR` e `SYSTEM_ADMIN`.
- `GET /api/v1/admin/access`: permite apenas `SYSTEM_ADMIN`.

Senhas são processadas com Argon2id. Um JWT com validade de 7 dias é armazenado em cookie `HttpOnly`, `SameSite=Lax` e `Secure` em produção. O servidor confere a assinatura, o emissor, a audiência e a versão de sessão no banco a cada solicitação autenticada. O papel vem do banco, não do token. Rotas são privadas por padrão, com exceções marcadas por `@Public()`. O guard de origem confere mutações ligadas à autenticação e CORS permite apenas a origem web configurada.

## Configuração

1. Instale as dependências: `pnpm install`.
2. Copie `.env.example` para `.env` na raiz do monorepo.
3. Configure `JWT_SECRET` com valor aleatório forte, por exemplo `openssl rand -hex 32`. Nunca envie esse segredo ao Git.
4. Inicie PostgreSQL: `docker compose up -d postgres`.
5. Execute `pnpm db:generate` e `pnpm db:migrate`. Confirme a migration gerada para a coluna `sessionVersion`.
6. Inicie `pnpm dev`; visite `http://localhost:3000/auth`.

No desenvolvimento local, web (porta 3000) e API (porta 3001) são mesma *site* (localhost), então o cookie funciona com `credentials: 'include'`. Em produção, use domínios de mesmo site com HTTPS, configure `WEB_ORIGIN` e `NEXT_PUBLIC_API_URL` corretamente e não exponha o banco.

## Testes manuais recomendados

- Cadastrar um usuário, recarregar `/perfil` e confirmar a sessão.
- Rejeitar email/username duplicado, senhas curtas e credenciais inválidas.
- Verificar que `GET /auth/me` sem cookie retorna 401.
- Verificar que `GET /admin/access` como usuário retorna 403.
- Fazer logout, repetir `GET /auth/me` com cookie antigo e confirmar 401.
- Validar proteção de origem com uma requisição de outro Origin.

## Limitações e próximos passos

- **Ainda não há fluxo de recuperação de senha nem verificação de e-mail.**
- Não existe interface para atribuir papéis. Defina `SYSTEM_ADMIN` manualmente em ambiente controlado, nunca pelo cadastro público.
- Logout revoga **todas** as sessões do usuário, não somente o dispositivo atual.
- Adicionar throttling de login/cadastro, bloqueio progressivo, logs de auditoria e testes automatizados antes da abertura pública.
- Endpoints de perfil editável e funcionalidades de feed serão parte das próximas etapas.
