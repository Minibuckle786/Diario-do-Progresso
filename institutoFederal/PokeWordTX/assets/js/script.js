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
