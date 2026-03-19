//Quando a minha tela carregar o conteúdo
document.addEventListener("DOMContentLoaded", function () {

    if(!verificarLogado()){
        window.location.href = "login.html"
    }
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const lista = document.getElementById("listaUsuarios");

    if(usuarios.length === 0){

        const li = document.createElement("li");
        li.textContent = "Nenhum usuário cadastrado.";
        lista.appendChild(li);

    }else{

        usuarios.forEach(usuario => {

            const li = document.createElement("li");

            li.textContent = usuario.nome + " - " + usuario.email;

            lista.appendChild(li);

        });

    }
    onCadastrarClick();
});


function voltar(){
    window.location.href = "login.html";
    logout();
}

function onListarClick(){
    const element = document.getElementById("btn-listar");
    element.classList.remove("btn-aba");
    element.classList.add("btn-aba-selecionado");
    document.getElementById("btn-cadastrar").classList.add("btn-aba");
    document.getElementById("btn-cadastrar").classList.remove("btn-aba-selecionado");

    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "flex";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "none";
}
function onCadastrarClick(){
    const element = document.getElementById("btn-cadastrar");
    element.classList.remove("btn-aba");
    element.classList.add("btn-aba-selecionado");
    document.getElementById("btn-listar").classList.add("btn-aba");
    document.getElementById("btn-listar").classList.remove("btn-aba-selecionado");

    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "none";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "flex";
}

function cadastrarAtleta(event){
    event.preventDefault(); //nao recarregar a pagina

    //Atleta

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
        nome: nome,
        nacionalidade: nacionalidade,
        dtNascimento: dtNascimento,
        cpf: cpf,
        modalidade : modalidade,
        genero : genero,
        categoria : categoria,
        peso : peso,
        altura : altura,
        tipoSanguineo : tipoSanguineo,
        alergias : alergias,
        historico : historico
    };

    //Tenta ler os dados da lista de atletas, se ela não existir, devolve uma vazia
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];

    //adiciona o atleta na lista de atletas
    atletas.push(atleta);

    //atualiza ou cria a lista no localStorage com o formato de JSON
    localStorage.setItem("atletas", JSON.stringify(atletas));

    setElementText("mensagem","Dados do " + nome + " cadastrados!");
    setElementDisplay("overlay","flex");
    resetFormCadastroAtleta();
}

function resetFormCadastroAtleta(){
    document.getElementById("container-cadastro").reset(); // limpa todos os campos
}