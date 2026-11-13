'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type Mode = 'login' | 'register';
type ApiError = { message?: string | string[] };

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
      const endpoint = mode === 'register' ? 'register' : 'login';
      const response = await fetch(`${base}/api/v1/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(mode === 'register'
          ? { email, password, username, displayName }
          : { email, password }),
      });
      if (!response.ok) {
        const data = (await response.json()) as ApiError;
        throw new Error(Array.isArray(data.message) ? data.message.join(' ') : data.message ?? 'Não foi possível entrar.');
      }
      router.push('/perfil');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
    } finally {
      setLoading(false);
    }
  }

  return <main className="auth-shell">
    <a href="/" className="auth-brand">✳ sheet<span>.</span></a>
    <section className="auth-card" aria-labelledby="auth-title">
      <div className="auth-eyebrow">Sua jornada em comunidade</div>
      <h1 id="auth-title">{mode === 'login' ? 'Boas-vindas de volta.' : 'Sua história tem lugar aqui.'}</h1>
      <p>{mode === 'login' ? 'Entre para continuar cultivando a fé.' : 'Crie sua conta para compartilhar a Palavra.'}</p>
      <div className="auth-tabs">
        <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError(''); }}>Entrar</button>
        <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError(''); }}>Criar conta</button>
      </div>
      <form onSubmit={submit} className="auth-form">
        {mode === 'register' && <>
          <label htmlFor="displayName">Nome de exibição</label>
          <input id="displayName" required minLength={2} maxLength={80} autoComplete="name" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Como quer ser chamado?" />
          <label htmlFor="username">Nome de usuário</label>
          <input id="username" required minLength={3} maxLength={24} pattern="[a-zA-Z0-9_]+" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="seu_usuario" />
        </>}
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@exemplo.com" />
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" required minLength={mode === 'register' ? 12 : 1} maxLength={128} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === 'register' ? 'Mínimo de 12 caracteres' : 'Sua senha'} />
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="auth-submit" disabled={loading} type="submit">{loading ? 'Enviando…' : mode === 'login' ? 'Entrar na comunidade' : 'Criar minha conta'} <span aria-hidden="true">→</span></button>
      </form>
      <p className="auth-footnote">Um espaço para fé, cuidado e respeito.</p>
    </section>
  </main>;
}
