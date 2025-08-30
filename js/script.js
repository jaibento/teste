// Função para mostrar/esconder o menu lateral
sidebar = document.getElementById("sidebar");

function toggleSidebar() {
  sidebar.classList.toggle("show");
}

// Definir saudação baseada no horário
function obterSaudacao() {
  const horaAtual = new Date().getHours();
  let mensagem;

  if (horaAtual >= 5 && horaAtual < 12) {
    mensagem = "Bom dia!";
  } else if (horaAtual >= 12 && horaAtual < 18) {
    mensagem = "Boa tarde!";
  } else {
    mensagem = "Boa noite!";
  }

  document.getElementById("saudacao").textContent = mensagem;
}
window.onload = obterSaudacao;

function menuToggle() {
  const toggleMenu = document.getElementById("userMenu");
  toggleMenu.classList.toggle("active");
}

// Função para carregar os dados do usuário logado
function carregarUsuarioLogado() {
  const dadosUsuarioJSON = localStorage.getItem("usuarioLogado");

  if (dadosUsuarioJSON) {
    try {
      const usuario = JSON.parse(dadosUsuarioJSON);

      // Atualizar o nome do usuário na saudação
      document.querySelector(
        "#wellcome h3"
      ).textContent = `Olá ${usuario.nome}`;

      // Atualizar o nome no menu do usuário
      const userMenuName = document.querySelector("#userMenu h3");
      if (userMenuName) {
        userMenuName.innerHTML = `${usuario.nome}<br /><span>Usuário</span>`;
      }
    } catch (e) {
      console.error("Erro ao carregar dados do usuário:", e);
    }
  } else {
    // Redirecionar para página de login se não estiver logado
    window.location = "./login.html";
  }
}

//Função para realizar logout
function realizarLogout() {
  localStorage.removeItem("usuarioLogado");
  window.location = "./login.html";
}

// Carregar dados do usuário quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {
  carregarUsuarioLogado();

  // Adicionar evento de logout ao botão "Sair"
  const logoutButton = document.querySelector("#userMenu li:last-child a");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      realizarLogout();
    });
  }
});
