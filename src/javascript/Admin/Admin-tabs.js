// Script para alternar abas no painel admin
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove ativo de todos
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      // Ativa o clicado
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });
});