//aplicar o estilo ao menu lateral
document.addEventListener("DOMContentLoaded", function() {
  let div = document.getElementById("navegationPonto");
  div.style.backgroundColor = "rgba(27, 38, 59, 1)";
  div.style.color = "rgb(255, 255, 255)";
  let img = document.getElementById("g-ponto");
  img.style.filter="brightness(0) invert(1)";
});

const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

let listaFuncionarios = cadastros;

document.addEventListener("DOMContentLoaded", mostrarFuncionarios());

function mostrarFuncionarios() {
  const tbody = document.getElementById("lista-funcionarios");

  tbody.innerHTML = "";

  listaFuncionarios.map((employe) => {
    tbody.innerHTML += `
    <tr class="table_row" id=${employe.id}>
                                <td scope="row" class="profile-pic"><img src="${employe.foto}" alt="imagem-funcionario"
                                        ></td>
                                <td >${employe.nome}</td>
                               


                                <td> <a href="./viewInfo.html" class="link_table">Ver </a></td>


                            </tr>
    `;
  });
}
