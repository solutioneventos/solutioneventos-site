(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");
  const menuLinks = document.querySelectorAll(".nav-links a");
  const form = document.querySelector("#quote-form");
  const year = document.querySelector("#current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });

    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const services = data.getAll("servicos");
      const rawDate = data.get("data");
      let formattedDate = "A definir";

      if (rawDate) {
        const [yearPart, monthPart, dayPart] = rawDate.split("-");
        formattedDate = `${dayPart}/${monthPart}/${yearPart}`;
      }

      const message = [
        "Olá! Acessei o site da Solution Eventos e gostaria de solicitar um orçamento.",
        "",
        `Nome: ${data.get("nome")}`,
        `Telefone: ${data.get("telefone")}`,
        `Cidade do evento: ${data.get("cidade")}`,
        `Data prevista: ${formattedDate}`,
        `Tipo de evento: ${data.get("tipo")}`,
        `Público estimado: ${data.get("publico") || "A definir"}`,
        `Serviços de interesse: ${services.length ? services.join(", ") : "A definir"}`,
        `Informações adicionais: ${data.get("mensagem") || "Não informado"}`
      ].join("\n");

      const whatsappUrl = `https://wa.me/5551999915307?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
})();
