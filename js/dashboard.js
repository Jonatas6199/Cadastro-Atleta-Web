let atletaEdicao = null;

//Quando a minha tela carregar o conteúdo
document.addEventListener("DOMContentLoaded", function () {

    if (!verificarLogado()) {
        window.location.href = "login.html"
    }
    onListarClick();
    carregarTabela();

    //adiciona um escutador pra toda vez que o usuário digitar dentro da tela
    //se for um esc, ele fecha o overlay
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            fecharPerfil();
        }
    });

    const perfil = this.getElementById("perfil");
    document.addEventListener("mousedown", function (e) {
        if (!perfil || !perfil.contains(e.target)) {
            fecharPerfil();
        }
    });


});


function voltar() {
    window.location.href = "login.html";
    logout();
}

function onListarClick() {
    const element = document.getElementById("btn-listar");
    element.classList.remove("btn-aba");
    element.classList.add("btn-aba-selecionado");
    document.getElementById("btn-cadastrar").classList.add("btn-aba");
    document.getElementById("btn-cadastrar").classList.remove("btn-aba-selecionado");

    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "flex";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "none";
    fecharEditar();
}
function onCadastrarClick() {
    const element = document.getElementById("btn-cadastrar");
    element.classList.remove("btn-aba");
    element.classList.add("btn-aba-selecionado");
    document.getElementById("btn-listar").classList.add("btn-aba");
    document.getElementById("btn-listar").classList.remove("btn-aba-selecionado");

    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "none";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "flex";
    fecharEditar();
}

function fecharEditar() {
    const containerEditar = document.getElementById("container-editar");
    containerEditar.style.display = "none";
    containerEditar.reset();
}
function abrirEditar() {
    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "none";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "none";
    const containerEditar = document.getElementById("container-editar");
    containerEditar.style.display = "flex";
    containerEditar.reset();
}

function cadastrarAtleta(event) {
    event.preventDefault(); //nao recarregar a pagina

    //Atleta
    let id = Date.now();
    let nome = getElementValue("input-nome-atleta");
    let nacionalidade = getElementValue("input-nacionalidade");
    let dtNascimento = getElementValue("input-dtNascimento");
    let cpf = getElementValue("input-cpf");
    let modalidade = getElementValue("input-modalidade");
    let genero = getElementValue("input-genero");
    let categoria = getElementValue("input-categoria");
    let peso = getElementValue("input-peso");
    let altura = getElementValue("input-altura");
    let tipoSanguineo = getElementValue("input-tipoSanguineo");
    let alergias = getElementValue("input-alergias");
    let historico = getElementValue("input-historico");


    const atleta = { //Criando um objeto atleta que não é mapeado automaticamente
        id: id,
        nome: nome,
        nacionalidade: nacionalidade,
        dtNascimento: new Date(dtNascimento).toLocaleDateString('pt-BR'),
        cpf: cpf,
        modalidade: modalidade,
        genero: genero,
        categoria: categoria,
        peso: peso,
        altura: altura,
        tipoSanguineo: tipoSanguineo,
        alergias: alergias,
        historico: historico
    };

    //Tenta ler os dados da lista de atletas, se ela não existir, devolve uma vazia
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];

    //adiciona o atleta na lista de atletas
    atletas.push(atleta);

    //atualiza ou cria a lista no localStorage com o formato de JSON
    localStorage.setItem("atletas", JSON.stringify(atletas));

    setElementText("mensagem", "Dados do " + nome + " cadastrados!");
    setElementDisplay("overlay", "flex");
    resetFormCadastroAtleta();
    carregarTabela();
}

function resetFormCadastroAtleta() {
    document.getElementById("container-cadastro").reset(); // limpa todos os campos
}

function abrirPerfil() {
    let menu = document.getElementById("perfil");
    if (menu.style.display != "flex")
        setElementDisplay("perfil", "flex");
}


function fecharPerfil() {
    setElementDisplay("perfil", "none");
}

function carregarTabela() {
    //Desserialização do texto e transforma ele em um objeto
    //o objeto é uma lista de atletas
    //se não tiver dados, devolve uma lista/array vazio
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];

    let body = document.getElementById("tabela-atletas-body");

    if (atletas.length === 0) {
        body.innerHTML = "<tr><td colspan='12'> Nenhum Atleta Encontrado. </td></tr>";

    } else {

        body.innerHTML = atletas.map(function (atleta) {
            return "<tr>" +
                "<td><strong>" + atleta.nome + "</strong></td>" +
                "<td>" + atleta.nacionalidade + "</td>" +
                "<td>" + atleta.dtNascimento + "</td>" +
                "<td>" + atleta.cpf + "</td>" +
                "<td>" + atleta.modalidade + "</td>" +
                "<td>" + atleta.genero + "</td>" +
                "<td>" + atleta.categoria + "</td>" +
                "<td>" + atleta.peso + "</td>" +
                "<td>" + atleta.altura + "</td>" +
                "<td>" + atleta.tipoSanguineo + "</td>" +
                "<td>" + atleta.alergias + "</td>" +
                "<td>" + atleta.historico + "</td>" +
                "<td><button class='button-cadastrados btn-excluir dark-blue' onclick='editarAtleta(" + atleta.id + ")'>Editar</button></td>" +
                "<td><button class='button-cadastrados btn-excluir' onclick='excluirAtleta(" + atleta.id + ")'>Excluir</button></td>" +
                "</tr>";
        }).join("");
    }
}

function editarAtleta(idAtleta) {
    abrirEditar();

    let atletas = JSON.parse(localStorage.getItem("atletas"));
    atletaEdicao = atletas.find(a => a.id === idAtleta);

    setElementValue("edit-nome-atleta", atletaEdicao.nome);
    setElementValue("edit-nacionalidade", atletaEdicao.nacionalidade);
    setElementValue("edit-modalidade", atletaEdicao.modalidade);
    setElementValue("edit-genero", atletaEdicao.genero);
    setElementValue("edit-categoria", atletaEdicao.categoria);
    setElementValue("edit-peso", atletaEdicao.peso);
    setElementValue("edit-altura", atletaEdicao.altura);
    setElementValue("edit-alergias", atletaEdicao.alergias);
    setElementValue("edit-historico", atletaEdicao.historico);
}

function salvarEdicaoAtleta(event) {

    event.preventDefault();
    const atletas = JSON.parse(localStorage.getItem("atletas"));

    const nome = getElementValue("edit-nome-atleta");
    const nacionalidade = getElementValue("edit-nacionalidade");
    const modalidade = getElementValue("edit-modalidade");
    const genero = getElementValue("edit-genero");
    const categoria = getElementValue("edit-categoria");
    const peso = getElementValue("edit-peso");
    const altura = getElementValue("edit-altura");
    const alergias = getElementValue("edit-alergias");
    const historico = getElementValue("edit-historico");

    let atletasAtualizado = atletas.map(function (atleta) {
        if (atleta.id == atletaEdicao.id) {
            atleta.nome = nome;
            atleta.nacionalidade = nacionalidade;
            atleta.modalidade = modalidade;
            atleta.genero = genero;
            atleta.categoria = categoria;
            atleta.peso = peso;
            atleta.altura = altura;
            atleta.alergias = alergias;
            atleta.historico = historico;

            return atleta;
        }
        return atleta;
    });

    localStorage.setItem("atletas", JSON.stringify(atletasAtualizado));
    onListarClick();
    carregarTabela();
}


function excluirAtleta(idAtleta) {
    if (confirm("Deseja realmente excluir o atleta?")) {
        let atletas = JSON.parse(localStorage.getItem("atletas"));
        let atletasFiltrado = atletas.filter(function (a) {
            return a.id !== idAtleta;
        });

        localStorage.setItem("atletas", JSON.stringify(atletasFiltrado));
        carregarTabela();
    }
}

function setElementValue(element, value) {
    document.getElementById(element).value = value;
}

function getElementValue(element) {
    return document.getElementById(element).value;
}