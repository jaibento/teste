let usuarios = buscarDados("usuarios");

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;
  const encontrarUsuario = usuarios.find(
    (v) => v.email === email && v.senha === senha
  );

  if (!encontrarUsuario) {
    let feedBackEmail = document.getElementById("feedBackEmail");

    feedBackEmail.style.display = "block";

    setTimeout(() => {
      feedBackEmail.style.display = "none";
    }, 2000);
  } else {
    armazenar_dados("usuarioLogado", encontrarUsuario);
    window.location = `./home.html`;
  }
});

function ir_para_pag_cadastrar() {
  window.location = "./signUp.html";
}

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
