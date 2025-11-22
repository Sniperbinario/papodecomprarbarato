(async function(){
  async function fetchProdutos(){
    try{
      const resp = await fetch('produtos.json', {cache: 'no-cache'});
      if(!resp.ok) throw new Error('Não foi possível carregar produtos.json');
      return await resp.json();
    }catch(err){
      console.error(err);
      return null;
    }
  }

  function createCard(p){
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nome}" loading="lazy" />
      <h4>${p.nome}</h4>
      <p class="desc">${p.descricao} <span style="opacity:0.9">• ${p.loja}</span></p>
      <div class="price">${p.preco}</div>
      <a class="buy" href="${p.link}" target="_blank" rel="noopener noreferrer">Comprar Agora</a>
    `;
    return div;
  }

  const container = document.getElementById('produtos-container');
  const data = await fetchProdutos();
  if(!data || !data.produtos) {
    container.innerHTML = '<p style="color:#ff7a00">Nenhuma oferta disponível no momento.</p>';
    return;
  }

  data.produtos.forEach(p => {
    const card = createCard(p);
    container.appendChild(card);
  });
})();
