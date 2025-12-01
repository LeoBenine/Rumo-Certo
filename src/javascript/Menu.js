document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.menu-mobile');

  if (toggleButton && mobileMenu) {
    toggleButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('ativo');
    });

    document.querySelectorAll('.menu-mobile a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('ativo');
      });
    });
  }
});