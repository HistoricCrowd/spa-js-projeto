// Validação de formulário com feedback ao usuário
// Regras: nome >= 3 chars; email em formato válido; mensagem >= 10 chars

const FormValidation = (() => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function validateName(value) {
    if (!value || value.trim().length < 3) {
      return "O nome deve ter pelo menos 3 caracteres.";
    }
    return "";
  }

  function validateEmail(value) {
    if (!value || !emailRegex.test(value.trim())) {
      return "Insira um email válido (ex: usuario@dominio.com).";
    }
    return "";
  }

  function validateMessage(value) {
    if (!value || value.trim().length < 10) {
      return "A mensagem deve ter pelo menos 10 caracteres.";
    }
    return "";
  }

  function attachFormHandlers(formEl) {
    const nameEl = formEl.querySelector("#name");
    const emailEl = formEl.querySelector("#email");
    const messageEl = formEl.querySelector("#message");
    const statusEl = formEl.querySelector("#form-status");

    const errName = formEl.querySelector("#error-name");
    const errEmail = formEl.querySelector("#error-email");
    const errMessage = formEl.querySelector("#error-message");

    const showStatus = (type, msg) => {
      statusEl.className = type === "error" ? "error" : "success";
      statusEl.textContent = msg;
    };

    const validateField = (el, validator, errEl) => {
      const error = validator(el.value);
      errEl.textContent = error;
      if (error) {
        el.setAttribute("aria-invalid", "true");
      } else {
        el.removeAttribute("aria-invalid");
      }
      return !error;
    };

    nameEl.addEventListener("input", () => validateField(nameEl, validateName, errName));
    emailEl.addEventListener("input", () => validateField(emailEl, validateEmail, errEmail));
    messageEl.addEventListener("input", () => validateField(messageEl, validateMessage, errMessage));

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const okName = validateField(nameEl, validateName, errName);
      const okEmail = validateField(emailEl, validateEmail, errEmail);
      const okMessage = validateField(messageEl, validateMessage, errMessage);

      if (okName && okEmail && okMessage) {
        const payload = {
          name: nameEl.value.trim(),
          email: emailEl.value.trim(),
          message: messageEl.value.trim(),
          submittedAt: new Date().toISOString()
        };
        Storage.save("lastContact", payload);
        showStatus("success", "Formulário enviado com sucesso!");
        formEl.reset();
      } else {
        showStatus("error", "Verifique os campos destacados e tente novamente.");
      }
    });
  }

  return { attachFormHandlers };
})();
