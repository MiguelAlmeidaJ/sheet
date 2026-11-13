import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sheet — Um lugar para cultivar a fé',
  description: 'Compartilhe devocionais, reflexões e a Palavra em comunidade.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
