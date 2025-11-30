document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.menu-mobile');

  if (toggleButton && mobileMenu) {
    toggleButton.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelectorAll('.menu-mobile a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
      });
    });
  }
});
