// Funções utilitárias para LocalStorage

const Storage = {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return { ok: true };
    } catch (err) {
      console.error("Erro ao salvar no LocalStorage:", err);
      return { ok: false, error: String(err) };
    }
  },

  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error("Erro ao ler do LocalStorage:", err);
      return null;
    }
  },

  all() {
    const keys = Object.keys(localStorage);
    return keys.map((k) => ({ key: k, value: Storage.get(k) }));
  }
};
