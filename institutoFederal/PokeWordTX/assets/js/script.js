/*

// Consertando a data no cadastro para não deixar aparecer 5 numero defeito do crome

document.getElementById('dataNascimento').addEventListener('change', function () {
  const data = this.value;
  const ano = parseInt(data.split('-')[0], 10);

  if (ano > 9999) {
    alert('Por favor, insira um ano com no máximo 4 dígitos.');
    this.value = ''; // limpa o campo
  }
});



// Pokedex

async function carregarPokemons(qtd = 5) {
  const container = document.getElementById('pokemonContainer');

  for (let i = 1; i <= qtd; i++) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const dados = await resposta.json();

    console.log(dados); // Para ver no console

    const card = document.createElement('div');
    card.classList.add('mainPokemonCards');
    card.classList.add('mainPokemonCardsEstiloJs');

    card.innerHTML = `
                    <img src="${dados.sprites.front_default}" alt="${dados.name}">
                    <h3>${dados.name.charAt(0).toUpperCase() + dados.name.slice(1)}</h3>
                    <p>Tipo: ${dados.types.map(tipo => tipo.type.name).join(', ')}</p>
                `;

    container.appendChild(card);
  }
}

carregarPokemons();
*/

async function carrosel2(qtd = 9, visiveis = 3) {
  const carrosel = document.querySelector('.carrossel2');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  let indiceAtual = 0;
  let imagens = [];

  // Carregar todas as imagens
  for (let i = 1; i <= qtd; i++) {
    const imgURL = `https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${i}.gif`;
    imagens.push(imgURL);
  }

  // Função para mostrar 3 imagens de cada vez
  function mostrarImagens() {
    carrosel.innerHTML = ''; // limpa antes de mostrar

    for (let i = indiceAtual; i < indiceAtual + visiveis; i++) {
      const idx = i % imagens.length; // faz o carrossel circular
      const card = document.createElement('div');
      card.classList.add('carrossel2Area');

      card.innerHTML = `<img src="${imagens[idx]}" alt="Pokemon ${idx + 1}">`;

      carrosel.appendChild(card);
    }
  }

  // Botão NEXT → pula 3
  next.addEventListener('click', () => {
    indiceAtual = (indiceAtual + visiveis) % imagens.length;
    mostrarImagens();
  });

  // Botão PREV → volta 3
  prev.addEventListener('click', () => {
    indiceAtual = (indiceAtual - visiveis + imagens.length) % imagens.length;
    mostrarImagens();
  });

  // Mostrar as primeiras 3 imagens
  mostrarImagens();
}

carrosel2(); // chama a função
