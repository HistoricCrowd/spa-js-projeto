// Inicialização da aplicação

document.addEventListener("DOMContentLoaded", () => {
  // Garantir hash padrão
  if (!location.hash) location.hash = "#home";
  Router.init();
});
