window.addEventListener('DOMContentLoaded', () => {
  const imagens = document.querySelector('.imagens');
  const logosContainer = document.querySelector('.logos');
  const anterior = document.querySelector('.anterior');
  const proximo = document.querySelector('.proximo');

  // Dados do carrossel (Produtos)
  const slidesData = [
    {
      src: "../src/Img/Produtos/air_fryer.jpg",
      legenda: "Air Fryer Mondial – Saudável e prática"
    },
    {
      src: "../src/Img/Produtos/escova_secadora.jpg",
      legenda: "Escova Secadora – Cabelos lisos em minutos"
    },
    {
      src: "../src/Img/Produtos/Cafeteira.png",
      legenda: "Cafeteira – Café fresco a qualquer hora"
    },
    {
      src: "../src/Img/Produtos/Dolce gusto.png",
      legenda: "Dolce Gusto – Cápsulas para todos os gostos"
    },
    {
      src: "../src/Img/Produtos/LIQUIDIFICADOR.png",
      legenda: "Liquidificador – Versátil para sucos e receitas"
    },
    {
      src: "../src/Img/Produtos/SECADOR.png",
      legenda: "Secador – Potência e estilo"
    }
  ];

  // Dados das logos
  const logosData = [
    { src: "../src/Img/LOGOS/Arno.png", alt: "Logo da empresa Arno" },
    { src: "../src/Img/LOGOS/Black deck.jpg", alt: "Logo da empresa Black & Decker" },
    { src: "../src/Img/LOGOS/GAMA.jpg", alt: "Logo da empresa Gama Italy" },
    { src: "../src/Img/LOGOS/Mondial.png", alt: "Logo da empresa Mondial" },
    { src: "../src/Img/LOGOS/OSTER.png", alt: "Logo da empresa Oster" },
    { src: "../src/Img/LOGOS/WALITA.png", alt: "Logo da empresa Walita" },
    { src: "../src/Img/LOGOS/Britania.png", alt: "Logo da empresa Britânia" },
    { src: "../src/Img/LOGOS/Philco.png", alt: "Logo da empresa Philco" },
    { src: "../src/Img/LOGOS/Electrolux-Logo.png", alt: "Logo da empresa Electrolux" }
  ];

  // Monta os logos
  logosData.forEach(item => {
    const logo = document.createElement('img');
    logo.src = item.src;
    logo.alt = item.alt;
    logosContainer.appendChild(logo);
  });

  // Monta os slides do carrossel
  slidesData.forEach(item => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.legenda;

    const legenda = document.createElement('p');
    legenda.classList.add('legenda');
    legenda.textContent = item.legenda;

    slide.appendChild(img);
    slide.appendChild(legenda);
    imagens.appendChild(slide);
  });

  // Navegação do carrossel
  let index = 0;
  const slides = imagens.querySelectorAll('.slide');

  function atualizarCarrossel() {
    imagens.style.transform = `translateX(-${index * 100}%)`;
  }

  anterior.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    atualizarCarrossel();
  });

  proximo.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    atualizarCarrossel();
  });

  // Autoplay a cada 5 segundos
  setInterval(() => {
    index = (index + 1) % slides.length;
    atualizarCarrossel();
  }, 5000);

  // Atualiza ao redimensionar
  window.addEventListener('resize', atualizarCarrossel);
});