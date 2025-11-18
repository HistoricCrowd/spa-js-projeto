// Sistema de templates em JavaScript
// Cada função retorna uma string HTML para a rota correspondente

const templates = {
  home: () => `
    <section class="panel">
      <h1>Bem-vindo à SPA</h1>
      <p>Exemplo de Single Page Application com templates, validação e LocalStorage.</p>

      <h2>Salvar preferências</h2>
      <div class="keyval">
        <input id="pref-key" class="input" placeholder="Chave (ex: tema)"/>
        <input id="pref-value" class="input" placeholder="Valor (ex: dark)"/>
      </div>
      <div style="margin-top:10px;">
        <button class="btn" id="save-pref">Salvar</button>
        <button class="btn" id="load-pref" style="margin-left:8px;">Carregar</button>
      </div>
      <p id="pref-status" class=""></p>

      <h2 style="margin-top:18px;">Itens salvos</h2>
      <ul id="pref-list" class="list"></ul>
    </section>
  `,

  sobre: () => `
    <section class="panel">
      <h1>Sobre o projeto</h1>
      <p>Este projeto demonstra uma SPA básica usando rotas por hash, templates JS, validação de formulário e armazenamento no LocalStorage.</p>
      <p>O foco é manipulação do DOM, eventos e organização modular em pastas.</p>
    </section>
  `,

  contato: () => `
    <section class="panel">
      <h1>Contato</h1>
      <p>Preencha o formulário abaixo. Os dados passam por verificação de consistência com feedback amigável.</p>

      <form id="contact-form" novalidate>
        <div class="input-group">
          <label for="name">Nome</label>
          <input id="name" name="name" class="input" placeholder="Seu nome completo" required/>
          <small id="error-name" class="error"></small>
        </div>

        <div class="input-group">
          <label for="email">Email</label>
          <input id="email" name="email" class="input" placeholder="seuemail@exemplo.com" required/>
          <small id="error-email" class="error"></small>
        </div>

        <div class="input-group">
          <label for="message">Mensagem</label>
          <textarea id="message" name="message" rows="5" class="textarea" placeholder="Sua mensagem" required></textarea>
          <small id="error-message" class="error"></small>
        </div>

        <button type="submit" class="btn">Enviar</button>
        <p id="form-status" class=""></p>
      </form>
    </section>
  `
};
