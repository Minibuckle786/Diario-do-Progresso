/*


// Variáveis de controle do carrossel
let index = 0;  // Índice do slide atual
const slides = document.querySelectorAll('.slide');  // Todos os slides
const totalSlides = slides.length;  // Total de slides
const carrossel = document.querySelector('.carrossel');  // Contêiner dos slides

// Função para mostrar o slide correto
function showSlide() {
  // Atualiza a posição do carrossel com a transformação
  carrossel.style.transform = `translateX(-${index * 100}%)`;
}

// Função para avançar o slide
document.querySelector('.next').addEventListener('click', () => {
  index = (index + 1) % totalSlides;  // Avança para o próximo slide, e volta para o primeiro se atingir o final
  showSlide();
});

// Função para voltar ao slide anterior
document.querySelector('.prev').addEventListener('click', () => {
  index = (index - 1 + totalSlides) % totalSlides;  // Volta para o slide anterior, e volta ao último se chegar ao início
  showSlide();
});

// Exibe o primeiro slide ao carregar
showSlide();

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

/* Dados testes 

async function carregarPokemons(qtd = 20) {
  for (let i = 1; i <= qtd; i++) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const dados = await resposta.json();

    console.log(dados);
  }
}
undefined
carregarPokemons(); 

*/

async function carregarPokemons(qtd = 1010) {
  const container = document.getElementById('pokemonContainer');

  for (let i = 1; i <= qtd; i++) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const dados = await resposta.json();

    //console.log(dados); // Para ver no console

    const card = document.createElement('div');
    card.classList.add('mainPokemonCards');
    card.classList.add('mainPokemonCardsEstiloJs');

    card.innerHTML = `
                    <img src="${dados.sprites.front_default}" alt="${dados.name}">
                    <h3>${dados.name.charAt(0).toUpperCase() + dados.name.slice(1)}</h3>
                    <p>Tipo: ${dados.types.map(tipo => tipo.type.name).join(', ')}</p>
                `;

    //container.appendChild(card);
  }
}

carregarPokemons();

async function carrosel2(qtd = 3) {
  const carrosel = document.querySelector('.carrossel2Area');
  const imagens = document.querySelectorAll('.carrossel img');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  console.log(carrosel);


  for (let i = 1; i <= qtd; i++) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const dados = await resposta.json();

    console.log(dados); // Para ver no console

    const card = document.createElement('div');
    card.classList.add('carrossel2Area');

    card.innerHTML = `
                    <img src="${dados.sprites.front_default}" alt="${dados.name}">
                `;

    carrosel.appendChild(card);
  }
}
carrosel2();