const items = [
  { title: 'Compartilhe a Palavra', description: 'Escreva devocionais e reflexões com liberdade e propósito.', symbol: '✍' },
  { title: 'Caminhe em comunidade', description: 'Siga pessoas, converse e compartilhe o que edifica.', symbol: '♡' },
  { title: 'Cultive sua jornada', description: 'Organize seus textos e volte ao que Deus tem ensinado.', symbol: '❀' },
];

export default function Home() {
  return (
    <main>
      <header className="topbar"><div className="brand"><span className="brand-mark" aria-hidden="true">✳</span> sheet<span className="brand-dot">.</span></div><span className="topbar-note">fé que floresce em comunidade</span></header>
      <section className="hero" aria-labelledby="hero-title"><div className="eyebrow"><span className="eyebrow-dot"/> Um espaço para a Palavra</div><h1 id="hero-title">Que a Palavra encontre <em>terra boa.</em></h1><p>Um lugar acolhedor para escrever devocionais, compartilhar reflexões e caminhar com pessoas que também desejam crescer na fé.</p><div className="hero-actions"><a href="#proposito" className="primary-btn">Conheça o Sheet <span aria-hidden="true">↗</span></a><span className="quiet-note">Uma comunidade em construção</span></div><div className="verse">“O Senhor é o meu pastor; nada me faltará.” <span>Salmos 23:1</span></div></section>
      <section className="features" id="proposito" aria-label="O que você poderá fazer">{items.map(item => <article className="feature" key={item.title}><span className="feature-symbol" aria-hidden="true">{item.symbol}</span><h2>{item.title}</h2><p>{item.description}</p></article>)}</section>
      <footer>sheet · compartilhando a Palavra com carinho <span>Em desenvolvimento</span></footer>
    </main>
  );
}
