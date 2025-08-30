//inicio tabs
let abaAtual = 0;
const totalAbas = document.querySelectorAll(".tab-content").length;

function showTab(index) {
    abaAtual = index;
    document.querySelectorAll(".tab").forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
        document.getElementById("tab-" + i).classList.toggle("active", i === index);
    });

    // Configura visibilidade dos botões
    document.getElementById("btnAnterior").disabled = abaAtual === 0;
    document.getElementById("btnProximo").style.display =
        abaAtual === totalAbas - 1 ? "none" : "inline-block";
    document.getElementById("btnSalvar").style.display =
        abaAtual === totalAbas - 1 ? "inline-block" : "none";
}

function mudarAba(direcao) {
    if (abaAtual + direcao >= 0 && abaAtual + direcao < totalAbas) {
        showTab(abaAtual + direcao);
    }
}

//EDITAR FORMULÁRIO COM A MESMA PÁGINA DE CRIAR
//pegar o id mandado na url
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get("id"); // Pega o ID da URL

    if (index) {
        document.title = "Sistema RH TopRH-Editar Colaborador";
        document.getElementById("breadcrumbs2").textContent = "Editar Colaborador";
        document.getElementById("title-h3").textContent = "Editar Colaborador";
        editarCadastro(index); // Se tem ID, carrega os dados
    }
});

// Função para editar um cadastro existente

function editarCadastro(index) {
    // Recupera os cadastros
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cadastro = cadastros[index];

    // Preenche o formulário com os dados do cadastro

    document.getElementById("nome").value = cadastro.nome;
    document.getElementById("dataNascimento").value = cadastro.dataNascimento;
    document.getElementById("telefone").value = cadastro.telefone;
    document.getElementById("email").value = cadastro.email;
    document.getElementById("estadoCivil").value = cadastro.estadoCivil;
    document.getElementById("sexo").value = cadastro.sexo;
    document.getElementById("cep").value = cadastro.cep;
    document.getElementById("endereco").value = cadastro.endereco;
    document.getElementById("bairro").value = cadastro.bairro;
    document.getElementById("cidade").value = cadastro.cidade;
    document.getElementById("estado").value = cadastro.estado;
    document.getElementById("pais").value = cadastro.pais;

    document.getElementById("id").value = index;
    document.getElementById("usuario").value = cadastro.usuario;
    document.getElementById("departamento").value = cadastro.departamento;
    document.getElementById("emailCorp").value = cadastro.emailCorp;
    document.getElementById("ativo").value = cadastro.ativo; // Se for um checkbox
    document.getElementById("dataAdmissao").value = cadastro.dataAdmissao;

    document.getElementById("numeroIdentidade").value = cadastro.numeroIdentidade;
    document.getElementById("numeroCpf").value = cadastro.numeroCpf;
    //não é possível salvar e carregar files no local storage
    // document.getElementById('identidade').value = cadastro.identidade;
    // document.getElementById('cpf').textContent = cadastro.cpf;
    // document.getElementById('comprovanteResidencia').textContent = cadastro.comprovanteResidencia;
    // document.getElementById('certidaoNascimento').textContent = cadastro.certidaoNascimento;
    // document.getElementById('carteiraTrabalho').textContent = cadastro.carteiraTrabalho;
    // document.getElementById('carteiramotorista').textContent = cadastro.carteiramotorista;
    console.log(cadastro.foto);

    // Mostra a imagem se existir
    const previewDiv = document.getElementById("imagemPreview");
    if (cadastro.foto) {
        previewDiv.innerHTML = `<img src="${cadastro.foto}" style="max-width: 200px; max-height: 200px;">`;
    } else {
        previewDiv.innerHTML = "";
    }
}

//ENVIAR FORMULÁRIO E SALVAR NO LOCAL STORAGE

// Função para converter a imagem para Base64 (para salvar no localStorage)
function converterImagemParaBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

// Evento para mostrar preview da imagem quando um arquivo é selecionado
document.getElementById("foto").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
        converterImagemParaBase64(file, function (base64) {
            document.getElementById(
                "imagemPreview"
            ).innerHTML = `<img src="${base64}" style="max-width: 200px; max-height: 200px;">`;
        });
    }
});

//evento para mostrar qual arquivo está seleconado no input file

//função encurtar nome
function encurtarNome(nomeArquivo, limite) {
    if (nomeArquivo.length <= limite) return nomeArquivo;

    const partes = nomeArquivo.split(".");
    const extensao = partes.pop(); // Pega a extensão
    const nomeBase = partes.join("."); // Junta o restante do nome

    if (nomeBase.length > limite - (extensao.length + 3)) {
        return nomeBase.substring(0, limite - (extensao.length + 3)) + "... ." + extensao;
    }

    return nomeArquivo;
}

//comprovante de identidade
document.getElementById("identidade").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
    const fileNameElement = document.getElementById("file-name-id");
    if (file) {
        fileNameElement.textContent = ">> " + encurtarNome(file.name, 20);
    } else {
        fileNameElement.textContent = ""; // Limpa se nenhum arquivo for selecionado
    }
});
//comprovante de cpf
document.getElementById("cpf").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
    const fileNameElement = document.getElementById("file-name-cpf");
    if (file) {
        fileNameElement.textContent = ">> " + encurtarNome(encurtarNome(file.name, 20));
    } else {
        fileNameElement.textContent = ""; // Limpa se nenhum arquivo for selecionado
    }
});
//comprovante de residência
document.getElementById("comprovanteResidencia").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
    const fileNameElement = document.getElementById("file-name-residencia");
    if (file) {
        fileNameElement.textContent = ">> " + encurtarNome(file.name, 20);
    } else {
        fileNameElement.textContent = ""; // Limpa se nenhum arquivo for selecionado
    }
});
//comprovante de certidao nascimento
document.getElementById("certidaoNascimento").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
    const fileNameElement = document.getElementById("file-name-nascimento");
    if (file) {
        fileNameElement.textContent = ">> " + encurtarNome(file.name, 20);
    } else {
        fileNameElement.textContent = ""; // Limpa se nenhum arquivo for selecionado
    }
});
//comprovante de carteira de trabalhoo
document.getElementById("cateiraTrabalho").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
    const fileNameElement = document.getElementById("file-name-trabalho");
    if (file) {
        fileNameElement.textContent = ">> " + encurtarNome(file.name, 20);
    } else {
        fileNameElement.textContent = ""; // Limpa se nenhum arquivo for selecionado
    }
});
//comprovante de carteira de motorista
document.getElementById("carteiramotorista").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado
    const fileNameElement = document.getElementById("file-name-motorista");
    if (file) {
        fileNameElement.textContent = ">> " + encurtarNome(file.name, 20);
    } else {
        fileNameElement.textContent = ""; // Limpa se nenhum arquivo for selecionado
    }
});

// Evento para o envio do formulário
document
    .getElementById("cadastroForm")
    .addEventListener("submit", function (e) {
        e.preventDefault(); // impedir ação padrão



        // Recupera os valores do formulário
        //<!-- Informações Pessoais -->
        const fotoInput = document.getElementById("foto");
        const nome = document.getElementById("nome").value;
        const dataNascimento = document.getElementById("dataNascimento").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;
        const estadoCivil = document.getElementById("estadoCivil").value;
        const sexo = document.getElementById("sexo").value;
        const cep = document.getElementById("cep").value;
        const endereco = document.getElementById("endereco").value;
        const bairro = document.getElementById("bairro").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;
        const pais = document.getElementById("pais").value;

        //<!-- Informações Profissionais -->
        const id = document.getElementById("id").value;
        const usuario = document.getElementById("usuario").value;
        const departamento = document.getElementById("departamento").value;
        const emailCorp = document.getElementById("emailCorp").value;
        const ativo = document.getElementById("ativo").value;
        const dataAdmissao = document.getElementById("dataAdmissao").value;

        //<!-- Documentos -->
        const numeroIdentidade = document.getElementById("numeroIdentidade").value;
        const numeroCpf = document.getElementById("numeroCpf").value;

        //extrair apenas os nomes dos arquivos pra guardar no local storage
        const identidade = document.getElementById("identidade");
        const nomeArquivoIdentidade =
            identidade.files.length > 0 ? identidade.files[0].name : null;

        const cpf = document.getElementById("cpf");
        const nomeArquivoCpf = cpf.files.length > 0 ? cpf.files[0].name : null;

        const comprovanteResidencia = document.getElementById(
            "comprovanteResidencia"
        );
        const nomeArquivoComprovanteResidencia =
            comprovanteResidencia.files.length > 0
                ? comprovanteResidencia.files[0].name
                : null;

        const certidaoNascimento = document.getElementById("certidaoNascimento");
        const nomeArquivoCertidaoNascimento =
            certidaoNascimento.files.length > 0
                ? certidaoNascimento.files[0].name
                : null;

        const carteiraTrabalho = document.getElementById("cateiraTrabalho");
        const nomeArquivoCateiraTrabalho =
            carteiraTrabalho.files.length > 0 ? carteiraTrabalho.files[0].name : null;

        const carteiramotorista = document.getElementById("carteiramotorista");
        const nomeArquivoCarteiramotorista =
            carteiramotorista.files.length > 0
                ? carteiramotorista.files[0].name
                : null;

        // Recupera os cadastros existentes do localStorage
        const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

        // Função para salvar o cadastro
        function salvarCadastro(fotoBase64) {
            const cadastro = {
                foto: fotoBase64,
                nome: nome,
                dataNascimento: dataNascimento,
                telefone: telefone,
                email: email,
                estadoCivil: estadoCivil,
                sexo: sexo,
                cep: cep,
                endereco: endereco,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                pais: pais,

                id: id,
                usuario: usuario,
                departamento: departamento,
                emailCorp: emailCorp,
                ativo: ativo,
                dataAdmissao: dataAdmissao,

                numeroIdentidade: numeroIdentidade,
                numeroCpf: numeroCpf,
                identidade: nomeArquivoIdentidade,
                cpf: nomeArquivoCpf,
                comprovanteResidencia: nomeArquivoComprovanteResidencia,
                certidaoNascimento: nomeArquivoCertidaoNascimento,
                carteiraTrabalho: nomeArquivoCateiraTrabalho,
                carteiramotorista: nomeArquivoCarteiramotorista,
            };



            //verifica se existem alertas visiveis
            if (document.getElementById("alertas").style.display === "flex") {
                // se houver, interrompe
                return false;
            }

            if (id === "") {
                // Adiciona um novo cadastro
                cadastros.push(cadastro);
            } else {
                // Atualiza um cadastro existente
                cadastros[id] = cadastro;
            }

            // Salva no localStorage
            localStorage.setItem("cadastros", JSON.stringify(cadastros));

            // // Limpa o formulário
            // limparFormulario();

            // Exibe mensagem
            alert("Cadastro salvo com sucesso!");

            console.log("Dados do Formulário:", cadastros);

            // // Volta para a lista de cadastros
            window.location = "employees.html";
        }

        // Verifica se foi selecionada uma nova foto

        if (fotoInput.files.length > 0) {
            converterImagemParaBase64(fotoInput.files[0], function (base64) {
                salvarCadastro(base64);
            });
        } else {
            // Se não tem nova foto e é edição, mantém a foto existente
            if (id !== "") {
                salvarCadastro(cadastros[id].foto);
            } else {
                // Cadastro novo sem foto
                salvarCadastro(null);
            }
        }



    });

//fim tabs
//limpar local storage
function limpar() {
    localStorage.clear();
}

//VALIDAÇÕES
//todos os campos estão listados, caso queira adicionar alguma validação no futuro
//mudar a borda do campo para normal se houver mudança
function validar() {

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        input.addEventListener("input", function () {
            this.style.border = "1px solid grey"; // Aplica a borda apenas ao input atual
            document.getElementById("textAlertas").innerHTML = "";
            document.getElementById("alertas").style.display = "none";
        });
    });

    var fotoInput = document.getElementById('foto');//sem validação por enquanto
    //campo nome vazio
    var nome = document.getElementById('nome').value;
    if (nome == "") {
        document.getElementById("textAlertas").innerHTML += "<div>Campo Nome está vazio!</div>";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('nome').style.border = "solid 1px red";

    }
    var dataNascimento = document.getElementById('dataNascimento').value;
    //campo telefone vazio ou inválido
    var telefone = document.getElementById('telefone').value;
    const telefoneRegex = /^(\(?\d{2}\)?\s?)?(9\d{4}[-]?\d{4})$/;
    if (telefone == "") {
        document.getElementById("textAlertas").innerHTML += "<div>Campo Telefone está vazio!</div>";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('telefone').style.border = "solid 1px red";
    }
    if (!telefoneRegex.test(telefone)) {
        document.getElementById("textAlertas").innerHTML += "<div>Telefone inválido! </div>";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('telefone').style.border = "solid 1px red";
    }
    //campo email vazio ou inválido
    var email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "") {
        document.getElementById("textAlertas").innerHTML += "<div>Campo Email está vazio!</div> ";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('email').style.border = "solid 1px red";
    }
    if (!emailRegex.test(email)) {
        document.getElementById("textAlertas").innerHTML += "<div>Email inválido!</div> ";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('email').style.border = "solid 1px red";
    }
    var estadoCivil = document.getElementById('estadoCivil').value;
    var sexo = document.getElementById('sexo').value;
    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;
    var bairro = document.getElementById('bairro').value;
    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;
    var pais = document.getElementById('pais').value;

    //<!-- Informações Profissionais -->
    var id = document.getElementById("id").value;
    //nome do usuario vazio
    var usuario = document.getElementById("usuario").value;
    if (usuario == "") {
        document.getElementById("textAlertas").innerHTML +=
            "<div>Campo Usuário está vazio!</div> ";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById("usuario").style.border = "solid 1px red";
    }
    //nome do departamento vazio
    var departamento = document.getElementById("departamento").value;
    if (departamento == "") {
        document.getElementById("textAlertas").innerHTML +=
            "<div>Campo Departamento está vazio!</div> ";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById("departamento").style.border = "solid 1px red";
    }
    //campo email coorporativo vazio e inválido
    var emailCorp = document.getElementById("emailCorp").value;
    if (emailCorp == "") {
        document.getElementById("textAlertas").innerHTML +=
            "<div>Campo Email Corporativo está vazio!</div>";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById("emailCorp").style.border = "solid 1px red";
    }
    if (!emailRegex.test(emailCorp)) {
        document.getElementById("textAlertas").innerHTML +=
            "<div>Email Corporativo  inválido!</div> ";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById("emailCorp").style.border = "solid 1px red";
    }
    var ativo = document.getElementById("ativo").value;
    var dataAdmissao = document.getElementById("dataAdmissao").value;

    //<!-- Documentos -->
    //numero identidade vazio e numerico
    var numeroIdentidade = document.getElementById('numeroIdentidade').value;
    function isRGValido(rg) {
        return /^\d+$/.test(rg);
    }
    if (numeroIdentidade == "") {
        document.getElementById("textAlertas").innerHTML += "<div>Campo Numero da Identidade está vazio!</div> ";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('numeroIdentidade').style.border = "solid 1px red";
    }
    if (!isRGValido(numeroIdentidade)) {
        document.getElementById("textAlertas").innerHTML += "<div>Identidade inválida!</div> ";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('numeroIdentidade').style.border = "solid 1px red";
    }
    //numero cpf vazio e validação oficial
    var numeroCpf = document.getElementById('numeroCpf').value;
    if (numeroCpf == "") {
        document.getElementById("textAlertas").innerHTML += "<div>Campo CPF está vazio!</div> ";
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('numeroCpf').style.border = "solid 1px red";
    }
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for número

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Impede CPFs como "111.111.111-11"

        let soma = 0, resto;

        // Cálculo do primeiro dígito verificador
        for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto != cpf[9]) return false;

        soma = 0;
        // Cálculo do segundo dígito verificador
        for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto != cpf[10]) return false;

        return true;
    }
    if (!validarCPF(numeroCpf)) {
        document.getElementById("textAlertas").innerHTML += "<div>CPF inválido!</div> ";               //<<<<<<<<<<<<validar cpf<<<<<<<<<<<<<<<
        document.getElementById("alertas").style.display = "flex";
        document.getElementById('numeroCpf').style.border = "solid 1px red";

    }

    // Testes
    
    console.log(validarCPF("111.444.777-35")); // true (CPF válido)




    //extrair apenas os nomes dos arquivos pra guardar no local storage
    var identidade = document.getElementById("identidade");
    var nomeArquivoIdentidade =
        identidade.files.length > 0 ? identidade.files[0].name : null;

    var cpf = document.getElementById("cpf");
    var nomeArquivoCpf = cpf.files.length > 0 ? cpf.files[0].name : null;

    var comprovanteResidencia = document.getElementById("comprovanteResidencia");
    var nomeArquivoComprovanteResidencia =
        comprovanteResidencia.files.length > 0
            ? comprovanteResidencia.files[0].name
            : null;

    var certidaoNascimento = document.getElementById("certidaoNascimento");
    var nomeArquivoCertidaoNascimento =
        certidaoNascimento.files.length > 0
            ? certidaoNascimento.files[0].name
            : null;

    var carteiraTrabalho = document.getElementById("cateiraTrabalho");
    var nomeArquivoCateiraTrabalho =
        carteiraTrabalho.files.length > 0 ? carteiraTrabalho.files[0].name : null;

    var carteiramotorista = document.getElementById("carteiramotorista");
    var nomeArquivoCarteiramotorista =
        carteiramotorista.files.length > 0 ? carteiramotorista.files[0].name : null;


}
