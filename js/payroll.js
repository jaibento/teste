

const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

let listaFuncionarios = cadastros;

document.addEventListener("DOMContentLoaded", mostrarFuncionarios());

function mostrarFuncionarios() {
  const tbody = document.getElementById("tbody");

  tbody.innerHTML = "";

  listaFuncionarios.map((employe) => {
    tbody.innerHTML += `
    <tr class="table_row" id=${employe.id}>
                                <td >${employe.nome}</td>
                                  <td >${employe.telefone}</td>
                                   <td >${employe.departamento}</td>

                                        <td><a href="#"><img src="./assets/icons/icon_olho.png" alt="icone de olho"
                                                class="icons_table">
                                            <img src="./assets/icons/upload_icon.png" alt="icone de upload"
                                                class="icon_upload">
                                        </a></td>


                            </tr>
    `;
  });
}
