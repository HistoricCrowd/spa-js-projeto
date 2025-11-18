// Roteador simples baseado em hash para SPA
// Rotas: #home, #sobre, #contato

const Router = (() => {
  const routes = new Map([
    ["home", templates.home],
    ["sobre", templates.sobre],
    ["contato", templates.contato]
  ]);

  function render(route) {
    const container = document.getElementById("content");
    const tmpl = routes.get(route) || routes.get("home");
    container.innerHTML = tmpl();

    // pós-render: attach handlers específicos por rota
    if (route === "home") afterHomeRender();
    if (route === "contato") afterContatoRender();

    // atualizar estado visual da navegação
    updateActiveNav(route);
  }

  function afterHomeRender() {
    const keyEl = document.getElementById("pref-key");
    const valEl = document.getElementById("pref-value");
    const saveBtn = document.getElementById("save-pref");
    const loadBtn = document.getElementById("load-pref");
    const statusEl = document.getElementById("pref-status");
    const listEl = document.getElementById("pref-list");

    const showStatus = (type, msg) => {
      statusEl.className = type === "error" ? "error" : "success";
      statusEl.textContent = msg;
    };

    const renderList = () => {
      const items = Storage.all();
      listEl.innerHTML = items
        .map(i => `<li><strong>${i.key}:</strong> ${JSON.stringify(i.value)}</li>`)
        .join("");
    };

    saveBtn.addEventListener("click", () => {
      const key = keyEl.value.trim();
      const value = valEl.value.trim();
      if (!key) return showStatus("error", "Informe uma chave para salvar.");
      const res = Storage.save(key, value || "(vazio)");
      if (res.ok) {
        showStatus("success", "Preferência salva.");
        renderList();
      } else {
        showStatus("error", "Falha ao salvar.");
      }
    });

    loadBtn.addEventListener("click", () => {
      const key = keyEl.value.trim();
      if (!key) return showStatus("error", "Informe a chave que deseja carregar.");
      const value = Storage.get(key);
      if (value === null) {
        showStatus("error", "Nada encontrado para essa chave.");
      } else {
        valEl.value = typeof value === "string" ? value : JSON.stringify(value);
        showStatus("success", "Valor carregado.");
      }
    });

    renderList();
  }

  function afterContatoRender() {
    const formEl = document.getElementById("contact-form");
    FormValidation.attachFormHandlers(formEl);
  }

  function updateActiveNav(route) {
    document.querySelectorAll("[data-link]").forEach((a) => {
      const r = a.getAttribute("href").replace("#", "");
      a.classList.toggle("active", r === route);
    });
  }

  function init() {
    window.addEventListener("hashchange", () => {
      const route = location.hash.replace("#", "") || "home";
      render(route);
    });
    const initial = location.hash.replace("#", "") || "home";
    render(initial);
  }

  return { init, render };
})();
