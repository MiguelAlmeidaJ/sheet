'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string; username: string; displayName: string; email: string;
  role: 'USER' | 'MODERATOR' | 'SYSTEM_ADMIN'; bio: string | null;
};
const api = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let alive = true;
    fetch(`${api}/api/v1/auth/me`, { credentials: 'include', cache: 'no-store' })
      .then(async res => {
        if (res.status === 401) { router.replace('/auth'); return null; }
        if (!res.ok) throw new Error('Não foi possível carregar seu perfil.');
        return res.json() as Promise<{ user: User }>;
      })
      .then(data => { if (alive && data) { setUser(data.user); setState('ready'); } })
      .catch(() => { if (alive) setState('error'); });
    return () => { alive = false; };
  }, [router]);

  async function logout() {
    const res = await fetch(`${api}/api/v1/auth/logout`, {
      method: 'POST', credentials: 'include',
    });
    if (res.ok) router.replace('/auth');
    else setState('error');
  }

  return <main className="profile-shell">
    <a className="auth-brand" href="/">✳ sheet<span>.</span></a>
    <section className="profile-card">
      {state === 'loading' && <p>Carregando perfil…</p>}
      {state === 'error' && <p role="alert">Não foi possível continuar. Confira sua conexão e tente novamente.</p>}
      {state === 'ready' && user && <>
        <div className="auth-eyebrow">Seu espaço no Sheet</div>
        <h1>Olá, {user.displayName}.</h1>
        <p>@{user.username} · {user.email}</p>
        <p className="profile-role">Perfil: {user.role === 'SYSTEM_ADMIN' ? 'Administrador' : user.role === 'MODERATOR' ? 'Moderador' : 'Usuário'}</p>
        <p>Seu espaço para devocionais e reflexões está sendo preparado.</p>
        <button className="auth-submit" type="button" onClick={logout}>Sair da conta <span aria-hidden="true">→</span></button>
      </>}
    </section>
  </main>;
}
