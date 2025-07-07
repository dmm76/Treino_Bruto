const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

// Toggle do menu mobile
if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuIcon.classList.toggle("bx-x");
  });
}

// Fecha o menu ao clicar em qualquer link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
  });
});

// Detecta a página atual
const path = window.location.pathname;
let currentPage = path.split("/").pop();

if (
  !currentPage ||
  currentPage === "" ||
  currentPage === "index" ||
  currentPage === "/"
) {
  currentPage = "index.html";
}

// Marca somente o link correto como ativo
const navLinks = document.querySelectorAll(".navbar a");

// REMOVE TODOS os 'active' primeiro
navLinks.forEach((link) => {
  link.classList.remove("active");
});

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href.startsWith("#") && href === currentPage) {
    link.classList.add("active");
  }
});

// Scrollspy funciona só na index.html
if (currentPage === "index.html") {
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else if (link.getAttribute("href").startsWith("#")) {
            link.classList.remove("active");
          }
        });
      }
    });
  });
}
//Validacao do formulário
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nome = document.getElementById("name");
  const email = document.getElementById("email");
  const telefone = document.getElementById("phone");
  const assunto = document.getElementById("subject");
  const mensagem = document.getElementById("message");

  form.addEventListener("submit", function (event) {
    let valido = true;
    let mensagensErro = [];

    // Validação nome
    if (nome.value.trim().length < 3) {
      valido = false;
      mensagensErro.push("Digite um nome com pelo menos 3 letras.");
    }

    // Validação e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      valido = false;
      mensagensErro.push("Digite um e-mail válido.");
    }

    // Validação telefone (apenas números, com 10 ou 11 dígitos)
    const telefoneRegex = /^\d{10,11}$/;
    const telefoneLimpo = telefone.value.replace(/\D/g, ""); // Remove qualquer caractere que não seja número
    if (!telefoneRegex.test(telefoneLimpo)) {
      valido = false;
      mensagensErro.push(
        "Digite um telefone válido com DDD (somente números)."
      );
    }

    // Validação assunto
    if (assunto.value.trim().length < 3) {
      valido = false;
      mensagensErro.push("Digite um assunto com pelo menos 3 letras.");
    }

    // Validação mensagem
    if (mensagem.value.trim().length < 10) {
      valido = false;
      mensagensErro.push("A mensagem deve ter pelo menos 10 caracteres.");
    }

    // Se houver erros, impedir envio e mostrar alertas
    if (!valido) {
      event.preventDefault();
      alert(mensagensErro.join("\n"));
    }
  });
});
