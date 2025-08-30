let usuarios = buscarDados("usuarios");

const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("password");
const repassword = document.getElementById("repassword");

formulario.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let existe = usuarios.some((v) => v.email === email.value);

  //falta adicionar uma verificação para dizer que a senha não pode ser menos que 6 digitos

  if (senha.value.length < 6) {
    let feedBack = document.getElementById("feedback");

    feedBack.style.display = "block";

    setTimeout(() => {
      feedBack.style.display = "none";
    }, 2000);
    return;
  }

  if (senha.value !== repassword.value) {
    let feedBackRepassword = document.getElementById("feedBackRepassword");

    feedBackRepassword.style.display = "block";

    setTimeout(() => {
      feedBackRepassword.style.display = "none";
    }, 2000);
    return;
  }

  if (existe) {
    let feedBackEmail = document.getElementById("feedBackEmail");

    feedBackEmail.style.display = "block";

    setTimeout(() => {
      feedBackEmail.style.display = "none";
    }, 2000);

    return;
  }
  const novoUsuario = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  };

  usuarios.push(novoUsuario);

  armazenar_dados("usuarios", usuarios);

  formulario.reset();

  appendAlert("Usuario cadastrado com sucesso!", "success");
  setTimeout(() => {
    window.location = `./login.html`;
  }, 1050);
});

function armazenar_dados(chave, valor) {
  const dados = JSON.stringify(valor);
  localStorage.setItem(chave, dados);
}

function buscarDados(chave) {
  const dadosJSON = localStorage.getItem(chave);
  if (dadosJSON) {
    try {
      const dadosConvertidos = JSON.parse(dadosJSON);
      // Garante que o valor retornado seja um array
      return Array.isArray(dadosConvertidos) ? dadosConvertidos : [];
    } catch (e) {
      console.error("Erro ao converter dados do localStorage:", e);
      return [];
    }
  } else {
    return [];
  }
}

function ir_para_login() {
  window.location = `./login.html`;
}

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};
