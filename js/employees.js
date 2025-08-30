//mostrar filtros
const filterButtom = document.getElementById('filterButtom');
const showFiltersSpace = document.getElementById('showFilters-space');



filterButtom.addEventListener('click', function () {
  showFiltersSpace.classList.toggle("show");
});

function mostrarModal(index) {
  // Recupera os cadastros
  const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
  const cadastro = cadastros[index];
  console.log(cadastros[index]);

// Preenche o modal com os dados do cadastro
document.getElementById('section-title-nome').textContent = cadastro.nome;

document.getElementById('modal_nome').value = cadastro.nome;
document.getElementById('modal_dataNascimento').value = cadastro.dataNascimento;
document.getElementById('modal_telefone').value = cadastro.telefone;
document.getElementById('modal_email').value = cadastro.email;
document.getElementById('modal_estadoCivil').value = cadastro.estadoCivil;
document.getElementById('modal_sexo').value = cadastro.sexo;
document.getElementById('modal_cep').value = cadastro.cep;
document.getElementById('modal_endereco').value = cadastro.endereco;
document.getElementById('modal_bairro').value = cadastro.bairro;
document.getElementById('modal_cidade').value = cadastro.cidade;
document.getElementById('modal_estado').value = cadastro.estado;
document.getElementById('modal_pais').value = cadastro.pais;

document.getElementById('modal_id').value = index;
document.getElementById('modal_usuario').value = cadastro.usuario;
document.getElementById('modal_departamento').value = cadastro.departamento;
document.getElementById('modal_emailCorp').value = cadastro.emailCorp;
document.getElementById('modal_ativo').value = cadastro.ativo;
document.getElementById('modal_dataAdmissao').value = cadastro.dataAdmissao;

document.getElementById('modal_numeroIdentidade').value = cadastro.numeroIdentidade;
document.getElementById('modal_numeroCpf').value = cadastro.numeroCpf;

document.getElementById('modal_identidade').value = cadastro.identidade;
document.getElementById('modal_cpf').textContent = cadastro.cpf;
document.getElementById('modal_comprovanteResidencia').textContent = cadastro.comprovanteResidencia;
document.getElementById('modal_certidaoNascimento').textContent = cadastro.certidaoNascimento;
document.getElementById('modal_carteiraTrabalho').textContent = cadastro.carteiraTrabalho;
document.getElementById('modal_carteiramotorista').textContent = cadastro.carteiramotorista;

// Mostra a imagem se existir
const previewDiv = document.getElementById('modal_imagemPreview');
if (cadastro.foto) {
    previewDiv.innerHTML = `<img src="${cadastro.foto}" style="max-width: 200px; max-height: 200px;">`;
} else {
    previewDiv.innerHTML = '';
}

}

// Função para excluir um cadastro
function excluirCadastro(index) {
  if (confirm('Tem certeza que deseja excluir este cadastro?')) {
    // Recupera os cadastros
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    // Remove o cadastro pelo índice
    cadastros.splice(index, 1);

    // Salva a lista atualizada de cadastros no localStorage
    localStorage.setItem('cadastros', JSON.stringify(cadastros));

    // Recarrega a tabela
    carregarCadastros();
  }
}

// Função para carregar os cadastros salvos no localStorage e exibir na tabela
function carregarCadastros() {
  const tbody = document.querySelector('.table tbody');
  tbody.innerHTML = '';  // Limpa a tabela

  // Recupera os cadastros do localStorage
  const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

  // Para cada cadastro, cria uma linha na tabela
  cadastros.forEach((cadastro, index) => {
    const tr = document.createElement('tr');


    // Células para cada informação
    // Células para Foto
    const tdFoto = document.createElement('td');
    if (cadastro.foto) {
      const img = document.createElement('img');
      img.src = cadastro.foto;
      img.className = 'profile-pic';
      tdFoto.appendChild(img);
    } else {
      const img = document.createElement('img');
      img.src = "../img/profileNoPicture.png";
      img.className = 'profile-pic';
      img.style.opacity="0.5";
      tdFoto.appendChild(img);
    }

    // Células para Nome
    const tdNome = document.createElement('td');
    tdNome.textContent = cadastro.nome;

    // Células para Telefone
    const tdSexo = document.createElement('td');
    tdSexo.textContent = cadastro.telefone;

    // Células para Departamento
    const tdData = document.createElement('td');
    tdData.textContent = cadastro.departamento;


    const tdAcoes = document.createElement('td');

    // Botão de ver
    const linkVer = document.createElement('a');
    
    linkVer.classList.add("actions");
    
    //Abrir modal
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    linkVer.onclick = function () {
      modal.style.display = "block";
      mostrarModal(index);
    };
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };


    const imgVer = document.createElement('img');
    imgVer.src = "./img/see_black.png";
    imgVer.alt = "ver";

    linkVer.appendChild(imgVer); // Adicionar imagem dentro do link

    // Botão de editar
    const linkEditar = document.createElement('a');
    linkEditar.onclick = function () {
      window.location.href = `newEmployee.html?id=${index}`;
    };
    linkEditar.classList.add("actions");

    const imgEditar = document.createElement('img');
    imgEditar.src = "./img/edit_black.png";
    imgEditar.alt = "editar";
    linkEditar.appendChild(imgEditar); // Adicionar imagem dentro do link

    // Botão de excluir
    const linkExcluir = document.createElement('a');
    linkExcluir.onclick = function () {
      excluirCadastro(index);
    };
    linkExcluir.classList.add("actions");

    const imgExcluir = document.createElement('img');
    imgExcluir.src = "./img/delete_black.png";
    imgExcluir.alt = "excluir";
    linkExcluir.appendChild(imgExcluir); // Adicionar imagem dentro do link


    // Adiciona os links dentro do td
    tdAcoes.appendChild(linkVer);
    tdAcoes.appendChild(linkEditar);
    tdAcoes.appendChild(linkExcluir);


    // Adiciona todas as células à linha
    tr.appendChild(tdFoto);
    tr.appendChild(tdNome);
    tr.appendChild(tdSexo);
    tr.appendChild(tdData);
    tr.appendChild(tdAcoes);

    // Adiciona a linha à tabela
    tbody.appendChild(tr);
  });
}

//carrega a tabela ao iniciar a página
document.addEventListener('DOMContentLoaded', function () {
  carregarCadastros();
});

